import { createClient } from "@/utils/supabase/server";
import { uploadImage } from "@/utils/supabase/storage";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Plus, Trash, Upload, ArrowLeft } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function SignatureDetailsManagement() {
  const supabase = createClient();

  // Fetch all signature images ordered by sort_order
  const { data: signatureImages } = await supabase
    .from("signature_details")
    .select("*")
    .order("sort_order", { ascending: true });

  // Server Action: Upload new signature detail image
  const addImage = async (formData: FormData) => {
    "use server";
    const supabase = createClient();
    const file = formData.get("image_file") as File;
    const sort_order = parseInt(formData.get("sort_order") as string || "0");

    if (file && file.size > 0) {
      try {
        const url = await uploadImage(file, "signature-details");
        await supabase
          .from("signature_details")
          .insert([{ image_url: url, sort_order }]);
      } catch (error) {
        console.error("Upload signature detail image error:", error);
      }
    }

    revalidatePath("/admin/signature-details");
    revalidatePath("/");
    redirect("/admin/signature-details");
  };

  // Server Action: Delete signature detail image
  const deleteImage = async (formData: FormData) => {
    "use server";
    const id = formData.get("id") as string;
    const supabase = createClient();
    await supabase.from("signature_details").delete().eq("id", id);

    revalidatePath("/admin/signature-details");
    revalidatePath("/");
    redirect("/admin/signature-details");
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-serif font-medium mb-2">Signature Details Gallery</h1>
          <p className="text-muted-foreground">Manage the horizontal scrolling marquee images displayed on the homepage.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload Form Card */}
        <div className="bg-background rounded-xl border border-muted/20 shadow-sm p-6 h-fit space-y-6">
          <h3 className="text-lg font-serif font-medium text-accent">Upload New Image</h3>
          
          <form action={addImage} className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground" htmlFor="image_file">Select Photo</label>
              <input 
                type="file" 
                name="image_file" 
                id="image_file"
                accept="image/*"
                required
                className="text-xs text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-accent hover:file:text-white dark:hover:file:text-neutral-900 transition-all cursor-pointer w-full"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground" htmlFor="sort_order">Sort Order</label>
              <input 
                type="number" 
                name="sort_order" 
                id="sort_order"
                defaultValue="0"
                required
                className="rounded-md px-3 py-2 bg-secondary/35 border border-muted/50 focus:outline-none focus:border-accent text-sm"
              />
            </div>

            <button 
              type="submit" 
              className="bg-primary hover:bg-accent text-white dark:text-neutral-900 dark:hover:text-white px-5 py-3 rounded-md text-xs font-semibold tracking-wider uppercase transition-colors w-full flex items-center justify-center gap-2"
            >
              <Upload size={14} /> Upload Image
            </button>
          </form>
        </div>

        {/* List View */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-serif font-medium text-accent">Active Marquee Images ({signatureImages?.length || 0})</h3>
          
          {!signatureImages?.length ? (
            <div className="p-16 text-center text-muted-foreground border border-dashed border-muted/50 rounded-xl bg-secondary/5">
              <p className="font-light">No images in the signature gallery. Upload one to start scrolling!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {signatureImages.map((img) => (
                <div key={img.id} className="relative group rounded-xl overflow-hidden border border-muted bg-neutral-950 h-36 flex items-center justify-center">
                  <Image 
                    src={img.image_url} 
                    alt="Marquee Item" 
                    fill 
                    className="object-cover group-hover:opacity-75 transition-opacity"
                  />
                  <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded font-mono">
                    Order: {img.sort_order}
                  </div>
                  <form action={deleteImage} className="absolute inset-0 bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity font-semibold uppercase tracking-wider text-[10px]">
                    <input type="hidden" name="id" value={img.id} />
                    <button type="submit" className="w-full h-full flex items-center justify-center font-bold tracking-[0.2em]">
                      Delete Image
                    </button>
                  </form>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
