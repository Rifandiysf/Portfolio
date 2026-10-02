import AboutSection from "@/components/section/AboutSection";
import ExperienceSection from "@/components/section/ExperienceSection";
import HeroSection from "@/components/section/HeroSection"
import ProjectSection from "@/components/section/ProjectSection";
import { getExperiences, getProjects } from "@/lib/services/api";

const Home = async () => {
  const [projects, experiences] = await Promise.all([getProjects(), getExperiences()])
  return (
    <>
      <HeroSection
        subtitle="JUNIOR FRONTEND DEVELOPER"
        title="RIFANDI YUSUF"
        subline="BASED IN BANDUNG, INDONESIA"
      />
      <AboutSection />
      <ProjectSection projects={projects}/>
      <ExperienceSection experiences={experiences}/>
    </>
  );
};

export default Home;