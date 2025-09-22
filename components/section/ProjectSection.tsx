'use client'
import AnimatedArrowButton from "../ui/AnimatedArrowButton"
import FlipLink from "../ui/FlipLink"

type projectItemType = {
    title: string
    status: string
    image: string
}

const projectItem: projectItemType[] = [
    { title: "Coming Soon", status: "Personal Project", image: "/#" },
    { title: "Coming Soon", status: "Company Project", image: "/#" },
    { title: "Coming Soon", status: "School Learning Project", image: "/#" },
    { title: "Coming Soon", status: "Personal Project", image: "/#" },
]

const ProjectSection = () => {
    return (
        <section className="flex flex-col gap-16 my-24 px-48 w-full max-sm:px-16">
            <div className='flex gap-0.5 w-full'>
                <FlipLink
                    href="#"
                    lineHeight={0.85}
                    className="text-primary text-3xl"
                >
                    Project
                </FlipLink>
                <p className='font-light text-muted-foreground'>03</p>
            </div>

            <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
                {projectItem.map((data, idx) => (
                    <div key={idx} className="flex flex-col gap-2">
                        <div 
                            className="w-full h-64 rounded-lg bg-muted-foreground/60"
                            style={{
                                backgroundImage: `url("/placeholder.svg")`,
                                backgroundPosition: "center",
                                backgroundSize: "cover"
                            }}
                        >
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex gap-2">
                                <h2>{data.title}</h2>
                                <span>-</span>
                                <h3>{data.status}</h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center items-center">
                <AnimatedArrowButton title="More Project" className="w-48"/>
            </div>
        </section>
    )
}

export default ProjectSection