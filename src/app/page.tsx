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
import { createClient } from "@/utils/supabase/server";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const supabase = createClient();

  // Fetch Hero Slides
  const { data: slides } = await supabase
    .from("hero_slides")
    .select("*")
    .eq("is_enabled", true)
    .order("sort_order", { ascending: true });

  // Fetch Services
  const { data: services } = await supabase
    .from("services")
    .select("*")
    .eq("is_enabled", true)
    .order("sort_order", { ascending: true });

  // Fetch Testimonials
  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("*")
    .eq("is_enabled", true)
    .order("sort_order", { ascending: true });

  // Fetch Featured Projects
  const { data: featuredProjects } = await supabase
    .from("projects")
    .select("*")
    .eq("is_featured", true)
    .eq("is_published", true)
    .order("sort_order", { ascending: true });

  return (
    <>
      <Hero slides={slides || []} />
      <IdentitySection />
      <StatsSection />
      <ServicesSection services={services || []} />
      <WhyChooseUs />
      <CreativityShowcase />
      <MiniSlider />
      <Testimonials testimonials={testimonials || []} />
      <FeaturedProjects projects={featuredProjects || []} />
      <HomeContact />
    </>
  );
}
