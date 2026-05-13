"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const features = [
  "EXTREME CUSTOMIZATION",
  "WHITE-GLOVE SERVICE",
  "FULL TRANSPARENCY",
  "NO QUESTIONS ASKED AFTER HANDOVER SERVICE"
];

const testimonials = [
  {
    quote: "I am sitting in my beautiful drawing room and feeling quite emotional. Getting this house redone was my dream but one which came with a lot of risks and uncertainties around whether it will come out as I had imagined it or whether the investment will reflect when someone comes to the house.",
    author: "PRERNA SHARMA",
    role: "BESTACH PARK VIEW SPA",
    image: "/img/project-4.jpeg"
  },
  {
    quote: "We would like to thank Team Interia for making our house so beautiful. We are loving the interiors. We truly appreciate the effort you take to understand the client and modify things accordingly. It was a great experience for us and I also learned lot of new things and improved my vocabulary in home decor.",
    author: "DR PRASHANT BHANGUI",
    role: "ORCHID PETALS",
    image: "/img/project-5.jpeg"
  },
  {
    quote: "We have enjoyed building our home with you, Umesh and the Interia Team and are delighted with how it's turned out.",
    author: "SUMIT SHARMA",
    role: "PIONEER ARAYA",
    image: "/img/project-6.jpeg"
  },
  {
    quote: "Their team brought a level of sophistication and modern elegance to our penthouse that we didn't know was possible. Every corner feels intentional, perfectly balanced, and uniquely tailored to our lifestyle.",
    author: "AMIT DESAI",
    role: "THE MAGNOLIAS",
    image: "/img/project-1.jpeg"
  },
  {
    quote: "Professionalism at its peak. The entire journey from 3D renders to final execution was flawless. They delivered not just a beautiful house, but a true architectural masterpiece.",
    author: "KAVITA SINGH",
    role: "DLF CAMELLIAS",
    image: "/img/project-2.jpeg"
  }
];

export default function Testimonials() {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

  return (
    <section className="py-16 bg-black text-white relative overflow-hidden font-sans">
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-8">
          <h2 className="font-serif text-4xl md:text-5xl text-neutral-300 font-light tracking-wide uppercase">
            Client Experience
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <span className="text-neutral-400 mt-[2px] text-sm">✦</span>
                <span className="text-xs uppercase tracking-[0.15em] font-medium text-neutral-200 max-w-[200px] leading-relaxed">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Cards Carousel Section */}
        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex -ml-6">
            {testimonials.map((item, index) => (
              <div key={index} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pl-6 pb-8 pt-4">
                <div className="flex flex-col h-full rounded-3xl overflow-hidden shadow-2xl bg-white hover:scale-[1.02] transition-transform duration-500">
                  {/* Image Section */}
                  <div className="relative h-[180px] w-full shrink-0">
                    <Image 
                      src={item.image}
                      alt={item.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  {/* Text Box */}
                  <div className="text-black p-6 md:p-8 flex flex-col flex-1">
                    <div className="text-[12px] font-medium leading-[2.2] text-neutral-600 mb-8 flex-1 border-r-2 border-neutral-200 pr-5">
                      {item.quote}
                    </div>
                    <div className="text-center mt-auto border-t border-neutral-200 pt-6">
                      <h4 className="text-[12px] font-bold uppercase tracking-[0.15em] mb-1 text-neutral-900">{item.author}</h4>
                      <span className="text-[10px] text-neutral-400 uppercase tracking-[0.15em] font-medium">
                        {item.role}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
