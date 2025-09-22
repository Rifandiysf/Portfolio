import { Sparkle } from "@/components/ui/Sparkle"

const page = () => {
    return (
        <section className='flex flex-col justify-center items-center w-full h-screen'>
            <p className="font-extrabold text-2xl text-muted-foreground">This page is</p>
            <h1 className="flex flex-col text-primary text-center font-big-shoulders font-[900] tracking-[-5.2px]">
                <span className="text-8xl md:text-9xl lg:text-[12rem] xl:text-[13rem]">COMING</span>
                <span className="text-8xl md:text-9xl lg:text-[12rem] xl:text-[13rem]">SOON</span>
            </h1>
            <Sparkle size={64} />
        </section>
    )
}

export default page