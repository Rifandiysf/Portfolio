import { Linkedin, Mail } from "lucide-react"


const ContactSection = () => {
    return (
        <section className="flex flex-col justify-center items-center gap-16 w-full min-h-screen">
            <p className='text-3xl font-bold text-slate-500 max-sm:text-xl'>Get In Touch</p>
            <h1 className='text-8xl font-extrabold max-sm:text-5xl'>Contact Me</h1>
            <div className='flex gap-10 max-sm:flex-col max-sm:gap-5'>
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=rifandiyusuf47@gmail.com&su=Hey Rifandi" target='_blank' className='flex justify-center items-center gap-3'>
                    <Mail size={26} />
                    <p className="font-medium hover:underline">rifandiyusuf47@gmail.com</p>
                </a>
                <a href="https://www.linkedin.com/in/rifandiyusuf" target='_blank' className='flex justify-center items-center gap-3'>
                    <Linkedin size={26} />
                    <p className="font-medium hover:underline">Linkedin</p>
                </a>
            </div>
        </section>
    )
}

export default ContactSection