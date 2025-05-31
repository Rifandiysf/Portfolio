import React from 'react'
import InfiniteScroll from '../components/InfiniteScroll'
import { ArrowUpRightIcon } from 'lucide-react'
import ShinyText from '../utils/ShinyText'
import BlurText from '../utils/BlurText'
import FadeContent from '../utils/FadeContent'
import AnimatedContent from '../utils/AnimatedContent'

const Introduce = () => {
  return (
    <section className='flex flex-col items-center gap-20 bg-white h-screen py-32 max-sm:py-8 max-sm:gap-8'>
      <div className='flex gap-40 max-sm:gap-10 max-sm:flex-col'>
        <div className='flex flex-col gap-10 w-[40rem] mr-30 max-sm:w-[20rem] max-sm:mr-0 max-sm:gap-3'>
          <BlurText
            text="i'm Rifandi Yusuf."
            delay={150}
            animateBy="words"
            direction="top"
            className="w-9/12 text-8xl font-medium max-sm:text-5xl"
          />
          <FadeContent blur={false} duration={2000} easing="ease-in-out" initialOpacity={0} className='max-sm:text-sm'>Aspiring <ShinyText text="Front-end Developer" disabled={false} speed={3} className='font-semibold cursor-pointer text-Primary hover:underline' /> passionate about crafting intuitive interfaces and seamless user experiences. I love turning ideas into interactive, responsive designs using modern web technologies, while constantly learning and growing along the way.</FadeContent>
        </div>
        <div className='flex flex-col gap-5 w-[18rem]'>
          <BlurText
            text="Social Media"
            delay={150}
            animateBy="words"
            direction="top"
          />
          <AnimatedContent
            distance={150}
            direction="horizontal"
            reverse={false}
            duration={1.2}
            ease="power3.out"
            initialOpacity={0.2}
            animateOpacity
            scale={1.1}
            threshold={0.2}
            delay={0.3}
          >
            <a href="https://www.instagram.com/rifandiysf" target='_blank' className='flex justify-between font-medium text-2xl border-b border-[#0000003f] max-sm:text-lg'><p>Instagram</p><ArrowUpRightIcon /></a>
          </AnimatedContent>
          <AnimatedContent
            distance={190}
            direction="horizontal"
            reverse={false}
            duration={1.2}
            ease="power3.out"
            initialOpacity={0.2}
            animateOpacity
            scale={1.1}
            threshold={0.2}
            delay={0.3}
          >
            <a href="https://www.linkedin.com/in/rifandiyusuf" target='_blank' className='flex justify-between font-medium text-2xl border-b border-[#0000003f] max-sm:text-lg'><p>Linkedin</p><ArrowUpRightIcon /></a>
          </AnimatedContent>
          <AnimatedContent
            distance={230}
            direction="horizontal"
            reverse={false}
            duration={1.2}
            ease="power3.out"
            initialOpacity={0.2}
            animateOpacity
            scale={1.1}
            threshold={0.2}
            delay={0.3}
          >
            <a href="https://github.com/Rifandiysf" target='_blank' className='flex justify-between font-medium text-2xl border-b border-[#0000003f] max-sm:text-lg'><p>Github</p><ArrowUpRightIcon /></a>
          </AnimatedContent>
          <AnimatedContent
            distance={270}
            direction="horizontal"
            reverse={false}
            duration={1.2}
            ease="power3.out"
            initialOpacity={0.2}
            animateOpacity
            scale={1.1}
            threshold={0.2}
            delay={0.3}
          >
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=rifandiyusuf47@gmail.com&su=Hey Rifandi" target='_blank' rel='noopener noreferrer' className='flex justify-between font-medium text-2xl border-b border-[#0000003f] max-sm:text-lg'><p>Gmail</p><ArrowUpRightIcon /></a>
          </AnimatedContent>
        </div>
      </div>
      <InfiniteScroll />
    </section>
  )
}

export default Introduce

