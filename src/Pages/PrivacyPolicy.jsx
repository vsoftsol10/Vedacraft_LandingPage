import React, { useState, useEffect } from 'react'
import { ShieldCheck, Database, Layers, Share2, Cookie, UserCog, Mail, Globe, ArrowUpRight } from 'lucide-react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

const sections = [
  { id: 'information-we-collect', label: 'Information We Collect', icon: Database },
  { id: 'how-we-use-information', label: 'How We Use Information', icon: Layers },
  { id: 'information-sharing', label: 'Information Sharing', icon: Share2 },
  { id: 'cookies', label: 'Cookies', icon: Cookie },
  { id: 'your-rights', label: 'Your Rights', icon: UserCog },
  { id: 'contact', label: 'Contact', icon: Mail },
]

const PrivacyPolicy = () => {
  const [activeId, setActiveId] = useState(sections[0].id)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '-15% 0px -70% 0px' }
    )
    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* Header */}
      <Navbar/>
      <header className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 md:px-10 pt-14 pb-10 md:pt-20 md:pb-14">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center">
              <ShieldCheck size={16} className="text-yellow-400" />
            </span>
            <span className="text-sm font-semibold tracking-wide text-gray-500 uppercase">Veda Crafts Community</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            Privacy Policy
          </h1>
          <p className="mt-4 text-base text-gray-500 max-w-2xl leading-relaxed">
            This policy explains what information Veda Crafts Community collects, how it is used,
            and the choices available to you.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-yellow-50 border border-yellow-200 px-4 py-1.5 text-xs font-medium text-gray-700">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
            Effective Date: July 09, 2026
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 md:px-10 py-12 md:py-16 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-10 md:gap-16">
        {/* Sticky sidebar nav */}
        <nav className="hidden md:block">
          <div className="sticky top-12">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-4">On this page</p>
            <ul className="space-y-1 border-l border-gray-200">
              {sections.map(({ id, label, icon: Icon }) => (
                <li key={id}>
                  <button
                    onClick={() => scrollTo(id)}
                    className={`w-full flex items-center gap-2 -ml-px pl-4 py-2 text-sm text-left border-l-2 transition-colors ${
                      activeId === id
                        ? 'border-yellow-400 text-gray-900 font-medium'
                        : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
                    }`}
                  >
                    <Icon size={14} className="shrink-0" />
                    <span>{label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Content */}
        <div className="min-w-0">
          <p className="text-gray-600 leading-relaxed mb-14 text-[15px]">
            Veda Crafts Community respects your privacy and protects the information you share with us.
            This policy describes our practices in plain terms so you always know where your information
            goes and why.
          </p>

          <div className="space-y-14">
            <Section id="information-we-collect" icon={Database} title="Information We Collect">
              <p className="text-gray-600 leading-relaxed mb-4 text-[15px]">
                We collect the following categories of information to operate the Veda Crafts Community platform:
              </p>
              <ul className="space-y-2.5">
                {[
                  'Name, mobile number, and email address',
                  'Business details and address',
                  'Profile information and product details',
                  'Payment information, processed by secure third-party gateways',
                  'Website analytics',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] text-gray-700">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </Section>

            <Section id="how-we-use-information" icon={Layers} title="How We Use Information">
              <p className="text-gray-600 leading-relaxed mb-4 text-[15px]">
                Information collected is used strictly to support your participation in the community:
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  'Membership registration',
                  'Networking opportunities',
                  'Event communication',
                  'Business directory listing (business information only)',
                  'Customer support',
                  'Website improvement',
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-700 bg-gray-50/60"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </Section>

            <Section id="information-sharing" icon={Share2} title="Information Sharing">
              <p className="text-gray-600 leading-relaxed text-[15px]">
                We do not sell personal data. Information may be shared only with payment providers,
                technology partners, event organizers, or government authorities where legally required.
              </p>
            </Section>

            <Section id="cookies" icon={Cookie} title="Cookies">
              <p className="text-gray-600 leading-relaxed text-[15px]">
                We use cookies to improve website functionality and analytics.
              </p>
            </Section>

            <Section id="your-rights" icon={UserCog} title="Your Rights">
              <p className="text-gray-600 leading-relaxed text-[15px]">
                You may request correction, update, or deletion of your information by contacting us
                using the details below.
              </p>
            </Section>

            <Section id="contact" icon={Mail} title="Contact">
              <p className="text-gray-600 leading-relaxed mb-5 text-[15px]">
                For any privacy-related questions or requests, reach out to us directly.
              </p>
              <div className="rounded-xl border border-gray-200 divide-y divide-gray-100 max-w-md">
                <a
                  href="mailto:info@vedacraftscommunity.in"
                  className="flex items-center justify-between gap-3 px-5 py-4 hover:bg-gray-50 transition-colors group"
                >
                  <span className="flex items-center gap-3 text-sm text-gray-800">
                    <Mail size={16} className="text-gray-400" />
                    info@vedacraftscommunity.in
                  </span>
                  <ArrowUpRight size={15} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
                </a>
                <a
                  href="https://www.vedacraftscommunity.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 px-5 py-4 hover:bg-gray-50 transition-colors group"
                >
                  <span className="flex items-center gap-3 text-sm text-gray-800">
                    <Globe size={16} className="text-gray-400" />
                    www.vedacraftscommunity.in
                  </span>
                  <ArrowUpRight size={15} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
                </a>
              </div>
            </Section>
          </div>

          <div className="mt-16 pt-8 border-t border-gray-200 text-xs text-gray-400">
            &copy; {new Date().getFullYear()} Veda Crafts Community. All rights reserved.
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

const Section = ({ id, icon: Icon, title, children }) => (
  <section id={id} className="scroll-mt-24">
    <div className="flex items-center gap-2.5 mb-4">
      <span className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center shrink-0">
        <Icon size={15} className="text-yellow-400" />
      </span>
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
    </div>
    {children}
  </section>
)

export default PrivacyPolicy