import { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router'
import { supabase } from '@/lib/supabase.ts'
import { openDocumento, softDeleteDocumento } from '@/lib/storage.ts'
import { useAuth } from '@/context/AuthContext.tsx'
import { FileText, Download, ArrowLeft, LogOut, Image, File, Upload, Trash2 } from 'lucide-react'
import logo from '@/assets/glgLogo.svg'
import { Link } from 'react-router'

interface Documento {
  id: string
  nome: string
  tipo: string
  url: string
  created_at: string
  caricato_da: string
  visibile: boolean
  eliminato_da_cliente?: boolean
}

interface Cantiere {
  id: string
  nome: string
  indirizzo: string
  stato: string
}

export function PortaleDettaglio() {
  const { id } = useParams()
  const { user, profile, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [cantiere, setCantiere] = useState<Cantiere | null>(null)
  const [documenti, setDocumenti] = useState<Documento[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (authLoading) return
    if (!user) {
      navigate('/login')
      return
    }
    fetchData()
  }, [user, authLoading, id])

  async function fetchData() {
    const [{ data: cantiere }, { data: docs }] = await Promise.all([
      supabase.from('cantieri').select('*').eq('id', id).single(),
      supabase.from('documenti')
        .select('*')
        .eq('cantiere_id', id)
        .eq('eliminato_da_cliente', false)
        .or(`visibile.eq.true,caricato_da.eq.${user!.id}`)
        .order('created_at', { ascending: false })
    ])

    setCantiere(cantiere)
    setDocumenti(docs || [])
    setLoading(false)
  }

  async function handleDownload(doc: Documento) {
    try {
      await openDocumento(doc.id, 'scarica')
    } catch (e: any) {
      alert(e.message)
    }
  }

  async function uploadDocumento(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)

    const ext = file.name.split('.').pop()?.toLowerCase() || ''
    const tipo = ['jpg', 'jpeg', 'png', 'webp'].includes(ext) ? 'img'
      : ext === 'pdf' ? 'pdf'
      : ['xlsx', 'xls'].includes(ext) ? 'excel'
      : 'altro'

    const path = `clienti/${id}/${user!.id}/${Date.now()}_${file.name}`
    const { error: uploadError } = await supabase.storage
      .from('documenti')
      .upload(path, file)

    if (uploadError) {
      alert('Errore durante il caricamento: ' + uploadError.message)
      setUploading(false)
      return
    }

    await supabase.from('documenti').insert({
      cantiere_id: id,
      nome: file.name,
      tipo,
      url: path,
      visibile: true,
      caricato_da: user!.id
    })

    if (fileInputRef.current) fileInputRef.current.value = ''
    setUploading(false)
    fetchData()
  }

  async function eliminaDocumento(doc: Documento) {
    if (!confirm(`Rimuovere "${doc.nome}"? Resterà visibile all'ufficio finché non verrà eliminato definitivamente.`)) return
    try {
      await softDeleteDocumento(doc.id)
      fetchData()
    } catch (e: any) {
      alert(e.message)
    }
  }

  function getIcona(tipo: string) {
    switch (tipo) {
      case 'img': return <Image className="size-5 text-accent-red" />
      case 'pdf': return <FileText className="size-5 text-accent-red" />
      default: return <File className="size-5 text-accent-red" />
    }
  }

  const docUfficio = documenti.filter(d => d.caricato_da !== user!.id)
  const docMiei = documenti.filter(d => d.caricato_da === user!.id)

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
            <Link
              to="/cambia-password"
              className="font-logo text-sm text-gray-500 hover:text-accent-red transition-colors"
            >
              Cambia Password
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <button
          onClick={() => navigate('/portale')}
          className="font-logo text-sm text-gray-500 hover:text-accent-red transition-colors inline-flex items-center gap-1 mb-8"
        >
          <ArrowLeft className="size-4" />
          Tutti i cantieri
        </button>

        {loading ? (
          <div className="text-center py-20 text-gray-400 font-logo">Caricamento...</div>
        ) : (
          <>
            {/* Info cantiere */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="font-logo text-3xl text-stone-700 mb-1">{cantiere?.nome}</h1>
                  <p className="font-logo text-gray-500">{cantiere?.indirizzo}</p>
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

            {/* Documenti ufficio */}
            <h2 className="font-logo text-xl text-stone-700 mb-4">
              Documenti ufficio ({docUfficio.length})
            </h2>
            {docUfficio.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm mb-8">
                <FileText className="size-12 text-gray-300 mx-auto mb-3" />
                <p className="font-logo text-gray-400">Nessun documento disponibile</p>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-100 mb-8">
                {docUfficio.map(doc => (
                  <div key={doc.id} className="flex items-center justify-between p-4 hover:bg-boero/5 transition-colors">
                    <div className="flex items-center gap-3">
                      {getIcona(doc.tipo)}
                      <div>
                        <p className="font-logo text-sm font-medium text-stone-700">{doc.nome}</p>
                        <p className="font-logo text-xs text-gray-400">
                          {new Date(doc.created_at).toLocaleDateString('it-IT')} · {doc.tipo.toUpperCase()}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDownload(doc)}
                      className="font-logo text-sm text-accent-red hover:text-stone-800 transition-colors inline-flex items-center gap-1"
                    >
                      <Download className="size-4" />
                      Scarica
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* I tuoi documenti */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-logo text-xl text-stone-700">
                I tuoi documenti ({docMiei.length})
              </h2>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="font-logo bg-accent-red hover:bg-stone-800 disabled:opacity-60 text-white px-4 py-2 rounded-lg transition-colors inline-flex items-center gap-2 text-sm"
              >
                <Upload className="size-4" />
                {uploading ? 'Caricamento...' : 'Carica documento'}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={uploadDocumento}
                accept=".pdf,.jpg,.jpeg,.png,.webp,.xlsx,.xls,.dwg"
              />
            </div>

            {docMiei.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <Upload className="size-12 text-gray-300 mx-auto mb-3" />
                <p className="font-logo text-gray-400">Nessun documento caricato da te</p>
                <p className="font-logo text-xs text-gray-400 mt-1">
                  Puoi caricare documenti che verranno inviati all'ufficio
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-100">
                {docMiei.map(doc => (
                  <div key={doc.id} className="flex items-center justify-between p-4 hover:bg-boero/5 transition-colors">
                    <div className="flex items-center gap-3">
                      {getIcona(doc.tipo)}
                      <div>
                        <p className="font-logo text-sm font-medium text-stone-700">{doc.nome}</p>
                        <p className="font-logo text-xs text-gray-400">
                          {new Date(doc.created_at).toLocaleDateString('it-IT')} · {doc.tipo.toUpperCase()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleDownload(doc)}
                        className="font-logo text-sm text-accent-red hover:text-stone-800 transition-colors inline-flex items-center gap-1"
                      >
                        <Download className="size-4" />
                        Scarica
                      </button>
                      <button
                        onClick={() => eliminaDocumento(doc)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
