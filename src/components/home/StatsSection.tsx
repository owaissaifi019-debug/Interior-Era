"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";

import { Building2, Sparkles, Users, Palette, Award } from "lucide-react";

const defaultStats = [
  { value: 100, suffix: "+", label: "Successful Projects" },
  { value: 5, suffix: "+", label: "Years Experience" },
  { value: 50, suffix: "+", label: "Happy Clients" },
  { value: 100, suffix: "%", label: "Creative Designs" },
];

function StatIcon({ label }: { label: string }) {
  const l = (label || "").toLowerCase();
  const iconClass = "w-5 h-5 sm:w-6 sm:h-6 text-accent/80 group-hover:text-accent mb-2 transition-all duration-300 transform group-hover:scale-110";
  
  if (l.includes("project")) return <Building2 className={iconClass} />;
  if (l.includes("experience") || l.includes("year")) return <Sparkles className={iconClass} />;
  if (l.includes("client") || l.includes("happy")) return <Users className={iconClass} />;
  if (l.includes("creative") || l.includes("design")) return <Palette className={iconClass} />;
  return <Award className={iconClass} />;
}

export default function StatsSection({ stats }: { stats?: any[] }) {
  const displayStats = stats && stats.length === 4 ? stats : defaultStats;

  return (
    <section className="py-6 sm:py-10 md:py-16 bg-background relative overflow-hidden">
      {/* Ambient background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-64 bg-accent/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 md:gap-8">
          {displayStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-gradient-to-b from-card via-card/90 to-secondary/40 dark:from-neutral-900/90 dark:via-neutral-900/60 dark:to-neutral-950/80 backdrop-blur-md border border-border/70 dark:border-neutral-800/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_25px_-5px_rgba(0,0,0,0.4)] rounded-2xl p-5 sm:p-7 text-center flex flex-col items-center justify-center hover:border-accent/60 hover:shadow-xl hover:shadow-accent/10 transition-all duration-500 overflow-hidden"
            >
              {/* Golden shimmer top border line on hover */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Icon */}
              <StatIcon label={stat.label} />

              {/* CountUp Value */}
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-foreground group-hover:text-accent transition-colors duration-300 tracking-tight">
                <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} enableScrollSpy scrollSpyOnce />
              </div>

              {/* Golden dash line */}
              <div className="w-6 h-px bg-accent/40 my-2.5 group-hover:w-10 group-hover:bg-accent transition-all duration-300" />

              {/* Label */}
              <span className="text-[10px] sm:text-xs md:text-sm tracking-[0.22em] uppercase text-muted-foreground font-medium leading-relaxed">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
