'use client'
// import AnimatedArrowButton from "../ui/AnimatedArrowButton"
import FlipLink from "../ui/FlipLink"

type projectItemType = {
    title: string
    status: string[]
    description: string
    image: string
}

const projectItem: projectItemType[] = [
    { title: "Sibening", status: ["Web Development", "UI/UX Design"], description: "A school counseling application with features for psychological tests, consultations, attendance, and student data management.", image: "/sibening.png" },
    { title: "Company Leave Apps", status: ["Web Development"], description: "An application to manage employee leave requests, approvals, and history digitally.", image: "/leave-app.png" },
]

const ProjectSection = () => {
    return (
        <section className="flex flex-col gap-16 my-24 px-8 w-full">
            <div className='flex gap-0.5 w-full'>
                <FlipLink
                    href="/project"
                    lineHeight={0.85}
                    className="text-primary text-3xl"
                >
                    Projects
                </FlipLink>
                <p className='font-light text-muted-foreground'>03</p>
            </div>

            <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
                {projectItem.map((data, idx) => (
                    <div key={idx} className="flex flex-col gap-2">
                        <div
                            className="w-full rounded-lg bg-muted-foreground/60 aspect-[16/9]"
                            style={{
                                backgroundImage: `url("${data.image}")`,
                                backgroundPosition: "center",
                                backgroundSize: "cover"
                            }}
                        >
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col gap-2">
                                <h2 className="font-big-shoulders font-[900] text-xl">{data.title}</h2>
                                <h3 className="text-muted-foreground font-medium">{data.description}</h3>
                                <div className="flex gap-2">
                                    <h3
                                        className="bg-secondary py-2 px-4 rounded-full text-sm font-medium"
                                    >
                                        {data.status[0]}
                                    </h3>
                                    {data.status[1] && (
                                        <h3
                                            className="bg-secondary py-2 px-4 rounded-full text-sm font-medium"
                                        >
                                            {data.status[1]}
                                        </h3>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* <div className="flex justify-center items-center">
                <AnimatedArrowButton title="More Project" className="w-48" />
            </div> */}
        </section>
    )
}

export default ProjectSection