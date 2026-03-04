import React, { useEffect, useState } from 'react'
import Title from './Title'
import { assets } from '../assets/assets';
import {motion} from 'motion/react'
import axios from 'axios'

const Testimonial = () => {

    const [testimonials, setTestimonials] = useState([])

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const {data} = await axios.get('/api/feedback/all')
                if (data.success) {
                    setTestimonials(data.feedbacks)
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchFeedbacks()
    }, [])

    if (testimonials.length === 0) return null

  return (
    <div className="py-28 px-6 md:px-16 lg:px-24 xl:px-44">

        <Title title="What Our Customers Say" subTitle="Discover why customers choose Carzio for their car rental needs."/>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18">
                {testimonials.map((testimonial, index) => (
                    <motion.div 
                    initial={{opacity: 0, y: 40}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{duration: 0.6, delay: index * 0.2, ease: 'easeOut'}}
                    viewport={{once: true, amount: 0.3}}
                    
                    key={index} className="bg-white p-6 rounded-xl shadow-lg hover:-translate-y-1 transition-all duration-500">
                        <div className="flex items-center gap-3">
                            {testimonial.image ? (
                                <img className="w-12 h-12 rounded-full object-cover" src={testimonial.image} alt={testimonial.name} />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl">
                                    {testimonial.name.charAt(0)}
                                </div>
                            )}
                            <div>
                                <p className="text-xl">{testimonial.name}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 mt-4">
                            {Array(testimonial.rating).fill(0).map((_, index) => (
                                <img key={index} src={assets.star_icon} alt="star-icon" />
                            ))}
                        </div>
                        <p className="text-gray-500 max-w-90 mt-4 font-light">"{testimonial.comment}"</p>
                    </motion.div>
                ))}
            </div>
        </div>
  )
}

export default Testimonial
