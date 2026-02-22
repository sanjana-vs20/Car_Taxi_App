import React from 'react'
import Hero from '../components/Hero'
import FeaturedSection from '../components/FeaturedSection'
import Banner from '../components/Banner'
import Testimonial from '../components/Testimonial'
import Newletter from '../components/Newletter'

const Home = () => {
  return (
    <>
     <Hero/> 
     <FeaturedSection/>
     <Banner/>
     <Testimonial/>
     <Newletter/>
    </>
  )
}

export default Home
