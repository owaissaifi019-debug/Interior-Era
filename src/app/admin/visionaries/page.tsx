import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Plus, UserCheck, ShieldCheck } from "lucide-react";
import VisionaryForm from "./VisionaryForm";
import VisionaryCard from "./VisionaryCard";

export const dynamic = "force-dynamic";

interface VisionaryItem {
  id: string;
  name: string;
  role: string;
  bio: string;
  image_url: string;
  is_archived: boolean;
  sort_order: number;
}

const DEFAULT_VISIONARIES: VisionaryItem[] = [
  {
    id: "default-1",
    name: "Mohd Shahid",
    role: "Lead Interior Designer",
    image_url: "/img/project-3.jpeg",
    bio: "Bringing spaces to life with an unmatched eye for aesthetics, materiality, and bespoke furniture curation.",
    is_archived: false,
    sort_order: 1,
  },
  {
    id: "default-2",
    name: "Ar. Mohd Anas",
    role: "Chief Architect",
    image_url: "/img/project-2.jpeg",
    bio: "The visionary behind our architectural marvels, blending contemporary luxury with timeless structural integrity.",
    is_archived: false,
    sort_order: 2,
  },
  {
    id: "default-3",
    name: "Er. Owais Qarni",
    role: "Structural Engineer",
    image_url: "/img/project-1.jpeg",
    bio: "Ensuring every grand design is backed by rigorous engineering, ultimate safety, and flawless execution.",
    is_archived: false,
    sort_order: 3,
  },
];

export default async function VisionariesManagement({
  searchParams,
}: {
  searchParams: { action?: string; id?: string; filter?: string };
}) {
  const supabase = createClient();
  const action = searchParams.action;
  const editId = searchParams.id;
  const currentFilter = searchParams.filter || "all";

  // Fetch visionaries from DB
  let visionaries: VisionaryItem[] = [];
  try {
    const { data, error } = await supabase
      .from("visionaries")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      visionaries = DEFAULT_VISIONARIES;
    } else {
      visionaries = data as VisionaryItem[];
    }
  } catch {
    visionaries = DEFAULT_VISIONARIES;
  }

  // Fetch active visionary for edit mode
  let editVisionary: VisionaryItem | null = null;
  if (action === "edit" && editId) {
    const found = visionaries.find((v) => v.id === editId);
    if (found) {
      editVisionary = found;
    } else {
      try {
        const { data } = await supabase
          .from("visionaries")
          .select("*")
          .eq("id", editId)
          .single();
        if (data) editVisionary = data as VisionaryItem;
      } catch {
        editVisionary = null;
      }
    }
  }

  // Render Form View (Add / Edit)
  if (action === "add" || (action === "edit" && editVisionary)) {
    return <VisionaryForm editVisionary={editVisionary} />;
  }

  // Filtering
  const filteredVisionaries = visionaries.filter((v) => {
    if (currentFilter === "active") return !v.is_archived;
    if (currentFilter === "archived") return v.is_archived;
    return true;
  });

  const activeCount = visionaries.filter((v) => !v.is_archived).length;
  const archivedCount = visionaries.filter((v) => v.is_archived).length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-muted/20 pb-6">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <UserCheck className="text-accent h-6 w-6" />
            <h1 className="font-serif text-2xl sm:text-3xl font-medium">The Visionaries</h1>
          </div>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Manage company leadership, update profile images and descriptions, and archive former members.
          </p>
        </div>

        <Link
          href="/admin/visionaries?action=add"
          className="flex items-center justify-center space-x-2 bg-accent text-neutral-900 px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-accent/90 transition-all duration-150 hover:scale-[1.02] active:scale-[0.96] shadow-md hover:shadow-accent/20 cursor-pointer w-full md:w-auto"
        >
          <Plus size={18} />
          <span>Add Visionary</span>
        </Link>
      </div>

      {/* Analytics Summary & Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex items-center bg-secondary/30 border border-muted/30 rounded-xl p-1 w-fit">
          <Link
            href="/admin/visionaries?filter=all"
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-150 active:scale-95 ${
              currentFilter === "all"
                ? "bg-background text-foreground shadow-sm font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            All ({visionaries.length})
          </Link>
          <Link
            href="/admin/visionaries?filter=active"
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-150 active:scale-95 ${
              currentFilter === "active"
                ? "bg-background text-foreground shadow-sm font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Active ({activeCount})
          </Link>
          <Link
            href="/admin/visionaries?filter=archived"
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-150 active:scale-95 ${
              currentFilter === "archived"
                ? "bg-background text-foreground shadow-sm font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Archived ({archivedCount})
          </Link>
        </div>
      </div>

      {/* Grid of Visionaries */}
      {filteredVisionaries.length === 0 ? (
        <div className="text-center py-16 bg-card border border-muted/30 rounded-2xl">
          <ShieldCheck className="mx-auto h-12 w-12 text-muted-foreground/50 mb-3" />
          <h3 className="text-lg font-serif font-medium text-foreground mb-1">
            No Visionaries Found
          </h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-6">
            {currentFilter === "archived"
              ? "There are currently no archived visionaries."
              : "No leadership profiles are available in this view."}
          </p>
          <Link
            href="/admin/visionaries?action=add"
            className="inline-flex items-center space-x-2 bg-accent text-neutral-900 px-4 py-2 rounded-xl text-sm font-medium hover:bg-accent/90 transition-all duration-150 active:scale-95 shadow-md"
          >
            <Plus size={16} />
            <span>Add New Visionary</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVisionaries.map((member) => (
            <VisionaryCard key={member.id} member={member} />
          ))}
        </div>
      )}
    </div>
  );
}
