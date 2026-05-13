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

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "glass py-4 shadow-sm" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <AnimatedLogo />

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-4">
          {navLinks.map((link, index) => (
            <div key={link.name} className="relative inline-block">
              <Link
                href={link.href}
                className="text-sm font-medium uppercase tracking-widest text-foreground/80 hover:text-accent transition-colors px-2 py-1"
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
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center space-x-4">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
            className="text-foreground focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-background/95 backdrop-blur-md shadow-lg py-6 flex flex-col items-center space-y-6 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-lg font-medium uppercase tracking-widest text-foreground hover:text-accent transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
