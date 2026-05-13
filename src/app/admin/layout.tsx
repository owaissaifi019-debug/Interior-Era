import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LogOut, Users, Settings, Image as ImageIcon } from "lucide-react";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";
    const supabase = createClient();
    await supabase.auth.signOut();
    redirect("/admin/login");
  };

  return (
    <div className="min-h-screen bg-secondary/20 flex flex-col md:flex-row pt-20">
      {user && (
        <aside className="w-full md:w-64 bg-background border-r border-muted/20 flex flex-col min-h-[calc(100vh-80px)]">
          <div className="p-6 border-b border-muted/20">
            <h2 className="font-serif text-2xl font-medium">Interior Era</h2>
            <span className="text-xs uppercase tracking-[0.2em] text-accent">Admin Portal</span>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            <Link href="/admin" className="flex items-center space-x-3 px-4 py-3 rounded-md bg-secondary/50 text-foreground font-medium">
              <Users size={18} />
              <span>Inquiries (CRM)</span>
            </Link>
            <Link href="#" className="flex items-center space-x-3 px-4 py-3 rounded-md text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-colors cursor-not-allowed">
              <ImageIcon size={18} />
              <span>Projects (Coming Soon)</span>
            </Link>
            <Link href="#" className="flex items-center space-x-3 px-4 py-3 rounded-md text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-colors cursor-not-allowed">
              <Settings size={18} />
              <span>Settings (Coming Soon)</span>
            </Link>
          </nav>
          <div className="p-4 border-t border-muted/20">
            <form action={signOut}>
              <button type="submit" className="flex items-center space-x-3 px-4 py-3 w-full rounded-md text-muted-foreground hover:bg-red-500/10 hover:text-red-500 transition-colors">
                <LogOut size={18} />
                <span>Sign Out</span>
              </button>
            </form>
          </div>
        </aside>
      )}
      <main className="flex-1 p-6 md:p-12 overflow-auto">
        {children}
      </main>
    </div>
  );
}
