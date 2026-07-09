import React from 'react'
import { Store, Leaf, Scissors, ShoppingBag, UserCircle2, Users, TrendingUp } from 'lucide-react'
import { useLanguage } from '../Context/LanguageContext'

const categoryIcons = [Store, Leaf, Scissors, ShoppingBag]
const stepIcons = [UserCircle2, Users, TrendingUp]

const WhoCanJoin = () => {
  const { t } = useLanguage()
  const categories = t.whoCanJoin.categories.map((c, i) => ({ ...c, icon: categoryIcons[i] }))
  const steps = t.whoCanJoin.steps.map((s, i) => ({ ...s, number: `${i + 1}.`, icon: stepIcons[i] }))

  return (
    <section id="who-can-join" className="w-full bg-white py-14 px-6 md:px-14">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-xs font-semibold tracking-widest text-green-600 uppercase mb-2">
            {t.whoCanJoin.label}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t.whoCanJoin.heading}</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {categories.map(({ icon: Icon, title, desc }, i) => (
            <div key={i} className="flex flex-col items-center text-center border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
              <div className="bg-green-50 text-green-600 rounded-full p-3 mb-3">
                <Icon size={22} />
              </div>
              <p className="font-semibold text-gray-800 text-sm mb-1">{title}</p>
              <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mb-8">
          <p className="text-xs font-semibold tracking-widest text-green-600 uppercase mb-2">
            {t.whoCanJoin.howLabel}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t.whoCanJoin.howHeading}</h2>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-0">
          {steps.map(({ number, label, icon: Icon, desc }, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center text-center border border-gray-200 rounded-xl p-6 w-full md:w-56">
                <div className="bg-green-50 text-green-600 rounded-full p-3 mb-3">
                  <Icon size={22} />
                </div>
                <p className="font-semibold text-gray-800 text-sm mb-1">
                  {number} {label}
                </p>
                <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
              </div>

              {index < steps.length - 1 && (
                <div className="text-gray-300 text-2xl px-3 hidden md:block">─────→</div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhoCanJoin