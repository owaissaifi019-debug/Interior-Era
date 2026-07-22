"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { MapPin, Phone, Mail, Send, CheckCircle2 } from "lucide-react";

export default function HomeContact({ settings }: { settings?: any }) {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const studioAddress = settings?.address || "123 Luxury Avenue, Design District";
  const studioPhone = settings?.phone || "+91 9876543210";
  const studioEmail = settings?.email || "";

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
    <section className="py-8 sm:py-16 md:py-24 bg-background relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-72 bg-accent/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 sm:px-6 md:px-20 lg:px-32 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
          
          {/* Left Column: Text & Contact Info */}
          <div className="lg:w-5/12 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-[10px] sm:text-xs font-semibold tracking-[0.3em] text-accent uppercase mb-2 sm:mb-4 block">
                Get In Touch
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-medium mb-3 sm:mb-6 leading-tight">
                Start Your Journey.
              </h2>
              <p className="text-muted-foreground text-xs sm:text-base md:text-lg leading-relaxed font-light mb-6 sm:mb-8 max-w-lg">
                Ready to transform your space? Contact us today to schedule a design consultation with our experts.
              </p>
              
              {/* Contact Info Items - Shown on Desktop only */}
              <div className="hidden lg:grid grid-cols-1 gap-3 sm:gap-4 text-foreground/90 font-light">
                <div className="flex items-center space-x-3 bg-secondary/30 dark:bg-neutral-900/50 p-3 sm:p-4 rounded-xl border border-border/50">
                  <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 text-accent flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium leading-relaxed">{studioAddress}</span>
                </div>
                
                <div className="flex items-center space-x-3 bg-secondary/30 dark:bg-neutral-900/50 p-3 sm:p-4 rounded-xl border border-border/50">
                  <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 text-accent flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium">{studioPhone}</span>
                </div>

                {studioEmail && (
                  <div className="flex items-center space-x-3 bg-secondary/30 dark:bg-neutral-900/50 p-3 sm:p-4 rounded-xl border border-border/50">
                    <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 text-accent flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium truncate">{studioEmail}</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
          
          {/* Right Column: Form Card */}
          <div className="lg:w-7/12 w-full relative">
            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onSubmit={handleSubmit} 
              className="relative z-10 bg-card dark:bg-neutral-900/90 p-5 sm:p-8 md:p-10 border border-border/70 dark:border-neutral-800 shadow-2xl rounded-2xl sm:rounded-3xl space-y-4 sm:space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] sm:text-xs uppercase tracking-[0.18em] text-muted-foreground font-medium mb-1.5">
                    Full Name *
                  </label>
                  <input 
                    required 
                    type="text" 
                    placeholder="Owais Qarni"
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})} 
                    className="w-full border border-border/60 dark:border-neutral-800 rounded-xl px-4 py-2.5 bg-background/50 focus:outline-none focus:border-accent transition-colors text-xs sm:text-sm text-foreground" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] sm:text-xs uppercase tracking-[0.18em] text-muted-foreground font-medium mb-1.5">
                    Phone Number
                  </label>
                  <input 
                    type="tel" 
                    placeholder="+91 98765 43210"
                    value={formData.phone} 
                    onChange={e => setFormData({...formData, phone: e.target.value})} 
                    className="w-full border border-border/60 dark:border-neutral-800 rounded-xl px-4 py-2.5 bg-background/50 focus:outline-none focus:border-accent transition-colors text-xs sm:text-sm text-foreground" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] sm:text-xs uppercase tracking-[0.18em] text-muted-foreground font-medium mb-1.5">
                  Email Address *
                </label>
                <input 
                  required 
                  type="email" 
                  placeholder="owais@example.com"
                  value={formData.email} 
                  onChange={e => setFormData({...formData, email: e.target.value})} 
                  className="w-full border border-border/60 dark:border-neutral-800 rounded-xl px-4 py-2.5 bg-background/50 focus:outline-none focus:border-accent transition-colors text-xs sm:text-sm text-foreground" 
                />
              </div>

              <div>
                <label className="block text-[10px] sm:text-xs uppercase tracking-[0.18em] text-muted-foreground font-medium mb-1.5">
                  Message *
                </label>
                <textarea 
                  required 
                  rows={3} 
                  placeholder="Tell us about your project..."
                  value={formData.message} 
                  onChange={e => setFormData({...formData, message: e.target.value})} 
                  className="w-full border border-border/60 dark:border-neutral-800 rounded-xl px-4 py-2.5 bg-background/50 focus:outline-none focus:border-accent transition-colors resize-none text-xs sm:text-sm text-foreground"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                disabled={status === "submitting"}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 py-3.5 sm:py-4 rounded-xl shadow-lg transition-all duration-300 tracking-[0.2em] uppercase text-xs sm:text-sm font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 active:scale-[0.99]"
              >
                <span>{status === "submitting" ? "Sending..." : "Submit Inquiry"}</span>
                <Send className="w-4 h-4" />
              </button>
              
              {status === "success" && (
                <div className="flex items-center justify-center space-x-2 text-green-500 text-xs sm:text-sm mt-3 pt-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Message sent successfully! Our team will reach out soon.</span>
                </div>
              )}
              {status === "error" && (
                <p className="text-red-500 text-xs sm:text-sm mt-3 text-center">An error occurred. Please try again.</p>
              )}
            </motion.form>
          </div>

        </div>
      </div>
    </section>
  );
}
