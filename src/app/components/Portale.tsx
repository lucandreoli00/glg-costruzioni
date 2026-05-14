import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { supabase } from '@/lib/supabase.ts'
import { useAuth } from '@/context/AuthContext.tsx'
import { FolderOpen, LogOut } from 'lucide-react'
import logo from '@/assets/glgLogo.svg'
import { Link }  from 'react-router'

interface Cantiere {
  id: string
  nome: string
  indirizzo: string
  stato: string
  data_inizio: string
}

export function Portale() {
  const { user, profile, isAdmin, loading: authLoading } = useAuth()
  const [cantieri, setCantieri] = useState<Cantiere[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (authLoading) return
    if (!user) {
      navigate('/login')
      return
    }
    if (isAdmin) {
      navigate('/admin')
      return
    }
    fetchCantieri()
  }, [user, isAdmin, authLoading])

  async function fetchCantieri() {
    const { data, error } = await supabase
      .from('cantieri')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error) setCantieri(data || [])
    setLoading(false)
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
            <Link
              to="/cambia-password"
              className="font-logo text-sm text-gray-500 hover:text-accent-red transition-colors"
            >
              Cambia Password
            </Link>
          </div>
        </div>
      </header>

      {/* Contenuto */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-logo text-3xl text-stone-700 mb-2">I Tuoi Cantieri</h1>
        <p className="font-logo text-gray-500 mb-8">
          Seleziona un cantiere per visualizzare i documenti
        </p>

        {loading ? (
          <div className="text-center py-20 text-gray-400 font-logo">
            Caricamento...
          </div>
        ) : cantieri.length === 0 ? (
          <div className="text-center py-20">
            <FolderOpen className="size-16 text-gray-300 mx-auto mb-4" />
            <p className="font-logo text-gray-400">
              Nessun cantiere assegnato al momento
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cantieri.map(cantiere => (
              <div
                key={cantiere.id}
                onClick={() => navigate(`/portale/${cantiere.id}`)}
                className="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md hover:border-accent-red border border-transparent transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <FolderOpen className="size-8 text-accent-red" />
                  <span className={`font-logo text-xs px-2 py-1 rounded-full ${
                    cantiere.stato === 'attivo' 
                      ? 'bg-green-100 text-green-700' 
                      : cantiere.stato === 'completato'
                      ? 'bg-gray-100 text-gray-600'
                      : 'bg-amber-100 text-amber-700'
                  }`}>
                    {cantiere.stato}
                  </span>
                </div>
                <h3 className="font-logo font-semibold text-stone-700 text-lg mb-1">
                  {cantiere.nome}
                </h3>
                <p className="font-logo text-gray-500 text-sm">{cantiere.indirizzo}</p>
                {cantiere.data_inizio && (
                  <p className="font-logo text-gray-400 text-xs mt-2">
                    Inizio: {new Date(cantiere.data_inizio).toLocaleDateString('it-IT')}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}