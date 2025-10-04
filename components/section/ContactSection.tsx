'use client'
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"


const ContactSection = () => {
    return (
        <section className="flex flex-col gap-20 w-full px-8 py-16">
            <div className="flex flex-col gap-5">
                <div className="">
                    <h2 className="font-big-shoulders font-[900] text-9xl max-sm:text-7xl">LET`S WORK</h2>
                    <h2 className="font-big-shoulders font-[900] text-9xl max-sm:text-7xl">TOGETHER</h2>
                </div>
                <div
                    className="w-52 font-extrabold text-2xl max-sm:text-xl text-primary"
                >
                    <Link href={'#'} className="flex gap-2 items-center">
                        GET IN TOUCH <ArrowUpRight size={26} />
                    </Link>
                </div>
            </div>
            <div>
                <div className="flex max-sm:flex-col gap-24 max-sm:gap-7 max-md:gap-7">
                    <div>
                        <h4 className="text-xl font-bold">Write to Us</h4>
                        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=rifandiyusuf47@gmail.com&su=Hey Rifandi" target='_blank'>
                            <p className="font-medium hover:underline">rifandiyusuf47@gmail.com</p>
                        </a>
                    </div>
                    <div>
                        <h4 className="text-xl font-bold">Based In</h4>
                        <p className="font-medium">Bandung, Indonesia</p>
                    </div>
                    <div>
                        <h4 className="text-xl font-bold">Sosials</h4>
                        <a href="https://www.instagram.com/rifandiysf" target="_blank" className="font-medium mr-3.5 hover:underline">LinkedIn</a>
                        <a href="https://github.com/Rifandiysf" target="_blank" className="font-medium mr-3.5 hover:underline">Github</a>
                        <a href="https://www.linkedin.com/in/rifandiyusuf" target="_blank" className="font-medium hover:underline">Instagram</a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactSection