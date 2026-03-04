import React, { useState } from 'react'
import Title from '../components/Title'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import {motion} from 'motion/react'

const Feedback = () => {
  const {user, setShowLogin, axios} = useAppContext()
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!user){
      toast.error('Please login to submit feedback')
      setShowLogin(true)
      return
    }

    setIsLoading(true)
    try {
      const {data} = await axios.post('/api/feedback/add', {rating, comment})
      if(data.success){
        toast.success(data.message)
        setRating(5)
        setComment('')
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 mb-20'>
      <motion.div
        initial={{opacity: 0, y: 30}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.6}}
      >
        <Title title='Share Your Feedback' subTitle='Help us improve by sharing your experience' align='center'/>
      </motion.div>

      <motion.div 
        initial={{opacity: 0, y: 30}}
        animate={{opacity: 1, y: 0}}
        transition={{delay: 0.2, duration: 0.6}}
        className='mt-12 max-w-2xl mx-auto'
      >
        {!user && (
          <div className='bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg mb-6 text-center'>
            Please login to submit feedback
          </div>
        )}
        <form onSubmit={handleSubmit} className='bg-light p-8 rounded-xl shadow-md'>
          <div className='mb-6'>
            <label className='block text-gray-700 font-medium mb-3'>Rating</label>
            <div className='flex gap-2'>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type='button'
                  onClick={() => setRating(star)}
                  disabled={!user}
                  className='text-3xl transition-all disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {star <= rating ? '⭐' : '☆'}
                </button>
              ))}
            </div>
          </div>

          <div className='mb-6'>
            <label className='block text-gray-700 font-medium mb-3'>Your Feedback</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={6}
              required
              disabled={!user}
              placeholder='Share your experience with us...'
              className='w-full px-4 py-3 border border-borderColor rounded-lg outline-none focus:border-primary disabled:bg-gray-100 disabled:cursor-not-allowed'
            />
          </div>

          <button
            type='submit'
            disabled={isLoading || !user}
            className='w-full bg-primary hover:bg-primary-dull text-white py-3 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isLoading ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </form>
      </motion.div>

      <motion.div 
        initial={{opacity: 0, y: 30}}
        whileInView={{opacity: 1, y: 0}}
        transition={{duration: 0.6}}
        className='mt-16 text-center'
      >
        <p className='text-gray-600'>
          Your feedback will appear in our testimonials section.
        </p>
      </motion.div>
    </div>
  )
}

export default Feedback
