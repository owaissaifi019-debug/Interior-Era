"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useState } from "react";

const fallbackProjects = [
  {
    id: 1,
    title: "The Magnolia Residence",
    category: "Residential",
    location: "Sector 54, Gurugram",
    scope: "Interior Design",
    image: "/Images/Residential Project/living_room.webp",
    link: "/projects?id=1",
  },
  {
    id: 9,
    title: "Aevom Corporate Office",
    category: "Commercial",
    location: "BKC, Mumbai",
    scope: "Office Design",
    image: "/Images/Aevom Office (Commercial  Project)/office_interior.webp",
    link: "/projects?id=9",
  },
  {
    id: 2,
    title: "Araya Penthouse Suite",
    category: "Bespoke",
    location: "Pioneer Araya, Gurugram",
    scope: "Bespoke Interior",
    image: "/Images/Residential Project 2/living_room_image.webp",
    link: "/projects?id=2",
  },
  {
    id: 5,
    title: "Elegance Villa DLF",
    category: "Architectural",
    location: "DLF Phase 4, Gurugram",
    scope: "Architecture & Interior",
    image: "/Images/Residential Project (Phase 4)/bathroom_design.webp",
    link: "/projects?id=5",
  },
  {
    id: 10,
    title: "Bihar State Auditorium",
    category: "Commercial",
    location: "Patna, Bihar",
    scope: "Commercial Interior",
    image: "/Images/Commercial Project (Auditorium Bihar)/auditorium_image.webp",
    link: "/projects?id=10",
  },
  {
    id: 3,
    title: "Civil Lines Apartment",
    category: "Residential",
    location: "Civil Lines, Gurugram",
    scope: "Luxury Interior",
    image: "/Images/Residential Project (Civil Line Gurugram)/interior-era.webp",
    link: "/projects?id=3",
  },
  {
    id: 12,
    title: "LD Sons Showroom",
    category: "Commercial",
    location: "South Extension, Delhi",
    scope: "Retail Interior",
    image: "/Images/Commercial Project 1 (LD sons South Extension)/jewelry_showroom.webp",
    link: "/projects?id=12",
  },
];

export default function FeaturedProjects({ 
  projects,
  subheader,
  title,
  description 
}: { 
  projects?: any[];
  subheader?: string;
  title?: string;
  description?: string;
}) {
  const displayProjects = projects && projects.length > 0 
    ? projects.map(p => ({
        id: p.id,
        title: p.title,
        category: p.category,
        location: p.location,
        scope: p.scope,
        image: p.image,
        link: `/projects?id=${p.id}`
      }))
    : fallbackProjects;

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-20">
          <div className="max-w-xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs font-semibold tracking-[0.3em] text-accent uppercase mb-4 block"
            >
              {subheader || "Selected Portfolio"}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-6 leading-[1.1]"
            >
              {title || "Featured Works"}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-lg text-balance font-light"
            >
              {description || "Hover to explore our finest residential, commercial, and bespoke design projects."}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-8 md:mt-0"
          >
            <Link
              href="/projects"
              className="pb-1 border-b border-primary hover:text-accent hover:border-accent transition-colors font-medium tracking-wide uppercase text-sm flex items-center space-x-2"
            >
              <span>View All Projects</span>
              <ArrowUpRight size={16} />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Asymmetric Split Layout */}
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-0 lg:gap-0 border border-muted/30 rounded-2xl overflow-hidden bg-card min-h-[600px] lg:min-h-[700px]">
          {/* LEFT COLUMN: Interactive project list */}
          <div className="w-full lg:w-[45%] xl:w-[40%] flex flex-col relative z-10">
            {displayProjects.map((project, index) => (
              <Link
                key={project.id}
                href={project.link}
                onMouseEnter={() => setActiveIndex(index)}
                className={`group flex items-center px-8 md:px-10 lg:px-12 py-6 lg:py-0 lg:flex-1 border-b border-muted/15 last:border-b-0 transition-all duration-500 relative ${
                  activeIndex === index
                    ? "bg-foreground text-background"
                    : "bg-transparent hover:bg-secondary/50"
                }`}
              >
                {/* Number */}
                <span
                  className={`font-serif text-2xl md:text-3xl mr-6 md:mr-8 transition-colors duration-500 tabular-nums w-10 shrink-0 ${
                    activeIndex === index
                      ? "text-accent"
                      : "text-muted-foreground/40"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Project Info */}
                <div className="flex-1 min-w-0">
                  <h3
                    className={`font-serif text-lg md:text-xl lg:text-2xl font-medium transition-colors duration-500 truncate ${
                      activeIndex === index ? "text-background" : "text-foreground"
                    }`}
                  >
                    {project.title}
                  </h3>
                  <div
                    className={`flex items-center space-x-3 mt-1 transition-all duration-500 ${
                      activeIndex === index
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-1 pointer-events-none lg:pointer-events-auto"
                    }`}
                  >
                    <span className="text-[10px] md:text-xs uppercase tracking-wider font-medium text-accent">
                      {project.scope}
                    </span>
                    <span
                      className={`text-[10px] md:text-xs transition-colors duration-500 ${
                        activeIndex === index
                          ? "text-background/50"
                          : "text-muted-foreground"
                      }`}
                    >
                      •
                    </span>
                    <span
                      className={`text-[10px] md:text-xs transition-colors duration-500 ${
                        activeIndex === index
                          ? "text-background/60"
                          : "text-muted-foreground"
                      }`}
                    >
                      {project.location}
                    </span>
                  </div>
                </div>

                {/* Arrow */}
                <ArrowRight
                  size={18}
                  className={`shrink-0 ml-4 transition-all duration-500 ${
                    activeIndex === index
                      ? "text-accent translate-x-0 opacity-100"
                      : "text-muted-foreground -translate-x-2 opacity-0"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* RIGHT COLUMN: Full-bleed dynamic image preview */}
          <div className="w-full lg:w-[55%] xl:w-[60%] relative h-[400px] lg:h-auto bg-black overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={displayProjects[activeIndex].id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={displayProjects[activeIndex].image}
                  alt={displayProjects[activeIndex].title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
                {/* Subtle gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Floating badge */}
            <div className="absolute bottom-6 right-6 z-10">
              <Link
                href={displayProjects[activeIndex].link}
                className="bg-white/10 backdrop-blur-lg border border-white/20 text-white px-5 py-3 rounded-full text-xs uppercase tracking-[0.2em] font-semibold hover:bg-accent hover:border-accent transition-all duration-300 flex items-center space-x-2 shadow-2xl"
              >
                <span>View Project</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>

            {/* Project title overlay on image for mobile */}
            <div className="absolute bottom-6 left-6 z-10 lg:hidden">
              <span className="text-xs uppercase tracking-widest text-accent font-semibold">
                {displayProjects[activeIndex].category}
              </span>
              <h3 className="text-white font-serif text-2xl font-medium mt-1 drop-shadow-lg">
                {displayProjects[activeIndex].title}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile - View All Link */}
      <div className="container mx-auto px-6 md:hidden mt-8">
        <Link
          href="/projects"
          className="inline-flex pb-1 border-b border-primary hover:text-accent hover:border-accent transition-colors font-medium tracking-wide uppercase text-sm items-center space-x-2"
        >
          <span>View All Projects</span>
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </section>
  );
}
