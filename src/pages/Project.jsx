import React from 'react'
import ShinyText from '../ReactBits/ShinyText'

const Project = () => {
  return (
    <section className='flex flex-col h-screen py-14 gap-5 max-sm:py-4 max-sm:gap-3 max-sm:h-full'>
        <ShinyText text="My Project" disabled={false} speed={3} className='font-semibold text-2xl'/>
        <div className='grid justify-between items-center grid-cols-2 gap-3 max-sm:grid-cols-1'>
          <div className='flex justify-center items-center bg-[#f0f4f9] font-medium w-full h-64 p-5 rounded-lg max-sm:h-48'>Comming Soon</div>
          <div className='flex justify-center items-center bg-[#f0f4f9] font-medium w-full h-64 p-5 rounded-lg max-sm:h-48'>Comming Soon</div>
          <div className='flex justify-center items-center bg-[#f0f4f9] font-medium w-full h-64 p-5 rounded-lg max-sm:h-48'>Comming Soon</div>
          <div className='flex justify-center items-center bg-[#f0f4f9] font-medium w-full h-64 p-5 rounded-lg max-sm:h-48'>Comming Soon</div>
        </div>
    </section>
  )
}

export default Project