"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Users, Settings, Image as ImageIcon, Briefcase, Compass, MessageSquare } from "lucide-react";

export default function Sidebar({ signOutAction }: { signOutAction: () => void }) {
  const pathname = usePathname();

  const links = [
    { name: "Inquiries (CRM)", href: "/admin", icon: Users },
    { name: "Hero Slider", href: "/admin/slides", icon: ImageIcon },
    { name: "Projects", href: "/admin/projects", icon: Briefcase },
    { name: "Services", href: "/admin/services", icon: Compass },
    { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <aside className="w-full md:w-64 bg-background border-r border-muted/20 flex flex-col min-h-[calc(100vh-80px)] shrink-0">
      <div className="p-6 border-b border-muted/20">
        <h2 className="font-serif text-2xl font-medium">Interior Era</h2>
        <span className="text-xs uppercase tracking-[0.2em] text-accent">Admin Portal</span>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-md font-medium transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground dark:bg-accent dark:text-neutral-900"
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
              }`}
            >
              <Icon size={18} />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-muted/20">
        <form action={signOutAction}>
          <button type="submit" className="flex items-center space-x-3 px-4 py-3 w-full rounded-md text-muted-foreground hover:bg-red-500/10 hover:text-red-500 transition-colors">
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
