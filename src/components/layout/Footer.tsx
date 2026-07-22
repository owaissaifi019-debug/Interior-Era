"use client";

import Link from "next/link";
import { Instagram, Linkedin, Twitter, MapPin, Phone, Mail } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Footer({ settings }: { settings?: any }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  const instagram = settings?.instagram || "https://www.instagram.com/inte.riorera?igsh=MXY3NXVueXk3MjFlMw==";
  const linkedin = settings?.linkedin || "https://www.linkedin.com/in/mohd-shahid-0ab082193?utm_source=share_via&utm_content=profile&utm_medium=member_android";
  const twitter = settings?.twitter || "#";
  const email = settings?.email || "shahid@interiorera.com";
  const phone = settings?.phone || "+919910620810";
  const address = settings?.address || "C 141 Third floor Madanpur Khadar New Delhi 110076";

  return (
    <footer className="relative bg-neutral-950 text-neutral-100 pt-12 sm:pt-16 md:pt-24 pb-8 md:pb-12 border-t border-neutral-800/80 overflow-hidden font-sans">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-accent/5 blur-[140px] pointer-events-none rounded-full" />

      {/* Decorative top accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-10 md:mb-16">
          
          {/* Brand & Studio Info (Cols 1-5) */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-3 sm:mb-4">
                <h3 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-white">Interior Era</h3>
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              </div>
              <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed max-w-md">
                Crafting bespoke luxury environments that transcend trend and elevate everyday living through architectural precision and interior artistry.
              </p>
            </div>

            {/* Studio Address Card */}
            {address && (
              <div className="flex items-start space-x-3 bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-4 max-w-md hover:border-accent/40 transition-colors duration-300">
                <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 text-accent flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold block mb-0.5">Studio Location</span>
                  <p className="text-xs text-neutral-300 font-light leading-relaxed">{address}</p>
                </div>
              </div>
            )}
          </div>

          {/* 2-Column Mobile Links (Cols 6-12) */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-2 gap-8">
            
            {/* Explore Col */}
            <div>
              <span className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-accent uppercase mb-4 block">
                Explore
              </span>
              <ul className="space-y-3">
                <li>
                  <Link href="/projects" className="text-xs sm:text-sm text-neutral-400 hover:text-white transition-colors duration-300 flex items-center space-x-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/40 group-hover:bg-accent transition-colors" />
                    <span>Selected Works</span>
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-xs sm:text-sm text-neutral-400 hover:text-white transition-colors duration-300 flex items-center space-x-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/40 group-hover:bg-accent transition-colors" />
                    <span>Our Services</span>
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-xs sm:text-sm text-neutral-400 hover:text-white transition-colors duration-300 flex items-center space-x-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/40 group-hover:bg-accent transition-colors" />
                    <span>About Studio</span>
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-xs sm:text-sm text-neutral-400 hover:text-white transition-colors duration-300 flex items-center space-x-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/40 group-hover:bg-accent transition-colors" />
                    <span>Get In Touch</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Connect & Social Col */}
            <div>
              <span className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-accent uppercase mb-4 block">
                Connect
              </span>
              
              {/* Direct Phone & Email Badges */}
              <div className="space-y-3 mb-6">
                {phone && (
                  <a href={`tel:${phone}`} className="flex items-center space-x-2.5 text-xs text-neutral-300 hover:text-accent transition-colors duration-300 group">
                    <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 text-accent flex items-center justify-center shrink-0 group-hover:bg-accent/10">
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-medium truncate">{phone}</span>
                  </a>
                )}
                {email && (
                  <a href={`mailto:${email}`} className="flex items-center space-x-2.5 text-xs text-neutral-300 hover:text-accent transition-colors duration-300 group">
                    <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 text-accent flex items-center justify-center shrink-0 group-hover:bg-accent/10">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-medium truncate">{email}</span>
                  </a>
                )}
              </div>

              {/* Social Media Buttons */}
              <div className="flex items-center space-x-2.5">
                {instagram && (
                  <a 
                    href={instagram} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-neutral-300 flex items-center justify-center hover:bg-accent hover:border-accent hover:text-neutral-950 transition-all duration-300 shadow-sm active:scale-95" 
                    aria-label="Instagram"
                  >
                    <Instagram size={18} />
                  </a>
                )}
                {linkedin && (
                  <a 
                    href={linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-neutral-300 flex items-center justify-center hover:bg-accent hover:border-accent hover:text-neutral-950 transition-all duration-300 shadow-sm active:scale-95" 
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={18} />
                  </a>
                )}
                {twitter && twitter !== "#" && (
                  <a 
                    href={twitter} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-neutral-300 flex items-center justify-center hover:bg-accent hover:border-accent hover:text-neutral-950 transition-all duration-300 shadow-sm active:scale-95" 
                    aria-label="Twitter"
                  >
                    <Twitter size={18} />
                  </a>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center text-[11px] sm:text-xs text-neutral-400 gap-3">
          <p>&copy; {new Date().getFullYear()} Interior Era Studio. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <Link href="/privacy-policy" className="hover:text-white transition-colors duration-300">Privacy Policy</Link>
            <span className="text-neutral-700">•</span>
            <Link href="/terms" className="hover:text-white transition-colors duration-300">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
