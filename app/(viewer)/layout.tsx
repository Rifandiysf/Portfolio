import Navbar from "@/components/layout/Navbar";
import TransitionProvider from "@/lib/provider/TransitionProvider";
import ViewerWrapper from "@/components/layout/ViewerWrapper";

export default function ViewerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ViewerWrapper>
            <section className="relative z-50">
                <TransitionProvider>
                    <Navbar />
                </TransitionProvider>
            </section>

            <main className="relative z-10">{children}</main>
        </ViewerWrapper>
    );
}