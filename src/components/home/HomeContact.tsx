"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function HomeContact() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          firstName: formData.name, 
          lastName: "", 
          email: formData.email, 
          phone: formData.phone, 
          message: formData.message,
          city: "Homepage", 
          projectType: "N/A", 
          budget: "N/A" 
        })
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-20 lg:px-32">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          <div className="lg:w-1/2 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-xs font-medium tracking-[0.3em] text-accent uppercase mb-4 block">Get In Touch</span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-8 leading-tight">Start Your Journey.</h2>
              <p className="text-muted-foreground text-lg leading-relaxed font-light mb-12 max-w-lg">
                Ready to transform your space? Contact us today to schedule a consultation with our design experts. Let's create something extraordinary together.
              </p>
              
              <div className="flex flex-col space-y-6 text-foreground/80 font-light">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 border border-muted/50 rounded-full flex items-center justify-center">
                    <span className="text-accent text-sm">📍</span>
                  </div>
                  <span>123 Luxury Avenue, Design District</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 border border-muted/50 rounded-full flex items-center justify-center">
                    <span className="text-accent text-sm">📞</span>
                  </div>
                  <span>+91 9876543210</span>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="lg:w-1/2 relative">
            {/* Soft background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-accent/5 blur-[100px] rounded-full z-0 pointer-events-none" />
            
            <motion.form 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onSubmit={handleSubmit} 
              className="relative z-10 bg-white dark:bg-neutral-900 p-10 md:p-14 border border-muted dark:border-neutral-800 shadow-2xl rounded-sm space-y-8"
            >
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Full Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border-b border-muted dark:border-neutral-800 py-2 bg-transparent focus:outline-none focus:border-accent transition-colors text-foreground" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Email Address</label>
                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full border-b border-muted dark:border-neutral-800 py-2 bg-transparent focus:outline-none focus:border-accent transition-colors text-foreground" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Phone Number</label>
                <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full border-b border-muted dark:border-neutral-800 py-2 bg-transparent focus:outline-none focus:border-accent transition-colors text-foreground" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Message</label>
                <textarea required rows={3} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full border-b border-muted dark:border-neutral-800 py-2 bg-transparent focus:outline-none focus:border-accent transition-colors resize-none text-foreground"></textarea>
              </div>
              
              <button 
                type="submit" 
                disabled={status === "submitting"}
                className="w-full bg-primary text-primary-foreground py-4 hover:bg-accent hover:text-white transition-colors tracking-[0.2em] uppercase text-sm font-medium disabled:opacity-50"
              >
                {status === "submitting" ? "Sending..." : "Submit Inquiry"}
              </button>
              
              {status === "success" && <p className="text-green-500 text-sm mt-4 text-center">Message sent successfully!</p>}
              {status === "error" && <p className="text-red-500 text-sm mt-4 text-center">An error occurred. Please try again.</p>}
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}
