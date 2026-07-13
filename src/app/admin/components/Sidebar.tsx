"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { LogOut, Users, Settings, Image as ImageIcon, Briefcase, Compass, MessageSquare, Grid, Menu, X } from "lucide-react";

export default function Sidebar({ signOutAction }: { signOutAction: () => void }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close the sidebar drawer when path changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const links = [
    { name: "Inquiries (CRM)", href: "/admin", icon: Users },
    { name: "Hero Slider", href: "/admin/slides", icon: ImageIcon },
    { name: "Signature Details", href: "/admin/signature-details", icon: Grid },
    { name: "Projects", href: "/admin/projects", icon: Briefcase },
    { name: "Services", href: "/admin/services", icon: Compass },
    { name: "Client Experience", href: "/admin/client-experience", icon: MessageSquare },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile Top Header */}
      <header className="flex md:hidden items-center justify-between px-6 py-4 bg-background border-b border-muted/20 w-full fixed top-0 left-0 z-40 shadow-sm">
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setIsOpen(true)}
            className="p-1.5 hover:bg-secondary/50 rounded transition-colors focus:outline-none"
            aria-label="Open Menu"
          >
            <Menu size={22} />
          </button>
          <div>
            <h2 className="font-serif text-lg font-medium leading-none">Interior Era</h2>
            <span className="text-[10px] uppercase tracking-[0.2em] text-accent">Admin</span>
          </div>
        </div>

        <form action={signOutAction}>
          <button type="submit" className="text-muted-foreground hover:text-red-500 p-1.5 transition-colors">
            <LogOut size={18} />
          </button>
        </form>
      </header>

      {/* Mobile Slide-out Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Backdrop Overlay */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer Panel */}
          <aside className="relative flex flex-col w-64 max-w-xs bg-background h-full border-r border-muted/20 p-6 shadow-2xl z-10 transition-transform duration-300">
            <div className="flex items-center justify-between pb-6 border-b border-muted/20 mb-6">
              <div>
                <h2 className="font-serif text-xl font-medium">Interior Era</h2>
                <span className="text-[10px] uppercase tracking-[0.2em] text-accent">Admin Portal</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-secondary/50 rounded transition-colors focus:outline-none"
                aria-label="Close Menu"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="flex-1 space-y-1.5">
              {links.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-md font-medium text-sm transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground dark:bg-accent dark:text-neutral-900"
                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                    }`}
                  >
                    <Icon size={16} />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-muted/20">
              <form action={signOutAction}>
                <button type="submit" className="flex items-center space-x-3 px-4 py-3 w-full rounded-md text-sm text-muted-foreground hover:bg-red-500/10 hover:text-red-500 transition-colors">
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </form>
            </div>
          </aside>
        </div>
      )}

      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-background border-r border-muted/20 min-h-screen shrink-0 sticky top-0">
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
    </>
  );
}
