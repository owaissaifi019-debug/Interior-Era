import { createClient } from "@/utils/supabase/server";
import { uploadImage } from "@/utils/supabase/storage";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Plus, Trash, Edit, ArrowLeft, Check, Upload } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function TestimonialsManagement({
  searchParams,
}: {
  searchParams: { action?: string; id?: string };
}) {
  const supabase = createClient();
  const action = searchParams.action;
  const editId = searchParams.id;

  // Fetch testimonials ordered by sort_order
  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("*")
    .order("sort_order", { ascending: true });

  // Fetch active testimonial if editing
  let editTestimonial = null;
  if (action === "edit" && editId) {
    const { data } = await supabase
      .from("testimonials")
      .select("*")
      .eq("id", editId)
      .single();
    editTestimonial = data;
  }

  // Server Action: Save / Create Testimonial
  const saveTestimonial = async (formData: FormData) => {
    "use server";
    const supabase = createClient();
    const quote = formData.get("quote") as string;
    const author = formData.get("author") as string;
    const role = formData.get("role") as string;
    const sort_order = parseInt(formData.get("sort_order") as string || "0");
    const is_enabled = formData.get("is_enabled") === "true";
    const id = formData.get("id") as string;
    const imageFile = formData.get("image_file") as File;
    let image_url = formData.get("current_image_url") as string || "/Images/Residential Project/living_room.webp";

    // Handle image upload if selected
    if (imageFile && imageFile.size > 0) {
      try {
        image_url = await uploadImage(imageFile, "testimonials");
      } catch (error) {
        console.error("Failed to upload testimonial image:", error);
      }
    }

    if (id) {
      // Update
      await supabase
        .from("testimonials")
        .update({ quote, author, role, image_url, sort_order, is_enabled })
        .eq("id", id);
    } else {
      // Create
      await supabase
        .from("testimonials")
        .insert([{ quote, author, role, image_url, sort_order, is_enabled }]);
    }

    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    redirect("/admin/testimonials");
  };

  const toggleStatus = async (formData: FormData) => {
    "use server";
    const id = formData.get("id") as string;
    const currentStatus = formData.get("currentStatus") === "true";
    const supabase = createClient();
    await supabase
      .from("testimonials")
      .update({ is_enabled: !currentStatus })
      .eq("id", id);

    revalidatePath("/admin/testimonials");
    revalidatePath("/");
  };

  const deleteTestimonial = async (formData: FormData) => {
    "use server";
    const id = formData.get("id") as string;
    const supabase = createClient();
    await supabase.from("testimonials").delete().eq("id", id);

    revalidatePath("/admin/testimonials");
    revalidatePath("/");
  };

  // Form View (Add/Edit)
  if (action === "add" || (action === "edit" && editTestimonial)) {
    const isEdit = action === "edit";
    return (
      <div className="w-full max-w-2xl mx-auto">
        <div className="flex items-center space-x-4 mb-8">
          <Link href="/admin/testimonials" className="p-2 border border-muted hover:border-accent hover:text-accent rounded-full transition-all">
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="text-3xl font-serif font-medium">{isEdit ? "Edit Testimonial" : "Add Testimonial"}</h1>
            <p className="text-muted-foreground">{isEdit ? "Modify client feedback details." : "Create new client experience feedback entry."}</p>
          </div>
        </div>

        <form action={saveTestimonial} className="bg-background rounded-xl border border-muted/20 shadow-sm p-8 space-y-6">
          {isEdit && <input type="hidden" name="id" value={editTestimonial.id} />}

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground" htmlFor="quote">Client Quote</label>
            <textarea 
              className="rounded-md px-4 py-3 bg-secondary/35 border border-muted/50 focus:outline-none focus:border-accent transition-colors resize-none leading-relaxed"
              name="quote"
              id="quote"
              rows={4}
              defaultValue={editTestimonial?.quote || ""}
              required 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground" htmlFor="author">Client Name</label>
              <input 
                className="rounded-md px-4 py-3 bg-secondary/35 border border-muted/50 focus:outline-none focus:border-accent transition-colors"
                name="author"
                id="author"
                defaultValue={editTestimonial?.author || ""}
                required 
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground" htmlFor="role">Project Name / Role (e.g. Pioneer Araya)</label>
              <input 
                className="rounded-md px-4 py-3 bg-secondary/35 border border-muted/50 focus:outline-none focus:border-accent transition-colors"
                name="role"
                id="role"
                defaultValue={editTestimonial?.role || ""}
                required 
              />
            </div>
          </div>

          {/* Image Upload Block */}
          <div className="bg-secondary/20 p-6 rounded-xl border border-dashed border-muted flex flex-col md:flex-row items-center gap-6">
            <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-muted shrink-0 bg-neutral-900 flex items-center justify-center">
              {editTestimonial?.image_url || isEdit ? (
                <Image 
                  src={editTestimonial?.image_url || "/Images/Residential Project/living_room.webp"}
                  alt="Client Preview"
                  fill
                  className="object-cover"
                />
              ) : (
                <Upload size={24} className="text-muted-foreground" />
              )}
            </div>

            <div className="flex-1 space-y-2">
              <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground block">Client/Project Image</label>
              <input type="hidden" name="current_image_url" value={editTestimonial?.image_url || ""} />
              <input 
                type="file" 
                name="image_file" 
                accept="image/*"
                className="text-xs text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-accent hover:file:text-white dark:hover:file:text-neutral-900 transition-all cursor-pointer"
              />
              <span className="text-[10px] text-muted-foreground/60 block">Recommended aspect ratio: 4:3 or 1:1. JPG, PNG or WEBP.</span>
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
                defaultValue={editTestimonial?.sort_order || "0"}
                required 
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground" htmlFor="is_enabled">Status</label>
              <select 
                className="rounded-md px-4 py-3 bg-secondary/35 border border-muted/50 focus:outline-none focus:border-accent text-sm"
                name="is_enabled"
                id="is_enabled"
                defaultValue={editTestimonial ? String(editTestimonial.is_enabled) : "true"}
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
              Save Testimonial
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
          <h1 className="text-4xl font-serif font-medium mb-2">Testimonials Management</h1>
          <p className="text-muted-foreground">Manage client reviews shown in the homepage carousel.</p>
        </div>
        <Link href="/admin/testimonials?action=add" className="bg-primary hover:bg-accent text-white dark:text-neutral-900 dark:hover:text-white px-5 py-3 rounded-md text-xs font-semibold tracking-wider uppercase transition-colors flex items-center gap-2">
          <Plus size={14} /> Add Testimonial
        </Link>
      </div>

      <div className="bg-background rounded-xl border border-muted/20 shadow-sm overflow-hidden">
        {!testimonials?.length && (
          <div className="p-16 text-center text-muted-foreground flex flex-col items-center">
            <p className="font-light">No testimonials available. Click "Add Testimonial" to make one.</p>
          </div>
        )}

        {testimonials && testimonials.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-secondary/30 text-muted-foreground text-xs uppercase tracking-[0.2em] border-b border-muted/10">
                  <th className="p-6 font-medium">Status</th>
                  <th className="p-6 font-medium">Author</th>
                  <th className="p-6 font-medium">Quote</th>
                  <th className="p-6 font-medium">Sort Order</th>
                  <th className="p-6 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-muted/10">
                {testimonials.map((test) => (
                  <tr key={test.id} className="hover:bg-secondary/10 transition-colors">
                    <td className="p-6">
                      <form action={toggleStatus}>
                        <input type="hidden" name="id" value={test.id} />
                        <input type="hidden" name="currentStatus" value={String(test.is_enabled)} />
                        <button type="submit" className="focus:outline-none transition-transform active:scale-95">
                          {test.is_enabled ? (
                            <span className="flex items-center text-xs text-green-500 bg-green-500/10 px-2.5 py-1 rounded-full whitespace-nowrap">
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
                    <td className="p-6 text-sm font-medium text-foreground whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-muted bg-neutral-900 shrink-0">
                          <Image 
                            src={test.image_url || "/Images/Residential Project/living_room.webp"}
                            alt={test.author}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-semibold">{test.author}</div>
                          <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{test.role}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-6 text-sm text-muted-foreground max-w-sm">
                      <p className="line-clamp-2 leading-relaxed font-light">"{test.quote}"</p>
                    </td>
                    <td className="p-6 text-sm text-muted-foreground text-center">
                      {test.sort_order}
                    </td>
                    <td className="p-6 text-right font-medium">
                      <div className="flex gap-2 justify-end">
                        <Link href={`/admin/testimonials?action=edit&id=${test.id}`} className="text-muted-foreground hover:text-accent p-1.5 rounded border border-muted/50 hover:border-accent transition-colors" title="Edit testimonial">
                          <Edit size={14} />
                        </Link>
                        <form action={deleteTestimonial}>
                          <input type="hidden" name="id" value={test.id} />
                          <button type="submit" className="text-muted-foreground hover:text-red-500 p-1.5 rounded border border-muted/50 hover:border-red-500 transition-colors" title="Delete testimonial">
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
