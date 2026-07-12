import { createClient } from "@/utils/supabase/server";
import { uploadImage } from "@/utils/supabase/storage";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Plus, Trash, Edit, ArrowLeft, Check, Upload } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function HeroSlidesManagement({
  searchParams,
}: {
  searchParams: { action?: string; id?: string };
}) {
  const supabase = createClient();
  const action = searchParams.action;
  const editId = searchParams.id;

  // Fetch all slides ordered by sort_order
  const { data: slides } = await supabase
    .from("hero_slides")
    .select("*")
    .order("sort_order", { ascending: true });

  // Fetch slide if editing
  let editSlide = null;
  if (action === "edit" && editId) {
    const { data } = await supabase
      .from("hero_slides")
      .select("*")
      .eq("id", editId)
      .single();
    editSlide = data;
  }

  // Server Action: Save / Create Slide
  const saveSlide = async (formData: FormData) => {
    "use server";
    const supabase = createClient();
    const title = formData.get("title") as string;
    const subtitle = formData.get("subtitle") as string;
    const button_primary_text = formData.get("button_primary_text") as string;
    const button_primary_link = formData.get("button_primary_link") as string;
    const button_secondary_text = formData.get("button_secondary_text") as string;
    const button_secondary_link = formData.get("button_secondary_link") as string;
    const sort_order = parseInt(formData.get("sort_order") as string || "0");
    const is_enabled = formData.get("is_enabled") === "true";
    const id = formData.get("id") as string;
    const imageFile = formData.get("image_file") as File;
    let image_url = formData.get("current_image_url") as string || "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2000";

    // Handle image upload if selected
    if (imageFile && imageFile.size > 0) {
      try {
        image_url = await uploadImage(imageFile, "hero");
      } catch (error) {
        console.error("Failed to upload slide image:", error);
      }
    }

    if (id) {
      // Update
      await supabase
        .from("hero_slides")
        .update({ 
          title, 
          subtitle, 
          image_url, 
          button_primary_text, 
          button_primary_link,
          button_secondary_text, 
          button_secondary_link,
          sort_order, 
          is_enabled 
        })
        .eq("id", id);
    } else {
      // Create
      await supabase
        .from("hero_slides")
        .insert([{ 
          title, 
          subtitle, 
          image_url, 
          button_primary_text, 
          button_primary_link,
          button_secondary_text, 
          button_secondary_link,
          sort_order, 
          is_enabled 
        }]);
    }

    revalidatePath("/admin/slides");
    revalidatePath("/");
    redirect("/admin/slides");
  };

  const toggleStatus = async (formData: FormData) => {
    "use server";
    const id = formData.get("id") as string;
    const currentStatus = formData.get("currentStatus") === "true";
    const supabase = createClient();
    await supabase
      .from("hero_slides")
      .update({ is_enabled: !currentStatus })
      .eq("id", id);

    revalidatePath("/admin/slides");
    revalidatePath("/");
  };

  const deleteSlide = async (formData: FormData) => {
    "use server";
    const id = formData.get("id") as string;
    const supabase = createClient();
    await supabase.from("hero_slides").delete().eq("id", id);

    revalidatePath("/admin/slides");
    revalidatePath("/");
  };

  // Form View (Add/Edit)
  if (action === "add" || (action === "edit" && editSlide)) {
    const isEdit = action === "edit";
    return (
      <div className="w-full max-w-2xl mx-auto">
        <div className="flex items-center space-x-4 mb-8">
          <Link href="/admin/slides" className="p-2 border border-muted hover:border-accent hover:text-accent rounded-full transition-all">
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="text-3xl font-serif font-medium">{isEdit ? "Edit Hero Slide" : "Add Hero Slide"}</h1>
            <p className="text-muted-foreground">{isEdit ? "Modify main landing slider slide details." : "Create new slide overlay."}</p>
          </div>
        </div>

        <form action={saveSlide} className="bg-background rounded-xl border border-muted/20 shadow-sm p-8 space-y-6">
          {isEdit && <input type="hidden" name="id" value={editSlide.id} />}

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground" htmlFor="title">Slide Heading (e.g. Timeless Luxury For Modern Living)</label>
            <textarea 
              className="rounded-md px-4 py-3 bg-secondary/35 border border-muted/50 focus:outline-none focus:border-accent transition-colors resize-none leading-relaxed font-serif text-lg"
              name="title"
              id="title"
              rows={2}
              defaultValue={editSlide?.title || ""}
              required 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground" htmlFor="subtitle">Sub-heading (e.g. Redefining Spaces)</label>
            <input 
              className="rounded-md px-4 py-3 bg-secondary/35 border border-muted/50 focus:outline-none focus:border-accent transition-colors"
              name="subtitle"
              id="subtitle"
              defaultValue={editSlide?.subtitle || ""}
              required 
            />
          </div>

          {/* Image Upload Block */}
          <div className="bg-secondary/20 p-6 rounded-xl border border-dashed border-muted flex flex-col md:flex-row items-center gap-6">
            <div className="relative w-32 h-20 rounded-lg overflow-hidden border border-muted shrink-0 bg-neutral-900 flex items-center justify-center">
              {editSlide?.image_url || isEdit ? (
                <Image 
                  src={editSlide?.image_url || "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2000"}
                  alt="Slide Preview"
                  fill
                  className="object-cover"
                />
              ) : (
                <Upload size={24} className="text-muted-foreground" />
              )}
            </div>

            <div className="flex-1 space-y-2">
              <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground block">Slide Backdrop Image</label>
              <input type="hidden" name="current_image_url" value={editSlide?.image_url || ""} />
              <input 
                type="file" 
                name="image_file" 
                accept="image/*"
                className="text-xs text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-accent hover:file:text-white dark:hover:file:text-neutral-900 transition-all cursor-pointer"
              />
              <span className="text-[10px] text-muted-foreground/60 block">Recommended size: 1920x1080. JPG, PNG or WEBP.</span>
            </div>
          </div>

          <hr className="border-muted/20 my-4" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">CTA Action Buttons</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground" htmlFor="button_primary_text">Primary Button Label</label>
              <input 
                className="rounded-md px-4 py-3 bg-secondary/35 border border-muted/50 focus:outline-none focus:border-accent transition-colors"
                name="button_primary_text"
                id="button_primary_text"
                defaultValue={editSlide?.button_primary_text || "Explore Projects"}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground" htmlFor="button_primary_link">Primary Button Redirect</label>
              <input 
                className="rounded-md px-4 py-3 bg-secondary/35 border border-muted/50 focus:outline-none focus:border-accent transition-colors"
                name="button_primary_link"
                id="button_primary_link"
                defaultValue={editSlide?.button_primary_link || "/projects"}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground" htmlFor="button_secondary_text">Secondary Button Label</label>
              <input 
                className="rounded-md px-4 py-3 bg-secondary/35 border border-muted/50 focus:outline-none focus:border-accent transition-colors"
                name="button_secondary_text"
                id="button_secondary_text"
                defaultValue={editSlide?.button_secondary_text || "Get Consultation"}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground" htmlFor="button_secondary_link">Secondary Button Redirect</label>
              <input 
                className="rounded-md px-4 py-3 bg-secondary/35 border border-muted/50 focus:outline-none focus:border-accent transition-colors"
                name="button_secondary_link"
                id="button_secondary_link"
                defaultValue={editSlide?.button_secondary_link || "/contact"}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground" htmlFor="sort_order">Sort Order</label>
              <input 
                className="rounded-md px-4 py-3 bg-secondary/35 border border-muted/50 focus:outline-none focus:border-accent transition-colors"
                name="sort_order"
                id="sort_order"
                type="number"
                defaultValue={editSlide?.sort_order || "0"}
                required 
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground" htmlFor="is_enabled">Status</label>
              <select 
                className="rounded-md px-4 py-3 bg-secondary/35 border border-muted/50 focus:outline-none focus:border-accent text-sm"
                name="is_enabled"
                id="is_enabled"
                defaultValue={editSlide ? String(editSlide.is_enabled) : "true"}
              >
                <option value="true">Enabled / Visible</option>
                <option value="false">Disabled / Hidden</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button 
              type="submit" 
              className="bg-primary hover:bg-accent text-white dark:text-neutral-900 dark:hover:text-white px-8 py-3.5 rounded-md transition-colors tracking-[0.2em] uppercase text-xs font-semibold"
            >
              Save Slide
            </button>
          </div>
        </form>
      </div>
    );
  }

  // Default List View
  return (
    <div className="w-full max-w-5xl mx-auto space-y-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-serif font-medium mb-2">Hero Slides Management</h1>
          <p className="text-muted-foreground">Manage the landing page slider backdrops, text, and button redirects.</p>
        </div>
        <Link href="/admin/slides?action=add" className="bg-primary hover:bg-accent text-white dark:text-neutral-900 dark:hover:text-white px-5 py-3 rounded-md text-xs font-semibold tracking-wider uppercase transition-colors flex items-center gap-2">
          <Plus size={14} /> Add Slide
        </Link>
      </div>

      <div className="bg-background rounded-xl border border-muted/20 shadow-sm overflow-hidden">
        {!slides?.length && (
          <div className="p-16 text-center text-muted-foreground flex flex-col items-center">
            <p className="font-light">No hero slides found. Click "Add Slide" to configure the landing hero.</p>
          </div>
        )}

        {slides && slides.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-secondary/30 text-muted-foreground text-xs uppercase tracking-[0.2em] border-b border-muted/10">
                  <th className="p-6 font-medium">Status</th>
                  <th className="p-6 font-medium">Preview</th>
                  <th className="p-6 font-medium">Headings</th>
                  <th className="p-6 font-medium">Buttons Mapping</th>
                  <th className="p-6 font-medium">Sort Order</th>
                  <th className="p-6 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-muted/10">
                {slides.map((slide) => (
                  <tr key={slide.id} className="hover:bg-secondary/10 transition-colors">
                    <td className="p-6">
                      <form action={toggleStatus}>
                        <input type="hidden" name="id" value={slide.id} />
                        <input type="hidden" name="currentStatus" value={String(slide.is_enabled)} />
                        <button type="submit" className="focus:outline-none transition-transform active:scale-95">
                          {slide.is_enabled ? (
                            <span className="flex items-center text-xs text-green-500 bg-green-500/10 px-2.5 py-1 rounded-full whitespace-nowrap font-medium">
                              <Check size={12} className="mr-1" /> Active
                            </span>
                          ) : (
                            <span className="flex items-center text-xs text-neutral-400 bg-neutral-500/10 px-2.5 py-1 rounded-full whitespace-nowrap">
                              Hidden
                            </span>
                          )}
                        </button>
                      </form>
                    </td>
                    <td className="p-6">
                      <div className="relative w-24 h-14 rounded overflow-hidden border border-muted bg-neutral-900 shrink-0">
                        <Image 
                          src={slide.image_url}
                          alt="Backdrop"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </td>
                    <td className="p-6 text-sm font-medium text-foreground">
                      <div className="font-serif text-sm line-clamp-1">{slide.title}</div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">{slide.subtitle}</div>
                    </td>
                    <td className="p-6 text-xs text-muted-foreground space-y-1">
                      <div>Primary: <span className="font-mono text-accent">{slide.button_primary_text} ({slide.button_primary_link})</span></div>
                      {slide.button_secondary_text && (
                        <div>Secondary: <span className="font-mono text-accent">{slide.button_secondary_text} ({slide.button_secondary_link})</span></div>
                      )}
                    </td>
                    <td className="p-6 text-sm text-muted-foreground text-center">
                      {slide.sort_order}
                    </td>
                    <td className="p-6 text-right">
                      <div className="flex gap-2 justify-end">
                        <Link href={`/admin/slides?action=edit&id=${slide.id}`} className="text-muted-foreground hover:text-accent p-1.5 rounded border border-muted/50 hover:border-accent transition-colors" title="Edit slide">
                          <Edit size={14} />
                        </Link>
                        <form action={deleteSlide}>
                          <input type="hidden" name="id" value={slide.id} />
                          <button type="submit" className="text-muted-foreground hover:text-red-500 p-1.5 rounded border border-muted/50 hover:border-red-500 transition-colors" title="Delete slide">
                            <Trash size={14} />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
