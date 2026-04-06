'use client'
import { experienceItem } from "@/lib/api"
import FlipLink from "../ui/FlipLink"

const ExperienceSection = () => {
    return (
        <section className='flex flex-col gap-16 my-24 px-8 w-full'>
            <div className='flex gap-0.5 w-full'>
                <FlipLink
                    href="/experience"
                    lineHeight={0.85}
                    className="text-primary text-3xl"
                >
                    Experience
                </FlipLink>
                <p className='font-light text-muted-foreground'>04</p>
            </div>

            <div className="grid grid-cols-1 gap-5 max-sm:grid-cols-1">
                {experienceItem.map((data, idx) => (
                    <div key={idx} className="flex flex-col">
                        <div>
                            <h1 className="text-xl font-extrabold mb-2">{data.role}</h1>
                            <h3 className="font-bold text-muted-foreground/55">{data.companyName}</h3>
                            <h3 className="font-bold text-muted-foreground/55">{data.date}</h3>
                        </div>
                        <p className="mt-10 font-semibold">
                            {data.description}
                        </p>
                        <span className="border-b-[1.5px] border-border mt-16"></span>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default ExperienceSection
