import { createClient } from "@/utils/supabase/server";
import { uploadImage } from "@/utils/supabase/storage";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Plus, Trash, Edit, ArrowLeft, Check, Upload, Star } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function ProjectsManagement({
  searchParams,
}: {
  searchParams: { action?: string; id?: string };
}) {
  const supabase = createClient();
  const action = searchParams.action;
  const editId = searchParams.id;

  // Fetch all projects ordered by sort_order
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });

  // Fetch active project and its sub-gallery if editing
  let editProject = null;
  let gallery: any[] = [];
  if (action === "edit" && editId) {
    const { data: project } = await supabase
      .from("projects")
      .select("*")
      .eq("id", editId)
      .single();
    editProject = project;

    if (project) {
      const { data: images } = await supabase
        .from("project_images")
        .select("*")
        .eq("project_id", project.id)
        .order("sort_order", { ascending: true });
      gallery = images || [];
    }
  }

  // Server Action: Save / Create Project
  const saveProject = async (formData: FormData) => {
    "use server";
    const supabase = createClient();
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const scope = formData.get("scope") as string;
    const location = formData.get("location") as string;
    const budget = formData.get("budget") as string;
    const year = formData.get("year") as string;
    const description = formData.get("description") as string;
    const sort_order = parseInt(formData.get("sort_order") as string || "0");
    const is_featured = formData.get("is_featured") === "true";
    const is_published = formData.get("is_published") === "true";
    const id = formData.get("id") as string;

    const coverFile = formData.get("cover_file") as File;
    let image = formData.get("current_cover_url") as string || "/Images/Residential Project/living_room.webp";

    // Upload Cover Image
    if (coverFile && coverFile.size > 0) {
      try {
        image = await uploadImage(coverFile, "projects");
      } catch (error) {
        console.error("Cover upload error:", error);
      }
    }

    let projectId: number;

    if (id) {
      // Edit mode
      projectId = parseInt(id);
      await supabase
        .from("projects")
        .update({ title, category, scope, location, budget, year, description, image, sort_order, is_featured, is_published })
        .eq("id", projectId);
    } else {
      // Create mode
      const { data: newProj, error } = await supabase
        .from("projects")
        .insert([{ title, category, scope, location, budget, year, description, image, sort_order, is_featured, is_published }])
        .select()
        .single();
      
      if (error) {
        console.error("Insert project error:", error);
        return;
      }
      projectId = newProj.id;
    }

    // Upload Multiple Gallery Images
    const galleryFiles = formData.getAll("gallery_files") as File[];
    for (let i = 0; i < galleryFiles.length; i++) {
      const file = galleryFiles[i];
      if (file && file.size > 0) {
        try {
          const url = await uploadImage(file, "projects");
          await supabase
            .from("project_images")
            .insert([{ project_id: projectId, image_url: url, sort_order: i }]);
        } catch (error) {
          console.error("Gallery file upload error:", error);
        }
      }
    }

    revalidatePath("/admin/projects");
    revalidatePath("/projects");
    revalidatePath("/");
    redirect(`/admin/projects?action=edit&id=${projectId}`);
  };

  // Server Action: Delete single image from sub-gallery
  const deleteGalleryImage = async (formData: FormData) => {
    "use server";
    const imageId = formData.get("delete_image_id") as string;
    const projectId = formData.get("id") as string;
    const supabase = createClient();
    await supabase.from("project_images").delete().eq("id", imageId);

    revalidatePath("/admin/projects");
    revalidatePath("/projects");
    revalidatePath("/");
    redirect(`/admin/projects?action=edit&id=${projectId}`);
  };

  const deleteProject = async (formData: FormData) => {
    "use server";
    const id = formData.get("id") as string;
    const supabase = createClient();
    await supabase.from("projects").delete().eq("id", parseInt(id));

    revalidatePath("/admin/projects");
    revalidatePath("/projects");
    revalidatePath("/");
  };

  const toggleFeatured = async (formData: FormData) => {
    "use server";
    const id = formData.get("id") as string;
    const current = formData.get("currentFeatured") === "true";
    const supabase = createClient();
    await supabase.from("projects").update({ is_featured: !current }).eq("id", parseInt(id));

    revalidatePath("/admin/projects");
    revalidatePath("/projects");
    revalidatePath("/");
  };

  // Form View (Add/Edit)
  if (action === "add" || (action === "edit" && editProject)) {
    const isEdit = action === "edit";
    return (
      <div className="w-full max-w-4xl mx-auto space-y-12">
        <div className="flex items-center space-x-4">
          <Link href="/admin/projects" className="p-2 border border-muted hover:border-accent hover:text-accent rounded-full transition-all">
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="text-3xl font-serif font-medium">{isEdit ? "Edit Project" : "Add Project"}</h1>
            <p className="text-muted-foreground">{isEdit ? "Modify details and manage gallery images." : "Create new portfolio project."}</p>
          </div>
        </div>

        <form action={saveProject} className="bg-background rounded-xl border border-muted/20 shadow-sm p-8 space-y-6">
          {isEdit && <input type="hidden" name="id" value={editProject.id} />}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground" htmlFor="title">Project Title</label>
              <input 
                className="rounded-md px-4 py-3 bg-secondary/35 border border-muted/50 focus:outline-none focus:border-accent transition-colors"
                name="title"
                id="title"
                defaultValue={editProject?.title || ""}
                required 
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground" htmlFor="category">Category</label>
              <select 
                className="rounded-md px-4 py-3 bg-secondary/35 border border-muted/50 focus:outline-none focus:border-accent transition-colors"
                name="category"
                id="category"
                defaultValue={editProject?.category || "RESIDENTIAL"}
              >
                <option value="RESIDENTIAL">Residential</option>
                <option value="COMMERCIAL">Commercial</option>
                <option value="ARCHITECTURAL">Architectural</option>
                <option value="BESPOKE">Bespoke</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground" htmlFor="scope">Scope of Work (e.g. Turnkey Execution)</label>
              <input 
                className="rounded-md px-4 py-3 bg-secondary/35 border border-muted/50 focus:outline-none focus:border-accent transition-colors"
                name="scope"
                id="scope"
                defaultValue={editProject?.scope || ""}
                required 
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground" htmlFor="location">Location (e.g. Sector 54, Gurugram)</label>
              <input 
                className="rounded-md px-4 py-3 bg-secondary/35 border border-muted/50 focus:outline-none focus:border-accent transition-colors"
                name="location"
                id="location"
                defaultValue={editProject?.location || ""}
                required 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground" htmlFor="budget">Budget (e.g. $150k - $250k)</label>
              <input 
                className="rounded-md px-4 py-3 bg-secondary/35 border border-muted/50 focus:outline-none focus:border-accent transition-colors"
                name="budget"
                id="budget"
                defaultValue={editProject?.budget || ""}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground" htmlFor="year">Completion Year</label>
              <input 
                className="rounded-md px-4 py-3 bg-secondary/35 border border-muted/50 focus:outline-none focus:border-accent transition-colors"
                name="year"
                id="year"
                defaultValue={editProject?.year || "2026"}
                required 
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground" htmlFor="sort_order">Sort Order</label>
              <input 
                className="rounded-md px-4 py-3 bg-secondary/35 border border-muted/50 focus:outline-none focus:border-accent transition-colors"
                name="sort_order"
                id="sort_order"
                type="number"
                defaultValue={editProject?.sort_order || "0"}
                required 
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground" htmlFor="description">Project Vision Description</label>
            <textarea 
              className="rounded-md px-4 py-3 bg-secondary/35 border border-muted/50 focus:outline-none focus:border-accent transition-colors resize-none leading-relaxed font-light"
              name="description"
              id="description"
              rows={4}
              defaultValue={editProject?.description || ""}
              required 
            />
          </div>

          {/* Cover Image Upload */}
          <div className="bg-secondary/20 p-6 rounded-xl border border-dashed border-muted flex flex-col md:flex-row items-center gap-6">
            <div className="relative w-32 h-20 rounded-lg overflow-hidden border border-muted shrink-0 bg-neutral-900 flex items-center justify-center">
              {editProject?.image || isEdit ? (
                <Image 
                  src={editProject?.image || "/Images/Residential Project/living_room.webp"}
                  alt="Cover Preview"
                  fill
                  className="object-cover"
                />
              ) : (
                <Upload size={24} className="text-muted-foreground" />
              )}
            </div>

            <div className="flex-1 space-y-2">
              <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground block">Cover image</label>
              <input type="hidden" name="current_cover_url" value={editProject?.image || ""} />
              <input 
                type="file" 
                name="cover_file" 
                accept="image/*"
                className="text-xs text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-accent hover:file:text-white dark:hover:file:text-neutral-900 transition-all cursor-pointer"
              />
              <span className="text-[10px] text-muted-foreground/60 block">Will show up in portfolio catalog view. Recommended: landscape aspect ratio.</span>
            </div>
          </div>

          {/* Gallery Sub-Upload */}
          <div className="bg-secondary/20 p-6 rounded-xl border border-dashed border-muted flex flex-col gap-4">
            <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground block">Add Gallery Images</label>
            <input 
              type="file" 
              name="gallery_files" 
              multiple 
              accept="image/*"
              className="text-xs text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-accent hover:file:text-white dark:hover:file:text-neutral-900 transition-all cursor-pointer"
            />
            <span className="text-[10px] text-muted-foreground/60 block">Select multiple images to append to the project''s high-res gallery.</span>
          </div>

          <div className="flex flex-wrap gap-6 items-center">
            <div className="flex items-center space-x-3">
              <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground" htmlFor="is_featured">Featured Work</label>
              <select 
                className="rounded-md px-4 py-2 bg-secondary/35 border border-muted/50 focus:outline-none focus:border-accent text-sm"
                name="is_featured"
                id="is_featured"
                defaultValue={editProject ? String(editProject.is_featured) : "false"}
              >
                <option value="true">Show on Homepage</option>
                <option value="false">Portfolio Only</option>
              </select>
            </div>

            <div className="flex items-center space-x-3">
              <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground" htmlFor="is_published">Publish Status</label>
              <select 
                className="rounded-md px-4 py-2 bg-secondary/35 border border-muted/50 focus:outline-none focus:border-accent text-sm"
                name="is_published"
                id="is_published"
                defaultValue={editProject ? String(editProject.is_published) : "true"}
              >
                <option value="true">Published</option>
                <option value="false">Draft / Archived</option>
              </select>
            </div>
          </div>

          {/* Existing Gallery Grid (Only for Edit) */}
          {isEdit && gallery.length > 0 && (
            <div className="space-y-4 pt-6 border-t border-muted/20">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">Active Gallery ({gallery.length})</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {gallery.map((img) => (
                  <div key={img.id} className="relative group rounded-lg overflow-hidden border border-muted h-28 bg-neutral-950 flex items-center justify-center">
                    <Image 
                      src={img.image_url} 
                      alt="Gallery Item" 
                      fill 
                      className="object-cover group-hover:opacity-75 transition-opacity"
                    />
                    <button 
                      formAction={deleteGalleryImage} 
                      name="delete_image_id" 
                      value={img.id}
                      className="absolute inset-0 bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity font-semibold uppercase tracking-wider text-[10px]"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end pt-4">
            <button 
              type="submit" 
              className="bg-primary hover:bg-accent text-white dark:text-neutral-900 dark:hover:text-white px-8 py-3.5 rounded-md transition-colors tracking-[0.2em] uppercase text-xs font-semibold"
            >
              Save Project
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
          <h1 className="text-4xl font-serif font-medium mb-2">Projects & Portfolio</h1>
          <p className="text-muted-foreground">Manage your design showcase projects, client locations, and photo galleries.</p>
        </div>
        <Link href="/admin/projects?action=add" className="bg-primary hover:bg-accent text-white dark:text-neutral-900 dark:hover:text-white px-5 py-3 rounded-md text-xs font-semibold tracking-wider uppercase transition-colors flex items-center gap-2">
          <Plus size={14} /> Add Project
        </Link>
      </div>

      <div className="bg-background rounded-xl border border-muted/20 shadow-sm overflow-hidden">
        {!projects?.length && (
          <div className="p-16 text-center text-muted-foreground flex flex-col items-center">
            <p className="font-light">No projects in portfolio. Click "Add Project" to create one.</p>
          </div>
        )}

        {projects && projects.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-secondary/30 text-muted-foreground text-xs uppercase tracking-[0.2em] border-b border-muted/10">
                  <th className="p-6 font-medium">Featured</th>
                  <th className="p-6 font-medium">Cover</th>
                  <th className="p-6 font-medium">Project Name</th>
                  <th className="p-6 font-medium">Category</th>
                  <th className="p-6 font-medium">Location</th>
                  <th className="p-6 font-medium">Year</th>
                  <th className="p-6 font-medium">Sort Order</th>
                  <th className="p-6 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-muted/10">
                {projects.map((proj) => (
                  <tr key={proj.id} className="hover:bg-secondary/10 transition-colors">
                    <td className="p-6">
                      <form action={toggleFeatured}>
                        <input type="hidden" name="id" value={proj.id} />
                        <input type="hidden" name="currentFeatured" value={String(proj.is_featured)} />
                        <button type="submit" className="focus:outline-none transition-transform active:scale-90" title="Toggle featured flag">
                          <Star 
                            size={18} 
                            className={proj.is_featured ? "text-accent fill-accent" : "text-muted-foreground/35 hover:text-accent"} 
                          />
                        </button>
                      </form>
                    </td>
                    <td className="p-6">
                      <div className="relative w-16 h-12 rounded overflow-hidden border border-muted bg-neutral-900 shrink-0">
                        <Image 
                          src={proj.image}
                          alt="Cover"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </td>
                    <td className="p-6 text-sm font-medium text-foreground whitespace-nowrap">
                      <div>{proj.title}</div>
                      {!proj.is_published && <span className="text-[9px] uppercase tracking-wider bg-neutral-200 dark:bg-neutral-800 text-muted-foreground px-1.5 py-0.5 rounded font-bold">Draft</span>}
                    </td>
                    <td className="p-6 text-xs text-accent font-semibold tracking-wider uppercase">
                      {proj.category}
                    </td>
                    <td className="p-6 text-sm text-muted-foreground">
                      {proj.location}
                    </td>
                    <td className="p-6 text-sm text-muted-foreground text-center">
                      {proj.year}
                    </td>
                    <td className="p-6 text-sm text-muted-foreground text-center">
                      {proj.sort_order}
                    </td>
                    <td className="p-6 text-right">
                      <div className="flex gap-2 justify-end">
                        <Link href={`/admin/projects?action=edit&id=${proj.id}`} className="text-muted-foreground hover:text-accent p-1.5 rounded border border-muted/50 hover:border-accent transition-colors" title="Edit project">
                          <Edit size={14} />
                        </Link>
                        <form action={deleteProject}>
                          <input type="hidden" name="id" value={proj.id} />
                          <button type="submit" className="text-muted-foreground hover:text-red-500 p-1.5 rounded border border-muted/50 hover:border-red-500 transition-colors" title="Delete project">
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
