import React from 'react'
import { Phone, Mail } from 'lucide-react'
import logo from '../assets/logo.png'
import { useLanguage } from '../Context/LanguageContext'

const socialLinks = [
  { label: 'Instagram', href: '#', svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" /></svg> },
  { label: 'Facebook', href: '#', svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg> },
  { label: 'Youtube', href: '#', svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></svg> },
]

const Footer = () => {
  const { t } = useLanguage()

  const handleFooterNavClick = (id) => (e) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <footer id="contact" className="w-full bg-black px-6 md:px-14 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[1.2fr_0.85fr_0.85fr_0.95fr_auto] gap-10 items-start">
        <div>
          <div className="bg-white inline-block rounded-md px-3 py-2 mb-4">
            <img src={logo} alt="VedaCraft" className="h-18 object-contain" />
          </div>
          <p className="text-gray-300 text-sm leading-relaxed mb-4 max-w-xs">{t.footer.tagline}</p>
          <div className="flex items-center gap-2 text-gray-300 text-sm mb-2">
            <Phone size={14} />
            <span>{t.footer.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300 text-sm mb-2">
            <Mail size={14} />
            <span>{t.footer.email}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300 text-sm">
            <Mail size={14} />
            <span>{t.footer.email1}</span>
          </div>
        </div>

        <div>
          <p className="text-yellow-400 font-semibold text-sm mb-4">{t.footer.exploreLabel}</p>
          <ul className="flex flex-col gap-3">
            {t.footer.exploreLinks.map(({ id, label }, index) => (
              <li key={`${id}-${index}`}>
                <a
                  href="#"
                  onClick={handleFooterNavClick(id)}
                  className="text-white text-sm font-medium hover:text-yellow-400 transition-colors"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-yellow-400 font-semibold text-sm mb-4">{t.footer.contactLabel}</p>
          <ul className="flex flex-col gap-3">
            {t.footer.contactLinks.map(({ id, label }, index) => (
              <li key={`${id}-${index}`}>
                <a
                  href="#"
                  onClick={handleFooterNavClick(id)}
                  className="text-white text-sm font-medium hover:text-yellow-400 transition-colors"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Policy links — reuses the same translation data as the Navbar's Policy dropdown */}
        <div>
          <p className="text-yellow-400 font-semibold text-sm mb-4">{t.nav.policy.label}</p>
          <ul className="flex flex-col gap-3">
            {t.nav.policy.items.map(({ id, label, path }) => (
              <li key={id}>
                <a
                  href={path}
                  className="text-white text-sm font-medium hover:text-yellow-400 transition-colors"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* <div className="flex gap-3 md:justify-self-end">
          {socialLinks.map((social) => (
            <a key={social.label} href={social.href} aria-label={social.label} className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white/10 transition-colors">
              {social.svg}
            </a>
          ))}
        </div> */}
      </div>

      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-white/10 flex flex-col-reverse md:flex-row items-center justify-between gap-4">
        <p className="text-gray-400 text-xs">
          &copy; {new Date().getFullYear()} Veda Crafts Community. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer