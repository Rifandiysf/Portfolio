import React, { useEffect, useState } from 'react'
import ShinyText from '../ReactBits/ShinyText'
import todolist from '../assets/ToDoList.png'
import StudentAbsention from '../assets/StudentAbsention.png'
import ConselingGuidance from '../assets/ConselingGuidance.png'
import { ArrowUpRight } from 'lucide-react';

const Project = () => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const projects = [
    {
      id: 1,
      title: "ToDoList Website",
      status: "School Learning Project",
      image: todolist,
      techStack: ''
    },
    {
      id: 2,
      title: "Student Absention",
      status: "Personal Project",
      image: StudentAbsention,
      techStack: ''
    },
    {
      id: 3,
      title: "Conseling Guidance",
      status: "On Development",
      image: ConselingGuidance,
      techStack: ''
    },
  ];
  return (
    <section className='flex flex-col h-screen py-14 mb-20 gap-5 max-sm:mb-0 max-sm:py-4 max-sm:gap-3 max-sm:h-full'>
        <ShinyText text="My Project" disabled={false} speed={3} className='font-semibold text-2xl'/>
        <div className='grid justify-between items-center grid-cols-2 gap-3 max-sm:grid-cols-1'>
        {projects.map((project) => (
            <ProjectCard
              className='bg-red-500 w-full h-72 p-5 rounded-lg max-sm:h'
              key={project.id}
              title={project.title}
              status={project.status}
              image={project.image}
              windowWidth={windowWidth}
            />
          ))}
          {/* <div className='flex justify-center items-center bg-[#f0f4f9] font-medium w-full h-64 p-5 rounded-lg max-sm:h-48'>Comming Soon</div>
          <div className='flex justify-center items-center bg-[#f0f4f9] font-medium w-full h-64 p-5 rounded-lg max-sm:h-48'>Comming Soon</div>
          <div className='flex justify-center items-center bg-[#f0f4f9] font-medium w-full h-64 p-5 rounded-lg max-sm:h-48'>Comming Soon</div>
          <div className='flex justify-center items-center bg-[#f0f4f9] font-medium w-full h-64 p-5 rounded-lg max-sm:h-48'>Comming Soon</div> */}
        </div>
    </section>
  )
}

function ProjectCard({ title, status, image, windowWidth }) {
  // const [isHovered, setIsHovered] = useState(false);
  const isMobile = windowWidth < 768;
  
  return (
    <div className="flex flex-col">
      <div className=" rounded-lg overflow-hidden mb-3 sm:mb-4 relative shadow-md cursor-pointer" 
      // onMouseEnter={() => setIsHovered(true)} 
      // onMouseLeave={() => setIsHovered(false)}
      >
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 sm:h-56 md:h-64 object-cover"
        />
        {/* {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <div className="text-center px-4">
            <img 
                src={techStack} 
                className="w-full sm:h-56 md:h-64 object-cover"
              />
            </div>
          </div>
        )} */}
      </div>
      
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold">{title}</h2>
          <p className="text-xs sm:text-sm">{status}</p>
        </div>
        
        <div className="flex space-x-1 sm:space-x-2">
          <button className="p-1 sm:p-2 rounded-md transition">
            <ArrowUpRight  size={isMobile ? 16 : 24} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Project