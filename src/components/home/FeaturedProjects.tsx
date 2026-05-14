"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";

const projects = [
  {
    id: 1,
    title: "The Magnolia Residence",
    category: "Residential",
    image: "/Images/Residential Project/living_room.webp",
    link: "/projects/magnolia-residence",
  },
  {
    id: 2,
    title: "Vertex Capital HQ",
    category: "Commercial",
    image: "/Images/Aevom Office (Commercial  Project)/office_interior.webp",
    link: "/projects/vertex-capital",
  },
  {
    id: 3,
    title: "Araya Penthouse",
    category: "Residential",
    image: "/Images/Residential Project 2/living_room_image.webp",
    link: "/projects/araya-penthouse",
  },
  {
    id: 4,
    title: "The Heritage Villa",
    category: "Residential",
    image: "/Images/Residential Project/interior_image.webp",
    link: "/projects/heritage-villa",
  },
  {
    id: 5,
    title: "Aevom Executive Suite",
    category: "Commercial",
    image: "/Images/Aevom Office (Commercial  Project)/office_image.webp",
    link: "/projects/aevom-executive",
  },
  {
    id: 6,
    title: "Modern Minimalist",
    category: "Residential",
    image: "/Images/Residential Project 2/bedroom_image.webp",
    link: "/projects/modern-minimalist",
  },
];

export default function FeaturedProjects() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    dragFree: true,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="max-w-xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-4xl md:text-5xl font-medium mb-6"
            >
              Featured Works
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-lg text-balance"
            >
              A curated selection of our finest architectural and interior design projects, showcasing our commitment to excellence.
            </motion.p>
          </div>
          
          <div className="flex items-center space-x-6 mt-8 md:mt-0">
            <div className="flex space-x-2">
              <button 
                onClick={scrollPrev}
                className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={scrollNext}
                className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <ChevronRight size={20} />
              </button>
            </div>
            <Link 
              href="/projects"
              className="pb-1 border-b border-primary hover:text-accent hover:border-accent transition-colors font-medium tracking-wide uppercase text-sm flex items-center space-x-2 hidden md:flex"
            >
              <span>View All</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      <div className="embla pl-6 md:pl-12 lg:pl-24 xl:pl-32 cursor-grab active:cursor-grabbing" ref={emblaRef}>
        <div className="embla__container flex">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="embla__slide flex-[0_0_90%] md:flex-[0_0_60%] lg:flex-[0_0_40%] min-w-0 mr-8 group"
            >
              <Link href={project.link} className="flex flex-row bg-white dark:bg-neutral-900 border border-muted/50 hover:border-accent/50 transition-all duration-500 rounded-sm overflow-hidden h-[400px] md:h-[550px]">
                <div className="w-5/12 p-6 md:p-10 flex flex-col justify-center">
                  <span className="text-xs font-medium tracking-[0.2em] text-accent uppercase mb-3 block">
                    {project.category}
                  </span>
                  <h3 className="font-serif text-xl md:text-3xl font-medium mb-6 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <div className="mt-auto flex items-center text-sm font-medium tracking-[0.1em] uppercase text-foreground/70 group-hover:text-foreground">
                    <span className="mr-2">Explore</span>
                    <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
                <div className="w-7/12 relative h-full overflow-hidden">
                  <Image 
                    src={project.image} 
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  {/* Luxury overlay */}
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white dark:to-neutral-900 w-12 left-0 z-10" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
      
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
