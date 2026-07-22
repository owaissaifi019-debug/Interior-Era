"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { Sparkles, Palette, Compass, Layers, Award } from "lucide-react";

const reasons = [
  { 
    title: "Unbound Creativity", 
    tag: "Creative Direction",
    icon: Sparkles,
    desc: "We push the boundaries of conventional design to deliver spaces that are truly unique." 
  },
  { 
    title: "Personalized Designs", 
    tag: "Collaborative Vision",
    icon: Palette,
    desc: "Every project is a deeply collaborative process, ensuring your vision is perfectly realized." 
  },
  { 
    title: "Modern Execution", 
    tag: "Turnkey Engineering",
    icon: Compass,
    desc: "We leverage the latest materials, technology, and architectural methods." 
  },
  { 
    title: "Attention to Detail", 
    tag: "Master Craftsmanship",
    icon: Layers,
    desc: "From custom millwork to the precise placement of lighting, perfection is our standard." 
  },
  { 
    title: "Luxury Aesthetics", 
    tag: "Bespoke Material Curation",
    icon: Award,
    desc: "We curate high-end finishes, premium textiles, and bespoke furniture." 
  }
];

export default function WhyChooseUs() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress within the reasons list container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 60%", "end 60%"]
  });

  // Smooth out the scale Y animation
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Calculate the travelling node position
  const dotTop = useTransform(scaleY, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-16 sm:py-24 md:py-32 bg-background relative overflow-hidden font-sans border-t border-border/30">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-accent/5 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-accent/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 sm:px-6 md:px-16 lg:px-24 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Left Sticky Header */}
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="sticky top-32"
            >
              <span className="text-[10px] sm:text-xs font-semibold tracking-[0.3em] text-accent uppercase mb-3 sm:mb-4 block">
                The Interior Era Standard
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium mb-4 sm:mb-6 text-foreground">
                Why Choose Us
              </h2>
              <div className="w-16 h-[2px] bg-accent/60 rounded-full mb-6" />
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed font-light">
                We don't just design spaces; we curate experiences. Our commitment to excellence ensures that every project is a masterpiece of modern luxury.
              </p>
            </motion.div>
          </div>
          
          {/* Right Scrollable Column with Architectural Golden Thread */}
          <div className="lg:w-2/3 relative" ref={containerRef}>
            
            {/* Thread Timeline Track (Connecting Vertical Line) */}
            <div className="absolute left-[20px] sm:left-[26px] top-8 bottom-8 w-[2px] bg-accent/20 z-0">
              
              {/* Animated Glowing Gold Silk Thread */}
              <motion.div 
                style={{ scaleY }}
                className="w-full h-full bg-gradient-to-b from-amber-300 via-accent to-amber-500 origin-top shadow-[0_0_15px_rgba(212,175,55,0.9)]"
              />

              {/* Travelling Animated Diamond Orb Head */}
              <motion.div 
                style={{ top: dotTop }}
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-accent border-2 border-background shadow-[0_0_22px_rgba(212,175,55,1)] z-20 flex items-center justify-center"
              >
                <div className="w-2 h-2 rounded-full bg-white animate-ping opacity-90" />
              </motion.div>
            </div>

            {/* Reasons Cards List */}
            <div className="flex flex-col space-y-8 sm:space-y-10 relative z-10">
              {reasons.map((reason, index) => {
                const IconComponent = reason.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-60px" }}
                    transition={{ duration: 0.7, delay: index * 0.05 }}
                    className="group flex items-start pl-14 sm:pl-20 relative"
                  >
                    {/* Metallic Number Node Badge */}
                    <div className="absolute left-0 top-3 w-[42px] h-[42px] sm:w-[54px] sm:h-[54px] rounded-2xl bg-background border-2 border-accent/40 group-hover:border-accent text-accent flex items-center justify-center font-serif text-sm sm:text-base font-bold shadow-lg group-hover:scale-110 group-hover:bg-accent group-hover:text-accent-foreground group-hover:shadow-[0_0_30px_rgba(212,175,55,0.45)] transition-all duration-500 z-10">
                      0{index + 1}
                    </div>

                    {/* Architectural Luxury Card */}
                    <div className="w-full bg-card/60 dark:bg-neutral-900/60 backdrop-blur-xl border border-border/60 dark:border-neutral-800/80 rounded-2xl p-6 sm:p-8 hover:border-accent/60 hover:shadow-2xl hover:shadow-accent/5 transition-all duration-500 relative overflow-hidden group-hover:-translate-y-1">
                      
                      {/* Top Bar Tag & Icon */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] uppercase tracking-[0.25em] text-accent font-semibold flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                          {reason.tag}
                        </span>
                        <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:scale-110 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-500">
                          <IconComponent className="w-4 h-4" />
                        </div>
                      </div>

                      <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-medium mb-3 text-foreground group-hover:text-accent transition-colors duration-300">
                        {reason.title}
                      </h3>
                      
                      <p className="text-muted-foreground text-xs sm:text-base leading-relaxed font-light">
                        {reason.desc}
                      </p>

                      {/* Bottom Accent Highlight Line */}
                      <div className="w-0 group-hover:w-full h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent transition-all duration-700 rounded-full mt-6" />
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
