import React, { useState, useEffect } from 'react'
import { MapPin, ArrowRight } from 'lucide-react'
import { supabase } from '../lib/supabaseClient'
import { useLanguage } from '../Context/LanguageContext'
import { useAuth } from '../Context/AuthContext'
import RegistrationForm from './RegistrationForm'
import Login from './Login'
import SignUp from './SignUp'

const tagColors = {
  WORKSHOP: 'bg-green-600',
  EXHIBITION: 'bg-green-700',
  'COFFEE MEET': 'bg-amber-500',
  ADVOCACY: 'bg-green-800',
}

const Community = () => {
  const { t } = useLanguage()
  const { user } = useAuth()

  const [members, setMembers] = useState([])
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [authView, setAuthView] = useState(null) // null | 'login' | 'signup'

  const handleJoinCommunityClick = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)

      const [membersRes, eventsRes] = await Promise.all([
        supabase.from('community_members').select('*').order('created_at', { ascending: false }),
        supabase.from('events').select('*').order('created_at', { ascending: false }),
      ])

      if (membersRes.error) setError(membersRes.error.message)
      else setMembers(membersRes.data)

      if (eventsRes.error) setError(eventsRes.error.message)
      else setEvents(eventsRes.data)

      setLoading(false)
    }

    fetchData()
  }, [])

  const handleRegisterClick = (event) => {
    setSelectedEvent(event)
    if (!user) {
      setAuthView('login') // gate: not logged in -> show login first
    } else {
      setIsFormOpen(true) // already logged in -> go straight to form
    }
  }

  // After a successful login/signup, if they were mid-registration, continue to the form
  const handleAuthSuccess = () => {
    setAuthView(null)
    if (selectedEvent) {
      setIsFormOpen(true)
    }
  }

  if (loading) {
    return (
      <section className="w-full bg-white py-14 px-6 md:px-14 text-center text-gray-400 text-sm">
        Loading community...
      </section>
    )
  }

  if (error) {
    return (
      <section className="w-full bg-white py-14 px-6 md:px-14 text-center text-red-500 text-sm">
        Couldn't load community data: {error}
      </section>
    )
  }

  return (
    <section id="community" className="w-full bg-white py-14">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 px-6 md:px-14">
          <p className="text-xs font-semibold tracking-widest text-green-600 uppercase mb-2">
            {t.community.ourCommunityLabel}
          </p>
        </div>

        <div className="mb-20 pl-6 md:pl-14 flex justify-center">
          {members.length > 0 ? (
            <div className="flex gap-5 overflow-x-auto pb-4 pr-6 md:pr-14">
              {members.map((m) => (
                <div key={m.id} className="flex flex-col w-[180px] md:w-[210px] shrink-0">
                  <div className="rounded-xl overflow-hidden bg-teal-100 aspect-square w-full">
                    <img
                      src={m.image_url || 'https://placehold.co/210x210'}
                      alt={m.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="font-semibold text-gray-800 text-sm mt-2 text-center">{m.name}</p>
                  <p className="text-gray-500 text-xs text-center">{m.craft}</p>
                  <span className="flex items-center justify-center gap-1 text-gray-400 text-xs mt-0.5">
                    <MapPin size={11} /> {m.location}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-green-200 bg-green-50 p-8 text-center max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">The community is opening soon</h3>
              <p className="text-sm text-gray-600 mb-4">
                We are building this space with care. Join the community today and be the first to know when new members and conversations begin.
              </p>
              <button
                onClick={handleJoinCommunityClick}
                className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
              >
                Join Community
              </button>
            </div>
          )}
        </div>

        <div className="text-center mb-8 px-6 md:px-14">
          <p className="text-xs font-semibold tracking-widest text-green-600 uppercase mb-2">
            {t.community.eventsLabel}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            {t.community.eventsHeadingPart1}{' '}
            <span className="italic text-green-500 font-serif">{t.community.eventsHeadingPart2}</span>
          </h2>
        </div>

        <div className="pl-6 md:pl-14 flex justify-center">
          {events.length > 0 ? (
            <div className="flex gap-5 overflow-x-auto pb-4 pr-6 md:pr-14">
              {events.map((e) => (
                <div
                  key={e.id}
                  className="flex flex-col w-[220px] shrink-0 rounded-xl border border-gray-100 shadow-sm overflow-hidden"
                >
                  <div className="relative aspect-[4/3] bg-teal-50">
                    <img
                      src={e.image_url || 'https://placehold.co/400x300'}
                      alt={e.title}
                      className="w-full h-full object-cover"
                    />
                    <span
                      className={`absolute top-2 left-2 text-white text-[10px] font-bold px-2 py-0.5 rounded ${
                        tagColors[e.tag] ?? 'bg-green-600'
                      }`}
                    >
                      {e.tag}
                    </span>
                  </div>

                  <div className="p-3 flex flex-col gap-2">
                    <p className="font-bold text-gray-800 text-sm">{e.title}</p>
                    <div className="text-xs text-gray-500 flex flex-col gap-0.5">
                      <span>{e.date}</span>
                      <span className="flex items-center gap-1">
                        <MapPin size={11} /> {e.location}
                      </span>
                    </div>
                    <button
                      onClick={() => handleRegisterClick(e)}
                      className="mt-1 flex items-center justify-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 text-xs font-semibold py-2 rounded-lg transition-colors"
                    >
                      {t.community.registerButton} <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-yellow-200 bg-yellow-50 p-8 text-center max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Events are coming soon</h3>
              <p className="text-sm text-gray-600">We’ll let you know soon about upcoming workshops, meetups, and community gatherings.</p>
            </div>
          )}
        </div>
      </div>

      <RegistrationForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        event={selectedEvent}
      />

      <Login
        isOpen={authView === 'login'}
        onClose={() => setAuthView(null)}
        onSwitchToSignUp={() => setAuthView('signup')}
        onSuccess={handleAuthSuccess}
      />
      <SignUp
        isOpen={authView === 'signup'}
        onClose={() => setAuthView(null)}
        onSwitchToLogin={() => setAuthView('login')}
        onSuccess={handleAuthSuccess}
      />
    </section>
  )
}

export default Community