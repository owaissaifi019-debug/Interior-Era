"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Minimalist Penthouse",
    category: "Residential",
    image: "/img/project-1.jpeg",
    link: "/projects/minimalist-penthouse",
  },
  {
    id: 2,
    title: "Modern Office Space",
    category: "Commercial",
    image: "/img/project-2.jpeg",
    link: "/projects/modern-office",
  },
  {
    id: 3,
    title: "Lakeside Retreat",
    category: "Hospitality",
    image: "/img/project-3.jpeg",
    link: "/projects/lakeside-retreat",
  },
  {
    id: 4,
    title: "Urban Loft",
    category: "Residential",
    image: "/img/project-4.jpeg",
    link: "/projects/urban-loft",
  },
  {
    id: 5,
    title: "Boutique Hotel",
    category: "Hospitality",
    image: "/img/project-5.jpeg",
    link: "/projects/boutique-hotel",
  },
  {
    id: 6,
    title: "Contemporary Villa",
    category: "Residential",
    image: "/img/project-6.jpeg",
    link: "/projects/contemporary-villa",
  },
];

export default function FeaturedProjects() {
  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="max-w-xl">
            <h2 className="font-serif text-4xl md:text-5xl font-medium mb-6">Featured Works</h2>
            <p className="text-muted-foreground text-lg text-balance">
              A curated selection of our finest architectural and interior design projects, showcasing our commitment to excellence.
            </p>
          </div>
          <Link 
            href="/projects"
            className="mt-8 md:mt-0 pb-1 border-b border-primary hover:text-accent hover:border-accent transition-colors font-medium tracking-wide uppercase text-sm flex items-center space-x-2"
          >
            <span>View All Projects</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`group cursor-pointer ${index % 2 !== 0 ? 'md:mt-24' : ''}`}
            >
              <Link href={project.link}>
                <div className="relative h-[400px] md:h-[600px] w-full overflow-hidden bg-secondary mb-6">
                  <Image 
                    src={project.image} 
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-[1.05] contrast-[1.05] saturate-[0.85] sepia-[0.05]"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-sm font-medium tracking-widest text-muted-foreground uppercase block mb-2">
                      {project.category}
                    </span>
                    <h3 className="font-serif text-2xl font-medium group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-primary flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
