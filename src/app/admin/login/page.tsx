import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function LoginPage({ searchParams }: { searchParams: { message: string } }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    return redirect("/admin");
  }

  const signIn = async (formData: FormData) => {
    "use server";
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      return redirect("/admin/login?message=Could not authenticate user");
    }
    return redirect("/admin");
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 mx-auto mt-24">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-serif font-medium mb-2">Admin Portal</h1>
        <p className="text-muted-foreground">Sign in to manage Interior Era</p>
      </div>
      <form className="animate-in flex-1 flex flex-col w-full justify-center gap-4 text-foreground bg-white dark:bg-neutral-900 p-8 border border-muted dark:border-neutral-800 shadow-xl rounded-sm" action={signIn}>
        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground" htmlFor="email">Email</label>
          <input className="rounded-md px-4 py-3 bg-secondary/50 border border-muted/50 focus:outline-none focus:border-accent transition-colors" name="email" placeholder="admin@interiorera.com" required />
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground" htmlFor="password">Password</label>
          <input className="rounded-md px-4 py-3 bg-secondary/50 border border-muted/50 focus:outline-none focus:border-accent transition-colors" type="password" name="password" placeholder="••••••••" required />
        </div>
        <button className="bg-primary hover:bg-accent text-white px-4 py-3 rounded-md mt-6 transition-colors tracking-[0.2em] uppercase text-sm font-medium">
          Sign In
        </button>
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-red-500/10 text-red-500 text-center rounded-md text-sm">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  );
}
