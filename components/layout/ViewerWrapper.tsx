"use client";

import { usePathname, useSelectedLayoutSegments } from "next/navigation";
import Preloader from "@/components/ui/Preloader";
import ContactSection from "@/components/section/ContactSection";
import FooterSection from "@/components/section/FooterSection";
import { PreloaderProvider, usePreloader } from "@/lib/provider/PreloaderProvider";

function ViewerContent({ children }: { children: React.ReactNode }) {
    const { finished, markReady, markFinished } = usePreloader();
    const pathname = usePathname();
    const segments = useSelectedLayoutSegments();

    const isContact = pathname === "/contact";
    const isNotFound = segments.length === 0 && pathname !== "/";
    const hideContact = isContact || isNotFound;

    return (
        <>
            {!finished && <Preloader onReveal={markReady} onComplete={markFinished} />}

            {/* Konten tidak lagi disembunyikan dengan opacity: preloader sudah menutupinya,
                jadi konten (dan LCP) tidak perlu menunggu transisi fade tambahan. */}
            {children}
            {!hideContact && <ContactSection />}
            <FooterSection />
        </>
    );
}

export default function ViewerWrapper({ children }: { children: React.ReactNode }) {
    return (
        <PreloaderProvider>
            <ViewerContent>{children}</ViewerContent>
        </PreloaderProvider>
    );
}
