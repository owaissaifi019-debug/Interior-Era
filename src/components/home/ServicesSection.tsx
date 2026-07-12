"use client";

import { motion } from "framer-motion";
import { Compass, PenTool, Layout, Home, Lightbulb, Zap, ShieldCheck } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const fallbackServices = [
  { title: "Space Planning", description: "Strategic layout optimization to maximize flow, functionality, and spatial harmony in your environment.", icon_name: "Compass" },
  { title: "Interior Architecture", description: "Custom structural modifications, millwork design, and architectural detailing for a cohesive look.", icon_name: "PenTool" },
  { title: "Furniture Selection", description: "Curated selection of premium furnishings, textiles, and art that reflect your personal style.", icon_name: "Layout" },
  { title: "Project Management", description: "End-to-end oversight from concept to completion, ensuring quality and timely delivery.", icon_name: "Home" },
  { title: "3D Visualization", description: "Photorealistic rendering and virtual walkthroughs to perfectly visualize your new space.", icon_name: "Compass" },
  { title: "Custom Lighting", description: "Bespoke illumination design that sets the perfect mood and highlights architectural details.", icon_name: "PenTool" },
  { title: "Commercial Styling", description: "Elevated workspaces and hospitality environments that impress clients and inspire teams.", icon_name: "Layout" },
  { title: "Landscape Integration", description: "Seamlessly blending indoor luxury with outdoor serenity for a unified aesthetic.", icon_name: "Home" }
];

function ServiceIcon({ name, className }: { name: string; className?: string }) {
  switch (name) {
    case "Compass": return <Compass className={className} />;
    case "PenTool": return <PenTool className={className} />;
    case "Layout": return <Layout className={className} />;
    case "Home": return <Home className={className} />;
    case "Lightbulb": return <Lightbulb className={className} />;
    case "Zap": return <Zap className={className} />;
    case "ShieldCheck": return <ShieldCheck className={className} />;
    default: return <Compass className={className} />;
  }
}

export default function ServicesSection({ services }: { services?: any[] }) {
  const displayServices = services && services.length > 0 ? services : fallbackServices;

  const [emblaRef] = useEmblaCarousel({
    align: "start",
    loop: true,
    dragFree: true,
  }, [Autoplay({ delay: 3000, stopOnInteraction: false })]);

  return (
    <section className="py-32 bg-secondary/30 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="max-w-3xl flex flex-col items-center">
            <span className="text-xs font-medium tracking-[0.3em] text-accent uppercase mb-4 block">Our Expertise</span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-6">Comprehensive Design Services</h2>
            <p className="text-muted-foreground text-lg">
              We offer a holistic approach to interior design, transforming your vision into an elegant reality through meticulous attention to detail.
            </p>
          </div>
        </div>
      </div>

      <div className="embla pl-6 md:pl-12 lg:pl-[calc((100vw-1280px)/2+48px)] cursor-grab active:cursor-grabbing" ref={emblaRef}>
        <div className="embla__container flex">
          {displayServices.map((service, index) => (
            <motion.div
              key={service.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="embla__slide flex-[0_0_85%] md:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0 mr-8 group"
            >
              <div className="bg-white dark:bg-neutral-900 border border-transparent dark:border-neutral-800 p-12 h-full hover:border-accent/30 hover:shadow-2xl dark:hover:shadow-neutral-900 transition-all duration-500 rounded-sm">
                <div className="group-hover:-translate-y-2 transition-transform duration-500">
                  <ServiceIcon name={service.icon_name || "Compass"} className="w-10 h-10 mb-8 text-accent" />
                  <h3 className="font-serif text-2xl font-medium mb-4 group-hover:text-accent transition-colors">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed font-light">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
