import React, { useState } from 'react'
import { X, Eye, EyeOff } from 'lucide-react'
import { supabase } from '../lib/supabaseClient'

const Login = ({ isOpen, onClose, onSwitchToSignUp, onSuccess }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleLogin = async () => {
    setError('')

    if (!formData.email || !formData.password) {
      setError('Please enter your email and password.')
      return
    }

    setLoading(true)
    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    })
    setLoading(false)

    if (loginError) {
      setError(loginError.message)
      return
    }

    onSuccess?.(data.user)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <h2 className="text-xl font-bold text-gray-900 mb-1">Welcome back!</h2>
        <p className="text-gray-500 text-sm mb-6">Log in to continue exploring amazing events</p>

        {error && (
          <div className="mb-4 text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 text-xs font-medium mb-1">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@gmail.com"
            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div className="mb-2">
          <div className="flex items-center justify-between mb-1">
            <label className="block text-gray-700 text-xs font-medium">Password</label>
            <a href="#" className="text-xs text-yellow-600 hover:underline">Forgot Password?</a>
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-400 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:opacity-60 disabled:cursor-not-allowed text-gray-900 font-semibold py-2.5 rounded-lg mt-4 transition-colors"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className="text-center text-xs text-gray-500 mt-4">
          Don't have an account?{' '}
          <button onClick={onSwitchToSignUp} className="text-yellow-600 font-medium hover:underline">
            Sign up
          </button>
        </p>
      </div>
    </div>
  )
}

export default Login