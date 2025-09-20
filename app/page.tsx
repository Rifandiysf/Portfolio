import AboutSection from "@/components/section/AboutSection";
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
    </>
  );
};

export default Home;