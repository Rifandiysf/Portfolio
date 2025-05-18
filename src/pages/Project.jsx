import React, { useEffect, useState } from 'react'
import ShinyText from '../ReactBits/ShinyText'
import todolist from '../assets/ToDoList.png'
import StudentAbsention from '../assets/StudentAbsention.png'
import ConselingGuidance from '../assets/ConselingGuidance.png'
import { ArrowUpRight, Github } from 'lucide-react';

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
      link: 'https://github.com/Rifandiysf/ToDoList-Laravel.git',
      techStack: ["Laravel"]
    },
    {
      id: 2,
      title: "Student Absention",
      status: "Personal Project",
      image: StudentAbsention,
      link: 'https://github.com/Rifandiysf/CRUD-MERN-Stack.git',
      techStack: ["MySql", "ExpressJs", "ReactJs", "NodeJS", "TailwindCSS"]
    },
    {
      id: 3,
      title: "Conseling Guidance",
      status: "On Development",
      image: ConselingGuidance,
      link: 'https://github.com/Rifandiysf/Conseling-Guidance-Apps.git',
      techStack: ["Laravel", "ReactJs"]
    },
  ];
  return (
    <section className='flex flex-col h-screen py-14 mb-36 gap-5 max-sm:mb-0 max-sm:py-4 max-sm:gap-3 max-sm:h-full'>
        <ShinyText text="My Project" disabled={false} speed={3} className='font-semibold text-2xl'/>
        <div className='grid justify-between items-center grid-cols-2 gap-3 max-sm:grid-cols-1'>
        {projects.map((project) => (
            <ProjectCard
              className='bg-red-500 w-full h-72 p-5 rounded-lg max-sm:h'
              key={project.id}
              title={project.title}
              status={project.status}
              image={project.image}
              link={project.link}
              techStack={project.techStack}
              windowWidth={windowWidth}
            />
          ))}
        </div>
        <div className='flex justify-center items-center w-full mt-2'>
          <a href="https://github.com/Rifandiysf" target='_blank' className='flex justify-center items-center gap-3 bg-black text-white p-5 rounded-full'>
            <Github/><p className='font-semibold text-base'>More Project In Github</p>
          </a>
        </div>
    </section>
  )
}

function ProjectCard({ title, status, image, link, techStack, windowWidth }) {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = windowWidth < 768;
  
  return (
    <div className="flex flex-col">
      <div className=" rounded-lg overflow-hidden mb-3 sm:mb-4 relative shadow-md cursor-pointer" 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
      >
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 sm:h-56 md:h-64 object-cover"
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center text-white opacity-0 transition-opacity duration-300 ${isHovered || isMobile ? 'opacity-100' : ''} group-hover:opacity-100`}>
          <div className="flex flex-wrap justify-center gap-2 px-4">
            {techStack.map((tech, index) => (
              <span
                key={index}
                className="bg-black/60 px-2 py-1 rounded text-xs font-medium sm:text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold">{title}</h2>
          <p className="text-xs sm:text-sm">{status}</p>
        </div>
        
        <div className="flex space-x-1 sm:space-x-2">
          <button className="p-1 sm:p-2 hover:bg-Primary hover:text-white rounded-md transition">
            <a href={link} target='_blank'><ArrowUpRight  size={isMobile ? 16 : 24} /></a>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Project