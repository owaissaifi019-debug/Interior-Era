"use client";

import { motion } from "framer-motion";
import { Compass, PenTool, Layout, Home } from "lucide-react";

const services = [
  {
    icon: <Compass className="w-8 h-8 mb-6 text-accent" />,
    title: "Space Planning",
    description: "Strategic layout optimization to maximize flow, functionality, and spatial harmony in your environment."
  },
  {
    icon: <PenTool className="w-8 h-8 mb-6 text-accent" />,
    title: "Interior Architecture",
    description: "Custom structural modifications, millwork design, and architectural detailing for a cohesive look."
  },
  {
    icon: <Layout className="w-8 h-8 mb-6 text-accent" />,
    title: "Furniture Selection",
    description: "Curated selection of premium furnishings, textiles, and art that reflect your personal style."
  },
  {
    icon: <Home className="w-8 h-8 mb-6 text-accent" />,
    title: "Project Management",
    description: "End-to-end oversight from concept to completion, ensuring quality and timely delivery."
  }
];

export default function ServicesSection() {
  return (
    <section className="py-32 bg-secondary/30">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-sm font-medium tracking-[0.2em] text-accent uppercase mb-4 block">Our Expertise</span>
          <h2 className="font-serif text-4xl md:text-5xl font-medium mb-6">Comprehensive Design Services</h2>
          <p className="text-muted-foreground text-lg text-balance">
            We offer a holistic approach to interior design, transforming your vision into an elegant reality through meticulous attention to detail.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-neutral-900/50 dark:border dark:border-neutral-800 p-10 hover:shadow-xl dark:hover:shadow-neutral-900/50 transition-shadow duration-300 group"
            >
              <div className="group-hover:-translate-y-2 transition-transform duration-300">
                {service.icon}
                <h3 className="font-serif text-2xl font-medium mb-4">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
