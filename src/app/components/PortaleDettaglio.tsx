import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { supabase } from '@/lib/supabase.ts'
import { useAuth } from '@/context/AuthContext.tsx'
import { FileText, Download, ArrowLeft, LogOut, Image, File } from 'lucide-react'
import logo from '@/assets/glgLogo.svg'

interface Documento {
  id: string
  nome: string
  tipo: string
  url: string
  created_at: string
}

interface Cantiere {
  id: string
  nome: string
  indirizzo: string
  stato: string
}

export function PortaleDettaglio() {
  const { id } = useParams()
  const { user, profile } = useAuth()
  const navigate = useNavigate()
  const [cantiere, setCantiere] = useState<Cantiere | null>(null)
  const [documenti, setDocumenti] = useState<Documento[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    fetchData()
  }, [user, id])

  async function fetchData() {
    const [{ data: cantiere }, { data: documenti }] = await Promise.all([
      supabase.from('cantieri').select('*').eq('id', id).single(),
      supabase.from('documenti').select('*').eq('cantiere_id', id).order('created_at', { ascending: false })
    ])

    setCantiere(cantiere)
    setDocumenti(documenti || [])
    setLoading(false)
  }

  async function handleDownload(doc: Documento) {
    // Log accesso
    await supabase.from('log_accessi').insert({
      user_id: user!.id,
      documento_id: doc.id,
      azione: 'scarica'
    })
    window.open(doc.url, '_blank')
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

        {/* Back button */}
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
                  cantiere?.stato === 'attivo'
                    ? 'bg-green-100 text-green-700'
                    : cantiere?.stato === 'completato'
                    ? 'bg-gray-100 text-gray-600'
                    : 'bg-amber-100 text-amber-700'
                }`}>
                  {cantiere?.stato}
                </span>
              </div>
            </div>

            {/* Documenti */}
            <h2 className="font-logo text-xl text-stone-700 mb-4">
              Documenti ({documenti.length})
            </h2>

            {documenti.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-lg shadow-sm">
                <FileText className="size-16 text-gray-300 mx-auto mb-4" />
                <p className="font-logo text-gray-400">Nessun documento disponibile</p>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-100">
                {documenti.map(doc => (
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
          </>
        )}
      </main>
    </div>
  )
}