import ScrollVelocity from "@/components/ScrollVelocity";
import AboutSection, { techStack } from "@/components/section/AboutSection";
import HeroSection from "@/components/section/HeroSection"

const Home = () => {
  return (
    <>
      <HeroSection
        subtitle="JUNIOR FRONTEND DEVELOPER"
        title="RIFANDI YUSUF"
        subline="BASED IN BANDUNG, INDONESIA"
      />
      <AboutSection />
      <ScrollVelocity
        texts={techStack}
        velocity={50}
        className="text-gray-800"
        parallaxClassName="py-8 mask-x-from-80% mask-x-to-100%"
      />
    </>
  );
};

export default Home;