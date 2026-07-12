import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus, Trash, Edit, ArrowLeft, ToggleLeft, ToggleRight, Check } from "lucide-react";

export const dynamic = 'force-dynamic';

const AVAILABLE_ICONS = ["Compass", "PenTool", "Layout", "Home", "Lightbulb", "Zap", "ShieldCheck"];

export default async function ServicesManagement({
  searchParams,
}: {
  searchParams: { action?: string; id?: string };
}) {
  const supabase = createClient();
  const action = searchParams.action;
  const editId = searchParams.id;

  // Fetch all services ordered by sort_order
  const { data: services } = await supabase
    .from("services")
    .select("*")
    .order("sort_order", { ascending: true });

  // Fetch the service if in edit mode
  let editService = null;
  if (action === "edit" && editId) {
    const { data } = await supabase
      .from("services")
      .select("*")
      .eq("id", editId)
      .single();
    editService = data;
  }

  // Server Actions
  const saveService = async (formData: FormData) => {
    "use server";
    const supabase = createClient();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const icon_name = formData.get("icon_name") as string;
    const sort_order = parseInt(formData.get("sort_order") as string || "0");
    const is_enabled = formData.get("is_enabled") === "true";

    const id = formData.get("id") as string;

    if (id) {
      // Edit mode
      await supabase
        .from("services")
        .update({ title, description, icon_name, sort_order, is_enabled })
        .eq("id", id);
    } else {
      // Create mode
      await supabase
        .from("services")
        .insert([{ title, description, icon_name, sort_order, is_enabled }]);
    }

    revalidatePath("/admin/services");
    revalidatePath("/");
    redirect("/admin/services");
  };

  const toggleStatus = async (formData: FormData) => {
    "use server";
    const id = formData.get("id") as string;
    const currentStatus = formData.get("currentStatus") === "true";
    const supabase = createClient();
    await supabase
      .from("services")
      .update({ is_enabled: !currentStatus })
      .eq("id", id);

    revalidatePath("/admin/services");
    revalidatePath("/");
  };

  const deleteService = async (formData: FormData) => {
    "use server";
    const id = formData.get("id") as string;
    const supabase = createClient();
    await supabase.from("services").delete().eq("id", id);

    revalidatePath("/admin/services");
    revalidatePath("/");
  };

  // Form View (Add / Edit)
  if (action === "add" || (action === "edit" && editService)) {
    const isEdit = action === "edit";
    return (
      <div className="w-full max-w-2xl mx-auto">
        <div className="flex items-center space-x-4 mb-8">
          <Link href="/admin/services" className="p-2 border border-muted hover:border-accent hover:text-accent rounded-full transition-all">
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="text-3xl font-serif font-medium">{isEdit ? "Edit Service" : "Add New Service"}</h1>
            <p className="text-muted-foreground">{isEdit ? "Modify existing service details." : "Create a new core design service."}</p>
          </div>
        </div>

        <form action={saveService} className="bg-background rounded-xl border border-muted/20 shadow-sm p-8 space-y-6">
          {isEdit && <input type="hidden" name="id" value={editService.id} />}

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground" htmlFor="title">Service Title</label>
            <input 
              className="rounded-md px-4 py-3 bg-secondary/35 border border-muted/50 focus:outline-none focus:border-accent transition-colors"
              name="title"
              id="title"
              defaultValue={editService?.title || ""}
              required 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground" htmlFor="description">Description</label>
            <textarea 
              className="rounded-md px-4 py-3 bg-secondary/35 border border-muted/50 focus:outline-none focus:border-accent transition-colors resize-none"
              name="description"
              id="description"
              rows={4}
              defaultValue={editService?.description || ""}
              required 
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground" htmlFor="icon_name">Icon Design</label>
              <select 
                className="rounded-md px-4 py-3 bg-secondary/35 border border-muted/50 focus:outline-none focus:border-accent transition-colors"
                name="icon_name"
                id="icon_name"
                defaultValue={editService?.icon_name || "Compass"}
              >
                {AVAILABLE_ICONS.map(icon => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground" htmlFor="sort_order">Sort Order</label>
              <input 
                className="rounded-md px-4 py-3 bg-secondary/35 border border-muted/50 focus:outline-none focus:border-accent transition-colors"
                name="sort_order"
                id="sort_order"
                type="number"
                defaultValue={editService?.sort_order || "0"}
                required 
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground" htmlFor="is_enabled">Status</label>
            <select 
              className="rounded-md px-4 py-2 bg-secondary/35 border border-muted/50 focus:outline-none focus:border-accent text-sm"
              name="is_enabled"
              id="is_enabled"
              defaultValue={editService ? String(editService.is_enabled) : "true"}
            >
              <option value="true">Enabled / Visible</option>
              <option value="false">Disabled / Hidden</option>
            </select>
          </div>

          <div className="flex justify-end pt-4">
            <button 
              type="submit" 
              className="bg-primary hover:bg-accent text-white dark:text-neutral-900 dark:hover:text-white px-8 py-3.5 rounded-md transition-colors tracking-[0.2em] uppercase text-xs font-semibold"
            >
              Save Service
            </button>
          </div>
        </form>
      </div>
    );
  }

  // List View (Default)
  return (
    <div className="w-full max-w-5xl mx-auto space-y-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-serif font-medium mb-2">Services Management</h1>
          <p className="text-muted-foreground">Manage the architectural and interior design service blocks shown on the homepage.</p>
        </div>
        <Link href="/admin/services?action=add" className="bg-primary hover:bg-accent text-white dark:text-neutral-900 dark:hover:text-white px-5 py-3 rounded-md text-xs font-semibold tracking-wider uppercase transition-colors flex items-center gap-2">
          <Plus size={14} /> Add Service
        </Link>
      </div>

      <div className="bg-background rounded-xl border border-muted/20 shadow-sm overflow-hidden">
        {!services?.length && (
          <div className="p-16 text-center text-muted-foreground flex flex-col items-center">
            <p className="font-light">No services created yet. Click "Add Service" to create one.</p>
          </div>
        )}

        {services && services.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-secondary/30 text-muted-foreground text-xs uppercase tracking-[0.2em] border-b border-muted/10">
                  <th className="p-6 font-medium">Status</th>
                  <th className="p-6 font-medium">Service Info</th>
                  <th className="p-6 font-medium">Description</th>
                  <th className="p-6 font-medium">Icon</th>
                  <th className="p-6 font-medium">Sort Order</th>
                  <th className="p-6 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-muted/10">
                {services.map((service) => (
                  <tr key={service.id} className="hover:bg-secondary/10 transition-colors">
                    <td className="p-6">
                      <form action={toggleStatus}>
                        <input type="hidden" name="id" value={service.id} />
                        <input type="hidden" name="currentStatus" value={String(service.is_enabled)} />
                        <button type="submit" className="focus:outline-none transition-transform active:scale-95">
                          {service.is_enabled ? (
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
                    <td className="p-6 font-medium text-sm text-foreground whitespace-nowrap">
                      {service.title}
                    </td>
                    <td className="p-6 text-sm text-muted-foreground max-w-sm">
                      <p className="line-clamp-2 leading-relaxed font-light">{service.description}</p>
                    </td>
                    <td className="p-6 text-sm text-accent font-mono">
                      {service.icon_name}
                    </td>
                    <td className="p-6 text-sm text-muted-foreground text-center">
                      {service.sort_order}
                    </td>
                    <td className="p-6 text-right">
                      <div className="flex gap-2 justify-end">
                        <Link href={`/admin/services?action=edit&id=${service.id}`} className="text-muted-foreground hover:text-accent p-1.5 rounded border border-muted/50 hover:border-accent transition-colors" title="Edit service">
                          <Edit size={14} />
                        </Link>
                        <form action={deleteService}>
                          <input type="hidden" name="id" value={service.id} />
                          <button type="submit" className="text-muted-foreground hover:text-red-500 p-1.5 rounded border border-muted/50 hover:border-red-500 transition-colors" title="Delete service">
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
