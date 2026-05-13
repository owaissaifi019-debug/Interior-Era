"use client";

import { motion, useMotionValue, useMotionTemplate, useSpring } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";

export default function Hero() {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  // Add smooth spring physics to the cursor tracking for a fluid, elegant animation
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    
    const handleMouseLeave = () => {
      // Move mask off-screen when mouse leaves
      mouseX.set(-1000);
      mouseY.set(-1000);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  // Creates a spotlight effect that smoothly follows the cursor
  const maskImage = useMotionTemplate`radial-gradient(circle 350px at ${smoothX}px ${smoothY}px, black 0%, transparent 100%)`;

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* BASE LAYER: Blurred background image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat brightness-[1.05] contrast-[1.05] saturate-[0.85] sepia-[0.05] dark:brightness-[0.9] dark:contrast-[1.05] dark:saturate-[0.85] dark:sepia-0"
        style={{ backgroundImage: "var(--hero-bg)" }}
      >
        <div className="absolute inset-0 backdrop-blur-md hero-blur-overlay" />
      </div>

      {/* MASK LAYER: Sharp background image revealed ONLY around the cursor */}
      <motion.div 
        className="absolute inset-0 z-[5] bg-cover bg-center bg-no-repeat brightness-[1.05] contrast-[1.05] saturate-[0.85] sepia-[0.05] dark:brightness-[0.95] dark:contrast-[1.3] dark:saturate-[0.85] dark:sepia-0"
        style={{ 
          backgroundImage: "var(--hero-bg)",
          maskImage: maskImage,
          WebkitMaskImage: maskImage,
        }}
      />

      {/* Hero Content */}
      <div className="container relative z-20 mx-auto px-6 md:px-12 text-center md:text-left flex flex-col items-center md:items-start text-white pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <span className="text-sm md:text-base uppercase tracking-[0.3em] font-medium mb-6 block drop-shadow-md">
            Redefining Spaces
          </span>
        </motion.div>
        
        <motion.h1 
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium leading-tight mb-8 max-w-4xl drop-shadow-2xl tracking-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          Timeless Luxury <br className="hidden md:block"/> For Modern Living
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="pointer-events-auto flex flex-col sm:flex-row gap-4"
        >
          <Link 
            href="/projects"
            className="inline-flex items-center justify-center space-x-3 bg-white text-neutral-900 dark:bg-accent dark:text-neutral-900 px-8 py-4 rounded-full font-medium hover:bg-accent hover:text-white dark:hover:bg-white dark:hover:text-accent transition-all duration-300 shadow-lg shadow-black/20"
          >
            <span>Explore Projects</span>
            <ArrowRight size={18} />
          </Link>
          <Link 
            href="/contact"
            className="inline-flex items-center justify-center space-x-3 bg-transparent border border-white/40 text-white px-8 py-4 rounded-full font-medium hover:bg-white/10 hover:border-white transition-all duration-300"
          >
            <span>Get Consultation</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
