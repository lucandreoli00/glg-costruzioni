import { useState } from 'react'
import { useNavigate } from 'react-router'
import { supabase } from '@/lib/supabase.ts'
import { ArrowLeft } from 'lucide-react'

export function CambiaPassword() {
  const [passwordAttuale, setPasswordAttuale] = useState('')
  const [nuovaPassword, setNuovaPassword] = useState('')
  const [conferma, setConferma] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (nuovaPassword !== conferma) {
      setError('Le password non coincidono')
      return
    }
    if (nuovaPassword.length < 8) {
      setError('La password deve essere di almeno 8 caratteri')
      return
    }
    if (nuovaPassword === passwordAttuale) {
      setError('La nuova password deve essere diversa da quella attuale')
      return
    }

    setLoading(true)
    try {
      // verifica password attuale
      const { data: { user } } = await supabase.auth.getUser()
      if (!user?.email) throw new Error('Utente non trovato')

      const { error: loginError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: passwordAttuale
      })
      if (loginError) throw new Error('Password attuale non corretta')

      // aggiorna password
      const { error } = await supabase.auth.updateUser({
        password: nuovaPassword,
        data: { password_set: true }
      })
      if (error) throw error

      setSuccess(true)
      setTimeout(() => navigate(-1), 2000)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-boero/15 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">

        <button
          onClick={() => navigate(-1)}
          className="font-logo text-sm text-gray-500 hover:text-accent-red transition-colors inline-flex items-center gap-1 mb-6"
        >
          <ArrowLeft className="size-4" />
          Torna indietro
        </button>

        <h1 className="font-logo text-2xl text-stone-700 mb-2">Cambia Password</h1>
        <p className="font-logo text-gray-500 text-sm mb-8">
          Inserisci la password attuale e scegli una nuova password
        </p>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded text-sm">
            Password aggiornata correttamente!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password attuale
            </label>
            <input
              type="password"
              value={passwordAttuale}
              onChange={e => setPasswordAttuale(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-red focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nuova password
            </label>
            <input
              type="password"
              value={nuovaPassword}
              onChange={e => setNuovaPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-red focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Conferma nuova password
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
            {loading ? 'Aggiornamento...' : 'Aggiorna Password'}
          </button>
        </form>
      </div>
    </div>
  )
}