import Hero from "@/components/home/Hero";
import IdentitySection from "@/components/home/IdentitySection";
import StatsSection from "@/components/home/StatsSection";
import ServicesSection from "@/components/home/ServicesSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CreativityShowcase from "@/components/home/CreativityShowcase";
import MiniSlider from "@/components/home/MiniSlider";
import Testimonials from "@/components/home/Testimonials";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import HomeContact from "@/components/home/HomeContact";

export default function Home() {
  return (
    <>
      <Hero />
      <IdentitySection />
      <StatsSection />
      <ServicesSection />
      <WhyChooseUs />
      <CreativityShowcase />
      <MiniSlider />
      <Testimonials />
      <FeaturedProjects />
      <HomeContact />
    </>
  );
}
