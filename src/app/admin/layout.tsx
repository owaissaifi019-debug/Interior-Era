import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Sidebar from "./components/Sidebar";

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
    <div className="min-h-screen bg-secondary/20 flex flex-col md:flex-row pt-16 md:pt-0">
      {user && <Sidebar signOutAction={signOut} />}
      <main className="flex-1 p-6 md:p-12 overflow-auto">
        {children}
      </main>
    </div>
  );
}
