"use client";

import { motion } from "framer-motion";

export default function IdentitySection() {
  return (
    <section className="pt-20 md:pt-28 pb-0 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs uppercase tracking-[0.4em] text-accent mb-8 block font-medium"
        >
          Our Philosophy
        </motion.span>
        
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-4xl md:text-6xl lg:text-7xl font-medium leading-[1.1] max-w-5xl text-foreground"
        >
          Spaces Reflecting Your Identity
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed font-light"
        >
          We believe that true luxury lies in the details. Our approach blends architectural precision with an intuitive understanding of your lifestyle, resulting in environments that are not just beautiful, but deeply personal.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          whileInView={{ opacity: 1, scaleY: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-px h-24 bg-accent/40 mt-16 origin-top"
        />
      </div>
    </section>
  );
}
