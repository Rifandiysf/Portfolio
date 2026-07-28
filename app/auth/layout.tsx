import Noise from "@/components/Noise";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <section className="min-h-screen bg-background">
            <section className="fixed inset-0 w-full h-full z-[60] pointer-events-none">
                <Noise
                    patternSize={250}
                    patternScaleX={1}
                    patternScaleY={1}
                    patternRefreshInterval={2}
                    patternAlpha={15}
                />
            </section>

            <main className="relative z-10 min-h-screen flex items-center justify-center px-4">
                {children}
            </main>
        </section>
    );
}