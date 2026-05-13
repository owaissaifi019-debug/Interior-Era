"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

const categories = [
  "ALL",
  "RESIDENTIAL INTERIOR DESIGN",
  "ARCHITECTURAL SERVICE",
  "ARCHITECTURAL & INTERIOR DESIGN",
  "TURNKEY EXECUTION",
  "CUSTOM FURNITURE",
  "OFFICE INTERIOR DESIGN",
  "RETAIL INTERIOR DESIGN",
  "BESPOKE INTERIOR DESIGN",
  "COMMERCIAL INTERIOR DESIGN"
];

const dummyProjects = [
  {
    id: 1,
    title: "The Magnolia Residence",
    category: "RESIDENTIAL INTERIOR DESIGN",
    location: "Gurugram",
    image: "/img/project-1.jpeg"
  },
  {
    id: 2,
    title: "Vertex Capital HQ",
    category: "OFFICE INTERIOR DESIGN",
    location: "New Delhi",
    image: "/img/project-2.jpeg"
  },
  {
    id: 3,
    title: "Araya Penthouse",
    category: "BESPOKE INTERIOR DESIGN",
    location: "Gurugram",
    image: "/img/project-3.jpeg"
  },
  {
    id: 4,
    title: "Lumina Boutique",
    category: "RETAIL INTERIOR DESIGN",
    location: "Mumbai",
    image: "/img/project-4.jpeg"
  },
  {
    id: 5,
    title: "The Heritage Villa",
    category: "ARCHITECTURAL & INTERIOR DESIGN",
    location: "Jaipur",
    image: "/img/project-5.jpeg"
  },
  {
    id: 6,
    title: "Artisan Lounge",
    category: "CUSTOM FURNITURE",
    location: "Bengaluru",
    image: "/img/project-6.jpeg"
  },
  {
    id: 7,
    title: "Oasis Resort Spa",
    category: "TURNKEY EXECUTION",
    location: "Goa",
    image: "/img/project-1.jpeg"
  },
  {
    id: 8,
    title: "Modern Minimalist",
    category: "RESIDENTIAL INTERIOR DESIGN",
    location: "Pune",
    image: "/img/project-2.jpeg"
  },
  {
    id: 9,
    title: "Tech Hub Tower",
    category: "COMMERCIAL INTERIOR DESIGN",
    location: "Hyderabad",
    image: "/img/project-3.jpeg"
  }
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("ALL");

  const filteredProjects = activeCategory === "ALL" 
    ? dummyProjects 
    : dummyProjects.filter(p => p.category === activeCategory);

  return (
    <main className="min-h-screen bg-background pt-24 md:pt-32">
      {/* Header Section */}
      <section className="px-6 md:px-12 lg:px-20 mb-16 md:mb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-accent font-medium mb-6 block">Our Portfolio</span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium leading-tight mb-8">Selected Works</h1>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed font-light">
            A curated showcase of our design excellence spanning across multiple disciplines. Discover spaces that inspire, function, and endure.
          </p>
        </motion.div>
      </section>

      {/* Categories Filter */}
      <section className="px-6 md:px-12 lg:px-20 mb-16">
        <div className="flex flex-wrap gap-3 md:gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-medium px-5 py-3 rounded-full border transition-all duration-300 ${
                activeCategory === cat 
                  ? "bg-foreground text-background border-foreground" 
                  : "bg-transparent text-foreground/70 border-muted hover:border-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-6 md:px-12 lg:px-20 pb-32 min-h-[50vh]">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="group cursor-pointer flex flex-col"
              >
                <div className="relative h-[400px] md:h-[500px] w-full mb-6 overflow-hidden rounded-sm">
                  <Image 
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                
                <div>
                  <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-accent font-medium mb-3 block">
                    {project.category}
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl font-medium mb-2 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-sm text-muted-foreground uppercase tracking-[0.1em]">
                    {project.location}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredProjects.length === 0 && (
          <div className="py-20 text-center text-muted-foreground">
            <p className="text-lg font-light">More projects coming soon to this category.</p>
          </div>
        )}
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
          <h2 className="font-serif text-4xl md:text-6xl font-medium mb-8">Have a project in mind?</h2>
          <p className="text-primary-foreground/70 text-lg md:text-xl font-light mb-12">
            Let our experts guide you through a seamless, luxury design journey.
          </p>
          <Link href="/contact" className="inline-flex items-center space-x-3 bg-white text-black px-8 py-4 rounded-sm hover:bg-accent hover:text-white transition-colors duration-300">
            <span className="text-sm font-medium tracking-[0.2em] uppercase">Get In Touch</span>
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
