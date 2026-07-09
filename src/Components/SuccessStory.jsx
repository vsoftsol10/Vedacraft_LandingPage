import React, { useState } from 'react'
import { User } from 'lucide-react'
import { useLanguage } from '../Context/LanguageContext'

const SuccessStory = () => {
  const { t } = useLanguage()
  const [active, setActive] = useState(0)
  const testimonials = t.successStory.testimonials

  return (
    <section id="success-stories" className="w-full py-14 px-6 md:px-14">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold tracking-widest text-green-600 uppercase mb-2">
            {t.successStory.label}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t.successStory.heading}</h2>
        </div>

        <div className="hidden md:grid grid-cols-3 gap-6">
          {testimonials.map((tItem, i) => (
            <TestimonialCard key={i} {...tItem} />
          ))}
        </div>

        <div className="md:hidden">
          <TestimonialCard {...testimonials[active]} />
          <div className="flex justify-center gap-2 mt-5">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-2 rounded-full transition-all ${
                  i === active ? 'w-6 bg-green-600' : 'w-2 bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const TestimonialCard = ({ quote, name, role }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col justify-between gap-6 border border-gray-100">
    <p className="text-gray-700 text-sm leading-relaxed">
      <span className="text-green-500 text-2xl font-serif leading-none mr-1">"</span>
      {quote}
      <span className="text-green-500 text-2xl font-serif leading-none ml-1">"</span>
    </p>
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
        <User size={20} className="text-teal-600" />
      </div>
      <div>
        <p className="font-semibold text-gray-800 text-sm">{name}</p>
        <p className="text-gray-400 text-xs">{role}</p>
      </div>
    </div>
  </div>
)

export default SuccessStory