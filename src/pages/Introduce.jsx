import React from 'react'
import InfiniteScroll from '../components/InfiniteScroll'
import { ArrowUpRightIcon } from 'lucide-react'
import ShinyText from '../ReactBits/ShinyText'

const Introduce = () => {
  return (
    <section className='flex flex-col items-center gap-20 bg-white h-screen py-32 max-sm:py-8 max-sm:gap-8'>
      <div className='flex gap-40 max-sm:gap-10 max-sm:flex-col'>
        <div className='flex flex-col gap-10 w-[40rem] mr-30 max-sm:w-[20rem] max-sm:mr-0 max-sm:gap-3'>
          <h1 className='text-8xl font-medium max-sm:text-5xl'>i'm Rifandi Yusuf.</h1>
          <div className='max-sm:text-sm'>Aspiring <ShinyText text="Front-end Developer" disabled={false} speed={3} className='font-semibold cursor-pointer text-Primary hover:underline'/> passionate about crafting intuitive interfaces and seamless user experiences. I love turning ideas into interactive, responsive designs using modern web technologies, while constantly learning and growing along the way.</div>
        </div>
        <div className='flex flex-col gap-5 w-[18rem]'>
          <h1>Sosial media</h1>
          <a href="https://www.instagram.com/rifandiysf" target='_blank' className='flex justify-between font-medium text-2xl border-b border-[#0000003f] max-sm:text-lg'><p>Instagram</p><ArrowUpRightIcon/></a>
          <a href="https://www.linkedin.com/in/rifandiyusuf" target='_blank' className='flex justify-between font-medium text-2xl border-b border-[#0000003f] max-sm:text-lg'><p>Linkedin</p><ArrowUpRightIcon/></a>
          <a href="https://github.com/Rifandiysf" target='_blank' className='flex justify-between font-medium text-2xl border-b border-[#0000003f] max-sm:text-lg'><p>Github</p><ArrowUpRightIcon/></a>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=rifandiyusuf47@gmail.com&su=Hey Rifandi" target='_blank' rel='noopener noreferrer' className='flex justify-between font-medium text-2xl border-b border-[#0000003f] max-sm:text-lg'><p>Gmail</p><ArrowUpRightIcon/></a>
        </div>
      </div>
        <InfiniteScroll/>
    </section>
  )
}

export default Introduce

