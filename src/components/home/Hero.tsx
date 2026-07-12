"use client";

import { motion, useMotionValue, useMotionTemplate, useSpring, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const fallbackSlides = [
  {
    title: "Timeless Luxury \n For Modern Living",
    subtitle: "Redefining Spaces",
    image_url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2000",
    button_primary_text: "Explore Projects",
    button_primary_link: "/projects",
    button_secondary_text: "Get Consultation",
    button_secondary_link: "/contact"
  }
];

export default function Hero({ slides }: { slides?: any[] }) {
  const displaySlides = slides && slides.length > 0 ? slides : fallbackSlides;
  const [activeIndex, setActiveIndex] = useState(0);

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

  // Slide rotation interval
  useEffect(() => {
    if (displaySlides.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % displaySlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [displaySlides]);

  // Creates a spotlight effect that smoothly follows the cursor
  const maskImage = useMotionTemplate`radial-gradient(circle 350px at ${smoothX}px ${smoothY}px, black 0%, transparent 100%)`;

  const activeSlide = displaySlides[activeIndex];
  const bgStyle = { backgroundImage: `url(${activeSlide.image_url})` };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Dynamic Slide Background Layer */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={`bg-${activeIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {/* BASE LAYER: Blurred background image */}
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat brightness-[0.7] contrast-[1.05] saturate-[0.85] sepia-[0.05] dark:brightness-[0.9] dark:contrast-[1.05] dark:saturate-[0.85] dark:sepia-0 transition-all duration-1000"
            style={bgStyle}
          >
            <div className="absolute inset-0 backdrop-blur-md hero-blur-overlay" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent z-10" />
          </div>

          {/* MASK LAYER: Sharp background image revealed ONLY around the cursor */}
          <motion.div 
            className="absolute inset-0 z-[5] bg-cover bg-center bg-no-repeat brightness-[1.05] contrast-[1.05] saturate-[0.85] sepia-[0.05] dark:brightness-[0.95] dark:contrast-[1.3] dark:saturate-[0.85] dark:sepia-0"
            style={{ 
              ...bgStyle,
              maskImage: maskImage,
              WebkitMaskImage: maskImage,
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Hero Content */}
      <div className="container relative z-20 mx-auto px-6 md:px-12 text-center md:text-left flex flex-col items-center md:items-start text-white pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${activeIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center md:items-start"
          >
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-sm md:text-base uppercase tracking-[0.3em] font-medium mb-6 block drop-shadow-md"
            >
              {activeSlide.subtitle}
            </motion.span>
            
            <motion.h1 
              className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium leading-tight mb-8 max-w-4xl drop-shadow-2xl tracking-tight whitespace-pre-line"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              {activeSlide.title}
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="pointer-events-auto flex flex-col sm:flex-row gap-4"
            >
              {activeSlide.button_primary_text && (
                <Link 
                  href={activeSlide.button_primary_link || "/projects"}
                  className="inline-flex items-center justify-center space-x-3 bg-white text-neutral-900 dark:bg-accent dark:text-neutral-900 px-8 py-4 rounded-full font-medium hover:bg-accent hover:text-white dark:hover:bg-white dark:hover:text-accent transition-all duration-300 shadow-lg shadow-black/20"
                >
                  <span>{activeSlide.button_primary_text}</span>
                  <ArrowRight size={18} />
                </Link>
              )}
              {activeSlide.button_secondary_text && (
                <Link 
                  href={activeSlide.button_secondary_link || "/contact"}
                  className="inline-flex items-center justify-center space-x-3 bg-transparent border border-white/40 text-white px-8 py-4 rounded-full font-medium hover:bg-white/10 hover:border-white transition-all duration-300"
                >
                  <span>{activeSlide.button_secondary_text}</span>
                </Link>
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Indicators */}
      {displaySlides.length > 1 && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
          {displaySlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-12 h-1 rounded-full transition-all duration-500 ${
                activeIndex === idx ? "bg-accent w-16" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
