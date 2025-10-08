'use client'
import ScrollVelocity from "../ScrollVelocity";
// import AnimatedArrowButton from "../ui/AnimatedArrowButton"
import FlipLink from "../ui/FlipLink"

const techStack = [
    'TYPESCRIPT',
    'JAVASCRIPT',
    'TAILWIND CSS',
    'NEXT JS',
    'REACT',
    'FIGMA'
];

const AboutSection = () => {
    return (
        <>
            <section className='flex flex-col gap-16 my-24 px-48 w-full max-sm:px-8'>
                <div className='flex gap-0.5 w-full'>
                    <FlipLink
                        href="/about"
                        lineHeight={0.85}
                        className="text-primary text-3xl"
                    >
                        About
                    </FlipLink>
                    <p className='font-light text-muted-foreground'>02</p>
                </div>
                <div className='grid grid-cols-2 justify-center items-start gap-20 max-sm:grid-cols-1 max-sm:text-justify'>
                    <p className='font-semibold text-xl text-muted-foreground'>
                        My passion lies in the intersection of creativity and technology, focusing on Front-End Development and UI/UX Design to craft engaging and user-friendly digital experiences.
                    </p>
                    <div className="flex flex-col gap-5">
                        <p className="font-medium text-lg">
                            I am currently pursuing education in Software Development, where I have gained hands-on experience in modern web development practices. With a strong foundation in problem-solving and an eagerness to learn, I am ready to contribute as a Front-End Developer—bringing fresh ideas, dedication, and a drive to create impactful digital solutions.
                        </p>
                        {/* <AnimatedArrowButton title="Get Resume" /> */}
                    </div>
                </div>
            </section>
            <ScrollVelocity
                texts={techStack}
                velocity={50}
                damping={70}
                numCopies={2}
                className="text-foreground font-big-shoulders"
                parallaxClassName="pt-8 mask-x-from-80% mask-x-to-100%"
            />
            <ScrollVelocity
                texts={techStack}
                velocity={-50}
                damping={70}
                numCopies={2}
                className="text-foreground font-big-shoulders"
                parallaxClassName="pb-8 mask-x-from-80% mask-x-to-100%"
            />
        </>
    )
}

export default AboutSection