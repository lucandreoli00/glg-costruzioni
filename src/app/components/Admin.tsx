import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { supabase } from '@/lib/supabase.ts'
import { useAuth } from '@/context/AuthContext.tsx'
import { FolderOpen, Users, Plus, LogOut, FileText, Pencil, Trash2 } from 'lucide-react'
import logo from '@/assets/glgLogo.svg'

interface Cantiere {
  id: string
  nome: string
  indirizzo: string
  stato: string
  data_inizio: string
}

interface NuovoCantiere {
  nome: string
  indirizzo: string
  stato: string
  data_inizio: string
  note_interne: string
}

export function Admin() {
  const { user, profile, isAdmin } = useAuth()
  const navigate = useNavigate()
  const [cantieri, setCantieri] = useState<Cantiere[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingCantiere, setEditingCantiere] = useState<Cantiere | null>(null)
  const [nuovoCantiere, setNuovoCantiere] = useState<NuovoCantiere>({
    nome: '', indirizzo: '', stato: 'attivo', data_inizio: '', note_interne: ''
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    if (!isAdmin) { navigate('/portale'); return }
    fetchCantieri()
  }, [user, isAdmin])

  

  async function eliminaCantiere(cantiere: Cantiere) {
    if (!confirm(`Eliminare "${cantiere.nome}"? Verranno eliminati anche tutti i documenti associati.`)) return
    await supabase.from('cantieri').delete().eq('id', cantiere.id)
    fetchCantieri()
  }

  async function aggiornaCantiere(e: React.FormEvent) {
    e.preventDefault()
    if (!editingCantiere) return
    setSaving(true)
    await supabase.from('cantieri')
      .update({
        nome: editingCantiere.nome,
        indirizzo: editingCantiere.indirizzo,
        stato: editingCantiere.stato,
        data_inizio: editingCantiere.data_inizio,
      })
      .eq('id', editingCantiere.id)
    setEditingCantiere(null)
    fetchCantieri()
    setSaving(false)
  }

  async function fetchCantieri() {
    const { data } = await supabase
      .from('cantieri')
      .select('*')
      .order('created_at', { ascending: false })
    setCantieri(data || [])
    setLoading(false)
  }

  async function creaCantiere(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const { error } = await supabase.from('cantieri').insert(nuovoCantiere)
    if (!error) {
      setShowForm(false)
      setNuovoCantiere({ nome: '', indirizzo: '', stato: 'attivo', data_inizio: '', note_interne: '' })
      fetchCantieri()
    }
    setSaving(false)
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

        {/* Titolo + bottone nuovo cantiere */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-logo text-3xl text-stone-700 mb-1">Pannello Admin</h1>
            <p className="font-logo text-gray-500">Gestisci cantieri, documenti e clienti</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="font-logo bg-accent-red hover:bg-stone-800 text-white px-4 py-2 rounded-lg transition-colors inline-flex items-center gap-2 text-sm"
          >
            <Plus className="size-4" />
            Nuovo Cantiere
          </button>
        </div>

        {/* Form nuovo cantiere */}
        {showForm && (
          <form onSubmit={creaCantiere} className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="font-logo text-lg text-stone-700 mb-4">Nuovo Cantiere</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
                <input
                  type="text"
                  required
                  value={nuovoCantiere.nome}
                  onChange={e => setNuovoCantiere({ ...nuovoCantiere, nome: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-red focus:border-transparent font-logo"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Indirizzo</label>
                <input
                  type="text"
                  value={nuovoCantiere.indirizzo}
                  onChange={e => setNuovoCantiere({ ...nuovoCantiere, indirizzo: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-red focus:border-transparent font-logo"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stato</label>
                <select
                  value={nuovoCantiere.stato}
                  onChange={e => setNuovoCantiere({ ...nuovoCantiere, stato: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-red focus:border-transparent font-logo"
                >
                  <option value="attivo">Attivo</option>
                  <option value="completato">Completato</option>
                  <option value="sospeso">Sospeso</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data Inizio</label>
                <input
                  type="date"
                  value={nuovoCantiere.data_inizio}
                  onChange={e => setNuovoCantiere({ ...nuovoCantiere, data_inizio: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-red focus:border-transparent font-logo"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Note Interne</label>
                <textarea
                  value={nuovoCantiere.note_interne}
                  onChange={e => setNuovoCantiere({ ...nuovoCantiere, note_interne: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-red focus:border-transparent font-logo resize-none"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button
                type="submit"
                disabled={saving}
                className="font-logo bg-accent-red hover:bg-stone-800 disabled:opacity-60 text-white px-6 py-2 rounded-lg transition-colors text-sm"
              >
                {saving ? 'Salvataggio...' : 'Crea Cantiere'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="font-logo text-gray-500 hover:text-stone-800 px-6 py-2 rounded-lg border border-gray-300 transition-colors text-sm"
              >
                Annulla
              </button>
            </div>
          </form>
        )}

        {/* Lista cantieri */}
        {loading ? (
          <div className="text-center py-20 text-gray-400 font-logo">Caricamento...</div>
        ) : cantieri.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow-sm">
            <FolderOpen className="size-16 text-gray-300 mx-auto mb-4" />
            <p className="font-logo text-gray-400">Nessun cantiere ancora — creane uno!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cantieri.map(cantiere => (
              <div
                key={cantiere.id}
                className="bg-white rounded-lg shadow-sm p-6 border border-transparent hover:border-accent-red transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="flex-1 cursor-pointer"
                    onClick={() => navigate(`/admin/cantiere/${cantiere.id}`)}
                  >
                    <FolderOpen className="size-8 text-accent-red mb-2" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`font-logo text-xs px-2 py-1 rounded-full ${
                      cantiere.stato === 'attivo'
                        ? 'bg-green-100 text-green-700'
                        : cantiere.stato === 'completato'
                        ? 'bg-gray-100 text-gray-600'
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {cantiere.stato}
                    </span>
                    <button
                      onClick={() => setEditingCantiere(cantiere)}
                      className="text-gray-400 hover:text-accent-red transition-colors p-1"
                    >
                      <Pencil className="size-4" />
                    </button>
                    <button
                      onClick={() => eliminaCantiere(cantiere)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => navigate(`/admin/cantiere/${cantiere.id}`)}
                >
                  <h3 className="font-logo font-semibold text-stone-700 text-lg mb-1">
                    {cantiere.nome}
                  </h3>
                  <p className="font-logo text-gray-500 text-sm">{cantiere.indirizzo}</p>
                  {cantiere.data_inizio && (
                    <p className="font-logo text-gray-400 text-xs mt-2">
                      Inizio: {new Date(cantiere.data_inizio).toLocaleDateString('it-IT')}
                    </p>
                  )}
                  <div className="flex items-center gap-1 mt-4 text-accent-red">
                    <FileText className="size-4" />
                    <span className="font-logo text-xs">Gestisci documenti →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}