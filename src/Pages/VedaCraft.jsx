import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import Hero from '../Components/Hero'
import AboutVedaCraft from '../Components/AboutVedaCraft'
import WhoCanJoin from '../Components/WhoCanJoin'
import Community from '../Components/Community'
import SuccessStory from '../Components/SuccessStory'
import Form from '../Components/Form'
import Footer from '../Components/Footer'
import ScrollToTop from '../Components/ScrollToTop'

const VedaCraft = () => {
  const location = useLocation()

  useEffect(() => {
    const targetId = location.state?.scrollToId
    if (!targetId) return

    const timer = window.setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)

    return () => window.clearTimeout(timer)
  }, [location.state?.scrollToId])

  return (
    <div>
        <Navbar/>
        <Hero/>
        <AboutVedaCraft/>
        <WhoCanJoin/>
        <Community/>
        <SuccessStory/>
        <Form/>
        <Footer/>
        <ScrollToTop />
    </div>
  )
}

export default VedaCraft