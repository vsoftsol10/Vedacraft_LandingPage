import emailjs from '@emailjs/browser'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
const ADMIN_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_ADMIN_TEMPLATE_ID
const APPROVAL_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_APPROVAL_TEMPLATE_ID
const ADMIN_ADDRESS = import.meta.env.VITE_EMAILJS_ADMIN_EMAIL

const ensureConfig = () => {
  if (!SERVICE_ID || !PUBLIC_KEY) {
    throw new Error(
      'Missing EmailJS configuration. Add VITE_EMAILJS_SERVICE_ID and VITE_EMAILJS_PUBLIC_KEY to your .env file.'
    )
  }
}

export const sendEmailJS = async (templateId, templateParams) => {
  ensureConfig()
  // Debug: log what we're about to send (avoid logging sensitive keys)
  try {
    console.debug('EmailJS send:', { serviceId: SERVICE_ID, templateId, templateParams })
    const result = await emailjs.send(SERVICE_ID, templateId, templateParams, PUBLIC_KEY)
    console.debug('EmailJS send result:', result)
    return result
  } catch (err) {
    // EmailJS errors often include a `text` property and a `status`.
    console.error('EmailJS send error:', err)
    if (err && err.text) console.error('EmailJS response text:', err.text)
    throw err
  }
}

export const sendAdminNotificationEmail = async (templateParams) => {
  if (!ADMIN_TEMPLATE_ID) {
    throw new Error('Missing VITE_EMAILJS_ADMIN_TEMPLATE_ID in your .env file.')
  }

  const params = templateParams || {}

  // Accept several common recipient keys used in templates
  const recipientKeys = ['to_email', 'admin_email', 'recipient_email', 'to']
  const hasRecipient = recipientKeys.some((k) => Boolean(params[k]))

  if (!hasRecipient) {
    if (ADMIN_ADDRESS) {
      params.to_email = ADMIN_ADDRESS
      params.to = ADMIN_ADDRESS
    } else {
      throw new Error(
        'No recipient specified for admin notification. Provide `to_email` in templateParams or set VITE_EMAILJS_ADMIN_EMAIL in your .env.'
      )
    }
  }

  return sendEmailJS(ADMIN_TEMPLATE_ID, params)
}

export const sendApprovalEmail = async (templateParams) => {
  if (!APPROVAL_TEMPLATE_ID) {
    throw new Error('Missing VITE_EMAILJS_APPROVAL_TEMPLATE_ID in your .env file.')
  }

  return sendEmailJS(APPROVAL_TEMPLATE_ID, templateParams)
}
