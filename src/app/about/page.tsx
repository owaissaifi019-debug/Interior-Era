import { createClient } from "@/utils/supabase/server";
import AboutClient from "./AboutClient";

export default async function AboutPage() {
  const supabase = createClient();
  let stats = [
    { value: 100, suffix: "+", label: "Successful Projects" },
    { value: 5, suffix: "+", label: "Years Experience" },
    { value: 50, suffix: "+", label: "Happy Clients" },
    { value: 100, suffix: "%", label: "Creative Designs" }
  ];

  let visionaries = null;

  try {
    const { data: settingsData } = await supabase
      .from("site_settings")
      .select("stats")
      .maybeSingle();

    if (settingsData?.stats && Array.isArray(settingsData.stats) && settingsData.stats.length > 0) {
      stats = settingsData.stats;
    }
  } catch (error) {
    console.error("Failed to fetch settings for AboutPage:", error);
  }

  try {
    const { data: visionariesData } = await supabase
      .from("visionaries")
      .select("*")
      .eq("is_archived", false)
      .order("sort_order", { ascending: true });

    if (visionariesData && visionariesData.length > 0) {
      visionaries = visionariesData.map((v) => ({
        name: v.name,
        role: v.role,
        image: v.image_url || v.image,
        bio: v.bio,
      }));
    }
  } catch (error) {
    console.error("Failed to fetch visionaries for AboutPage:", error);
  }

  return <AboutClient stats={stats} visionaries={visionaries} />;
}

