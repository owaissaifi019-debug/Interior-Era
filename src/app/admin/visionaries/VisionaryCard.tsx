"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Edit, Trash, Archive, ArchiveRestore, Loader2 } from "lucide-react";
import { toggleArchiveVisionaryAction, deleteVisionaryAction } from "./actions";

interface VisionaryItem {
  id: string;
  name: string;
  role: string;
  bio: string;
  image_url: string;
  is_archived: boolean;
  sort_order: number;
}

export default function VisionaryCard({ member }: { member: VisionaryItem }) {
  const [isArchiving, setIsArchiving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggleArchive = async () => {
    setIsArchiving(true);
    try {
      await toggleArchiveVisionaryAction(member.id, member.is_archived, {
        name: member.name,
        role: member.role,
        bio: member.bio,
        image_url: member.image_url,
        sort_order: member.sort_order,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsArchiving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${member.name}?`)) return;
    setIsDeleting(true);
    try {
      await deleteVisionaryAction(member.id);
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      className={`group relative bg-card border rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-all duration-300 ${
        member.is_archived
          ? "border-muted/30 opacity-75 hover:opacity-100"
          : "border-border/70 hover:border-accent/40 hover:shadow-xl"
      }`}
    >
      <div>
        {/* Image & Badges Container */}
        <div className="relative h-[280px] w-full mb-4 rounded-xl overflow-hidden bg-black shadow-inner">
          <Image
            src={member.image_url}
            alt={member.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

          {/* Status Badge */}
          <div className="absolute top-3 left-3 z-10">
            <span
              className={`text-[10px] uppercase tracking-widest font-semibold px-3 py-1 rounded-full border backdrop-blur-md ${
                member.is_archived
                  ? "bg-neutral-900/80 text-amber-400 border-amber-400/30"
                  : "bg-emerald-950/80 text-emerald-400 border-emerald-400/30"
              }`}
            >
              {member.is_archived ? "Archived" : "Active"}
            </span>
          </div>

          {/* Sort Order Badge */}
          <div className="absolute top-3 right-3 z-10">
            <span className="bg-black/60 backdrop-blur-md text-muted-foreground border border-muted/30 text-[10px] px-2.5 py-1 rounded-full font-mono">
              Order #{member.sort_order}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold block">
            {member.role}
          </span>
          <h3 className="font-serif text-xl font-medium text-foreground group-hover:text-accent transition-colors">
            {member.name}
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
            {member.bio}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-5 mt-4 border-t border-muted/20">
        <Link
          href={`/admin/visionaries?action=edit&id=${member.id}`}
          className="flex items-center space-x-1.5 text-xs text-muted-foreground hover:text-accent font-medium px-3 py-1.5 rounded-lg hover:bg-secondary/40 transition-all duration-150 active:scale-95 cursor-pointer"
        >
          <Edit size={14} />
          <span>Edit</span>
        </Link>

        <div className="flex items-center space-x-1">
          {/* Archive / Unarchive Action */}
          <button
            type="button"
            onClick={handleToggleArchive}
            disabled={isArchiving}
            title={member.is_archived ? "Unarchive Visionary" : "Archive Visionary"}
            className={`flex items-center space-x-1 text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-150 active:scale-95 cursor-pointer disabled:opacity-50 ${
              member.is_archived
                ? "text-emerald-400 hover:bg-emerald-500/10"
                : "text-amber-400 hover:bg-amber-500/10"
            }`}
          >
            {isArchiving ? (
              <Loader2 size={14} className="animate-spin" />
            ) : member.is_archived ? (
              <>
                <ArchiveRestore size={14} />
                <span>Unarchive</span>
              </>
            ) : (
              <>
                <Archive size={14} />
                <span>Archive</span>
              </>
            )}
          </button>

          {/* Delete Action */}
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            title="Delete Visionary"
            className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all duration-150 active:scale-95 cursor-pointer disabled:opacity-50"
          >
            {isDeleting ? (
              <Loader2 size={14} className="animate-spin text-red-500" />
            ) : (
              <Trash size={14} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
