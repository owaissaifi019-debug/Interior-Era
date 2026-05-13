"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center overflow-hidden">
        <Image 
          src="/img/project-5.jpeg"
          alt="Interior Era Studio"
          fill
          className="object-cover brightness-[0.4]"
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 text-center px-6 mt-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-xs uppercase tracking-[0.3em] text-white/80 font-medium mb-6 block"
          >
            The Minds Behind The Magic
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-medium mb-6"
          >
            Our Story
          </motion.h1>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 relative h-[500px] w-full rounded-sm overflow-hidden"
            >
              <Image 
                src="/img/project-4.jpeg"
                alt="Our Design Process"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 z-10" />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:w-1/2"
            >
              <span className="text-xs uppercase tracking-[0.3em] text-accent font-medium mb-4 block">Design Philosophy</span>
              <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">Designing experiences, not just spaces.</h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed font-light">
                Interior Era is a multi-disciplinary design studio specializing in high-end residential, commercial, and hospitality projects. We were founded on the belief that our environments profoundly impact our well-being.
              </p>
              <p className="text-muted-foreground text-lg mb-12 leading-relaxed font-light">
                Our approach marries timeless elegance with modern functionality. Every project is a bespoke journey, creating spaces that feel curated, intentional, and unmistakably yours.
              </p>
              
              <div className="grid grid-cols-2 gap-12 border-t border-muted/30 pt-12">
                <div>
                  <span className="text-5xl font-serif text-accent block mb-3">15+</span>
                  <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium">Years Experience</span>
                </div>
                <div>
                  <span className="text-5xl font-serif text-accent block mb-3">120+</span>
                  <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium">Projects Completed</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Visionaries (Team) Section */}
      <section className="py-24 md:py-32 bg-secondary/30 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="text-center mb-20">
            <span className="text-xs uppercase tracking-[0.3em] text-accent font-medium mb-4 block">The Leadership</span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-6">The Visionaries</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light">
              Our multidisciplinary leadership brings together architecture, engineering, and interior styling to deliver flawless execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {team.map((member, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group cursor-pointer"
              >
                <div className="relative h-[400px] lg:h-[500px] w-full mb-8 overflow-hidden rounded-sm">
                  <Image 
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
                </div>
                <div className="text-center px-4">
                  <h3 className="font-serif text-2xl mb-2">{member.name}</h3>
                  <span className="text-xs uppercase tracking-[0.2em] text-accent font-medium block mb-4">
                    {member.role}
                  </span>
                  <p className="text-muted-foreground text-sm leading-relaxed font-light">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-primary text-primary-foreground text-center px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="font-serif text-4xl md:text-6xl font-medium mb-8">Ready to transform your space?</h2>
          <p className="text-primary-foreground/70 text-lg md:text-xl font-light mb-12">
            Let our experts guide you through a seamless, luxury design journey.
          </p>
          <Link href="/contact" className="inline-flex items-center space-x-3 bg-white text-black px-8 py-4 rounded-sm hover:bg-accent hover:text-white transition-colors duration-300">
            <span className="text-sm font-medium tracking-[0.2em] uppercase">Start Your Project</span>
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>

    </main>
  );
}
