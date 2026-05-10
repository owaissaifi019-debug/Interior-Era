import Link from "next/link";
import { Instagram, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-20 pb-10">
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
              <a href="#" className="hover:text-accent transition"><Instagram size={20} /></a>
              <a href="#" className="hover:text-accent transition"><Linkedin size={20} /></a>
              <a href="#" className="hover:text-accent transition"><Twitter size={20} /></a>
            </div>
            <p className="text-muted/80">
              hello@interiorera.design<br />
              +1 (555) 123-4567
            </p>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted/60">
          <p>&copy; {new Date().getFullYear()} Interior Era. All rights reserved.</p>
          <div className="space-x-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white">Privacy Policy</Link>
            <Link href="#" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
