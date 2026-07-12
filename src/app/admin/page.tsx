import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { CheckCircle, Circle, Mail, Search, Users, Archive, Trash, FolderOpen, AlertCircle, CheckSquare, Plus, ExternalLink } from "lucide-react";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: { status?: string; search?: string };
}) {
  const supabase = createClient();

  // 1. Fetch dashboard KPI statistics
  const { count: totalLeads } = await supabase
    .from("contacts")
    .select("*", { count: "exact", head: true });

  const { count: newLeads } = await supabase
    .from("contacts")
    .select("*", { count: "exact", head: true })
    .eq("status", "new");

  const { count: totalProjects } = await supabase
    .from("projects")
    .select("*", { count: "exact", head: true });

  const { count: totalSubscribers } = await supabase
    .from("newsletter_subscribers")
    .select("*", { count: "exact", head: true });

  // 2. Fetch CRM Leads with search & filters
  const selectedStatus = searchParams.status || "all";
  const searchQuery = searchParams.search || "";

  let query = supabase.from("contacts").select("*");

  if (selectedStatus !== "all") {
    query = query.eq("status", selectedStatus);
  } else {
    // By default, don't show archived leads in 'all' view
    query = query.neq("status", "archived");
  }

  query = query.order("created_at", { ascending: false });

  const { data: contacts, error } = await query;

  // Filter contacts client-side for search to prevent complex SQL matchers
  const filteredContacts = contacts?.filter((c) => {
    if (!searchQuery) return true;
    const name = `${c.first_name} ${c.last_name || ""}`.toLowerCase();
    const email = c.email.toLowerCase();
    const phone = (c.phone || "").toLowerCase();
    const city = (c.city || "").toLowerCase();
    const msg = c.message.toLowerCase();
    const term = searchQuery.toLowerCase();
    return name.includes(term) || email.includes(term) || phone.includes(term) || city.includes(term) || msg.includes(term);
  }) || [];

  // Server Actions for Lead status transitions
  const updateStatus = async (formData: FormData) => {
    "use server";
    const id = formData.get("id") as string;
    const newStatus = formData.get("status") as string;
    const supabase = createClient();
    await supabase.from("contacts").update({ status: newStatus }).eq("id", id);
    revalidatePath("/admin");
  };

  const deleteLead = async (formData: FormData) => {
    "use server";
    const id = formData.get("id") as string;
    const supabase = createClient();
    await supabase.from("contacts").delete().eq("id", id);
    revalidatePath("/admin");
  };

  // Status badges configurations
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "contacted":
        return (
          <span className="flex items-center text-xs text-blue-500 bg-blue-500/10 px-3 py-1.5 rounded-full w-fit whitespace-nowrap">
            <ClockCircleIcon className="mr-1.5 h-3.5 w-3.5" /> Contacted
          </span>
        );
      case "closed":
        return (
          <span className="flex items-center text-xs text-green-500 bg-green-500/10 px-3 py-1.5 rounded-full w-fit whitespace-nowrap">
            <CheckCircle size={14} className="mr-1.5" /> Closed (Deal)
          </span>
        );
      case "archived":
        return (
          <span className="flex items-center text-xs text-neutral-400 bg-neutral-500/10 px-3 py-1.5 rounded-full w-fit whitespace-nowrap">
            <Archive size={14} className="mr-1.5" /> Archived
          </span>
        );
      default:
        return (
          <span className="flex items-center text-xs text-accent bg-accent/10 px-3 py-1.5 rounded-full w-fit whitespace-nowrap font-semibold">
            <Circle size={14} className="mr-1.5 fill-accent/20" /> New
          </span>
        );
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-12">
      {/* Page Title */}
      <div>
        <h1 className="text-4xl font-serif font-medium mb-2">Dashboard Overview</h1>
        <p className="text-muted-foreground">Monitor real-time client enquiries and site metrics.</p>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-background border border-muted/20 rounded-xl p-6 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-accent/10 rounded-lg text-accent">
            <Mail size={24} />
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider text-muted-foreground">Total Inquiries</span>
            <h2 className="text-2xl font-serif font-medium mt-1">{totalLeads || 0}</h2>
          </div>
        </div>

        <div className="bg-background border border-muted/20 rounded-xl p-6 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-red-500/10 rounded-lg text-red-500">
            <AlertCircle size={24} />
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider text-muted-foreground">New Leads</span>
            <h2 className="text-2xl font-serif font-medium mt-1">{newLeads || 0}</h2>
          </div>
        </div>

        <div className="bg-background border border-muted/20 rounded-xl p-6 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-blue-500/10 rounded-lg text-blue-500">
            <FolderOpen size={24} />
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider text-muted-foreground">Projects</span>
            <h2 className="text-2xl font-serif font-medium mt-1">{totalProjects || 0}</h2>
          </div>
        </div>

        <div className="bg-background border border-muted/20 rounded-xl p-6 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-green-500/10 rounded-lg text-green-500">
            <Users size={24} />
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider text-muted-foreground">Subscribers</span>
            <h2 className="text-2xl font-serif font-medium mt-1">{totalSubscribers || 0}</h2>
          </div>
        </div>
      </div>

      {/* Quick Actions & Navigation Bar */}
      <div className="bg-background border border-muted/20 rounded-xl p-6 shadow-sm flex flex-wrap gap-4 items-center justify-between">
        <h3 className="font-serif text-lg font-medium">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/projects" className="bg-primary hover:bg-accent text-white dark:text-neutral-900 dark:hover:text-white px-4 py-2.5 rounded-md text-xs font-semibold tracking-wider uppercase transition-colors flex items-center gap-2">
            <Plus size={14} /> Add Project
          </Link>
          <Link href="/admin/slides" className="border border-muted/50 hover:border-accent hover:text-accent px-4 py-2.5 rounded-md text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-2">
            Hero slides
          </Link>
          <Link href="/" target="_blank" className="border border-muted/50 hover:border-accent hover:text-accent px-4 py-2.5 rounded-md text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-2">
            View Live Site <ExternalLink size={14} />
          </Link>
        </div>
      </div>

      {/* CRM Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-serif font-medium">Enquiry Manager (CRM)</h2>
        
        {/* Filters and Search toolbar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-background border border-muted/20 p-4 rounded-xl shadow-sm">
          {/* Status Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: "all", label: "Active" },
              { id: "new", label: "New" },
              { id: "contacted", label: "Contacted" },
              { id: "closed", label: "Closed" },
              { id: "archived", label: "Archived" }
            ].map((tab) => {
              const isActive = selectedStatus === tab.id;
              return (
                <Link
                  key={tab.id}
                  href={`/admin?status=${tab.id}&search=${searchQuery}`}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground dark:bg-accent dark:text-neutral-900"
                      : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </div>

          {/* Search Form */}
          <form className="relative w-full md:w-80 flex">
            <input
              type="text"
              name="search"
              placeholder="Search leads..."
              defaultValue={searchQuery}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-secondary/35 border border-muted/50 focus:outline-none focus:border-accent text-sm"
            />
            {/* hidden field to preserve status */}
            <input type="hidden" name="status" value={selectedStatus} />
            <Search className="absolute left-3.5 top-2.5 text-muted-foreground" size={16} />
          </form>
        </div>

        {/* CRM Data Table */}
        <div className="bg-background rounded-xl border border-muted/20 shadow-sm overflow-hidden">
          {error && <p className="p-6 text-red-500">Error loading leads: {error.message}</p>}
          {filteredContacts.length === 0 && !error && (
            <div className="p-16 text-center text-muted-foreground flex flex-col items-center">
              <Mail className="w-12 h-12 mb-4 opacity-20" />
              <p className="font-light">No inquiries found matching current filters.</p>
            </div>
          )}

          {filteredContacts.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-secondary/30 text-muted-foreground text-xs uppercase tracking-[0.2em] border-b border-muted/10">
                    <th className="p-6 font-medium whitespace-nowrap">Status</th>
                    <th className="p-6 font-medium whitespace-nowrap">Client Details</th>
                    <th className="p-6 font-medium whitespace-nowrap">Project Scope</th>
                    <th className="p-6 font-medium">Message</th>
                    <th className="p-6 font-medium whitespace-nowrap">Date</th>
                    <th className="p-6 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-muted/10">
                  {filteredContacts.map((contact) => (
                    <tr key={contact.id} className="hover:bg-secondary/10 transition-colors">
                      <td className="p-6">
                        {getStatusBadge(contact.status)}
                      </td>
                      <td className="p-6 font-medium text-sm">
                        <div className="text-base text-foreground font-serif font-medium">{contact.first_name} {contact.last_name || ""}</div>
                        <div className="text-xs text-muted-foreground mt-1 select-all">{contact.email}</div>
                        <div className="text-xs text-muted-foreground mt-0.5 select-all">{contact.phone || "No Phone"}</div>
                        <div className="text-[10px] text-accent/80 font-semibold tracking-wider uppercase mt-1">{contact.city || "Homepage Form"}</div>
                      </td>
                      <td className="p-6 text-sm">
                        <div className="font-medium text-foreground">{contact.project_type || "N/A"}</div>
                        <div className="text-xs text-muted-foreground mt-1">Budget: {contact.budget || "N/A"}</div>
                      </td>
                      <td className="p-6 text-sm max-w-xs" title={contact.message}>
                        <p className="line-clamp-4 leading-relaxed font-light text-muted-foreground whitespace-pre-wrap">{contact.message}</p>
                      </td>
                      <td className="p-6 text-xs text-muted-foreground whitespace-nowrap">
                        {new Date(contact.created_at).toLocaleDateString()}
                        <div className="text-[10px] text-muted-foreground/60 mt-1">{new Date(contact.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                      </td>
                      <td className="p-6 text-right">
                        <div className="flex flex-col sm:flex-row gap-2 justify-end items-end sm:items-center">
                          {/* Transition Actions */}
                          {contact.status === "new" && (
                            <form action={updateStatus}>
                              <input type="hidden" name="id" value={contact.id} />
                              <input type="hidden" name="status" value="contacted" />
                              <button type="submit" className="text-[10px] bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded uppercase tracking-wider font-semibold transition-colors">
                                Mark Contacted
                              </button>
                            </form>
                          )}
                          {contact.status === "contacted" && (
                            <form action={updateStatus}>
                              <input type="hidden" name="id" value={contact.id} />
                              <input type="hidden" name="status" value="closed" />
                              <button type="submit" className="text-[10px] bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded uppercase tracking-wider font-semibold transition-colors">
                                Close Deal
                              </button>
                            </form>
                          )}
                          
                          {/* Archive/Unarchive */}
                          {contact.status !== "archived" ? (
                            <form action={updateStatus}>
                              <input type="hidden" name="id" value={contact.id} />
                              <input type="hidden" name="status" value="archived" />
                              <button type="submit" className="text-muted-foreground hover:text-accent p-1.5 rounded border border-muted/50 hover:border-accent transition-colors" title="Archive lead">
                                <Archive size={14} />
                              </button>
                            </form>
                          ) : (
                            <form action={updateStatus}>
                              <input type="hidden" name="id" value={contact.id} />
                              <input type="hidden" name="status" value="new" />
                              <button type="submit" className="text-[10px] border border-muted/50 hover:border-primary px-2.5 py-1.5 rounded uppercase tracking-wider font-semibold transition-colors">
                                Restore
                              </button>
                            </form>
                          )}

                          {/* Delete Action */}
                          <form action={deleteLead}>
                            <input type="hidden" name="id" value={contact.id} />
                            <button type="submit" className="text-muted-foreground hover:text-red-500 p-1.5 rounded border border-muted/50 hover:border-red-500 transition-colors" title="Delete lead">
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
    </div>
  );
}

// Minimal ClockIcon
function ClockCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
