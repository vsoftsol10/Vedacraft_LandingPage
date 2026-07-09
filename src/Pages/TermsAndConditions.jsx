import React, { useState, useEffect } from 'react'
import {
  ShieldCheck,
  Sprout,
  UserCheck,
  Handshake,
  Briefcase,
  CalendarDays,
  Copyright,
  ShieldOff,
  Gavel,
  Mail,
} from 'lucide-react'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'

const sections = [
  { id: 'about', label: 'About Veda Crafts', icon: Sprout },
  { id: 'membership', label: 'Membership', icon: UserCheck },
  { id: 'community-rules', label: 'Community Rules', icon: Handshake },
  { id: 'business-responsibility', label: 'Business Responsibility', icon: Briefcase },
  { id: 'networking-events', label: 'Networking Events', icon: CalendarDays },
  { id: 'intellectual-property', label: 'Intellectual Property', icon: Copyright },
  { id: 'limitation-of-liability', label: 'Limitation of Liability', icon: ShieldOff },
  { id: 'jurisdiction', label: 'Jurisdiction', icon: Gavel },
]

const TermsAndConditions = () => {
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
            Terms &amp; Conditions
          </h1>
          <p className="mt-4 text-base text-gray-500 max-w-2xl leading-relaxed">
            These terms govern your membership and participation in the Veda Crafts Community.
            By joining, you agree to the terms outlined below.
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
            Please read these terms carefully. They set out how the community works, what is
            expected of members, and how disputes are handled.
          </p>

          <div className="space-y-14">
            <Section id="about" icon={Sprout} title="About Veda Crafts">
              <p className="text-gray-600 leading-relaxed text-[15px]">
                Veda Crafts Community is a business networking forum for women entrepreneurs in
                the eco-friendly, handmade, and natural product sectors.
              </p>
            </Section>

            <Section id="membership" icon={UserCheck} title="Membership">
              <p className="text-gray-600 leading-relaxed text-[15px]">
                Membership approval is subject to verification.
              </p>
            </Section>

            <Section id="community-rules" icon={Handshake} title="Community Rules">
              <p className="text-gray-600 leading-relaxed text-[15px]">
                Members must maintain respectful conduct and provide genuine business information.
              </p>
            </Section>

            <Section id="business-responsibility" icon={Briefcase} title="Business Responsibility">
              <p className="text-gray-600 leading-relaxed mb-4 text-[15px]">
                Each member is solely responsible for their own:
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {['Products', 'Pricing', 'Quality', 'Taxes', 'Legal compliance', 'Customer service'].map((item) => (
                  <div
                    key={item}
                    className="rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-700 bg-gray-50/60"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </Section>

            <Section id="networking-events" icon={CalendarDays} title="Networking Events">
              <p className="text-gray-600 leading-relaxed text-[15px]">
                Participation in networking events is voluntary and schedules may change.
              </p>
            </Section>

            <Section id="intellectual-property" icon={Copyright} title="Intellectual Property">
              <p className="text-gray-600 leading-relaxed text-[15px]">
                Website content and branding belong to Veda Crafts.
              </p>
            </Section>

            <Section id="limitation-of-liability" icon={ShieldOff} title="Limitation of Liability">
              <p className="text-gray-600 leading-relaxed text-[15px]">
                Veda Crafts is not responsible for business transactions or disputes between
                members.
              </p>
            </Section>

            <Section id="jurisdiction" icon={Gavel} title="Jurisdiction">
              <p className="text-gray-600 leading-relaxed text-[15px]">
                These terms are governed by the laws of India, under the jurisdiction of
                Tirunelveli, Tamil Nadu.
              </p>
            </Section>
          </div>

          <div className="mt-16 pt-8 border-t border-gray-200">
            <a
              href="mailto:info@vedacraftscommunity.in"
              className="inline-flex items-center gap-3 rounded-xl border border-gray-200 px-5 py-4 text-sm text-gray-800 hover:bg-gray-50 transition-colors"
            >
              <Mail size={16} className="text-gray-400" />
              info@vedacraftscommunity.in
            </a>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200 text-xs text-gray-400">
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

export default TermsAndConditions