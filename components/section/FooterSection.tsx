'use client'
import { ArrowUpRight } from "lucide-react"

const FooterSection = () => {
    return (
        <footer className="flex flex-col w-full bg-foreground">
            <div className="flex py-4 max-sm:py-6 max-sm:gap-5 justify-between items-center w-full px-6 max-sm:px-3 h-full">
                <div className="flex justify-center items-center gap-1.5">
                    <h4 className="text-background font-semibold">Built With</h4>
                    <a href="https://nextjs.org/" target="_blank" className="font-bold text-background mr-3.5 hover:underline">NEXT JS</a>
                </div>
                <button 
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="flex items-center gap-1.5 cursor-pointer"
                >
                    <h4 className="text-background font-bold">BACK TO TOP</h4>
                    <ArrowUpRight size={20} className="text-background" />
                </button>
            </div>
            <div className="flex justify-center items-center">
                <h1 className="text-background font-big-shoulders font-[900] text-[17.7rem] max-sm:text-[4.5rem] max-md:text-[8.5rem]">RIFANDIYSF.</h1>
            </div>
        </footer>
    )
}

export default FooterSection