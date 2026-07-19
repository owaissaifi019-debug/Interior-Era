import { createClient } from "@/utils/supabase/server";
import SettingsForm from "./SettingsForm";

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const supabase = createClient();

  // Fetch the first settings row safely to handle potential duplicates
  const { data: settingsList } = await supabase
    .from("site_settings")
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(1);

  let settings = settingsList?.[0] || null;

  // If no settings exist yet, create a default row
  if (!settings) {
    const { data: newSettings } = await supabase
      .from("site_settings")
      .insert([{}])
      .select()
      .single();
    settings = newSettings;
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-12">
      <div>
        <h1 className="text-4xl font-serif font-medium mb-2">Global Settings</h1>
        <p className="text-muted-foreground">Manage your studio's global contact details, homepage metrics, and social links.</p>
      </div>

      <SettingsForm settings={settings} />
    </div>
  );
}

