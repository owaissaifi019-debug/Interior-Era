"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "/img/project-2.jpeg",
  "/img/project-3.jpeg",
  "/img/project-4.jpeg"
];

export default function CreativityShowcase() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <section className="py-32 bg-secondary/20 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-20 lg:px-32">
        <div className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden rounded-sm">
          <div className="embla w-full h-full" ref={emblaRef}>
            <div className="embla__container flex w-full h-full">
              {images.map((src, index) => (
                <div key={index} className="embla__slide relative flex-[0_0_100%] min-w-0 w-full h-full">
                  <Image 
                    src={src} 
                    alt={`Design Creativity ${index + 1}`}
                    fill
                    className="object-cover brightness-[0.85]"
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div className="absolute inset-0 flex justify-between items-center px-4 md:px-8 pointer-events-none">
            <button 
              onClick={scrollPrev}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 pointer-events-auto"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={scrollNext}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 pointer-events-auto"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-0 left-0 md:left-12 bg-background/90 backdrop-blur-xl p-8 md:p-12 max-w-2xl border-t border-r border-white/10"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-accent font-medium mb-4 block">Design Philosophy</span>
            <h3 className="font-serif text-3xl md:text-4xl font-medium mb-6 leading-tight">Where Creativity Meets Architectural Precision.</h3>
            <p className="text-muted-foreground leading-relaxed font-light text-lg">
              Every curve, texture, and light source is meticulously considered. We blend bold, creative visions with rigorous technical execution to craft spaces that inspire and endure.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
