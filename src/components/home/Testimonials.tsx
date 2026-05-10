"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Interior Era transformed our house into a home. Their attention to detail and ability to capture our essence in the design was truly remarkable. The result is a space that feels both luxurious and intimately ours.",
    author: "Sarah & James Harrison",
    role: "Private Residence Clients"
  },
  {
    quote: "Working with the team was a seamless experience. They elevated our corporate office to reflect our brand's luxury positioning while maintaining a highly functional workspace for our team.",
    author: "Michael Chang",
    role: "CEO, Vertex Capital"
  }
];

export default function Testimonials() {
  return (
    <section className="py-32 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/5 -skew-x-12 translate-x-32" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex justify-center mb-16">
          <Quote size={48} className="text-accent/50" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="border-l border-accent/30 pl-8 md:pl-12"
            >
              <p className="text-xl md:text-2xl leading-relaxed font-serif mb-8 text-primary-foreground/90">
                "{item.quote}"
              </p>
              <div>
                <h4 className="text-lg font-medium tracking-wide">{item.author}</h4>
                <span className="text-sm text-accent/80 uppercase tracking-wider block mt-1">
                  {item.role}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
