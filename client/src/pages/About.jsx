import React from 'react'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import {motion} from 'motion/react'

const About = () => {
  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 mb-20'>
      <motion.div
        initial={{opacity: 0, y: 30}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.6}}
      >
        <Title title='About Carzio' subTitle='Your trusted partner for luxury car rentals' align='center'/>
      </motion.div>

      <motion.div 
        initial={{opacity: 0, y: 30}}
        animate={{opacity: 1, y: 0}}
        transition={{delay: 0.2, duration: 0.6}}
        className='mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'
      >
        <div>
          <img src={assets.main_car} alt="luxury car" className='w-full rounded-xl shadow-lg'/>
        </div>
        <div className='space-y-6'>
          <h2 className='text-3xl font-semibold'>Who We Are</h2>
          <p className='text-gray-600'>
            Carzio is a premium car rental platform that connects luxury car owners with customers seeking exceptional driving experiences. We believe in making luxury accessible while helping car owners monetize their vehicles effortlessly.
          </p>
          <p className='text-gray-600'>
            Founded with a vision to revolutionize the car rental industry, we provide a seamless platform where quality meets convenience. Our commitment to excellence ensures every journey is memorable.
          </p>
        </div>
      </motion.div>

      <motion.div 
        initial={{opacity: 0, y: 30}}
        whileInView={{opacity: 1, y: 0}}
        transition={{duration: 0.6}}
        className='mt-20'
      >
        <h2 className='text-3xl font-semibold text-center mb-12'>Why Choose Us</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {[
            {
              icon: assets.tick_icon,
              title: 'Verified Vehicles',
              description: 'All cars are thoroughly inspected and verified for quality and safety standards.'
            },
            {
              icon: assets.users_icon,
              title: 'Trusted Community',
              description: 'Join thousands of satisfied customers and car owners in our growing community.'
            },
            {
              icon: assets.check_icon,
              title: 'Secure Payments',
              description: 'Safe and secure payment processing with full insurance coverage included.'
            }
          ].map((item, index) => (
            <motion.div 
              key={index}
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              transition={{delay: index * 0.1, duration: 0.5}}
              className='bg-light p-6 rounded-xl text-center'
            >
              <div className='flex justify-center mb-4'>
                <img src={item.icon} alt={item.title} className='h-12 w-12'/>
              </div>
              <h3 className='text-xl font-semibold mb-3'>{item.title}</h3>
              <p className='text-gray-600'>{item.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div 
        initial={{opacity: 0, y: 30}}
        whileInView={{opacity: 1, y: 0}}
        transition={{duration: 0.6}}
        className='mt-20 bg-gradient-to-r from-[#0558FE] to-[#A9CFFF] rounded-2xl p-12 text-center text-white'
      >
        <h2 className='text-3xl font-semibold mb-4'>Ready to Get Started?</h2>
        <p className='mb-6 max-w-2xl mx-auto'>
          Whether you're looking to rent a luxury car or list your vehicle, we're here to help you every step of the way.
        </p>
        <div className='flex gap-4 justify-center flex-wrap'>
          <button onClick={() => window.location.href = '/cars'} className='px-8 py-3 bg-white text-primary rounded-lg font-medium hover:bg-slate-100 transition-all cursor-pointer'>
            Browse Cars
          </button>
          <button onClick={() => window.location.href = '/'} className='px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-medium hover:bg-white/10 transition-all cursor-pointer'>
            List Your Car
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default About
