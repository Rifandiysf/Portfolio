import AboutSection from "@/components/section/AboutSection";
import ContactSection from "@/components/section/ContactSection";
import ExperienceSection from "@/components/section/ExperienceSection";
import FooterSection from "@/components/section/FooterSection";
import HeroSection from "@/components/section/HeroSection"
import ProjectSection from "@/components/section/ProjectSection";

const Home = () => {
  return (
    <>
      <HeroSection
        subtitle="JUNIOR FRONTEND DEVELOPER"
        title="RIFANDI YUSUF"
        subline="BASED IN BANDUNG, INDONESIA"
      />
      <AboutSection />
      <ProjectSection />
      <ExperienceSection />
      <ContactSection />
      <FooterSection />
    </>
  );
};

export default Home;