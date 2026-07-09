import React, { useState, useEffect } from 'react'
import { ShieldCheck, RotateCcw, AlertTriangle, Cookie, Users, ClipboardList, Mail } from 'lucide-react'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'

const sections = [
  { id: 'refund-policy', label: 'Refund Policy', icon: RotateCcw },
  { id: 'disclaimer', label: 'Disclaimer', icon: AlertTriangle },
  { id: 'cookie-policy', label: 'Cookie Policy', icon: Cookie },
  { id: 'code-of-conduct', label: 'Code of Conduct', icon: Users },
  { id: 'membership-guidelines', label: 'Membership Guidelines', icon: ClipboardList },
  { id: 'contact', label: 'Contact', icon: Mail },
]

const RefundPolicy = () => {
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
        <Navbar/>
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 md:px-10 pt-14 pb-10 md:pt-20 md:pb-14">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center">
              <ShieldCheck size={16} className="text-yellow-400" />
            </span>
            <span className="text-sm font-semibold tracking-wide text-gray-500 uppercase">Veda Crafts Community</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            Refund Policy
          </h1>
          <p className="mt-4 text-base text-gray-500 max-w-2xl leading-relaxed">
            This page covers refunds, member responsibilities, cookies, and the conduct we expect
            from everyone in the Veda Crafts community.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-yellow-50 border border-yellow-200 px-4 py-1.5 text-xs font-medium text-gray-700">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
            Effective Date: July 09, 2026
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 md:px-10 py-12 md:py-16 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-10 md:gap-16">
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
            Please read this policy carefully before making a payment or participating in Veda Crafts
            Community events. It outlines when refunds apply, how members are expected to act, and how
            we use cookies on this website.
          </p>

          <div className="space-y-14">
            <Section id="refund-policy" icon={RotateCcw} title="Refund Policy">
              <ul className="space-y-4">
                <RuleItem
                  title="Membership fees"
                  desc="Generally non-refundable once payment is made."
                />
                <RuleItem
                  title="Event cancellations"
                  desc="If Veda Crafts cancels an event, participants may receive a refund or a transfer to a future event."
                />
                <RuleItem
                  title="Duplicate payments"
                  desc="Refunded after verification, if caused by a technical issue."
                />
                <RuleItem
                  title="Processing time"
                  desc="Approved refunds are processed within 7–10 business days."
                />
              </ul>
            </Section>

            <Section id="disclaimer" icon={AlertTriangle} title="Disclaimer">
              <p className="text-gray-600 leading-relaxed text-[15px]">
                Veda Crafts provides networking opportunities and does not manufacture, certify,
                endorse, or guarantee member products or services. Members are solely responsible
                for their businesses and transactions.
              </p>
            </Section>

            <Section id="cookie-policy" icon={Cookie} title="Cookie Policy">
              <p className="text-gray-600 leading-relaxed text-[15px]">
                Cookies are used to improve user experience, remember preferences, and analyze
                website traffic. Users may disable cookies through their browser settings.
              </p>
            </Section>

            <Section id="code-of-conduct" icon={Users} title="Code of Conduct">
              <p className="text-gray-600 leading-relaxed mb-4 text-[15px]">
                Every member is expected to:
              </p>
              <ul className="space-y-2.5">
                {[
                  'Act professionally and treat everyone with respect',
                  'Avoid misleading claims',
                  'Avoid spam, harassment, or unlawful activities',
                  'Support a positive business community',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] text-gray-700">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </Section>

            <Section id="membership-guidelines" icon={ClipboardList} title="Membership Guidelines">
              <p className="text-gray-600 leading-relaxed mb-4 text-[15px]">
                Members are expected to:
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  'Maintain accurate business information',
                  'Actively participate in networking events',
                  'Collaborate ethically',
                  'Represent their businesses honestly',
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

            <Section id="contact" icon={Mail} title="Contact">
              <p className="text-gray-600 leading-relaxed mb-5 text-[15px]">
                For refund requests or questions about this policy, reach out to us directly.
              </p>
              <a
                href="mailto:info@vedacraftscommunity.in"
                className="inline-flex items-center gap-3 rounded-xl border border-gray-200 px-5 py-4 text-sm text-gray-800 hover:bg-gray-50 transition-colors max-w-md"
              >
                <Mail size={16} className="text-gray-400" />
                info@vedacraftscommunity.in
              </a>
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

const RuleItem = ({ title, desc }) => (
  <li className="flex gap-4 rounded-lg border border-gray-200 px-4 py-3.5 bg-gray-50/60">
    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />
    <div>
      <p className="text-sm font-medium text-gray-900">{title}</p>
      <p className="text-sm text-gray-600 mt-0.5 leading-relaxed">{desc}</p>
    </div>
  </li>
)

export default RefundPolicy