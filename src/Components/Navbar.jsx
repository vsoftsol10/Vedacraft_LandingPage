import React, { useState } from 'react'
import { Globe, ChevronDown, LogOut, Menu, X } from 'lucide-react'
import logo from "../assets/logo.png"
import { useLanguage } from '../Context/LanguageContext'
import { useAuth } from '../Context/AuthContext'
import Login from './Login'
import SignUp from './SignUp'

const Navbar = () => {
  const { language, setLanguage, t } = useLanguage()
  const { user, signOut } = useAuth()
  const [authView, setAuthView] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleNavClick = (id) => {
    setMobileMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleSignOut = async () => {
    setMenuOpen(false)
    setMobileMenuOpen(false)
    await signOut()
  }

  const [policyOpen, setPolicyOpen] = useState(false)
const [mobilePolicyOpen, setMobilePolicyOpen] = useState(false)

  

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Account'

  return (
    <>
      <nav className="w-full border-b border-gray-300 px-4 md:px-6 py-3 flex items-center justify-between font-sans relative">
        <img src={logo} alt="Vedacraft logo" className="h-12 md:h-18 w-auto object-contain shrink-0" />

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-8 text-md font-medium text-black">
  {t.nav.links.map(({ id, label }, index) => (
    <li
      key={`${id}-${index}`}
      onClick={() => handleNavClick(id)}
      className="hover:text-gray-900 cursor-pointer transition-colors"
    >
      {label}
    </li>
  ))}

  {/* Policy dropdown */}
  <li className="relative">
    <button
      onClick={() => setPolicyOpen((prev) => !prev)}
      className="flex items-center gap-1 hover:text-gray-900 transition-colors cursor-pointer"
    >
      {t.nav.policy.label}
      <ChevronDown size={14} className={`transition-transform ${policyOpen ? 'rotate-180' : ''}`} />
    </button>

    {policyOpen && (
      <>
        <div className="fixed inset-0 z-10" onClick={() => setPolicyOpen(false)} />
        <div className="absolute left-0 mt-2 w-52 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-20">
          {t.nav.policy.items.map((item) => (
            <a
              key={item.id}
              href={item.path}
              onClick={() => setPolicyOpen(false)}
              className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      </>
    )}
  </li>
</ul>

        {/* Desktop right controls */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center bg-gray-200 rounded-full p-0.5 text-xs font-medium">
            <button
              onClick={() => setLanguage('en')}
              className={`flex items-center gap-1 rounded-full px-3 py-1 transition-colors ${language === 'en' ? 'bg-yellow-400 text-gray-900' : 'text-gray-600'}`}
            >
              <Globe size={12} /> EN
            </button>
            <button
              onClick={() => setLanguage('ta')}
              className={`rounded-full px-3 py-1 transition-colors ${language === 'ta' ? 'bg-yellow-400 text-gray-900' : 'text-gray-600'}`}
            >
              தமிழ்
            </button>
          </div>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className="flex items-center gap-2 bg-gray-900 text-white text-sm font-medium pl-2 pr-3 py-1.5 rounded-full hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <span className="w-6 h-6 rounded-full bg-yellow-400 text-gray-900 flex items-center justify-center text-xs font-bold uppercase">
                  {displayName.charAt(0)}
                </span>
                <span className="max-w-[100px] truncate">{displayName}</span>
                <ChevronDown size={14} className={`transition-transform ${menuOpen ? 'rotate-180' : ''}`} />
              </button>

              {menuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                  <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-20">
                    <div className="px-3 py-2 border-b border-gray-100">
                      <p className="text-xs text-gray-400">Signed in as</p>
                      <p className="text-sm text-gray-800 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <LogOut size={14} /> Log out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button
              onClick={() => setAuthView('login')}
              className="bg-gray-900 text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-gray-800 transition-colors cursor-pointer"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile hamburger button */}
        <button
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-md text-gray-900 hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg z-30 flex flex-col px-4 py-4 gap-4">
            <ul className="flex flex-col gap-3 text-base font-medium text-black">
  {t.nav.links.map(({ id, label }, index) => (
    <li
      key={`${id}-${index}`}
      onClick={() => handleNavClick(id)}
      className="hover:text-gray-900 cursor-pointer transition-colors py-1"
    >
      {label}
    </li>
  ))}
</ul>

{/* Mobile Policy dropdown */}
<div className="border-t border-gray-100 pt-3">
  <button
    onClick={() => setMobilePolicyOpen((prev) => !prev)}
    className="w-full flex items-center justify-between text-base font-medium text-black py-1"
  >
    {t.nav.policy.label}
    <ChevronDown size={16} className={`transition-transform ${mobilePolicyOpen ? 'rotate-180' : ''}`} />
  </button>

  {mobilePolicyOpen && (
    <div className="flex flex-col gap-2 pl-3 pt-2">
      {t.nav.policy.items.map((item) => (
        <a
          key={item.id}
          href={item.path}
          onClick={() => setMobileMenuOpen(false)}
          className="text-sm text-gray-600 hover:text-gray-900 transition-colors py-1"
        >
          {item.label}
        </a>
      ))}
    </div>
  )}
</div>

            <div className="flex items-center bg-gray-200 rounded-full p-0.5 text-xs font-medium w-fit">
              <button
                onClick={() => setLanguage('en')}
                className={`flex items-center gap-1 rounded-full px-3 py-1 transition-colors ${language === 'en' ? 'bg-yellow-400 text-gray-900' : 'text-gray-600'}`}
              >
                <Globe size={12} /> EN
              </button>
              <button
                onClick={() => setLanguage('ta')}
                className={`rounded-full px-3 py-1 transition-colors ${language === 'ta' ? 'bg-yellow-400 text-gray-900' : 'text-gray-600'}`}
              >
                தமிழ்
              </button>
            </div>

            {user ? (
              <div className="flex flex-col gap-2 border-t border-gray-100 pt-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-yellow-400 text-gray-900 flex items-center justify-center text-xs font-bold uppercase">
                    {displayName.charAt(0)}
                  </span>
                  <div>
                    <p className="text-xs text-gray-400">Signed in as</p>
                    <p className="text-sm text-gray-800 truncate">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-gray-800 transition-colors"
                >
                  <LogOut size={14} /> Log out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  setAuthView('login')
                }}
                className="bg-gray-900 text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-gray-800 transition-colors cursor-pointer w-full"
              >
                Login
              </button>
            )}
          </div>
        )}
      </nav>

      <Login isOpen={authView === 'login'} onClose={() => setAuthView(null)} onSwitchToSignUp={() => setAuthView('signup')} />
      <SignUp isOpen={authView === 'signup'} onClose={() => setAuthView(null)} onSwitchToLogin={() => setAuthView('login')} />
    </>
  )
}

export default Navbar