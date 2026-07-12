import { createClient } from "./server";

/**
 * Uploads a file to a Supabase Storage bucket and returns its public URL.
 * @param file The file object from FormData
 * @param folder The folder inside the bucket (e.g. 'hero', 'projects')
 * @returns The public URL of the uploaded image
 */
export async function uploadImage(file: File, folder: string): Promise<string> {
  if (!file || file.size === 0) {
    throw new Error("No file selected or file is empty");
  }

  const supabase = createClient();
  const fileExtension = file.name.split(".").pop() || "jpg";
  const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExtension}`;
  const filePath = `${folder}/${fileName}`;

  // Upload to public media bucket
  const { data, error } = await supabase.storage
    .from("interior-era-media")
    .upload(filePath, file, {
      cacheControl: "31536000", // Cache for 1 year
      upsert: false,
    });

  if (error) {
    console.error("Storage upload error:", error);
    throw new Error(`Storage upload failed: ${error.message}`);
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from("interior-era-media")
    .getPublicUrl(filePath);

  return publicUrl;
}
