"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const defaultFeatures = [
  "EXTREME CUSTOMIZATION",
  "WHITE-GLOVE SERVICE",
  "FULL TRANSPARENCY",
  "NO QUESTIONS ASKED AFTER HANDOVER SERVICE"
];

const fallbackTestimonials = [
  {
    quote: "I am sitting in my beautiful drawing room and feeling quite emotional. Getting this house redone was my dream but one which came with a lot of risks and uncertainties.",
    author: "PRERNA SHARMA",
    role: "BESTACH PARK VIEW SPA",
    image: "/Images/Residential Project/living_room.webp"
  },
  {
    quote: "We would like to thank Team Interia for making our house so beautiful. We are loving the interiors. We truly appreciate the effort you take to understand the client.",
    author: "DR PRASHANT BHANGUI",
    role: "ORCHID PETALS",
    image: "/Images/Residential Project (Civil Line Gurugram)/modern_bedroom.webp"
  },
  {
    quote: "We have enjoyed building our home with you, Umesh and the Interia Team and are delighted with how it's turned out.",
    author: "SUMIT SHARMA",
    role: "PIONEER ARAYA",
    image: "/Images/Residential Project 2/dining_room.webp"
  },
  {
    quote: "Their team brought a level of sophistication and modern elegance to our penthouse that we didn't know was possible. Every corner feels intentional and perfectly balanced.",
    author: "AMIT DESAI",
    role: "THE MAGNOLIAS",
    image: "/Images/Residential Project 2/living_room_image.webp"
  },
  {
    quote: "Professionalism at its peak. The entire journey from 3D renders to final execution was flawless. They delivered not just a house, but a true architectural masterpiece.",
    author: "KAVITA SINGH",
    role: "DLF CAMELLIAS",
    image: "/Images/Residential Project (DLF phase 4)/house_entrance.webp"
  }
];

export default function Testimonials({ testimonials, features }: { testimonials?: any[]; features?: string[] }) {
  const displayTestimonials = testimonials && testimonials.length > 0 ? testimonials : fallbackTestimonials;
  const displayFeatures = features && features.length === 4 ? features : defaultFeatures;

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
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
    <section className="py-8 sm:py-14 md:py-20 bg-black text-white relative overflow-hidden font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        
        {/* Top Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 sm:mb-10 gap-5">
          <div className="flex items-center justify-between w-full lg:w-auto">
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-neutral-200 font-light tracking-wide uppercase">
              Client Experience
            </h2>
            {/* Mobile Arrow Controls */}
            <div className="flex items-center space-x-2 lg:hidden">
              <button 
                onClick={scrollPrev}
                className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300 flex items-center justify-center active:scale-95"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={scrollNext}
                className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300 flex items-center justify-center active:scale-95"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Features 2x2 Grid on Mobile */}
          <div className="grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-2.5 w-full lg:w-auto">
            {displayFeatures.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-accent text-xs mt-[1px]">✦</span>
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.15em] font-medium text-neutral-300 leading-snug">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Cards Carousel Section */}
        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex -ml-4 sm:-ml-6">
            {displayTestimonials.map((item, index) => (
              <div key={index} className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pl-4 sm:pl-6 pb-2">
                <div className="flex flex-col h-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-white transition-all duration-300">
                  {/* Image Section */}
                  <div className="relative h-[135px] sm:h-[180px] w-full shrink-0">
                    <Image 
                      src={item.image_url || item.image}
                      alt={item.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  {/* Text Box */}
                  <div className="text-black p-4 sm:p-7 flex flex-col flex-1 justify-between">
                    <div className="text-xs sm:text-[13px] font-normal leading-relaxed text-neutral-700 mb-3 flex-1 font-sans">
                      "{item.quote}"
                    </div>
                    <div className="text-center pt-3 border-t border-neutral-100 mt-auto">
                      <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.15em] mb-0.5 text-neutral-900">{item.author}</h4>
                      <span className="text-[9px] sm:text-[10px] text-accent uppercase tracking-[0.15em] font-semibold">
                        {item.role}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Progress Indicator Dots */}
        <div className="flex justify-center items-center space-x-2 mt-4">
          {displayTestimonials.map((_, idx) => (
            <div 
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === selectedIndex ? "w-6 bg-accent" : "w-1.5 bg-neutral-800"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
