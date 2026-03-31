import { useState } from 'react'
import { Link } from 'react-router'
import { supabase } from '@/lib/supabase.ts'
import { ArrowLeft } from 'lucide-react'
import logo from '@/assets/glgLogo.svg'

export function ResetPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/set-password`
      })
      if (error) throw error
      setSent(true)
    } catch (err: any) {
      setError(err.message)
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
          Recupera Password
        </h1>
        <p className="font-logo text-center text-gray-500 text-sm mb-8">
          Inserisci la tua email e ti manderemo un link per reimpostare la password
        </p>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded text-sm">
            {error}
          </div>
        )}

        {sent ? (
          <div className="text-center">
            <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded text-sm">
              Email inviata! Controlla la tua casella di posta.
            </div>
            <Link
              to="/login"
              className="font-logo text-sm text-accent-red hover:text-stone-800 transition-colors inline-flex items-center gap-1"
            >
              <ArrowLeft className="size-4" />
              Torna al login
            </Link>
          </div>
        ) : (
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
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent-red hover:bg-stone-800 disabled:opacity-60 text-white py-3 rounded-lg transition-colors font-logo"
            >
              {loading ? 'Invio in corso...' : 'Invia Link di Recupero'}
            </button>
            <div className="text-center">
              <Link
                to="/login"
                className="font-logo text-sm text-gray-400 hover:text-accent-red transition-colors inline-flex items-center gap-1"
              >
                <ArrowLeft className="size-4" />
                Torna al login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}