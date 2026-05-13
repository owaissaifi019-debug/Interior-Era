"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";

const stats = [
  { value: 100, suffix: "+", label: "Successful Projects" },
  { value: 5, suffix: "+", label: "Years Experience" },
  { value: 50, suffix: "+", label: "Happy Clients" },
  { value: 100, suffix: "%", label: "Creative Designs" },
];

export default function StatsSection() {
  return (
    <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[url('/img/project-3.jpeg')] bg-cover bg-center mix-blend-overlay" />
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-primary-foreground/20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 w-full pt-8 md:pt-0 flex flex-col items-center justify-center group"
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium mb-4 text-primary-foreground group-hover:text-accent transition-colors duration-500 tracking-tight">
                <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} enableScrollSpy scrollSpyOnce />
              </div>
              <span className="text-xs md:text-sm tracking-[0.25em] uppercase text-primary-foreground/60 font-light">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
