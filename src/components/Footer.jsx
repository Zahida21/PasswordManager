import React from 'react'

const Footer = () => {
  return (
    <div className='bg-teal-950 text-white flex flex-col justify-center items-center  w-full'>
        <div className="logo font-bold text-white text-base ">
            <span className='text-coral-500'>&lt;</span>
            <span>Pass</span>
            <span className='text-coral-500'>Mang/&gt;</span>
        </div>
        <div className='flex justify-center items-center'>Created with <img className='w-5 mx-2' src="icons/heart.png" alt="" />by zahida
        </div>
    </div>
  )
}

export default Footer
