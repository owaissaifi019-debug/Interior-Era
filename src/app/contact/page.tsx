"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    projectType: "",
    budget: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ firstName: "", lastName: "", email: "", phone: "", city: "", projectType: "", budget: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="pt-28 sm:pt-36 pb-16 sm:pb-24 min-h-screen bg-background relative overflow-hidden font-sans">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-80 bg-accent/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-4xl relative z-10">
        
        {/* Header Title */}
        <div className="text-center mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-accent font-semibold mb-3 block">
              Start A Conversation
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-medium tracking-tight mb-4 text-foreground">
              Get in Touch
            </h1>
            <p className="text-muted-foreground text-xs sm:text-base max-w-lg mx-auto font-light leading-relaxed mb-4">
              Whether you are looking to design a new luxury residence or reimagine a commercial space, our studio is ready to bring your vision to life.
            </p>
            <div className="w-12 sm:w-16 h-[2px] bg-accent/60 rounded-full" />
          </motion.div>
        </div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <form 
            onSubmit={handleSubmit} 
            className="bg-card dark:bg-neutral-900/90 backdrop-blur-xl border border-border/70 dark:border-neutral-800 shadow-2xl rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 space-y-5 sm:space-y-7 relative overflow-hidden"
          >
            {/* Form Top Accent Bar */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-60" />

            {/* First & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-[10px] sm:text-xs uppercase tracking-[0.18em] text-muted-foreground font-semibold mb-1.5 sm:mb-2">
                  First Name *
                </label>
                <input 
                  required 
                  type="text" 
                  name="firstName" 
                  placeholder="Owais"
                  value={formData.firstName} 
                  onChange={handleChange} 
                  className="w-full border border-border/60 dark:border-neutral-800 rounded-xl px-4 py-2.5 sm:py-3 bg-background/50 focus:outline-none focus:border-accent transition-colors text-xs sm:text-sm text-foreground" 
                />
              </div>

              <div>
                <label className="block text-[10px] sm:text-xs uppercase tracking-[0.18em] text-muted-foreground font-semibold mb-1.5 sm:mb-2">
                  Last Name *
                </label>
                <input 
                  required 
                  type="text" 
                  name="lastName" 
                  placeholder="Qarni"
                  value={formData.lastName} 
                  onChange={handleChange} 
                  className="w-full border border-border/60 dark:border-neutral-800 rounded-xl px-4 py-2.5 sm:py-3 bg-background/50 focus:outline-none focus:border-accent transition-colors text-xs sm:text-sm text-foreground" 
                />
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-[10px] sm:text-xs uppercase tracking-[0.18em] text-muted-foreground font-semibold mb-1.5 sm:mb-2">
                  Email Address *
                </label>
                <input 
                  required 
                  type="email" 
                  name="email" 
                  placeholder="owais@example.com"
                  value={formData.email} 
                  onChange={handleChange} 
                  className="w-full border border-border/60 dark:border-neutral-800 rounded-xl px-4 py-2.5 sm:py-3 bg-background/50 focus:outline-none focus:border-accent transition-colors text-xs sm:text-sm text-foreground" 
                />
              </div>

              <div>
                <label className="block text-[10px] sm:text-xs uppercase tracking-[0.18em] text-muted-foreground font-semibold mb-1.5 sm:mb-2">
                  Phone Number *
                </label>
                <input 
                  required 
                  type="tel" 
                  name="phone" 
                  placeholder="+91 98765 43210"
                  value={formData.phone} 
                  onChange={handleChange} 
                  className="w-full border border-border/60 dark:border-neutral-800 rounded-xl px-4 py-2.5 sm:py-3 bg-background/50 focus:outline-none focus:border-accent transition-colors text-xs sm:text-sm text-foreground" 
                />
              </div>
            </div>

            {/* City & Project Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-[10px] sm:text-xs uppercase tracking-[0.18em] text-muted-foreground font-semibold mb-1.5 sm:mb-2">
                  City / Location
                </label>
                <input 
                  type="text" 
                  name="city" 
                  placeholder="New Delhi / Gurugram"
                  value={formData.city} 
                  onChange={handleChange} 
                  className="w-full border border-border/60 dark:border-neutral-800 rounded-xl px-4 py-2.5 sm:py-3 bg-background/50 focus:outline-none focus:border-accent transition-colors text-xs sm:text-sm text-foreground" 
                />
              </div>

              <div>
                <label className="block text-[10px] sm:text-xs uppercase tracking-[0.18em] text-muted-foreground font-semibold mb-1.5 sm:mb-2">
                  Project Type *
                </label>
                <select 
                  required 
                  name="projectType" 
                  value={formData.projectType} 
                  onChange={handleChange} 
                  className="w-full border border-border/60 dark:border-neutral-800 rounded-xl px-4 py-2.5 sm:py-3 bg-background/50 focus:outline-none focus:border-accent transition-colors text-xs sm:text-sm text-foreground cursor-pointer"
                >
                  <option value="" disabled>Select Project Type</option>
                  <option value="Residential">Residential Architecture & Design</option>
                  <option value="Commercial">Commercial Workspace</option>
                  <option value="Hospitality">Hospitality & Retail</option>
                  <option value="Renovation">Renovation & Interior Styling</option>
                </select>
              </div>
            </div>

            {/* Budget (Optional) */}
            <div>
              <label className="block text-[10px] sm:text-xs uppercase tracking-[0.18em] text-muted-foreground font-semibold mb-1.5 sm:mb-2">
                Estimated Budget Range
              </label>
              <select 
                name="budget" 
                value={formData.budget} 
                onChange={handleChange} 
                className="w-full border border-border/60 dark:border-neutral-800 rounded-xl px-4 py-2.5 sm:py-3 bg-background/50 focus:outline-none focus:border-accent transition-colors text-xs sm:text-sm text-foreground cursor-pointer"
              >
                <option value="">Select Budget Range (Optional)</option>
                <option value="Under ₹25L">Under ₹25 Lakhs</option>
                <option value="₹25L - ₹50L">₹25 Lakhs - ₹50 Lakhs</option>
                <option value="₹50L - ₹1Cr">₹50 Lakhs - ₹1 Crore</option>
                <option value="₹1Cr+">₹1 Crore+</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-[10px] sm:text-xs uppercase tracking-[0.18em] text-muted-foreground font-semibold mb-1.5 sm:mb-2">
                Project Details & Message *
              </label>
              <textarea 
                required 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                rows={4} 
                placeholder="Tell us about your space, timeline, and architectural requirements..."
                className="w-full border border-border/60 dark:border-neutral-800 rounded-xl p-4 bg-background/50 focus:outline-none focus:border-accent transition-colors resize-none text-xs sm:text-sm text-foreground"
              />
            </div>

            {/* Submit CTA Button */}
            <button 
              type="submit" 
              disabled={status === "submitting"}
              className="w-full bg-accent text-accent-foreground py-3.5 sm:py-4 rounded-xl hover:bg-accent/90 transition-all duration-300 tracking-[0.2em] uppercase font-semibold text-xs sm:text-sm shadow-xl flex items-center justify-center space-x-2 active:scale-[0.99] disabled:opacity-50"
            >
              <span>{status === "submitting" ? "Sending Inquiry..." : "Submit Inquiry"}</span>
              <Send className="w-4 h-4 ml-1" />
            </button>

            {/* Feedback Notifications */}
            {status === "success" && (
              <div className="flex items-center space-x-2.5 bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>Thank you! Your inquiry has been received. Our studio team will contact you shortly.</span>
              </div>
            )}
            
            {status === "error" && (
              <div className="flex items-center space-x-2.5 bg-rose-500/10 border border-rose-500/30 p-4 rounded-xl text-rose-600 dark:text-rose-400 text-xs sm:text-sm">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>Something went wrong while submitting. Please try again or reach us via phone.</span>
              </div>
            )}

          </form>
        </motion.div>
      </div>
    </div>
  );
}
