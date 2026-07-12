"use client";

import Link from "next/link";
import { Instagram, Linkedin, Twitter } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Footer({ settings }: { settings?: any }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  const instagram = settings?.instagram || "https://www.instagram.com/inte.riorera?igsh=MXY3NXVueXk3MjFlMw==";
  const linkedin = settings?.linkedin || "https://www.linkedin.com/in/mohd-shahid-0ab082193?utm_source=share_via&utm_content=profile&utm_medium=member_android";
  const twitter = settings?.twitter || "#";
  const email = settings?.email || "Shahid@gmail.com";
  const phone = settings?.phone || "+91 9876543210";

  return (
    <footer className="relative bg-primary text-primary-foreground pt-24 pb-10 border-t border-accent/20 shadow-[0_-1px_20px_rgba(0,0,0,0.05)]">
      {/* Decorative separator */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-accent/30 rounded-b-full" />

      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-serif text-3xl mb-6">Interior Era</h3>
            <p className="text-muted/80 max-w-sm">
              Crafting timeless, luxury spaces that elevate the human experience. Modern design with a soul.
            </p>
          </div>

          <div>
            <h4 className="font-medium uppercase tracking-widest mb-6">Explore</h4>
            <ul className="space-y-4 text-muted/80">
              <li><Link href="/projects" className="hover:text-accent transition">Projects</Link></li>
              <li><Link href="/services" className="hover:text-accent transition">Services</Link></li>
              <li><Link href="/about" className="hover:text-accent transition">About Studio</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium uppercase tracking-widest mb-6">Connect</h4>
            <div className="flex space-x-4 mb-6">
              <a href={instagram} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition"><Instagram size={20} /></a>
              <a href={linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition"><Linkedin size={20} /></a>
              <a href={twitter} className="hover:text-accent transition"><Twitter size={20} /></a>
            </div>
            <p className="text-muted/80">
              {email}<br />
              {phone}
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted/60">
          <p>&copy; {new Date().getFullYear()} Interior Era. All rights reserved.</p>
          <div className="space-x-6 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="hover:text-accent transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-accent transition">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
