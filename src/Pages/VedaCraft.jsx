import React from 'react'
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