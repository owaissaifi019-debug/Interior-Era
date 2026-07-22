"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import CountUp from "react-countup";
import { ArrowRight, Sparkles, Building2, Users, Palette, Award, FileText, Calculator, Compass, Layers, Hammer, CheckCircle2, Key, Check, ChevronRight } from "lucide-react";

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
    subtitle: "Discovery & Vision Alignment",
    description: "Understanding your vision, lifestyle requirements, aesthetic preferences, and spatial goals in depth.",
    deliverable: "Spatial Strategy & Brief"
  },
  {
    number: "02",
    title: "Look and Feel",
    icon: Palette,
    subtitle: "Moodboards & Style Curation",
    description: "Formulating bespoke mood boards, color palettes, and structural design directions for your space.",
    deliverable: "Moodboards & Color Spec"
  },
  {
    number: "03",
    title: "Cost Estimation",
    icon: Calculator,
    subtitle: "Transparent Budgeting",
    description: "Itemized financial planning, transparent material costing, and turn-key estimate breakdown.",
    deliverable: "Itemized BOQ & Estimate"
  },
  {
    number: "04",
    title: "Concept Development",
    icon: Compass,
    subtitle: "3D Renders & Blueprints",
    description: "Creating photorealistic 3D renderings, spatial layouts, and detailed architectural blueprints.",
    deliverable: "3D Renders & Drawings"
  },
  {
    number: "05",
    title: "Material Selection",
    icon: Layers,
    subtitle: "Luxury Material Curation",
    description: "Handpicking luxury stones, fabrics, premium woods, lighting elements, and bespoke hardware finishes.",
    deliverable: "Physical Swatches & Hardware"
  },
  {
    number: "06",
    title: "Execution",
    icon: Hammer,
    subtitle: "Turnkey Site Construction",
    description: "On-site engineering supervision, custom carpentry fabrication, structural work, and installation.",
    deliverable: "Site Milestone Reports"
  },
  {
    number: "07",
    title: "Quality Check",
    icon: CheckCircle2,
    subtitle: "100+ Point Inspection",
    description: "Rigorous multi-stage quality control checking structural integrity, paint finish, and joinery accuracy.",
    deliverable: "Quality Sign-off Audit"
  },
  {
    number: "08",
    title: "Handover",
    icon: Key,
    subtitle: "Welcome to Your Space",
    description: "Deep cleaning, furniture styling, final walkthrough, and handover of your ready-to-live dream space.",
    deliverable: "Turnkey Key Handover"
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
  const [activeStepIndex, setActiveStepIndex] = useState<number | null>(null);

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
        {/* Ambient Glowing Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-accent/5 blur-[160px] pointer-events-none rounded-full" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-accent/5 blur-[100px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/25 text-accent text-[10px] sm:text-xs uppercase tracking-[0.25em] font-semibold mb-4"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Workflow & Methodology</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-3xl sm:text-5xl md:text-6xl font-medium text-foreground mb-4 tracking-tight"
            >
              Our Process
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-16 h-[2.5px] bg-gradient-to-r from-transparent via-accent to-transparent mx-auto rounded-full mb-6"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-muted-foreground text-xs sm:text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto"
            >
              We designed a refined 8-step process based on years of architectural & interior expertise for our valuable clients.
            </motion.p>
          </div>

          {/* Interactive Horizontal Scrollable Step Selector Bar */}
          <div className="mb-12 sm:mb-16 overflow-x-auto pb-4 pt-1 no-scrollbar flex items-center gap-2 sm:gap-3 justify-start md:justify-center">
            {processSteps.map((step, idx) => {
              const isActive = activeStepIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveStepIndex(isActive ? null : idx);
                    const el = document.getElementById(`process-card-${idx}`);
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth", block: "center" });
                    }
                  }}
                  className={`relative flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 shrink-0 border ${
                    isActive 
                      ? "border-accent text-accent-foreground bg-accent shadow-[0_0_20px_rgba(212,175,55,0.35)] scale-105 font-semibold" 
                      : "border-border/60 bg-secondary/30 dark:bg-neutral-900/60 text-muted-foreground hover:border-accent/40 hover:text-foreground"
                  }`}
                >
                  <span className={`font-serif ${isActive ? "text-accent-foreground font-bold" : "text-accent"}`}>
                    {step.number}
                  </span>
                  <span className="whitespace-nowrap">{step.title}</span>
                </button>
              );
            })}
          </div>

          {/* Process Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 lg:gap-8 relative">
            
            {processSteps.map((step, index) => {
              const IconComponent = step.icon;
              const isActive = activeStepIndex === index;

              return (
                <motion.div
                  id={`process-card-${index}`}
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.07,
                    ease: [0.215, 0.61, 0.355, 1] 
                  }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  onClick={() => setActiveStepIndex(isActive ? null : index)}
                  className={`group relative bg-card dark:bg-neutral-900/70 backdrop-blur-xl border rounded-2xl p-6 sm:p-7 transition-all duration-500 flex flex-col justify-between cursor-pointer overflow-hidden shadow-lg ${
                    isActive 
                      ? "border-accent ring-2 ring-accent/40 shadow-[0_15px_35px_-10px_rgba(212,175,55,0.3)] bg-accent/5" 
                      : "border-border/70 dark:border-neutral-800/80 hover:border-accent/60 hover:shadow-xl hover:shadow-accent/5"
                  }`}
                >
                  {/* Subtle Shimmer Bar on top border */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Top Bar: Number & Animated Icon Badge */}
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-accent group-hover:scale-110 transition-transform duration-500">
                          {step.number}
                        </span>
                        <span className="text-[10px] tracking-widest text-muted-foreground/60 uppercase font-mono">
                          / 08
                        </span>
                      </div>

                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border transition-all duration-500 ${
                        isActive 
                          ? "bg-accent text-accent-foreground border-accent shadow-md scale-110" 
                          : "bg-accent/10 border-accent/20 text-accent group-hover:bg-accent group-hover:text-accent-foreground group-hover:rotate-12 group-hover:scale-110 group-hover:shadow-md"
                      }`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Subtitle tag */}
                    <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold block mb-1.5 opacity-90">
                      {step.subtitle}
                    </span>

                    {/* Title */}
                    <h3 className="font-serif text-xl sm:text-2xl font-medium text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed font-light mb-6">
                      {step.description}
                    </p>
                  </div>

                  {/* Deliverable Badge at bottom */}
                  <div className="pt-4 border-t border-border/40 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-foreground/80 font-medium group-hover:text-accent transition-colors">
                      <Check className="w-3.5 h-3.5 text-accent shrink-0" />
                      <span className="truncate">{step.deliverable}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-accent/50 group-hover:text-accent group-hover:translate-x-1 transition-all shrink-0" />
                  </div>

                  {/* Hover background glow tint */}
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-accent/10 rounded-full blur-2xl group-hover:bg-accent/20 transition-all duration-500 pointer-events-none" />
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
