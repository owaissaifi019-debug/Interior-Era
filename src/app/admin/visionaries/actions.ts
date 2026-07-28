"use server";

import { createClient } from "@/utils/supabase/server";
import { uploadImage } from "@/utils/supabase/storage";
import { revalidatePath } from "next/cache";

export async function saveVisionaryAction(formData: FormData) {
  try {
    const supabase = createClient();
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const role = formData.get("role") as string;
    const bio = formData.get("bio") as string;
    const sort_order = parseInt((formData.get("sort_order") as string) || "0");
    const is_archived = formData.get("is_archived") === "true";
    const imageFile = formData.get("image_file") as File;
    let image_url = (formData.get("current_image_url") as string) || "/img/project-1.jpeg";

    // Upload image if selected
    if (imageFile && imageFile.size > 0) {
      try {
        image_url = await uploadImage(imageFile, "visionaries");
      } catch (err: any) {
        console.error("Failed to upload image for visionary:", err);
      }
    }

    if (id && !id.startsWith("default-")) {
      const { error } = await supabase
        .from("visionaries")
        .update({ name, role, bio, image_url, sort_order, is_archived })
        .eq("id", id);

      if (error) {
        console.error("Supabase update error:", error);
        return {
          success: false,
          error: `Database update failed: ${error.message}. Make sure visionaries table exists in Supabase.`,
        };
      }
    } else {
      // Insert new entry or persist initial default entry to DB
      const { error } = await supabase
        .from("visionaries")
        .insert([{ name, role, bio, image_url, sort_order, is_archived }]);

      if (error) {
        console.error("Supabase insert error:", error);
        return {
          success: false,
          error: `Database insert failed: ${error.message}. Please run supabase-schema.sql script in Supabase SQL Editor.`,
        };
      }
    }

    revalidatePath("/admin/visionaries");
    revalidatePath("/about");
    revalidatePath("/");
    return { success: true };
  } catch (err: any) {
    console.error("saveVisionaryAction server exception:", err);
    return {
      success: false,
      error: err.message || "An unexpected error occurred while saving.",
    };
  }
}

export async function toggleArchiveVisionaryAction(
  id: string,
  currentIsArchived: boolean,
  defaultData?: { name: string; role: string; bio: string; image_url: string; sort_order: number }
) {
  try {
    const supabase = createClient();
    if (!id.startsWith("default-")) {
      const { error } = await supabase
        .from("visionaries")
        .update({ is_archived: !currentIsArchived })
        .eq("id", id);

      if (error) return { success: false, error: error.message };
    } else if (defaultData) {
      const { error } = await supabase.from("visionaries").insert([
        {
          name: defaultData.name,
          role: defaultData.role,
          bio: defaultData.bio,
          image_url: defaultData.image_url,
          sort_order: defaultData.sort_order,
          is_archived: !currentIsArchived,
        },
      ]);

      if (error) return { success: false, error: error.message };
    }

    revalidatePath("/admin/visionaries");
    revalidatePath("/about");
    revalidatePath("/");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function deleteVisionaryAction(id: string) {
  try {
    const supabase = createClient();
    if (!id.startsWith("default-")) {
      const { error } = await supabase.from("visionaries").delete().eq("id", id);
      if (error) return { success: false, error: error.message };
    }

    revalidatePath("/admin/visionaries");
    revalidatePath("/about");
    revalidatePath("/");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
