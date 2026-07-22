"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "/Images/Residential Project 2/living_room.webp",
  "/Images/Residential Project (Civil Line Gurugram)/modern_bedroom.webp",
  "/Images/Residential Project (Phase 4)/bathroom_design.webp"
];

export default function CreativityShowcase() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 3500, stopOnInteraction: false })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  return (
    <section className="py-12 sm:py-20 md:py-32 bg-secondary/20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-20 lg:px-32">
        <div className="relative h-[65vh] sm:h-[70vh] md:h-[80vh] w-full overflow-hidden rounded-xl sm:rounded-2xl">
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
          
          {/* Navigation Controls - Always Visible on Top Right */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 z-30 flex items-center space-x-2">
            {/* Slide Index Counter */}
            <div className="bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-mono px-3 py-2 rounded-full hidden sm:block mr-1">
              0{selectedIndex + 1} / 0{images.length}
            </div>

            <button 
              onClick={scrollPrev}
              className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-300 active:scale-95 shadow-lg"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button 
              onClick={scrollNext}
              className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-300 active:scale-95 shadow-lg"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>

          {/* Text Overlay Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 md:right-auto md:left-12 md:bottom-8 bg-black/75 backdrop-blur-md p-5 sm:p-8 md:p-12 max-w-2xl border border-white/15 shadow-2xl rounded-2xl sm:rounded-3xl z-20"
          >
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-2 sm:mb-4 block">Design Philosophy</span>
            <h3 className="font-serif text-xl sm:text-3xl md:text-4xl font-medium mb-3 sm:mb-6 leading-tight text-white">Where Creativity Meets Architectural Precision.</h3>
            <p className="text-white/80 leading-relaxed font-light text-xs sm:text-base md:text-lg">
              Every curve, texture, and light source is meticulously considered. We blend bold, creative visions with rigorous technical execution to craft spaces that inspire and endure.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
