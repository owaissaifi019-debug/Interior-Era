import Hero from "@/components/home/Hero";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import ServicesSection from "@/components/home/ServicesSection";
import Testimonials from "@/components/home/Testimonials";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <ServicesSection />
      <Testimonials />
      
      {/* CTA Section */}
      <section className="py-32 bg-background text-center px-6">
        <h2 className="font-serif text-4xl md:text-5xl font-medium mb-8">Ready to Transform Your Space?</h2>
        <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
          Let's collaborate to create an environment that perfectly aligns with your vision and lifestyle.
        </p>
        <Link 
          href="/contact"
          className="inline-block bg-primary text-primary-foreground px-10 py-4 rounded-full font-medium hover:bg-accent hover:text-white transition-colors duration-300 tracking-wide"
        >
          Start a Conversation
        </Link>
      </section>
    </>
  );
}
