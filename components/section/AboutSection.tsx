'use client'
import AnimatedArrowButton from "../ui/AnimatedArrowButton"
import FlipLink from "../ui/FlipLink"

export const techStack = [
    'TypeScript',
    'JavaScript',
    'Tailwind CSS',
    'Next.js',
    'React',
    'Figma'
];

const AboutSection = () => {
    return (
        <section className='flex flex-col gap-16 my-24 px-48 w-full max-sm:px-16'>
            <div className='flex gap-0.5 w-full'>
                <FlipLink
                    href="#"
                    lineHeight={0.85}
                    className="text-primary text-3xl"
                >
                    About
                </FlipLink>
                <p className='font-light text-muted-foreground'>02</p>
            </div>
            <div className='grid grid-cols-2 justify-center items-start gap-20 max-sm:grid-cols-1'>
                <p className='font-semibold text-xl text-muted-foreground'>
                    My passion lies in the intersection of creativity and technology, focusing on Front-End Development and UI/UX Design to craft engaging and user-friendly digital experiences.
                </p>
                <div className="flex flex-col gap-5">
                    <p className="font-medium text-lg">
                        I am currently pursuing education in Software Development, where I have gained hands-on experience in modern web development practices. With a strong foundation in problem-solving and an eagerness to learn, I am ready to contribute as a Front-End Developer—bringing fresh ideas, dedication, and a drive to create impactful digital solutions.
                    </p>
                    <AnimatedArrowButton title="Get Resume" />
                </div>
            </div>
        </section>
    )
}

export default AboutSection