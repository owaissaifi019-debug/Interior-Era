"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Eye, Lock, FileText, Mail, Calendar, ArrowLeft } from "lucide-react";
import { useState } from "react";

const sections = [
  {
    id: "collect",
    title: "1. Information We Collect",
    icon: <Eye size={18} />,
    content: (
      <>
        <p className="mb-4">
          At **Interior Era**, we collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us, our luxury design services, or when you submit inquiries through our consultation forms.
        </p>
        <p className="mb-4">
          This details may include:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>**Personal Identifiers**: Full name, email address, telephone number, and physical city location.</li>
          <li>**Project Specs**: Style preferences, project scope (residential, commercial, bespoke), and site details.</li>
          <li>**Inquiry Communications**: Detailed messages and architectural requests sent directly to our design consultants.</li>
        </ul>
        <p>
          We do not collect sensitive credentials, credit card info, or background tracking details. All data is collected transparently and solely to serve your custom design needs.
        </p>
      </>
    )
  },
  {
    id: "use",
    title: "2. How We Use Your Information",
    icon: <ShieldCheck size={18} />,
    content: (
      <>
        <p className="mb-4">
          We use the information we collect strictly to deliver a premium, tailored design experience. Specifically, your data helps us:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>**Personalize Consultations**: Match your inquiry with the appropriate chief architect or lead interior designer.</li>
          <li>**Provide Bespoke Estimates**: Formulate detailed design visions and planning frameworks.</li>
          <li>**Direct Client Outreach**: Contact you regarding project appointments, handovers, or updates.</li>
          <li>**System Verification**: Maintain our portfolio registry and customer management security logs.</li>
        </ul>
        <p>
          Your information is never sold, leased, or distributed to external marketing agencies or third-party brokers.
        </p>
      </>
    )
  },
  {
    id: "protect",
    title: "3. Security & Data Protection",
    icon: <Lock size={18} />,
    content: (
      <>
        <p className="mb-4">
          We implement rigorous, industry-standard administrative and technical security measures designed to protect your personal data from unauthorized access, disclosure, modification, or destruction.
        </p>
        <p className="mb-4">
          Our protective frameworks include:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>**Encrypted Transfers**: All custom inquiry forms are processed via secure SSL/TLS channels.</li>
          <li>**Secure Databases**: Customer records are saved in industry-leading authenticated data vaults.</li>
          <li>**Restricted Access**: Access to customer inquiries is strictly limited to authorized designers and project managers.</li>
        </ul>
        <p>
          While we execute extreme caution to protect your information, no online transmission or database storage can be guaranteed 100% secure, and clients submit inquiries at their own discretion.
        </p>
      </>
    )
  },
  {
    id: "rights",
    title: "4. Your Rights & Options",
    icon: <FileText size={18} />,
    content: (
      <>
        <p className="mb-4">
          You retain complete ownership and control over your personal data. Depending on your jurisdiction, your rights include:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>**Right of Access**: Request a clean copy of the personal records we hold about you.</li>
          <li>**Right to Rectification**: Ask us to correct outdated phone numbers, names, or contact logs.</li>
          <li>**Right to Deletion**: Request that we permanently wipe your consultation history and personal information from our database files.</li>
        </ul>
        <p>
          To invoke any of these rights, simply email our compliance desk at **Shahid@gmail.com**. We will process your requests within 30 days.
        </p>
      </>
    )
  }
];

export default function PrivacyPolicy() {
  const [activeTab, setActiveTab] = useState("collect");

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 120; // Leave room for fixed header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <main className="min-h-screen bg-background pt-32 pb-24 font-sans">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        
        {/* Back Link & Header */}
        <div className="mb-16">
          <Link
            href="/"
            className="group inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-accent transition-colors mb-8"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>
          
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-4 block"
          >
            Studio Legals
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl font-medium text-foreground mb-6"
          >
            Privacy Policy
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-b border-muted dark:border-neutral-800 pb-8"
          >
            <span className="flex items-center gap-2">
              <Calendar size={14} /> Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-accent" /> Premium Data Protection Active
            </span>
          </motion.div>
        </div>

        {/* Dynamic Editorial Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          
          {/* SIDEBAR: Table of Contents */}
          <aside className="w-full lg:w-1/3 lg:sticky lg:top-32 space-y-6 shrink-0 z-10">
            <div className="bg-secondary/40 border border-muted dark:border-neutral-800 rounded-3xl p-6 md:p-8 backdrop-blur-md">
              <h3 className="font-serif text-lg font-medium mb-6 uppercase tracking-wider text-foreground">Policy Outline</h3>
              <nav className="flex flex-col space-y-2">
                {sections.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => scrollToSection(sec.id)}
                    className={`flex items-center space-x-3.5 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 w-full text-left ${
                      activeTab === sec.id
                        ? "bg-primary text-primary-foreground shadow-lg"
                        : "text-muted-foreground hover:bg-muted dark:hover:bg-neutral-800 hover:text-foreground"
                    }`}
                  >
                    <span className={`shrink-0 ${activeTab === sec.id ? "text-accent" : "text-muted-foreground/60"}`}>
                      {sec.icon}
                    </span>
                    <span className="truncate">{sec.title}</span>
                  </button>
                ))}
              </nav>
            </div>
            
            {/* Quick Contact Box */}
            <div className="bg-primary text-primary-foreground rounded-3xl p-8 shadow-2xl relative overflow-hidden border border-white/5 group">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-accent/5 blur-[50px] rounded-full pointer-events-none" />
              <Mail className="text-accent mb-6 shrink-0" size={32} />
              <h4 className="font-serif text-xl mb-3">Compliance Desk</h4>
              <p className="text-primary-foreground/70 text-sm font-light leading-relaxed mb-6">
                Have inquiries regarding data privacy or want to erase your logs?
              </p>
              <a
                href="mailto:Shahid@gmail.com"
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-accent font-semibold hover:text-white transition-colors"
              >
                <span>Email Compliance</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </aside>

          {/* MAIN COLUMN: Privacy Policy Content */}
          <div className="w-full lg:w-2/3 space-y-12">
            <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground font-light leading-relaxed text-lg">
              <p className="text-foreground font-light text-xl mb-12 leading-relaxed">
                At **Interior Era**, we are committed to safeguarding your privacy with the same architectural precision and care we bring to our luxury design spaces. This Privacy Policy details how we collect, secure, and respect your personal digital records when you visit our website.
              </p>
              
              <div className="space-y-16">
                {sections.map((sec) => (
                  <motion.section
                    key={sec.id}
                    id={sec.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="border-b border-muted dark:border-neutral-800 pb-12 last:border-b-0"
                  >
                    <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-6 font-medium flex items-center gap-3">
                      <span className="text-accent shrink-0">{sec.icon}</span>
                      <span>{sec.title.substring(3)}</span>
                    </h2>
                    <div className="text-muted-foreground/90 space-y-4">
                      {sec.content}
                    </div>
                  </motion.section>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
