import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets, dummyCarData } from '../assets/assets'
import Loader from '../components/Loader'
import { useAppContext } from '../context/AppContext'
import {motion} from 'motion/react'
import toast from 'react-hot-toast'

const CarDetails = () => {

  const {id} = useParams()

  const {cars, axios, pickupDate, setPickupDate, returnDate, setReturnDate, user} = useAppContext()
  
  const navigate = useNavigate()
  const [car, setCar] = useState(null)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [bookingType, setBookingType] = useState('self-pickup')
  const currency = import.meta.env.VITE_CURRENCY

  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(!user){
      toast.error('Please login to book a car')
      return
    }
    
    // Check availability
    try {
      const {data} = await axios.post('/api/bookings/check-availability', {
        location: car.location,
        pickupDate,
        returnDate
      })
      
      if(data.success){
        const isCarAvailable = data.availableCars.some(c => c._id === car._id)
        if(!isCarAvailable){
          toast.error('Car is not available for selected dates')
          return
        }
      }
    } catch (error) {
      toast.error('Error checking availability')
      return
    }
    
    setShowBookingModal(true)
  }

  const confirmBooking = async () => {
    try {
      const {data} = await axios.post('/api/bookings/create', {
        car: id,
        pickupDate, 
        returnDate,
        bookingType
      })

      if (data.success){
        toast.success(data.message)
        setPickupDate('')
        setReturnDate('')
        setShowBookingModal(false)
        navigate('/owner/my-bookings')
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    setCar(cars.find(car => car._id === id))
  },[cars, id])

  useEffect(()=>{
    return () => {
      setPickupDate('')
      setReturnDate('')
    }
  },[])

  return car ?  (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-16'>
      <button onClick={()=> navigate(-1)} className='flex items-center gap-2 mb-6 text-gray-500 cursor-pointer'>
        <img src={assets.arrow_icon} alt="" className='rotate-180 opacity-65'/>
        Back to all Cars
      </button>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12'>

        <motion.div 
        initial={{opacity: 0, y: 30}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.6}}
        className='lg:col-span-2'>
          <motion.img 
          initial={{scale: 0.98, opacity: 0}}
          animate={{scale: 1, opacity: 1}}
          transition={{duration: 0.5}}
          src={car.image} alt="" className='w-full h-auto md:max-h-100 object-cover rounded-xl mb-6 shadow-md'/>
          <motion.div 
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{delay: 0.2, duration: 0.5}}
          className='space-y-6'>
            <div>
              <h1 className='text-3xl font-bold'>{car.brand} {car.model}</h1>
              <p className='text-gray-500 text-lg'>{car.category} {car.year}</p>
            </div>
            <hr className='border-borderColor my-6'/>

            <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
              {[
                {icon: assets.users_icon, text: `${car.seating_capacity} 
                Seats`},
                {icon: assets.fuel_icon, text: car.fuel},
                {icon: assets.car_icon, text: car.transmission},
                {icon: assets.location_icon, text: car.location},
              ].map(({icon, text})=>(
                <motion.div 
                initial={{opacity: 0, y: 10}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.4}}
                key={text} className='flex flex-col items-center bg-light p-4 rounded-lg'>
                  <img src={icon} alt="" className='h-5 mb-2'/>
                  {text}
                </motion.div>
              ))}
            </div>

            <div>
              <h1 className='text-xl font-medium mb-3'>Description</h1>
              <p className='text-gray-500'>{car.description}</p>
            </div>

            <div>
               <h1 className='text-xl font-medium mb-3'>Features</h1>
               <ul className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                {
                  (car.features && car.features.length > 0 ? car.features : ["360 Camera", "Bluetooth", "GPS", "Heated Seats", "Rear View Mirror"]).map((item)=>(
                    <li key={item} className='flex items-center text-gray-500'>
                      <img src={assets.check_icon} className='h-4 mr-2' alt=""/>
                      {item}
                    </li>
                  ))
                }
               </ul>
            </div>

          </motion.div>
        </motion.div>

        <motion.form 
        initial={{opacity: 0, y: 30}}
        animate={{opacity: 1, y: 0}}
        transition={{delay: 0.3, duration: 0.6}}
        onSubmit={handleSubmit} className='shadow-lg h-max sticky top-18 rounded-xl p-6 space-y-6 text-gray-500'>
          <p className='flex items-center justify-between text-2xl text-gray-800 font-semibold'>{currency}{car.pricePerDay} 
            <span className='text-base text-gray-400 font-normal'>per day</span> </p>

            <hr className='border-borderColor my-6'/>
            <div className='flex flex-col gap-2'>
              <label htmlFor="pickup-date">Pickup Date</label>
              <input value={pickupDate} onChange={(e)=>setPickupDate(e.target.value)}
              type="date" className='border border-borderColor px-3 py-2 rounded-lg' required id='pickup-date' 
              min={new Date().toISOString().split('T')[0]}/>
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor="return-date">Return Date</label>
              <input value={returnDate} onChange={(e)=>setReturnDate(e.target.value)} 
              type="date" className='border border-borderColor px-3 py-2 rounded-lg' required id='return-date' min={pickupDate || new Date().toISOString().split('T')[0]}/>
            </div>

            <button className='w-full bg-primary hover:bg-primary-dull
            transition-all py-3 font-medium text-white rounded-xl cursor-pointer'>Book Now</button>

            <p className='text-center text-sm'>No Credit Card required to reserve</p>

        </motion.form>

      </div>

      {showBookingModal && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-xl p-6 max-w-md w-full mx-4'>
            <h2 className='text-xl font-semibold mb-4'>Select Booking Type</h2>
            <div className='space-y-3 mb-6'>
              <label className='flex items-center gap-3 p-4 border border-borderColor rounded-lg cursor-pointer hover:bg-light'>
                <input
                  type='radio'
                  name='bookingType'
                  value='self-pickup'
                  checked={bookingType === 'self-pickup'}
                  onChange={(e) => setBookingType(e.target.value)}
                  className='w-4 h-4'
                />
                <div>
                  <p className='font-medium'>Self Pickup</p>
                  <p className='text-sm text-gray-500'>Drive the car yourself</p>
                </div>
              </label>
              <label className='flex items-center gap-3 p-4 border border-borderColor rounded-lg cursor-pointer hover:bg-light'>
                <input
                  type='radio'
                  name='bookingType'
                  value='with-driver'
                  checked={bookingType === 'with-driver'}
                  onChange={(e) => setBookingType(e.target.value)}
                  className='w-4 h-4'
                />
                <div>
                  <p className='font-medium'>With Driver</p>
                  <p className='text-sm text-gray-500'>Professional driver included</p>
                </div>
              </label>
            </div>
            <div className='flex gap-3'>
              <button
                onClick={() => setShowBookingModal(false)}
                className='flex-1 px-4 py-2 border border-borderColor rounded-lg hover:bg-light'
              >
                Cancel
              </button>
              <button
                onClick={confirmBooking}
                className='flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dull'
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  ) : <Loader/>
}

export default CarDetails
