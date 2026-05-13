"use client";

import Image from "next/image";

const images = [
  "/img/project-1.jpeg",
  "/img/project-2.jpeg",
  "/img/project-3.jpeg",
  "/img/project-4.jpeg",
  "/img/project-5.jpeg",
  "/img/project-6.jpeg",
];

export default function MiniSlider() {
  return (
    <section className="py-24 bg-background overflow-hidden border-y border-muted/20 flex flex-col items-center">
      <span className="text-xs uppercase tracking-[0.4em] text-accent mb-12 block font-medium">Signature Details</span>
      
      <div className="w-full relative flex overflow-x-hidden group">
        <div className="flex whitespace-nowrap animate-[marquee_40s_linear_infinite] group-hover:[animation-play-state:paused]">
          {[...images, ...images, ...images].map((src, index) => (
            <div key={index} className="w-[200px] md:w-[350px] h-[150px] md:h-[250px] mx-4 md:mx-6 relative rounded-3xl overflow-hidden flex-shrink-0 border border-muted/30 shadow-lg">
              <Image 
                src={src}
                alt={`Interior detail ${index}`}
                fill
                className="object-cover transition-transform duration-700 hover:scale-110 saturate-[0.85] hover:saturate-100"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-3xl z-10 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.3333%);
          }
        }
      `}</style>
    </section>
  );
}
