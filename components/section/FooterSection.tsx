'use client'
import Link from "next/link"
import { useEffect, useState } from "react"
import { ArrowUpRight } from "lucide-react"

const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/project" },
    { label: "Contact", href: "/contact" },
]

const socialLinks = [
    { label: "GitHub", href: "https://github.com/Rifandiysf" },
    { label: "LinkedIn", href: "https://linkedin.com/in/rifandiyusuf" },
    { label: "Instagram", href: "https://instagram.com/rifandiysf" },
]

const FooterSection = () => {
    const [time, setTime] = useState("")

    useEffect(() => {
        const update = () => {
            const now = new Date()

            const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

            const day = now.toLocaleDateString("en-US", {
                weekday: "long",
                timeZone,
            })

            const clock = now.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
                timeZone,
            })

            const tzShort = new Intl.DateTimeFormat("en-US", {
                timeZone,
                timeZoneName: "short",
            })
                .formatToParts(now)
                .find(part => part.type === "timeZoneName")?.value

            setTime(`${day} ${clock} ${tzShort}`)
        }
        update()
        const interval = setInterval(update, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <footer className="w-full bg-foreground flex flex-col overflow-hidden">

            {/* Top row */}
            <div className="flex justify-between items-start px-8 pt-12 pb-10 border-b border-background/10 max-sm:flex-col max-sm:gap-10">

                {/* Left — nav */}
                <div className="flex flex-col gap-3">
                    <span className="text-[11px] uppercase tracking-[0.14em] text-background/30 font-medium mb-2">
                        Navigation
                    </span>
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="text-background/70 text-sm font-medium hover:text-background transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Center — socials */}
                <div className="flex flex-col gap-3">
                    <span className="text-[11px] uppercase tracking-[0.14em] text-background/30 font-medium mb-2">
                        Social
                    </span>
                    {socialLinks.map((s) => (
                        <a
                            key={s.label}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-background/70 text-sm font-medium hover:text-background transition-colors inline-flex items-center gap-1 group"
                        >
                            {s.label}
                            < ArrowUpRight
                                size={12}
                                className="opacity-0 -translate-y-0.5 group-hover:opacity-100 transition-all"
                            />
                        </a>
                    ))}
                </div>

                {/* Right — info */}
                <div className="flex flex-col items-end gap-3 max-sm:items-start">
                    <span className="text-[11px] uppercase tracking-[0.14em] text-background/30 font-medium mb-2">
                        Info
                    </span>
                    <span className="text-background/70 text-sm font-medium">
                        Bandung, Indonesia
                    </span>
                    <span className="text-background/70 text-sm tabular-nums font-medium">
                        {time} WIB
                    </span>
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="mt-4 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.1em] font-medium text-background/50 hover:text-background transition-colors"
                    >
                        Back to top <ArrowUpRight size={12} />
                    </button>
                </div>

            </div>

            {/* copyright */}
            <div className="flex justify-between items-center px-8 py-4 max-sm:flex-col max-sm:gap-2 max-sm:items-start">
                <span className="text-[11px] text-background/30 uppercase tracking-[0.1em] font-medium">
                    Copyright © 2025 Rifandi Yusuf. All rights reserved.
                </span>
                <a
                    href="https://nextjs.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-background/30 uppercase tracking-[0.1em] font-medium hover:text-background/60 transition-colors"
                >
                    Built with Next.js
                </a>
            </div>

            <div className="w-full px-8 py-4 overflow-hidden text-background/10">
                <svg viewBox="0 0 984 210" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 207.36V2.56001H49.408C68.5227 2.56001 82.304 6.44268 90.752 14.208C99.2853 21.888 103.851 34.6453 104.448 52.48C104.619 57.2587 104.704 61.44 104.704 65.024C104.789 68.608 104.789 72.192 104.704 75.776C104.704 79.36 104.619 83.5413 104.448 88.32C104.107 99.4133 102.229 108.501 98.816 115.584C95.488 122.667 90.2827 128.085 83.2 131.84L107.264 207.36H66.56L47.104 138.24H38.4V207.36H0ZM38.4 104.448H49.408C54.784 104.448 58.8373 103.211 61.568 100.736C64.2987 98.2613 65.792 94.8053 66.048 90.368C66.304 86.1867 66.4747 81.8347 66.56 77.312C66.6453 72.704 66.6453 68.1387 66.56 63.616C66.4747 59.008 66.304 54.6133 66.048 50.432C65.792 45.9093 64.2987 42.4533 61.568 40.064C58.8373 37.5893 54.784 36.352 49.408 36.352H38.4V104.448Z"/>
                    <path d="M114.32 207.36V2.56001H152.72V207.36H114.32Z"/>
                    <path d="M165.64 207.36V2.56001H254.216V36.352H204.04V86.272H251.656V120.064H204.04V207.36H165.64Z"/>
                    <path d="M246.28 207.36L274.696 2.56001H335.112L363.528 207.36H324.104L319.752 164.608H290.056L285.704 207.36H246.28ZM293.64 130.816H316.168L311.56 85.504L308.488 36.352H301.32L298.248 85.504L293.64 130.816Z"/>
                    <path d="M368.53 207.36V2.56001H424.082L439.442 67.84L453.522 173.568H460.178L453.01 90.368L449.938 2.56001H487.058V207.36H428.69L413.33 140.288L402.834 36.096H395.666L402.322 128.768L405.65 207.36H368.53Z"/>
                    <path d="M499.85 207.36V2.56001H551.818C571.018 2.56001 584.885 6.65601 593.418 14.848C602.037 22.9547 606.517 36.352 606.858 55.04C607.114 66.9013 607.285 78.1653 607.37 88.832C607.455 99.4987 607.455 110.165 607.37 120.832C607.285 131.499 607.114 142.763 606.858 154.624C606.517 173.397 602.037 186.88 593.418 195.072C584.885 203.264 571.018 207.36 551.818 207.36H499.85ZM538.25 173.568H551.818C557.194 173.568 561.29 172.331 564.106 169.856C566.922 167.381 568.373 163.84 568.458 159.232C568.714 150.101 568.885 141.013 568.97 131.968C569.141 122.923 569.226 113.877 569.226 104.832C569.226 95.7867 569.141 86.7413 568.97 77.696C568.885 68.5653 568.714 59.4773 568.458 50.432C568.373 45.9093 566.922 42.4533 564.106 40.064C561.29 37.5893 557.194 36.352 551.818 36.352H538.25V173.568Z"/>
                    <path d="M618.92 207.36V2.56001H657.32V207.36H618.92Z"/>
                    <path d="M700.32 207.36V158.464L661.92 2.56001H701.088L712.096 52.224L715.936 112.384H723.104L726.944 52.224L737.952 2.56001H777.12L738.72 158.464V207.36H700.32Z"/>
                    <path d="M832.12 209.92C813.347 209.92 799.949 205.952 791.928 198.016C783.992 190.08 779.64 176.896 778.872 158.464C778.787 155.733 778.744 152.747 778.744 149.504C778.744 146.176 778.829 142.891 779 139.648C779.171 136.32 779.469 133.291 779.896 130.56H815.992C815.651 136.789 815.437 142.933 815.352 148.992C815.267 155.051 815.48 160.597 815.992 165.632C816.419 169.813 817.912 173.056 820.472 175.36C823.117 177.579 827 178.688 832.12 178.688C837.155 178.688 840.824 177.579 843.128 175.36C845.517 173.056 846.968 169.813 847.48 165.632C847.821 162.731 848.035 159.872 848.12 157.056C848.291 154.155 848.291 151.296 848.12 148.48C848.035 145.579 847.821 142.677 847.48 139.776C847.139 136.192 846.029 132.949 844.152 130.048C842.275 127.147 839.288 125.184 835.192 124.16L814.2 118.784C805.325 116.48 798.285 113.195 793.08 108.928C787.875 104.576 784.077 99.2 781.688 92.8C779.384 86.4 778.104 78.9333 777.848 70.4C777.763 66.6453 777.72 63.3173 777.72 60.416C777.72 57.4293 777.763 54.3573 777.848 51.2C778.36 38.9973 780.408 29.1413 783.992 21.632C787.661 14.1227 793.379 8.66134 801.144 5.248C808.909 1.74933 819.235 0 832.12 0C850.296 0 863.48 3.968 871.672 11.904C879.864 19.7547 884.344 32.8533 885.112 51.2C885.283 54.8693 885.283 59.3493 885.112 64.64C885.027 69.9307 884.856 74.8373 884.6 79.36H847.736C847.992 73.472 848.163 67.584 848.248 61.696C848.333 55.808 848.248 49.92 847.992 44.032C847.907 39.936 846.413 36.7787 843.512 34.56C840.696 32.3413 836.899 31.232 832.12 31.232C827 31.232 823.203 32.3413 820.728 34.56C818.253 36.7787 816.76 39.936 816.248 44.032C815.736 48.384 815.48 52.7787 815.48 57.216C815.48 61.6533 815.736 66.048 816.248 70.4C816.675 73.8133 817.869 76.928 819.832 79.744C821.795 82.56 824.952 84.48 829.304 85.504L847.48 89.856C857.037 92.16 864.547 95.5733 870.008 100.096C875.555 104.533 879.523 110.08 881.912 116.736C884.387 123.307 885.795 130.987 886.136 139.776C886.221 141.739 886.264 143.787 886.264 145.92C886.264 148.053 886.221 150.187 886.136 152.32C886.051 154.453 885.965 156.501 885.88 158.464C885.112 176.896 880.675 190.08 872.568 198.016C864.547 205.952 851.064 209.92 832.12 209.92Z"/>
                    <path d="M895.13 207.36V2.56001H983.706V36.352H933.53V86.272H981.146V120.064H933.53V207.36H895.13Z"/>
                </svg>
            </div>

        </footer >
    )
}

export default FooterSection