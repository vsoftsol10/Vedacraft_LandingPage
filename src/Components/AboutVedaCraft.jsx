import React from 'react'
import FounderImage from '../assets/Founder.png'
import icon1 from '../assets/icon1.png'
import icon2 from '../assets/icon2.png'
import icon3 from '../assets/icon3.png'
import icon4 from '../assets/icon4.png'
import icon5 from '../assets/icon5.png'
import { useLanguage } from '../Context/LanguageContext'

const icons = [icon1, icon2, icon3, icon4, icon5]

const AboutVedaCraft = () => {
  const { t } = useLanguage()
  const points = t.about.points.map((text, i) => ({ text, icon: icons[i] }))

  return (
    <section id="about" className="w-full bg-white px-8 md:px-14 py-14">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
<div className="relative rounded-2xl overflow-hidden aspect-[4/5] md:aspect-auto md:h-[520px]">
  <img src={FounderImage} alt={t.about.founderName} className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute bottom-5 left-5">
            <p className="text-white text-lg font-semibold">{t.about.founderName}</p>
            <p className="text-white text-sm">{t.about.founderRole}</p>
          </div>
        </div>

        <div>
          <p className="text-green-600 text-sm font-medium mb-2">{t.about.label}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{t.about.heading}</h2>

          <div className="flex flex-col gap-4">
            {points.map((point, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="mt-1 shrink-0 w-5 h-5 flex items-center justify-center">
                  {point.icon ? (
                    <img src={point.icon} alt="" className="w-5 h-5 object-contain" />
                  ) : (
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-600 mt-1.5" />
                  )}
                </span>
                <p className="text-gray-600 text-sm leading-relaxed">{point.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutVedaCraft