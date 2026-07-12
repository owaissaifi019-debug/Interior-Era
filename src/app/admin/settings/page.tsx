import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const supabase = createClient();

  // Fetch the first settings row
  let { data: settings } = await supabase
    .from("site_settings")
    .select("*")
    .maybeSingle();

  // If no settings exist yet, create a default row
  if (!settings) {
    const { data: newSettings } = await supabase
      .from("site_settings")
      .insert([{}])
      .select()
      .single();
    settings = newSettings;
  }

  const updateSettings = async (formData: FormData) => {
    "use server";
    const supabase = createClient();
    const phone = formData.get("phone") as string;
    const whatsapp = formData.get("whatsapp") as string;
    const email = formData.get("email") as string;
    const address = formData.get("address") as string;
    const instagram = formData.get("instagram") as string;
    const linkedin = formData.get("linkedin") as string;
    const twitter = formData.get("twitter") as string;

    const id = formData.get("id") as string;

    const { error } = await supabase
      .from("site_settings")
      .update({
        phone,
        whatsapp,
        email,
        address,
        instagram,
        linkedin,
        twitter,
        updated_at: new Date().toISOString()
      })
      .eq("id", id);

    if (error) {
      console.error("Error updating settings:", error);
    }

    revalidatePath("/admin/settings");
    revalidatePath("/");
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-serif font-medium mb-2">Global Settings</h1>
        <p className="text-muted-foreground">Manage your studio''s global contact details and social links.</p>
      </div>

      <form action={updateSettings} className="bg-background rounded-xl border border-muted/20 shadow-sm p-8 space-y-6">
        <input type="hidden" name="id" value={settings?.id} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground" htmlFor="phone">Phone Number</label>
            <input 
              className="rounded-md px-4 py-3 bg-secondary/30 border border-muted/50 focus:outline-none focus:border-accent transition-colors"
              name="phone"
              id="phone"
              defaultValue={settings?.phone || ""}
              required 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground" htmlFor="whatsapp">WhatsApp Number (e.g. 9910620810)</label>
            <input 
              className="rounded-md px-4 py-3 bg-secondary/30 border border-muted/50 focus:outline-none focus:border-accent transition-colors"
              name="whatsapp"
              id="whatsapp"
              defaultValue={settings?.whatsapp || ""}
              required 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground" htmlFor="email">Public Email Address</label>
            <input 
              className="rounded-md px-4 py-3 bg-secondary/30 border border-muted/50 focus:outline-none focus:border-accent transition-colors"
              name="email"
              id="email"
              type="email"
              defaultValue={settings?.email || ""}
              required 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground" htmlFor="address">Studio Address</label>
            <input 
              className="rounded-md px-4 py-3 bg-secondary/30 border border-muted/50 focus:outline-none focus:border-accent transition-colors"
              name="address"
              id="address"
              defaultValue={settings?.address || ""}
              required 
            />
          </div>
        </div>

        <hr className="border-muted/20 my-8" />
        <h3 className="text-lg font-serif font-medium mb-4 text-accent">Social Media Links</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground" htmlFor="instagram">Instagram Link</label>
            <input 
              className="rounded-md px-4 py-3 bg-secondary/30 border border-muted/50 focus:outline-none focus:border-accent transition-colors"
              name="instagram"
              id="instagram"
              defaultValue={settings?.instagram || ""}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground" htmlFor="linkedin">LinkedIn Link</label>
            <input 
              className="rounded-md px-4 py-3 bg-secondary/30 border border-muted/50 focus:outline-none focus:border-accent transition-colors"
              name="linkedin"
              id="linkedin"
              defaultValue={settings?.linkedin || ""}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground" htmlFor="twitter">Twitter Link</label>
            <input 
              className="rounded-md px-4 py-3 bg-secondary/30 border border-muted/50 focus:outline-none focus:border-accent transition-colors"
              name="twitter"
              id="twitter"
              defaultValue={settings?.twitter || ""}
            />
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <button 
            type="submit" 
            className="bg-primary hover:bg-accent text-white dark:text-neutral-900 dark:hover:text-white px-8 py-3.5 rounded-md transition-colors tracking-[0.2em] uppercase text-xs font-semibold"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
