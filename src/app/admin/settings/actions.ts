"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateSettingsAction(formData: FormData) {
  const supabase = createClient();
  const phone = formData.get("phone") as string;
  const whatsapp = formData.get("whatsapp") as string;
  const email = formData.get("email") as string;
  const address = formData.get("address") as string;
  const instagram = formData.get("instagram") as string;
  const linkedin = formData.get("linkedin") as string;
  const twitter = formData.get("twitter") as string;
  const id = formData.get("id") as string;

  // Parse the 4 stats cards
  const stats = [
    {
      value: parseInt(formData.get("stat_0_value") as string || "0"),
      suffix: formData.get("stat_0_suffix") as string || "",
      label: formData.get("stat_0_label") as string || ""
    },
    {
      value: parseInt(formData.get("stat_1_value") as string || "0"),
      suffix: formData.get("stat_1_suffix") as string || "",
      label: formData.get("stat_1_label") as string || ""
    },
    {
      value: parseInt(formData.get("stat_2_value") as string || "0"),
      suffix: formData.get("stat_2_suffix") as string || "",
      label: formData.get("stat_2_label") as string || ""
    },
    {
      value: parseInt(formData.get("stat_3_value") as string || "0"),
      suffix: formData.get("stat_3_suffix") as string || "",
      label: formData.get("stat_3_label") as string || ""
    }
  ];

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
      stats,
      updated_at: new Date().toISOString()
    })
    .eq("id", id);

  if (error) {
    console.error("Error updating settings:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/settings");
  revalidatePath("/");
  return { success: true };
}
