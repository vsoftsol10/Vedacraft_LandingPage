import React, { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import joinBg from '../assets/FromBg.png'
import { useLanguage } from '../Context/LanguageContext'
import { supabase } from '../lib/supabaseClient'
import { sendAdminNotificationEmail } from '../lib/emailjsClient'

const ADMIN_NOTIFY_EMAIL = 'vedaconnecttvl@gmail.com'

const Form = () => {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({ name: '', email: '', businessType: '', phone: '', city: '' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    if (PUBLIC_KEY) {
      emailjs.init(PUBLIC_KEY)
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    setError('')

    if (!formData.name || !formData.email) {
      setError('Please fill in at least your name and email.')
      return
    }

    setSubmitting(true)

    // 1. Save the join request
    const { data: inserted, error: insertError } = await supabase
      .from('join_requests')
      .insert({
        name: formData.name,
        email: formData.email,
        business_type: formData.businessType,
        phone: formData.phone,
        city: formData.city,
      })
      .select()
      .single()

    if (insertError) {
      setSubmitting(false)
      setError(insertError.message)
      return
    }

    // 2. Notify admin by email (best-effort — don't block success on this)
    try {
      const templateParams = {
        // include several common keys so the EmailJS template receives the recipient
        to_email: ADMIN_NOTIFY_EMAIL,
        admin_email: ADMIN_NOTIFY_EMAIL,
        recipient_email: ADMIN_NOTIFY_EMAIL,
        to: ADMIN_NOTIFY_EMAIL,
        to_name: 'VedaCraft Admin',
        requester_name: formData.name,
        requester_email: formData.email,
        requester_phone: formData.phone || '—',
        requester_city: formData.city || '—',
        requester_business_type: formData.businessType || '—',
      }

      console.log('Sending admin email with params:', templateParams)
      await sendAdminNotificationEmail(templateParams)
    } catch (emailErr) {
      // Non-fatal — request is already saved, admin can still see it in the dashboard
      console.error('Admin notification email failed:', emailErr)
    }

    setSubmitting(false)
    setSuccess(true)
    setFormData({ name: '', email: '', businessType: '', phone: '', city: '' })
  }

  const fields = [
    { name: 'name', type: 'text', span: true },
    { name: 'email', type: 'email' },
    { name: 'businessType', type: 'text' },
    { name: 'phone', type: 'tel' },
    { name: 'city', type: 'text' },
  ]

  return (
    <section
      id="contact"
      className="relative w-full min-h-[420px] md:min-h-[460px] flex items-center px-6 md:px-14 py-14 rounded-2xl overflow-hidden"
      style={{ backgroundImage: `url(${joinBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute inset-0 bg-black/10" />

      <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white leading-snug mb-4">{t.form.heading}</h2>
          <p className="text-white/90 text-sm md:text-base leading-relaxed">{t.form.description}</p>
        </div>

        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-6 md:p-8">
          {success ? (
            <div className="text-center py-6">
              <div className="w-12 h-12 rounded-full bg-white/90 text-green-600 flex items-center justify-center mx-auto mb-3 text-2xl">
                ✓
              </div>
              <p className="text-white font-semibold mb-1">Request submitted!</p>
              <p className="text-white/80 text-sm">
                We'll email you once your request is reviewed and approved.
              </p>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-4 text-xs text-white bg-red-500/80 rounded-lg px-3 py-2">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {fields.map((field) => (
                  <div key={field.name} className={field.span ? 'sm:col-span-2' : ''}>
                    <label className="block text-white text-xs font-medium mb-1">
                      {t.form.labels[field.name]}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      placeholder={t.form.placeholders[field.name]}
                      className="w-full px-3 py-2 rounded-md bg-white/80 text-sm text-gray-800 placeholder-gray-500 outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>
                ))}
              </div>

              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="mt-5 bg-yellow-400 hover:bg-yellow-500 disabled:opacity-60 text-gray-900 font-medium px-8 py-2.5 rounded-md w-full sm:w-auto transition-colors"
              >
                {submitting ? 'Submitting...' : t.form.joinButton}
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default Form