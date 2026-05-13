"use client";

import { motion } from "framer-motion";

const reasons = [
  { title: "Unbound Creativity", desc: "We push the boundaries of conventional design to deliver spaces that are truly unique." },
  { title: "Personalized Designs", desc: "Every project is a deeply collaborative process, ensuring your vision is perfectly realized." },
  { title: "Modern Execution", desc: "We leverage the latest materials, technology, and architectural methods." },
  { title: "Attention to Detail", desc: "From custom millwork to the precise placement of lighting, perfection is our standard." },
  { title: "Luxury Aesthetics", desc: "We curate high-end finishes, premium textiles, and bespoke furniture." }
];

export default function WhyChooseUs() {
  return (
    <section className="py-32 bg-background relative">
      <div className="container mx-auto px-6 md:px-20 lg:px-32">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="sticky top-32"
            >
              <span className="text-xs font-medium tracking-[0.3em] text-accent uppercase mb-4 block">The Interior Era Standard</span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-6">Why Choose Us</h2>
              <p className="text-muted-foreground text-lg leading-relaxed font-light">
                We don't just design spaces; we curate experiences. Our commitment to excellence ensures that every project is a masterpiece of modern luxury.
              </p>
            </motion.div>
          </div>
          
          <div className="lg:w-2/3">
            <div className="flex flex-col space-y-12">
              {reasons.map((reason, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="group"
                >
                  <div className={`flex items-start transition-colors duration-500 group-hover:border-accent/50 ${index !== reasons.length - 1 ? "border-b border-muted/30 pb-12" : "border-b-0 pb-0"}`}>
                    <span className="text-2xl font-serif text-accent/50 mr-8 w-8 mt-1">0{index + 1}</span>
                    <div>
                      <h3 className="font-serif text-2xl md:text-3xl font-medium mb-4 group-hover:text-accent transition-colors duration-500">{reason.title}</h3>
                      <p className="text-muted-foreground text-lg leading-relaxed font-light max-w-xl">{reason.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
