"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import CountUp from "react-countup";
import { ArrowRight, Sparkles, Building2, Users, Palette, Award, FileText, Calculator, Compass, Layers, Hammer, CheckCircle2, Key } from "lucide-react";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

const team = [
  {
    name: "Mohd Shahid",
    role: "Lead Interior Designer",
    image: "/img/project-3.jpeg",
    bio: "Bringing spaces to life with an unmatched eye for aesthetics, materiality, and bespoke furniture curation."
  },
  {
    name: "Ar. Mohd Anas",
    role: "Chief Architect",
    image: "/img/project-2.jpeg",
    bio: "The visionary behind our architectural marvels, blending contemporary luxury with timeless structural integrity."
  },
  {
    name: "Er. Owais Qarni",
    role: "Structural Engineer",
    image: "/img/project-1.jpeg",
    bio: "Ensuring every grand design is backed by rigorous engineering, ultimate safety, and flawless execution."
  }
];

const processSteps = [
  {
    number: "01",
    title: "Client Brief",
    icon: FileText,
    description: "Understanding your vision, lifestyle requirements, aesthetic preferences, and project goals."
  },
  {
    number: "02",
    title: "Look and Feel",
    icon: Palette,
    description: "Formulating mood boards, color palettes, and structural design directions for your space."
  },
  {
    number: "03",
    title: "Cost Estimation",
    icon: Calculator,
    description: "Transparent financial planning, itemized budgeting, and material specification breakdown."
  },
  {
    number: "04",
    title: "Concept Development",
    icon: Compass,
    description: "Creating 3D photorealistic renderings, spatial layouts, and architectural blueprints."
  },
  {
    number: "05",
    title: "Material Selection",
    icon: Layers,
    description: "Handpicking luxury stones, fabrics, premium woods, and bespoke hardware finishes."
  },
  {
    number: "06",
    title: "Execution",
    icon: Hammer,
    description: "Precision craftsmanship, structural engineering, and turnkey site construction."
  },
  {
    number: "07",
    title: "Quality Check",
    icon: CheckCircle2,
    description: "Rigorous multi-stage inspections ensuring absolute structural and finish perfection."
  },
  {
    number: "08",
    title: "Handover",
    icon: Key,
    description: "Delivering your fully styled, turnkey dream space ready for elegant living."
  }
];

function StatIcon({ label }: { label: string }) {
  const l = (label || "").toLowerCase();
  const iconClass = "w-5 h-5 text-accent mb-2";
  
  if (l.includes("project")) return <Building2 className={iconClass} />;
  if (l.includes("experience") || l.includes("year")) return <Sparkles className={iconClass} />;
  if (l.includes("client") || l.includes("happy")) return <Users className={iconClass} />;
  if (l.includes("creative") || l.includes("design")) return <Palette className={iconClass} />;
  return <Award className={iconClass} />;
}

export default function AboutClient({ stats }: { stats: StatItem[] }) {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden w-full font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[60vh] sm:h-[65vh] md:h-[75vh] w-full flex items-center justify-center overflow-hidden">
        <Image 
          src="/img/project-5.jpeg"
          alt="Interior Era Studio"
          fill
          className="object-cover brightness-[0.35]"
          priority
        />
        {/* Soft dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />

        <div className="relative z-10 text-center px-4 sm:px-6 mt-12 sm:mt-16 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-accent font-semibold mb-3 sm:mb-4 block">
              The Minds Behind The Magic
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-medium tracking-tight mb-4 sm:mb-6">
              Our Story
            </h1>
            <div className="w-12 sm:w-16 h-[2px] bg-accent/60 rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* 2. PHILOSOPHY & ADMIN STATS SECTION */}
      <section className="py-12 sm:py-20 md:py-28 relative">
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-72 bg-accent/5 blur-[130px] pointer-events-none rounded-full" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 relative z-10">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-center">
            
            {/* Image Box */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 relative h-[300px] sm:h-[420px] lg:h-[520px] w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-border/60 group"
            >
              <Image 
                src="/Images/Residential Project 2/living_room.webp"
                alt="Our Design Process"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.9]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Floating Badge */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 bg-black/70 backdrop-blur-md border border-white/20 p-4 rounded-xl text-white max-w-xs">
                <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold block mb-0.5">Bespoke Excellence</span>
                <p className="text-xs text-white/90 font-light">Crafted with architectural precision & curated luxury.</p>
              </div>
            </motion.div>
            
            {/* Text & Dynamic Admin Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="lg:w-1/2"
            >
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-2 sm:mb-3 block">
                Design Philosophy
              </span>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif mb-4 sm:mb-6 leading-tight text-foreground">
                Designing experiences, not just spaces.
              </h2>
              <p className="text-muted-foreground text-xs sm:text-base md:text-lg mb-4 sm:mb-6 leading-relaxed font-light">
                Interior Era is a multi-disciplinary design studio specializing in high-end residential, commercial, and hospitality projects. We believe our environments profoundly impact well-being and lifestyle.
              </p>
              <p className="text-muted-foreground text-xs sm:text-base md:text-lg mb-6 sm:mb-8 leading-relaxed font-light">
                Our approach marries timeless elegance with modern functionality. Every project is a bespoke journey, creating spaces that feel curated, intentional, and unmistakably yours.
              </p>
              
              {/* Dynamic Admin Stat Cards Grid */}
              <div className={`grid grid-cols-2 ${stats.length > 2 ? 'sm:grid-cols-2 lg:grid-cols-2' : 'grid-cols-2'} gap-3.5 sm:gap-6 border-t border-border/50 pt-6 sm:pt-8`}>
                {stats.map((stat, idx) => (
                  <div 
                    key={idx}
                    className="bg-secondary/40 dark:bg-neutral-900/60 backdrop-blur-md border border-border/60 rounded-xl sm:rounded-2xl p-4 sm:p-5 text-center group hover:border-accent/50 transition-all duration-300 flex flex-col items-center justify-center"
                  >
                    <StatIcon label={stat.label} />
                    <span className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold text-accent block mb-1">
                      <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} enableScrollSpy scrollSpyOnce />
                    </span>
                    <span className="text-[9px] sm:text-[10px] md:text-xs tracking-[0.18em] uppercase text-muted-foreground font-medium leading-normal">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. OUR PROCESS SECTION */}
      <section className="py-16 sm:py-24 md:py-32 relative bg-background border-t border-border/30 overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/5 blur-[140px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-20">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-accent font-semibold mb-3 block">
              Workflow & Methodology
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-medium text-foreground mb-4">
              Our Process
            </h2>
            <div className="w-16 h-[2px] bg-accent/60 mx-auto rounded-full mb-6" />
            <p className="text-muted-foreground text-xs sm:text-base md:text-lg font-light leading-relaxed">
              We designed a meticulous 8-step process based on years of architectural & interior experience for our valuable clients.
            </p>
          </div>

          {/* Process Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
            {processSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  className="group relative bg-secondary/30 dark:bg-neutral-900/50 backdrop-blur-md border border-border/60 dark:border-neutral-800/60 rounded-2xl p-6 sm:p-7 hover:border-accent/50 hover:bg-secondary/60 dark:hover:bg-neutral-900/90 transition-all duration-500 flex flex-col justify-between"
                >
                  {/* Top Bar: Step Number & Icon */}
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-serif text-3xl sm:text-4xl font-semibold text-accent/40 group-hover:text-accent transition-colors duration-500">
                        {step.number}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:scale-110 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-500">
                        <IconComponent className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="font-serif text-lg sm:text-xl font-medium text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed font-light">
                      {step.description}
                    </p>
                  </div>

                  {/* Subtle Bottom Accent Line */}
                  <div className="w-0 group-hover:w-full h-[2px] bg-accent/70 transition-all duration-500 rounded-full mt-6" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. THE VISIONARIES (LEADERSHIP) SECTION */}
      <section className="py-12 sm:py-20 md:py-28 bg-secondary/30 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 relative z-10">
          <div className="text-center mb-10 sm:mb-16">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-2 sm:mb-3 block">
              The Leadership
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium mb-3 sm:mb-4 text-foreground">
              The Visionaries
            </h2>
            <p className="text-muted-foreground text-xs sm:text-base md:text-lg max-w-xl mx-auto font-light leading-relaxed">
              Our multidisciplinary leadership brings together architecture, engineering, and interior styling to deliver flawless execution.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {team.map((member, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className="group relative bg-card dark:bg-neutral-900/80 backdrop-blur-md border border-border/70 dark:border-neutral-800/80 rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-xl hover:border-accent/50 hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                {/* Team Photo */}
                <div className="relative h-[280px] sm:h-[360px] lg:h-[400px] w-full mb-4 rounded-xl sm:rounded-2xl overflow-hidden bg-black">
                  <Image 
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out brightness-[0.9]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500" />
                  
                  {/* Floating role badge on image */}
                  <div className="absolute bottom-3 left-3 right-3 z-10 sm:hidden">
                    <span className="bg-black/70 backdrop-blur-md text-accent border border-accent/30 text-[9px] uppercase tracking-[0.2em] font-semibold px-3 py-1 rounded-full inline-block">
                      {member.role}
                    </span>
                  </div>
                </div>

                {/* Info Details */}
                <div className="text-center px-2 py-2">
                  <h3 className="font-serif text-xl sm:text-2xl font-medium mb-1 text-foreground group-hover:text-accent transition-colors">
                    {member.name}
                  </h3>
                  <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-accent font-semibold hidden sm:block mb-3">
                    {member.role}
                  </span>
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed font-light mt-2 sm:mt-0">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CTA SECTION */}
      <section className="py-16 sm:py-24 md:py-32 bg-primary text-primary-foreground text-center px-4 sm:px-6 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-48 bg-accent/10 blur-[100px] pointer-events-none rounded-full" />

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto relative z-10"
        >
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-medium mb-4 sm:mb-6">
            Ready to transform your space?
          </h2>
          <p className="text-primary-foreground/75 text-xs sm:text-lg md:text-xl font-light mb-8 sm:mb-10 max-w-xl mx-auto">
            Let our experts guide you through a seamless, luxury design journey.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center space-x-3 bg-accent text-accent-foreground px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl hover:bg-accent/90 transition-all duration-300 shadow-xl active:scale-[0.99] font-semibold tracking-[0.18em] uppercase text-xs sm:text-sm"
          >
            <span>Start Your Project</span>
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>

    </main>
  );
}
