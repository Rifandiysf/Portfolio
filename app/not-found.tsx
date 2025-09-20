import { Sparkle } from "@/components/ui/Sparkle";
import Link from "next/link";

export default function NotFound() {
    return (
        <section className="flex flex-col justify-center items-center w-full h-screen">
            <p className="font-extrabold text-2xl text-muted-foreground">Not Found</p>
            <h1 className=" text-primary text-center font-big-shoulders font-[900] tracking-[-5.2px]">
                <span className="text-8xl md:text-9xl lg:text-[12rem] xl:text-[13rem]">404</span>
            </h1>
            <Sparkle size={64}/>
            <div>
                <h1>
                    <span className="text-2xl ">
                        Ooops! Something went wrong. Please go back to
                        <Link href={"/"} className="font-semibold text-primary ml-1 hover:underline">homepage</Link>.
                    </span>
                </h1>
            </div>
        </section>
    )
}