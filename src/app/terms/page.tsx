"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BookOpen, UserCheck, ShieldAlert, Award, Mail, Calendar, ArrowLeft } from "lucide-react";
import { useState } from "react";

const sections = [
  {
    id: "property",
    title: "1. Intellectual Property Rights",
    icon: <Award size={18} />,
    content: (
      <>
        <p className="mb-4">
          Unless otherwise explicitly stated, the website structure, databases, design assets, high-resolution photography, branding logos, styling vectors, and layout source code (collectively, the **“Content”**) are the proprietary property of **Interior Era** or are licensed directly to us.
        </p>
        <p className="mb-4">
          You are granted a limited, non-exclusive, non-transferable license to access the Site and view the visual portfolios strictly for personal, non-commercial purposes. 
        </p>
        <p>
          No part of the Site or Content may be screenshotted, copied, reproduced, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, or sold for any commercial endeavor whatsoever without our express prior written consent.
        </p>
      </>
    )
  },
  {
    id: "representations",
    title: "2. User Representations",
    icon: <UserCheck size={18} />,
    content: (
      <>
        <p className="mb-4">
          By utilizing the Site or submitting consultation queries, you represent and warrant that:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>All information you submit through contact forms will be true, accurate, current, and complete.</li>
          <li>You will maintain the accuracy of such information and promptly update it when necessary.</li>
          <li>You possess the legal capacity to agree to these Terms of Service.</li>
          <li>You will not access the Site through automated or non-human means, such as bots, scrapers, or scripts.</li>
          <li>Your use of the Site will not violate any applicable local, national, or international laws or regulations.</li>
        </ul>
        <p>
          If you provide any information that is untrue, inaccurate, or incomplete, we reserve the right to decline future design consultation services.
        </p>
      </>
    )
  },
  {
    id: "liability",
    title: "3. Limitation of Liability",
    icon: <ShieldAlert size={18} />,
    content: (
      <>
        <p className="mb-4">
          The information, portfolios, design showcases, and descriptions presented on the Site are provided on an **“As-Is”** and **“As-Available”** basis without warranties of any kind. 
        </p>
        <p className="mb-4">
          In no event will **Interior Era**, its partners, directors, or employees be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, or special damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the Site.
        </p>
        <p>
          While we model our project visuals with extreme accuracy, final interior architecture and building execution details are subject to actual site measurements and site agreements.
        </p>
      </>
    )
  },
  {
    id: "governing",
    title: "4. Governing Law",
    icon: <BookOpen size={18} />,
    content: (
      <>
        <p className="mb-4">
          These Terms of Service and your use of the website are governed by and construed in accordance with the internal laws of the jurisdiction in which our corporate head office operates, without regard to conflict of law principles.
        </p>
        <p className="mb-4">
          Any legal action or dispute arising out of or related to these terms shall be settled exclusively in the competent courts of that jurisdiction. 
        </p>
        <p>
          For any disputes, clients are highly encouraged to first contact our legal support desk at **Shahid@gmail.com** to pursue a friendly, cooperative resolution.
        </p>
      </>
    )
  }
];

export default function TermsOfService() {
  const [activeTab, setActiveTab] = useState("property");

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
            Terms of Service
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
              <BookOpen size={14} className="text-accent" /> Custom Agreement Active
            </span>
          </motion.div>
        </div>

        {/* Dynamic Editorial Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          
          {/* SIDEBAR: Table of Contents */}
          <aside className="w-full lg:w-1/3 lg:sticky lg:top-32 space-y-6 shrink-0 z-10">
            <div className="bg-secondary/40 border border-muted dark:border-neutral-800 rounded-3xl p-6 md:p-8 backdrop-blur-md">
              <h3 className="font-serif text-lg font-medium mb-6 uppercase tracking-wider text-foreground">Terms Outline</h3>
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
              <h4 className="font-serif text-xl mb-3">Legal Inquiries</h4>
              <p className="text-primary-foreground/70 text-sm font-light leading-relaxed mb-6">
                Have structural or legal questions regarding our terms?
              </p>
              <a
                href="mailto:Shahid@gmail.com"
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-accent font-semibold hover:text-white transition-colors"
              >
                <span>Email Legal Desk</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </aside>

          {/* MAIN COLUMN: Terms of Service Content */}
          <div className="w-full lg:w-2/3 space-y-12">
            <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground font-light leading-relaxed text-lg">
              <p className="text-foreground font-light text-xl mb-12 leading-relaxed">
                Welcome to **Interior Era**. These Terms of Service constitute a legally binding agreement concerning your access to, use of, and interaction with our website, spatial portfolio showcases, and consultation services. By browsing the Site, you accept these terms in full.
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
