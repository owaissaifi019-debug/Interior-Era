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

  try {
    const { data } = await supabase
      .from("site_settings")
      .select("stats")
      .maybeSingle();

    if (data?.stats && Array.isArray(data.stats) && data.stats.length > 0) {
      stats = data.stats;
    }
  } catch (error) {
    console.error("Failed to fetch settings for AboutPage:", error);
  }

  return <AboutClient stats={stats} />;
}
