import Image from "next/image"
import ScrollVelocity from "../ScrollVelocity"
import { ArrowUp } from "lucide-react"

const FooterText = [
    "Let`s Work Together",
    "Let`s Work Together",
    "Let`s Work Together",
]

const FooterSection = () => {
    return (
        <footer className="flex flex-col w-full bg-foreground mt-24">
            <ScrollVelocity
                texts={FooterText}
                velocity={50}
                damping={70}
                numCopies={2}
                className="text-background font-big-shoulders"
                parallaxClassName="py-8 mask-x-from-80% mask-x-to-100%"
            />
            <div className="flex max-sm:flex-col py-4 max-sm:py-6 max-sm:gap-5 justify-between items-center w-full px-6 h-full border-t-[1.5px] border-[#ffffff1a] ">
                <Image src={"/rifandiysf-logo-white.svg"} alt="Logo" width={54} height={54} />
                <div className="flex justify-center items-center gap-1.5">
                    <h4 className="text-background font-semibold">Build With</h4>
                    <Image src={"/nextjs_icon_dark.svg"} alt="Logo" width={24} height={24} />
                    <Image src={"/tailwindcss.svg"} alt="Logo" width={24} height={24} />
                </div>
                <div className="flex gap-1.5 max-sm:hidden">
                    <ArrowUp size={24} className="text-background" />
                    <h4 className="text-background font-semibold">Back To Top</h4>
                </div>
            </div>
        </footer>
    )
}

export default FooterSection