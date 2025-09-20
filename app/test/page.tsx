import ScrollVelocity from '@/components/ScrollVelocity'
import React from 'react'

const page = () => {
  const techStack = [
    'TypeScript',
    'JavaScript',
    'Tailwind CSS',
    'Next.js',
    'React',
    'FIGMA'
  ];
  return (
    <section className='mt-40'>
      <ScrollVelocity
        texts={techStack}
        velocity={50}
        className="text-gray-800"
        parallaxClassName="bg-gradient-to-r from-blue-50 to-purple-50 py-8"
      />
    </section>
  )
}

export default page