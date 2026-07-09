import React, { useState, useEffect } from 'react'
import { X, Calendar, MapPin, Clock } from 'lucide-react'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../Context/AuthContext'

const RegistrationForm = ({ isOpen, onClose, event }) => {
  const { user } = useAuth()

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    district: '',
    businessCategory: '',
    businessName: '',
    agreed: false,
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  // Reset form each time it opens for a new event
  useEffect(() => {
    if (isOpen) {
      setFormData({
        fullName: '',
        email: user?.email ?? '',
        mobile: '',
        district: '',
        businessCategory: '',
        businessName: '',
        agreed: false,
      })
      setError('')
      setSuccess(false)
    }
  }, [isOpen, event, user])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleRegister = async () => {
    setError('')

    if (!user) {
      setError('You must be logged in to register.')
      return
    }
    if (!event) {
      setError('No event selected.')
      return
    }
    if (!formData.fullName || !formData.email || !formData.mobile) {
      setError('Please fill in your name, email, and mobile number.')
      return
    }
    if (!formData.agreed) {
      setError('Please agree to the Terms & Conditions to continue.')
      return
    }

    setLoading(true)
    const { error: insertError } = await supabase.from('registrations').insert({
      user_id: user.id,
      event_id: event.id,
      name: formData.fullName,
      email: formData.email,
      phone: formData.mobile,
      district: formData.district,
      business_category: formData.businessCategory,
      business_name: formData.businessName,
      agreed_to_terms: formData.agreed,
    })
    setLoading(false)

    if (insertError) {
      setError(insertError.message)
      return
    }

    setSuccess(true)
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Slide-in panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl transition-transform duration-300 ease-in-out overflow-y-auto scrollbar-hide ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-1">
            <h2 className="text-lg font-bold text-gray-900">Register for Event</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
          <p className="text-gray-500 text-sm mb-5">Fill the details below to confirm your register</p>

          {/* Event card */}
          {event && (
            <div className="flex gap-3 bg-gray-50 rounded-xl p-3 mb-6">
              <img
                src={event.image_url || 'https://placehold.co/64x64'}
                alt={event.title}
                className="w-16 h-16 rounded-lg object-cover shrink-0"
              />
              <div>
                <p className="font-semibold text-gray-800 text-sm mb-1">{event.title}</p>
                <div className="text-xs text-gray-500 flex flex-col gap-0.5">
                  <span className="flex items-center gap-1">
                    <Calendar size={11} /> {event.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={11} /> {event.location}
                  </span>
                  {event.time && (
                    <span className="flex items-center gap-1">
                      <Clock size={11} /> {event.time}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {success ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-3 text-2xl">
                ✓
              </div>
              <p className="font-semibold text-gray-900 mb-1">You're registered!</p>
              <p className="text-gray-500 text-sm mb-5">
                We've saved your registration for {event?.title}.
              </p>
              <button
                onClick={onClose}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2.5 rounded-lg transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-4 text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                  {error}
                </div>
              )}

              <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">
                Your Details
              </p>

              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-gray-700 text-xs font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-xs font-medium mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-xs font-medium mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Enter your mobile number"
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-xs font-medium mb-1">District</label>
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    placeholder="Enter your district"
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-xs font-medium mb-1">Business Category</label>
                  <input
                    type="text"
                    name="businessCategory"
                    value={formData.businessCategory}
                    onChange={handleChange}
                    placeholder="Enter your business category e.g., Handloom Weaving"
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-xs font-medium mb-1">
                    Business Name (Optional)
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder="Enter your business name"
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
              </div>

              {/* Terms checkbox */}
              <label className="flex items-start gap-2 mt-4 cursor-pointer">
                <input
                  type="checkbox"
                  name="agreed"
                  checked={formData.agreed}
                  onChange={handleChange}
                  className="mt-0.5 accent-yellow-400"
                />
                <span className="text-xs text-gray-600">
                  I agree to the Terms & conditions and Privacy Policy
                </span>
              </label>

              {/* Register button */}
              <button
                onClick={handleRegister}
                disabled={!formData.agreed || loading}
                className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 font-semibold py-2.5 rounded-lg mt-5 transition-colors"
              >
                {loading ? 'Registering...' : 'Register'}
              </button>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default RegistrationForm