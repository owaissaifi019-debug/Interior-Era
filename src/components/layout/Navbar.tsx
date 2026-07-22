"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedLogo from "./AnimatedLogo";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pathname = usePathname();

  const navLinks = [
    ...(pathname !== "/" ? [{ name: "Home", href: "/", desc: "Back to Home" }] : []),
    { name: "About", href: "/about", desc: "Our Philosophy" },
    { name: "Projects", href: "/projects", desc: "Selected Works" },
    { name: "Services", href: "/services", desc: "Our Expertise" },
    { name: "Contact", href: "/contact", desc: "Get in Touch" },
  ];

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Automatically close all popups and mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setHoveredIndex(null);
  }, [pathname]);

  if (pathname?.startsWith("/admin")) return null;

  const isHeroPage = ["/", "/about", "/services"].includes(pathname);
  const useWhiteText = isHeroPage && !scrolled && !isOpen;

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "glass py-4 shadow-sm" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <AnimatedLogo useWhiteText={useWhiteText} />

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-4">
          {navLinks.map((link, index) => (
            <div key={link.name} className="relative inline-block">
              <Link
                href={link.href}
                className={`text-sm font-medium uppercase tracking-widest transition-all duration-200 active:scale-95 active:opacity-70 px-2 py-1 ${
                  useWhiteText 
                    ? "text-white/90 hover:text-accent" 
                    : "text-foreground/80 hover:text-accent"
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {link.name}
              </Link>

              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    key={`popup-${link.name}`}
                    initial={{ opacity: 0, y: 10, scale: 0.95, x: "-50%" }}
                    animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
                    exit={{ opacity: 0, y: 10, scale: 0.95, x: "-50%" }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full left-1/2 mt-2 w-48 p-5 bg-background dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl rounded-2xl z-[100] pointer-events-none"
                  >
                    {/* Decorative Arrow */}
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-background dark:bg-neutral-900 border-t border-l border-neutral-200 dark:border-neutral-800 rotate-45" />
                    
                    <div className="relative">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-accent font-bold mb-2 block opacity-80">
                        Explore
                      </span>
                      <h4 className="text-sm text-foreground font-semibold leading-tight mb-1">
                        {link.name}
                      </h4>
                      <p className="text-xs text-muted-foreground leading-snug">
                        {link.desc}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          <div className="pl-4">
            <ThemeToggle forceLight={useWhiteText} />
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center space-x-4">
          <ThemeToggle forceLight={useWhiteText} />
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
            className={`transition-all duration-200 active:scale-90 focus:outline-none ${
              useWhiteText ? "text-white" : "text-foreground"
            }`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-[70px] bg-background/98 dark:bg-neutral-950/98 backdrop-blur-2xl border-b border-border/60 shadow-2xl py-8 px-6 flex flex-col items-center justify-center space-y-5 md:hidden z-[100] overflow-hidden"
          >
            {/* Opaque solid backdrop layer preventing background page text bleed */}
            <div className="absolute inset-0 bg-background dark:bg-neutral-950 opacity-98 -z-10" />

            {navLinks.map((link, idx) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                className="w-full text-center"
              >
                <Link
                  href={link.href}
                  className={`text-lg sm:text-xl font-serif tracking-[0.18em] uppercase block py-1.5 transition-all duration-300 ${
                    pathname === link.href ? "text-accent font-semibold scale-105" : "text-foreground hover:text-accent"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
                <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground/70 block font-sans font-light">
                  {link.desc}
                </span>
              </motion.div>
            ))}

            {/* Decorative Gold Accent Bar */}
            <div className="w-12 h-[2px] bg-accent/40 rounded-full mt-2" />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
