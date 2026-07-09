import React, { useState, useEffect } from 'react'
import { ArrowRight, Users, BookOpen, TrendingUp } from 'lucide-react'
import carousel1 from '../assets/carousel1.png'
import carousel2 from '../assets/carousel2.png'
import heroimage from '../assets/hero1.png'
import heroimage2 from '../assets/hero2.png'
import { useLanguage } from '../Context/LanguageContext'

const featureIcons = [Users, BookOpen, TrendingUp]

const Hero = () => {
  const { t } = useLanguage()
  const [activeSlide, setActiveSlide] = useState(0)

  const handleJoinVedacraft = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleExploreCommunity = () => {
    document.getElementById('community')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const slides = [
    {
      type: 'intro',
      background: carousel1,
      image: heroimage,
      heading: (
        <>
          {t.hero.slide1.heading[0]}
          <br />
          {t.hero.slide1.heading[1]}
        </>
      ),
      description: t.hero.slide1.description,
      buttonText: t.hero.slide1.button,
         onButtonClick: handleJoinVedacraft,
    },
    {
      type: 'features',
      background: carousel2,
      image: heroimage2,
      heading: t.hero.slide2.heading,
      description: t.hero.slide2.description,
      buttonText: t.hero.slide2.button,
      features: t.hero.slide2.features.map((f, i) => ({ ...f, icon: featureIcons[i] })),
      onButtonClick: handleExploreCommunity,
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    // NOTE: min-h now scales down for mobile and up for desktop instead of one
    // fixed value, so stacked content (text + button + image) always has room
    // to breathe instead of being clipped by overflow-hidden.
    <section
      id="home"
      className="relative w-full overflow-hidden border border-gray-200 min-h-[720px] sm:min-h-[620px] md:min-h-[440px]"
    >
      {slides.map((slide, index) => {
        const isDark = slide.type === 'intro'
        return (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === activeSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            style={{
              backgroundImage: `url(${slide.background})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {isDark && <div className="absolute inset-0 bg-black/30" />}

            {/* h-full removed on mobile grid so content isn't force-squeezed
                into the section height; md: still stretches to fill the row */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 items-start md:h-full px-8 md:px-14 py-6 md:py-2 gap-8">
              <div className="flex flex-col justify-center md:pt-10">
                <h1
                  className={`text-2xl md:text-3xl font-bold leading-snug mb-4 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {slide.heading}
                </h1>
                <p
                  className={`text-sm md:text-base leading-relaxed mb-6 ${
                    isDark ? 'text-white/90' : 'text-gray-600'
                  }`}
                >
                  {slide.description}
                </p>

                {slide.features && (
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {slide.features.map((feature, i) => {
                      const Icon = feature.icon
                      return (
                        <div key={i} className="flex flex-col items-start">
                          <span className="flex items-center justify-center w-10 h-12 rounded-full bg-green-100 text-green-700 mb-2">
                            <Icon size={18} />
                          </span>
                          <p className="font-semibold text-gray-900 text-sm">{feature.title}</p>
                          <p className="text-gray-500 text-xs leading-snug">{feature.text}</p>
                        </div>
                      )
                    })}
                  </div>
                )}

                <button 
                onClick={slide.onButtonClick}
                className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium px-6 py-3 rounded-md w-fit transition-colors">
                  {slide.buttonText}
                  <ArrowRight size={18} />
                </button>
              </div>

              <div className="relative">
                {/* image height now scales with viewport instead of a fixed
                    420px that overflowed the mobile section */}
                <img
                  src={slide.image}
                  alt={`Vedacraft slide ${index + 1}`}
                  className="w-full h-[240px] sm:h-[300px] md:h-[420px] object-contain rounded-2xl"
                />
              </div>
            </div>
          </div>
        )
      })}

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveSlide(index)}
            className={`h-2 rounded-full transition-all ${index === activeSlide ? 'w-6 bg-yellow-400' : 'w-2 bg-white/60'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

export default Hero