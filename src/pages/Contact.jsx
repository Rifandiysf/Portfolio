import { Linkedin, Mail } from 'lucide-react'
import React from 'react'

const Contact = () => {
  return (
    <section className='flex flex-col justify-center items-center [height: cacl(100vh - 40px)] py-14 gap-5 max-sm:py-10'>
        <p className='text-3xl font-medium text-slate-500 max-sm:text-xl'>Get In Touch</p>
        <h1 className='text-8xl font-semibold max-sm:text-5xl'>Contact Me</h1>
        <div className='flex gap-10 max-sm:flex-col max-sm:gap-5'>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=rifandiyusuf47@gmail.com&su=Hey Rifandi" target='_blank' className='flex justify-center items-center gap-3'><Mail size={26}/><p>rifandiyusuf47@gmail.com</p></a>
            <a href="https://www.linkedin.com/in/rifandiyusuf" target='_blank' className='flex justify-center items-center gap-3'><Linkedin size={26}/><p>Linkedin</p></a>
        </div>
    </section>
  )
}

export default Contact