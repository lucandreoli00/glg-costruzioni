import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { supabase } from '@/lib/supabase.ts'
import logo from '@/assets/glgLogo.svg'

export function SetPassword() {
  const [password, setPassword] = useState('')
  const [conferma, setConferma] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== conferma) {
      setError('Le password non coincidono')
      return
    }

    if (password.length < 8) {
      setError('La password deve essere di almeno 8 caratteri')
      return
    }

    setLoading(true)
    try {
      const { error } = await supabase.auth.updateUser({ password,
        data: {password_set: true}
       })
      if (error) throw error
      setSuccess(true)
      setTimeout(() => navigate('/login'), 2000)
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
          Imposta Password
        </h1>
        <p className="font-logo text-center text-gray-500 text-sm mb-8">
          Scegli una password per accedere all'area riservata
        </p>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded text-sm">
            {error}
          </div>
        )}

        {success && (
            <div className='mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded text-sm'>
                Password impostata correttamente! Reindirizzamento al login...
            </div>
        )

        }

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nuova Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-red focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Conferma Password
            </label>
            <input
              type="password"
              value={conferma}
              onChange={e => setConferma(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-red focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent-red hover:bg-stone-800 disabled:opacity-60 text-white py-3 rounded-lg transition-colors font-logo"
          >
            {loading ? 'Salvataggio...' : 'Imposta Password'}
          </button>
        </form>

      </div>
    </div>
  )
}