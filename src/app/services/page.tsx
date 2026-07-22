"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, PenTool, Zap, ShieldCheck, CheckCircle2 } from "lucide-react";

const serviceDetails = [
  {
    title: "Interior Architecture",
    subtitle: "Structural Modifications & Spatial Flow",
    description: "Our approach to interior architecture focuses on structural integrity and spatial flow. We don't just decorate; we redefine the very bones of your environment, ensuring every wall, floor, and ceiling serves a purpose in the grand narrative of your space.",
    image: "/Images/Aevom Office (Commercial  Project)/office_interior.webp",
    features: ["Structural Modifications", "Spatial Optimization", "Custom Millwork", "Technical Lighting"]
  },
  {
    title: "Residential Luxury",
    subtitle: "Sanctuaries for Modern Living",
    description: "Creating sanctuaries that reflect the soul of their inhabitants. Our residential designs balance timeless elegance with modern comforts, utilizing bespoke furniture and curated textures to craft environments that feel both grand and intimate.",
    image: "/Images/Residential Project/interior_image.webp",
    features: ["Bespoke Furniture", "Material Curation", "Art Integration", "Smart Home Tech"]
  },
  {
    title: "Commercial Excellence",
    subtitle: "Workspaces that Inspire Innovation",
    description: "Elevating professional environments to inspire productivity and reflect corporate identity. We design workspaces that leave a lasting impression on clients and foster a culture of creativity and excellence for teams.",
    image: "/Images/Aevom Office (Commercial  Project)/office_image.webp",
    features: ["Brand Identity Design", "Ergonomic Layouts", "Acoustical Solutions", "Future-proof Tech"]
  }
];

const expertise = [
  { icon: <Compass className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />, title: "Strategy", desc: "Meticulous concept development & spatial planning." },
  { icon: <PenTool className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />, title: "Creation", desc: "Bespoke design, materiality & detailed craftsmanship." },
  { icon: <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />, title: "Execution", desc: "Flawless on-site project management & turn-key delivery." },
  { icon: <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />, title: "Quality", desc: "Unwavering commitment to architectural perfection." }
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden w-full font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[60vh] sm:h-[65vh] md:h-[75vh] w-full flex items-center justify-center overflow-hidden">
        <Image 
          src="/Images/Aevom Office (Commercial  Project)/office_image.webp"
          alt="Interior Era Services"
          fill
          className="object-cover brightness-[0.35]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
        
        <div className="relative z-10 text-center px-4 sm:px-6 mt-12 sm:mt-16 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-accent font-semibold mb-3 sm:mb-4 block">
              What We Do
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-medium tracking-tight mb-4 sm:mb-6">
              Our Services
            </h1>
            <p className="text-white/80 text-xs sm:text-base md:text-lg max-w-xl mx-auto font-light leading-relaxed mb-4">
              Transforming concepts into cinematic realities through architectural precision and bespoke artistry.
            </p>
            <div className="w-12 sm:w-16 h-[2px] bg-accent/60 rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* 2. EXPERTISE QUICK GRID */}
      <section className="py-10 sm:py-16 md:py-20 relative border-b border-border/40">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-6 md:gap-8">
            {expertise.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="group bg-card/60 dark:bg-neutral-900/60 backdrop-blur-md border border-border/70 dark:border-neutral-800/80 rounded-2xl p-4 sm:p-6 text-center flex flex-col items-center justify-center hover:border-accent/50 transition-all duration-300 shadow-md"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-medium text-foreground mb-1">{item.title}</h3>
                <p className="text-muted-foreground text-[10px] sm:text-xs font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. DETAILED SERVICES SECTIONS */}
      <div className="space-y-12 sm:space-y-20 md:space-y-28 py-12 sm:py-20">
        {serviceDetails.map((service, index) => (
          <section key={index} className="px-4 sm:px-6 md:px-12 lg:px-20">
            <div className="max-w-6xl mx-auto">
              <div className={`flex flex-col lg:flex-row gap-8 lg:gap-20 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                
                {/* Service Image Card */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8 }}
                  className="lg:w-1/2 relative h-[280px] sm:h-[400px] md:h-[500px] w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-border/60 group"
                >
                  <Image 
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105 brightness-[0.9]"
                    sizes="(max-w-768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  
                  {/* Floating Specialization Counter Badge */}
                  <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md border border-white/20 px-3.5 py-1 rounded-full">
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] font-semibold text-accent">
                      Specialization 0{index + 1}
                    </span>
                  </div>

                  {/* Image Bottom Tag */}
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 text-white max-w-sm">
                    <h4 className="font-serif text-lg sm:text-xl font-medium mb-0.5">{service.title}</h4>
                    <p className="text-xs text-white/80 font-light truncate">{service.subtitle}</p>
                  </div>
                </motion.div>
                
                {/* Service Content */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: 0.15 }}
                  className="lg:w-1/2"
                >
                  <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-2 block">
                    0{index + 1} / Discipline
                  </span>
                  <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif mb-4 sm:mb-6 leading-tight text-foreground">
                    {service.title}
                  </h2>
                  <p className="text-muted-foreground text-xs sm:text-base md:text-lg mb-6 sm:mb-8 leading-relaxed font-light">
                    {service.description}
                  </p>
                  
                  {/* Features 2x2 Grid */}
                  <div className="grid grid-cols-2 gap-3.5 sm:gap-4 mb-8 sm:mb-10 border-t border-border/40 pt-6">
                    {service.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-center space-x-2.5 bg-secondary/30 dark:bg-neutral-900/40 p-3 rounded-xl border border-border/50">
                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                        <span className="text-xs sm:text-sm font-medium text-foreground/90">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Inquire CTA Button */}
                  <Link 
                    href="/contact" 
                    className="inline-flex items-center space-x-2.5 bg-accent text-accent-foreground px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl hover:bg-accent/90 transition-all duration-300 shadow-md font-semibold tracking-[0.18em] uppercase text-xs active:scale-[0.99]"
                  >
                    <span>Inquire Now</span>
                    <ArrowRight size={16} />
                  </Link>
                </motion.div>

              </div>
            </div>
          </section>
        ))}
      </div>

      {/* 4. PHILOSOPHY QUOTE SECTION */}
      <section className="py-16 sm:py-24 md:py-32 bg-primary text-primary-foreground text-center px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-48 bg-accent/10 blur-[120px] pointer-events-none rounded-full" />

        <div className="container mx-auto max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 sm:mb-8 leading-tight">
              "Design is not just what it looks like and feels like. Design is how it works."
            </h2>
            <div className="h-[2px] w-16 sm:w-24 bg-accent mx-auto mb-6 sm:mb-8 rounded-full" />
            <p className="text-primary-foreground/70 tracking-[0.35em] uppercase text-[10px] sm:text-xs font-medium">
              Steve Jobs x Interior Era Studio
            </p>
          </motion.div>
        </div>
      </section>

      {/* 5. FINAL CONSULTATION CTA */}
      <section className="py-16 sm:py-24 md:py-32 text-center px-4 sm:px-6 bg-background">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-medium mb-4 sm:mb-6 text-foreground">
            Ready to start?
          </h2>
          <p className="text-muted-foreground text-xs sm:text-lg md:text-xl font-light mb-8 sm:mb-10 max-w-xl mx-auto leading-relaxed">
            Let's discuss how we can transform your space into a architectural masterpiece.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center space-x-3 bg-accent text-accent-foreground px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl hover:bg-accent/90 transition-all duration-300 shadow-xl font-semibold tracking-[0.18em] uppercase text-xs sm:text-sm active:scale-[0.99]"
          >
            <span>Get a Consultation</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

    </main>
  );
}

