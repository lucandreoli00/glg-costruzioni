import { useState } from 'react'
import { useNavigate } from 'react-router'
import { supabase } from '@/lib/supabase.ts'
import { useAuth } from '@/context/AuthContext.tsx'
import logo from '@/assets/glgLogo.svg'
import { Link }  from 'react-router'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { isAdmin } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setError('')
  setLoading(true)

  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error

    // recupera il profilo direttamente dopo il login
    const { data: profile } = await supabase
      .from('profiles')
      .select('ruolo')
      .eq('id', data.user.id)
      .single()

    console.log('profilo: ',profile)
    console.log('ruolo: ', profile?.ruolo)

    if (profile?.ruolo === 'admin') navigate('/admin')
    else navigate('/portale')

  } catch (err: any) {
    setError('Email o password non corretti')
  } finally {
    setLoading(false)
  }
}

  return (
    <div className="min-h-screen bg-boero/15 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        
        <div className="flex justify-center mb-8">
          <img src={logo} alt="GLG Costruzioni" className="h-16 w-auto" />
        </div>

        <h1 className="font-logo text-2xl text-center text-stone-700 mb-2">
          Area Riservata
        </h1>
        <p className="font-logo text-center text-gray-500 text-sm mb-8">
          Accedi per visualizzare i tuoi documenti
        </p>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-red focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-red focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent-red hover:bg-stone-800 disabled:opacity-60 text-white py-3 rounded-lg transition-colors font-logo"
          >
            {loading ? 'Accesso in corso...' : 'Accedi'}
          </button>
          <div className="text-center mt-4">
            <Link
              to="/reset-password"
              className="font-logo text-sm text-gray-400 hover:text-accent-red transition-colors"
            >
              Password dimenticata?
            </Link>
          </div>
        </form>

        <p className='font-logo text-center text-sm text-gray-400 mt-6'>
            <Link
                to = "/"
                className='hover:text-accent-red transition-colors'
            >
                ↩ Torna al sito
            </Link>
        </p>

      </div>
    </div>
  )
}