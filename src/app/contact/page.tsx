"use client";

import { useState } from "react";
import { motion } from "framer-motion";

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
    <div className="pt-32 pb-20 min-h-screen">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-5xl md:text-7xl mb-12 text-center"
        >
          Get in Touch
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-8 bg-white dark:bg-neutral-900 p-10 md:p-16 border border-muted dark:border-neutral-800 shadow-sm relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">First Name *</label>
                <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full border-b border-muted dark:border-neutral-800 py-2 bg-transparent focus:outline-none focus:border-accent transition-colors text-foreground" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Last Name *</label>
                <input required type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full border-b border-muted dark:border-neutral-800 py-2 bg-transparent focus:outline-none focus:border-accent transition-colors text-foreground" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Email *</label>
                <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border-b border-muted dark:border-neutral-800 py-2 bg-transparent focus:outline-none focus:border-accent transition-colors text-foreground" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Phone *</label>
                <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full border-b border-muted dark:border-neutral-800 py-2 bg-transparent focus:outline-none focus:border-accent transition-colors text-foreground" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">City</label>
                <input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full border-b border-muted dark:border-neutral-800 py-2 bg-transparent focus:outline-none focus:border-accent transition-colors text-foreground" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Project Type *</label>
                <select required name="projectType" value={formData.projectType} onChange={handleChange} className="w-full border-b border-muted dark:border-neutral-800 py-2 bg-transparent focus:outline-none focus:border-accent transition-colors text-foreground appearance-none rounded-none bg-white dark:bg-neutral-900">
                  <option value="" disabled>Select Type</option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Hospitality">Hospitality</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Estimated Budget</label>
              <select name="budget" value={formData.budget} onChange={handleChange} className="w-full border-b border-muted dark:border-neutral-800 py-2 bg-transparent focus:outline-none focus:border-accent transition-colors text-foreground appearance-none rounded-none bg-white dark:bg-neutral-900">
                <option value="" disabled>Select Range</option>
                <option value="Under $50k">Under $50k</option>
                <option value="$50k - $150k">$50k - $150k</option>
                <option value="$150k - $500k">$150k - $500k</option>
                <option value="$500k+">$500k+</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Message *</label>
              <textarea required name="message" value={formData.message} onChange={handleChange} rows={4} className="w-full border-b border-muted dark:border-neutral-800 py-2 bg-transparent focus:outline-none focus:border-accent transition-colors resize-none text-foreground"></textarea>
            </div>
            
            <button 
              type="submit" 
              disabled={status === "submitting"}
              className="w-full bg-primary text-primary-foreground py-5 hover:bg-accent hover:text-white transition-colors tracking-[0.2em] uppercase font-medium mt-8 disabled:opacity-50"
            >
              {status === "submitting" ? "Sending..." : "Send Inquiry"}
            </button>

            {status === "success" && (
              <p className="text-green-600 dark:text-green-400 mt-4 text-center">Thank you! Your inquiry has been saved.</p>
            )}
            {status === "error" && (
              <p className="text-red-600 dark:text-red-400 mt-4 text-center">Something went wrong. Please try again.</p>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
}
