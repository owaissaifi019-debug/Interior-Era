"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, PenTool, Layout, Home, Lightbulb, Zap, ShieldCheck } from "lucide-react";

const serviceDetails = [
  {
    title: "Interior Architecture",
    description: "Our approach to interior architecture focuses on structural integrity and spatial flow. We don't just decorate; we redefine the very bones of your environment, ensuring every wall, floor, and ceiling serves a purpose in the grand narrative of your space.",
    image: "/Images/Aevom Office (Commercial  Project)/office_interior.webp",
    features: ["Structural Modifications", "Spatial Optimization", "Custom Millwork", "Technical Lighting"]
  },
  {
    title: "Residential Luxury",
    description: "Creating sanctuaries that reflect the soul of their inhabitants. Our residential designs balance timeless elegance with modern comforts, utilizing bespoke furniture and curated textures to craft environments that feel both grand and intimate.",
    image: "/Images/Residential Project/interior_image.webp",
    features: ["Bespoke Furniture", "Material Curation", "Art Integration", "Smart Home Tech"]
  },
  {
    title: "Commercial Excellence",
    description: "Elevating professional environments to inspire productivity and reflect corporate identity. We design workspaces that leave a lasting impression on clients and foster a culture of creativity and excellence for teams.",
    image: "/Images/Aevom Office (Commercial  Project)/office_image.webp",
    features: ["Brand Identity Design", "Ergonomic Layouts", "Acoustical Solutions", "Future-proof Tech"]
  }
];

const expertise = [
  { icon: <Compass size={24} />, title: "Strategy", desc: "Meticulous planning and concept development." },
  { icon: <PenTool size={24} />, title: "Creation", desc: "Bespoke design and detailed craftsmanship." },
  { icon: <Zap size={24} />, title: "Execution", desc: "Flawless on-site management and delivery." },
  { icon: <ShieldCheck size={24} />, title: "Quality", desc: "Unwavering commitment to excellence." }
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full flex items-center justify-center overflow-hidden">
        <Image 
          src="/Images/Aevom Office (Commercial  Project)/office_image.webp"
          alt="Interior Era Services"
          fill
          className="object-cover brightness-[0.5]"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 text-center px-6 mt-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-xs uppercase tracking-[0.4em] text-white/80 font-medium mb-6 block"
          >
            What We Do
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-medium mb-8"
          >
            Our Services
          </motion.h1>
          <motion.p
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.4 }}
             className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto font-light"
          >
            Transforming concepts into cinematic realities through architectural precision and bespoke artistry.
          </motion.p>
        </div>
      </section>

      {/* Expertise Quick Grid */}
      <section className="py-20 border-b border-muted/30">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {expertise.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center space-y-4"
              >
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                  {item.icon}
                </div>
                <h3 className="font-serif text-xl">{item.title}</h3>
                <p className="text-muted-foreground text-sm font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Services Sections */}
      {serviceDetails.map((service, index) => (
        <section key={index} className={`py-24 md:py-32 ${index % 2 === 1 ? 'bg-secondary/20' : ''}`}>
          <div className="container mx-auto px-6 md:px-12">
            <div className={`flex flex-col lg:flex-row gap-16 md:gap-24 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <motion.div 
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:w-1/2 relative h-[400px] md:h-[600px] w-full rounded-sm overflow-hidden group shadow-2xl"
              >
                <Image 
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 z-10" />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:w-1/2"
              >
                <span className="text-xs uppercase tracking-[0.3em] text-accent font-medium mb-4 block">Specialization 0{index + 1}</span>
                <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">{service.title}</h2>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed font-light">
                  {service.description}
                </p>
                
                <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-12">
                  {service.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-center space-x-3 text-sm text-foreground/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Link href="/contact" className="group inline-flex items-center space-x-4 text-sm font-medium tracking-[0.2em] uppercase">
                  <span>Inquire Now</span>
                  <div className="w-10 h-10 rounded-full border border-muted-foreground/30 flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:text-white transition-all duration-300">
                    <ArrowRight size={16} />
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* Philosophy Callout */}
      <section className="py-32 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl mb-10 leading-tight">
              "Design is not just what it looks like and feels like. Design is how it works."
            </h2>
            <div className="h-px w-24 bg-accent mx-auto mb-10" />
            <p className="text-primary-foreground/60 tracking-[0.4em] uppercase text-xs">Steve Jobs x Interior Era</p>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 text-center px-6 bg-background">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-4xl md:text-6xl font-medium mb-8">Ready to start?</h2>
          <p className="text-muted-foreground text-lg md:text-xl font-light mb-12">
            Let's discuss how we can transform your space into a cinematic masterpiece.
          </p>
          <Link href="/contact" className="inline-flex items-center space-x-3 bg-foreground text-background px-10 py-5 rounded-sm hover:bg-accent hover:text-white transition-all duration-300">
            <span className="text-sm font-medium tracking-[0.2em] uppercase">Get a Consultation</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}

