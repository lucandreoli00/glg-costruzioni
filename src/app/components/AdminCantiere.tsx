import { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router'
import { supabase } from '@/lib/supabase.ts'
import { openDocumento, docPath } from '@/lib/storage.ts'
import { useAuth } from '@/context/AuthContext.tsx'
import { ArrowLeft, LogOut, Upload, Trash2, Eye, EyeOff, Users, FileText, Image, File, UserPlus } from 'lucide-react'
import logo from '@/assets/glgLogo.svg'

interface Cantiere {
  id: string
  nome: string
  indirizzo: string
  stato: string
  note_interne: string
}

interface Documento {
  id: string
  nome: string
  tipo: string
  url: string
  visibile: boolean
  created_at: string
  caricato_da: string
}

interface Cliente {
  id: string
  nome: string
  cognome: string
  azienda: string
  ruolo_cantiere: string
}

export function AdminCantiere() {
  const { id } = useParams()
  const { user, profile, isAdmin, loading: authLoading } = useAuth()
  const navigate = useNavigate()

  const [cantiere, setCantiere] = useState<Cantiere | null>(null)
  const [documenti, setDocumenti] = useState<Documento[]>([])
  const [clienti, setClienti] = useState<Cliente[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [showInvita, setShowInvita] = useState(false)
  const [modoInvito, setModoInvito] = useState<'esistente' | 'nuovo'>('esistente')
  const [utentiEsistenti, setUtentiEsistenti] = useState<{id: string, nome: string, cognome: string, azienda: string | null}[]>([])
  const [utenteSelezionato, setUtenteSelezionato] = useState('')
  const [emailInvito, setEmailInvito] = useState('')
  const [nomeInvito, setNomeInvito] = useState('')
  const [cognomeInvito, setCognomeInvito] = useState('')
  const [aziendaInvito, setAziendaInvito] = useState('')
  const [inviting, setInviting] = useState(false)
  const [tab, setTab] = useState<'documenti' | 'clienti' | 'log'>('documenti')
  const [log, setLog] = useState<any[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (authLoading) return
    if (!user) { navigate('/login'); return }
    if (!isAdmin) { navigate('/portale'); return }
    fetchAll()
  }, [user, isAdmin, authLoading, id])

  async function fetchAll() {
    const [
      { data: cant },
      { data: docs },
      { data: cu }
    ] = await Promise.all([
      supabase.from('cantieri').select('*').eq('id', id).single(),
      supabase.from('documenti').select('*').eq('cantiere_id', id).order('created_at', { ascending: false }),
      supabase.from('cantieri_utenti').select('*, profiles(nome, cognome, azienda)').eq('cantiere_id', id)
    ])

    setCantiere(cant)
    setDocumenti(docs || [])
    setClienti((cu || []).map((c: any) => ({
      id: c.user_id,
      nome: c.profiles.nome,
      cognome: c.profiles.cognome,
      azienda: c.profiles.azienda,
      ruolo_cantiere: c.ruolo_cantiere
    })))
    setLoading(false)
  }

  async function fetchLog() {
    const { data } = await supabase
      .from('log_accessi')
      .select('*, profiles(nome, cognome), documenti(nome)')
      .eq('documenti.cantiere_id', id)
      .order('created_at', { ascending: false })
      .limit(50)
    setLog(data || [])
  }

  async function uploadDocumento(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)

    // Determina il tipo
    const ext = file.name.split('.').pop()?.toLowerCase() || ''
    const tipo = ['jpg', 'jpeg', 'png', 'webp'].includes(ext) ? 'img'
      : ext === 'pdf' ? 'pdf'
      : ext === 'dwg' ? 'dwg'
      : ['xlsx', 'xls'].includes(ext) ? 'excel'
      : 'altro'

    // Upload su Supabase Storage
    const path = `${id}/${Date.now()}_${file.name}`
    const { error: uploadError } = await supabase.storage
      .from('documenti')
      .upload(path, file)

    if (uploadError) {
      console.error(uploadError)
      setUploading(false)
      return
    }

    // Salva in DB (salviamo il path, non l'URL pubblico)
    await supabase.from('documenti').insert({
      cantiere_id: id,
      nome: file.name,
      tipo,
      url: path,
      visibile: false,
      caricato_da: user!.id
    })

    fetchAll()
    setUploading(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  async function toggleVisibilita(doc: Documento) {
    await supabase.from('documenti')
      .update({ visibile: !doc.visibile })
      .eq('id', doc.id)
    fetchAll()
  }

  async function eliminaDocumento(doc: Documento) {
    if (!confirm(`Eliminare "${doc.nome}"?`)) return
    const path = docPath(doc.url)
    await supabase.storage.from('documenti').remove([path])
    await supabase.from('documenti').delete().eq('id', doc.id)
    fetchAll()
  }

  async function invitaCliente(e: React.FormEvent) {
  e.preventDefault()
  setInviting(true)

  try {
    const res = await fetch('/api/invite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: emailInvito,
        nome: nomeInvito,
        cognome: cognomeInvito,
        azienda: aziendaInvito,
        cantiere_id: id
      })
    })

    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.error)
    }

    setShowInvita(false)
    setEmailInvito('')
    setNomeInvito('')
    setCognomeInvito('')
    setAziendaInvito('')
    fetchAll()
  } catch (err: any) {
    alert('Errore: ' + err.message)
  }
  setInviting(false)
}

  async function rimuoviCliente(clienteId: string) {
    if (!confirm('Rimuovere questo cliente dal cantiere?')) return
    await supabase.from('cantieri_utenti')
      .delete()
      .eq('cantiere_id', id)
      .eq('user_id', clienteId)
    fetchAll()
  }

  async function apriFormInvito() {
    setShowInvita(true)
    const { data } = await supabase
      .from('profiles')
      .select('id, nome, cognome, azienda')
      .eq('ruolo', 'cliente')
    const giàAssegnati = new Set(clienti.map(c => c.id))
    setUtentiEsistenti((data || []).filter(u => !giàAssegnati.has(u.id)))
  }

  async function assegnaEsistente(e: React.FormEvent) {
    e.preventDefault()
    if (!utenteSelezionato) return
    setInviting(true)
    await supabase.from('cantieri_utenti').upsert(
      { cantiere_id: id, user_id: utenteSelezionato, ruolo_cantiere: 'cliente' },
      { onConflict: 'cantiere_id,user_id' }
    )
    setShowInvita(false)
    setUtenteSelezionato('')
    setInviting(false)
    fetchAll()
  }

  function getIcona(tipo: string) {
    switch (tipo) {
      case 'img': return <Image className="size-5 text-accent-red" />
      case 'pdf': return <FileText className="size-5 text-accent-red" />
      default: return <File className="size-5 text-accent-red" />
    }
  }

  return (
    <div className="min-h-screen bg-boero/15">

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <img src={logo} alt="GLG Costruzioni" className="h-10 w-auto" />
          <div className="flex items-center gap-4">
            <span className="font-logo text-sm text-gray-600">
              {profile?.nome} {profile?.cognome}
            </span>
            <button
              onClick={() => supabase.auth.signOut().then(() => navigate('/login'))}
              className="font-logo text-sm text-gray-500 hover:text-accent-red transition-colors inline-flex items-center gap-1"
            >
              <LogOut className="size-4" />
              Esci
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Back + titolo */}
        <button
          onClick={() => navigate('/admin')}
          className="font-logo text-sm text-gray-500 hover:text-accent-red transition-colors inline-flex items-center gap-1 mb-6"
        >
          <ArrowLeft className="size-4" />
          Tutti i cantieri
        </button>

        {loading ? (
          <div className="text-center py-20 text-gray-400 font-logo">Caricamento...</div>
        ) : (
          <>
            {/* Info cantiere */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="font-logo text-3xl text-stone-700 mb-1">{cantiere?.nome}</h1>
                  <p className="font-logo text-gray-500">{cantiere?.indirizzo}</p>
                  {cantiere?.note_interne && (
                    <p className="font-logo text-sm text-amber-700 bg-amber-50 px-3 py-1 rounded mt-2">
                      Note: {cantiere.note_interne}
                    </p>
                  )}
                </div>
                <span className={`font-logo text-sm px-3 py-1 rounded-full ${
                  cantiere?.stato === 'attivo' ? 'bg-green-100 text-green-700'
                  : cantiere?.stato === 'completato' ? 'bg-gray-100 text-gray-600'
                  : 'bg-amber-100 text-amber-700'
                }`}>
                  {cantiere?.stato}
                </span>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6">
              {(['documenti', 'clienti', 'log'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => { setTab(t); if (t === 'log') fetchLog() }}
                  className={`font-logo text-sm px-4 py-2 rounded-lg transition-colors capitalize ${
                    tab === t
                      ? 'bg-accent-red text-white'
                      : 'bg-white text-gray-600 hover:text-accent-red border border-gray-200'
                  }`}
                >
                  {t === 'documenti' ? `Documenti (${documenti.length})`
                    : t === 'clienti' ? `Clienti (${clienti.length})`
                    : 'Log Accessi'}
                </button>
              ))}
            </div>

            {/* TAB DOCUMENTI */}
            {tab === 'documenti' && (
              <div>
                {/* Upload */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <h2 className="font-logo text-lg text-stone-700 mb-4">Carica Documento</h2>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-accent-red transition-colors"
                  >
                    <Upload className="size-8 text-gray-400 mx-auto mb-2" />
                    <p className="font-logo text-gray-500 text-sm">
                      {uploading ? 'Caricamento in corso...' : 'Clicca per selezionare un file'}
                    </p>
                    <p className="font-logo text-gray-400 text-xs mt-1">
                      PDF, DWG, immagini, Excel
                    </p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={uploadDocumento}
                    accept=".pdf,.dwg,.jpg,.jpeg,.png,.webp,.xlsx,.xls"
                  />
                </div>

                {/* Lista documenti */}
                {documenti.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                    <FileText className="size-12 text-gray-300 mx-auto mb-3" />
                    <p className="font-logo text-gray-400">Nessun documento caricato</p>
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-100">
                    {documenti.map(doc => {
                      const daCliente = clienti.some(c => c.id === doc.caricato_da)
                      return (
                      <div key={doc.id} className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-3">
                          {getIcona(doc.tipo)}
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-logo text-sm font-medium text-stone-700">{doc.nome}</p>
                              {daCliente && (
                                <span className="font-logo text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                                  cliente
                                </span>
                              )}
                            </div>
                            <p className="font-logo text-xs text-gray-400">
                              {new Date(doc.created_at).toLocaleDateString('it-IT')} · {doc.tipo.toUpperCase()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {!daCliente && (
                            <button
                              onClick={() => toggleVisibilita(doc)}
                              className={`font-logo text-xs px-3 py-1 rounded-full transition-colors inline-flex items-center gap-1 ${
                                doc.visibile
                                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                              }`}
                            >
                              {doc.visibile ? <><Eye className="size-3" /> Visibile</> : <><EyeOff className="size-3" /> Nascosto</>}
                            </button>
                          )}
                            <button
                             onClick={() => openDocumento(doc.id).catch((e: any) => alert(e.message))}
                                className="text-gray-400 hover:text-accent-red transition-colors p-1"
                            >
                            <Eye className="size-4" />
                            </button>
                          <button
                            onClick={() => eliminaDocumento(doc)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-1"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </div>
                    )})}
                  </div>
                )}
              </div>
            )}

            {/* TAB CLIENTI */}
            {tab === 'clienti' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-logo text-lg text-stone-700">Clienti assegnati</h2>
                  <button
                    onClick={() => showInvita ? setShowInvita(false) : apriFormInvito()}
                    className="font-logo bg-accent-red hover:bg-stone-800 text-white px-4 py-2 rounded-lg transition-colors inline-flex items-center gap-2 text-sm"
                  >
                    <UserPlus className="size-4" />
                    Aggiungi Cliente
                  </button>
                </div>

                {/* Form invito */}
                {showInvita && (
                  <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    {/* Toggle modo */}
                    <div className="flex gap-2 mb-5">
                      {(['esistente', 'nuovo'] as const).map(modo => (
                        <button
                          key={modo}
                          type="button"
                          onClick={() => setModoInvito(modo)}
                          className={`font-logo text-sm px-4 py-1.5 rounded-lg border transition-colors ${
                            modoInvito === modo
                              ? 'bg-accent-red text-white border-accent-red'
                              : 'text-gray-600 border-gray-300 hover:border-accent-red'
                          }`}
                        >
                          {modo === 'esistente' ? 'Utente esistente' : 'Nuovo cliente'}
                        </button>
                      ))}
                    </div>

                    {/* Seleziona esistente */}
                    {modoInvito === 'esistente' && (
                      <form onSubmit={assegnaEsistente}>
                        {utentiEsistenti.length === 0 ? (
                          <p className="font-logo text-sm text-gray-400 py-2">
                            Nessun utente disponibile da aggiungere.
                          </p>
                        ) : (
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Seleziona utente</label>
                            <select
                              required
                              value={utenteSelezionato}
                              onChange={e => setUtenteSelezionato(e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-red focus:border-transparent font-logo"
                            >
                              <option value="">— Seleziona —</option>
                              {utentiEsistenti.map(u => (
                                <option key={u.id} value={u.id}>
                                  {u.nome} {u.cognome}{u.azienda ? ` — ${u.azienda}` : ''}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                        <div className="flex gap-3">
                          <button
                            type="submit"
                            disabled={inviting || !utenteSelezionato}
                            className="font-logo bg-accent-red hover:bg-stone-800 disabled:opacity-60 text-white px-6 py-2 rounded-lg transition-colors text-sm"
                          >
                            {inviting ? 'Salvataggio...' : 'Aggiungi al cantiere'}
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowInvita(false)}
                            className="font-logo text-gray-500 hover:text-stone-800 px-6 py-2 rounded-lg border border-gray-300 transition-colors text-sm"
                          >
                            Annulla
                          </button>
                        </div>
                      </form>
                    )}

                    {/* Nuovo cliente */}
                    {modoInvito === 'nuovo' && (
                      <form onSubmit={invitaCliente}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                            <input
                              type="email"
                              required
                              value={emailInvito}
                              onChange={e => setEmailInvito(e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-red focus:border-transparent font-logo"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Azienda</label>
                            <input
                              type="text"
                              value={aziendaInvito}
                              onChange={e => setAziendaInvito(e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-red focus:border-transparent font-logo"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
                            <input
                              type="text"
                              required
                              value={nomeInvito}
                              onChange={e => setNomeInvito(e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-red focus:border-transparent font-logo"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Cognome *</label>
                            <input
                              type="text"
                              required
                              value={cognomeInvito}
                              onChange={e => setCognomeInvito(e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-red focus:border-transparent font-logo"
                            />
                          </div>
                        </div>
                        <div className="flex gap-3 mt-4">
                          <button
                            type="submit"
                            disabled={inviting}
                            className="font-logo bg-accent-red hover:bg-stone-800 disabled:opacity-60 text-white px-6 py-2 rounded-lg transition-colors text-sm"
                          >
                            {inviting ? 'Invio in corso...' : 'Invia Invito'}
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowInvita(false)}
                            className="font-logo text-gray-500 hover:text-stone-800 px-6 py-2 rounded-lg border border-gray-300 transition-colors text-sm"
                          >
                            Annulla
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                )}

                {/* Lista clienti */}
                {clienti.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                    <Users className="size-12 text-gray-300 mx-auto mb-3" />
                    <p className="font-logo text-gray-400">Nessun cliente assegnato</p>
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-100">
                    {clienti.map(cliente => (
                      <div key={cliente.id} className="flex items-center justify-between p-4">
                        <div>
                          <p className="font-logo text-sm font-medium text-stone-700">
                            {cliente.nome} {cliente.cognome}
                          </p>
                          <p className="font-logo text-xs text-gray-400">
                            {cliente.azienda || 'Nessuna azienda'} · {cliente.ruolo_cantiere}
                          </p>
                        </div>
                        <button
                          onClick={() => rimuoviCliente(cliente.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB LOG */}
            {tab === 'log' && (
              <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-100">
                {log.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="font-logo text-gray-400">Nessun accesso registrato</p>
                  </div>
                ) : (
                  log.map(entry => (
                    <div key={entry.id} className="flex items-center justify-between p-4">
                      <div>
                        <p className="font-logo text-sm font-medium text-stone-700">
                          {entry.profiles?.nome} {entry.profiles?.cognome}
                        </p>
                        <p className="font-logo text-xs text-gray-400">
                          {entry.documenti?.nome}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className={`font-logo text-xs px-2 py-1 rounded-full ${
                          entry.azione === 'scarica'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {entry.azione}
                        </span>
                        <p className="font-logo text-xs text-gray-400 mt-1">
                          {new Date(entry.created_at).toLocaleString('it-IT')}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}