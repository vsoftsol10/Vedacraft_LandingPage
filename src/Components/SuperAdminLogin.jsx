// src/Components/SuperAdminLogin.jsx
import React, { useState } from 'react'
import { Lock } from 'lucide-react'
import { supabase } from '../lib/supabaseClient'

const SuperAdminLogin = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setError('')
    if (!email || !password) {
      setError('Please enter both email and password.')
      return
    }

    setLoading(true)

    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (signInError) {
      setLoading(false)
      setError('Invalid credentials.')
      return
    }

    // Confirm this logged-in user is actually an admin
    const { data: adminRow, error: adminCheckError } = await supabase
      .from('admin_users')
      .select('id')
      .eq('id', signInData.user.id)
      .maybeSingle()

    setLoading(false)

    if (adminCheckError || !adminRow) {
      await supabase.auth.signOut() // don't leave them logged in as a non-admin
      setError('This account does not have admin access.')
      return
    }

    onLoginSuccess()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-sm p-8">
        <div className="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center mb-4">
          <Lock size={20} />
        </div>
        <h1 className="text-xl font-bold text-gray-900 mb-1">Admin Login</h1>
        <p className="text-gray-500 text-sm mb-6">Restricted access</p>

        {error && (
          <div className="mb-4 text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:opacity-60 text-gray-900 font-semibold py-2.5 rounded-lg mt-5 transition-colors"
        >
          {loading ? 'Checking...' : 'Login'}
        </button>
      </div>
    </div>
  )
}

export default SuperAdminLogin