import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { CheckCircle, Circle, Mail } from "lucide-react";
import { revalidatePath } from "next/cache";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/admin/login");
  }

  const { data: contacts, error } = await supabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false });

  const markContacted = async (formData: FormData) => {
    "use server";
    const id = formData.get("id") as string;
    const supabase = createClient();
    await supabase.from("contacts").update({ status: 'contacted' }).eq('id', id);
    revalidatePath("/admin");
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-serif font-medium mb-2">Inquiries</h1>
          <p className="text-muted-foreground">Manage your client leads and consultation requests.</p>
        </div>
      </div>

      <div className="bg-background rounded-xl border border-muted/20 shadow-sm overflow-hidden">
        {error && <p className="p-6 text-red-500">Error loading contacts: {error.message}. Please make sure you ran the SQL script in your Supabase dashboard.</p>}
        {!contacts?.length && !error && (
          <div className="p-12 text-center text-muted-foreground flex flex-col items-center">
            <Mail className="w-12 h-12 mb-4 opacity-20" />
            <p>No inquiries yet. When users submit the contact form, they will appear here.</p>
          </div>
        )}
        
        {contacts && contacts.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-secondary/30 text-muted-foreground text-xs uppercase tracking-[0.2em]">
                  <th className="p-6 font-medium whitespace-nowrap">Status</th>
                  <th className="p-6 font-medium whitespace-nowrap">Name</th>
                  <th className="p-6 font-medium whitespace-nowrap">Contact Details</th>
                  <th className="p-6 font-medium whitespace-nowrap">Project</th>
                  <th className="p-6 font-medium">Message</th>
                  <th className="p-6 font-medium whitespace-nowrap">Date</th>
                  <th className="p-6 font-medium whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-muted/10">
                {contacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-secondary/10 transition-colors">
                    <td className="p-6">
                      {contact.status === 'contacted' ? (
                        <span className="flex items-center text-xs text-green-500 bg-green-500/10 px-3 py-1.5 rounded-full w-fit whitespace-nowrap">
                          <CheckCircle size={14} className="mr-2" /> Contacted
                        </span>
                      ) : (
                        <span className="flex items-center text-xs text-accent bg-accent/10 px-3 py-1.5 rounded-full w-fit whitespace-nowrap">
                          <Circle size={14} className="mr-2" /> New
                        </span>
                      )}
                    </td>
                    <td className="p-6 font-medium whitespace-nowrap">{contact.first_name} {contact.last_name}</td>
                    <td className="p-6 text-sm text-muted-foreground whitespace-nowrap">
                      <div>{contact.email}</div>
                      <div>{contact.phone}</div>
                      <div className="text-xs mt-1 text-foreground/40">{contact.city}</div>
                    </td>
                    <td className="p-6 text-sm whitespace-nowrap">
                      <div>{contact.project_type}</div>
                      <div className="text-xs text-muted-foreground mt-1">{contact.budget}</div>
                    </td>
                    <td className="p-6 text-sm max-w-xs" title={contact.message}>
                      <p className="line-clamp-3 leading-relaxed">{contact.message}</p>
                    </td>
                    <td className="p-6 text-sm text-muted-foreground whitespace-nowrap">
                      {new Date(contact.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-6">
                      {contact.status === 'new' && (
                        <form action={markContacted}>
                          <input type="hidden" name="id" value={contact.id} />
                          <button type="submit" className="text-xs bg-accent text-white px-4 py-2 rounded hover:bg-accent/90 transition-colors whitespace-nowrap uppercase tracking-widest">
                            Mark Contacted
                          </button>
                        </form>
                      )}
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
