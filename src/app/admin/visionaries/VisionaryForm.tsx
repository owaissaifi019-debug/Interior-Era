"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, Upload, Loader2, AlertCircle } from "lucide-react";
import { saveVisionaryAction } from "./actions";

interface VisionaryItem {
  id?: string;
  name: string;
  role: string;
  bio: string;
  image_url: string;
  is_archived?: boolean;
  sort_order?: number;
}

export default function VisionaryForm({
  editVisionary,
}: {
  editVisionary?: VisionaryItem | null;
}) {
  const router = useRouter();
  const isEdit = Boolean(editVisionary?.id);
  const [isSaving, setIsSaving] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    editVisionary?.image_url || null
  );
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    setNotification(null);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await saveVisionaryAction(formData);
      if (res && res.success) {
        setNotification({
          type: "success",
          message: isEdit
            ? "Visionary updated successfully!"
            : "Visionary created successfully!",
        });
        setTimeout(() => {
          router.push("/admin/visionaries");
          router.refresh();
        }, 800);
      } else {
        setNotification({
          type: "error",
          message: res?.error || "Failed to update visionary.",
        });
      }
    } catch (err: any) {
      setNotification({
        type: "error",
        message: err?.message || "An unexpected error occurred while saving.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl border backdrop-blur-md max-w-md ${
              notification.type === "success"
                ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
                : "bg-red-500/15 border-red-500/30 text-red-400"
            }`}
          >
            {notification.type === "success" ? (
              <Check className="h-5 w-5 shrink-0 text-emerald-400" />
            ) : (
              <AlertCircle className="h-5 w-5 shrink-0 text-red-400" />
            )}
            <div className="flex-1 text-sm font-medium leading-snug">
              {notification.message}
            </div>
            <button
              onClick={() => setNotification(null)}
              className="text-current opacity-60 hover:opacity-100 transition-opacity ml-2 text-lg leading-none"
              type="button"
            >
              &times;
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <Link
          href="/admin/visionaries"
          className="p-2.5 border border-muted/30 hover:border-accent hover:text-accent rounded-full transition-all active:scale-95 duration-150"
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-foreground">
            {isEdit ? "Edit Visionary" : "Add New Visionary"}
          </h1>
          <p className="text-muted-foreground text-xs sm:text-sm">
            {isEdit
              ? "Update leadership profile details, description, or image."
              : "Create a new leadership profile to showcase on the About page."}
          </p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-card border border-border/70 rounded-2xl p-6 sm:p-8 shadow-xl"
      >
        {isEdit && <input type="hidden" name="id" value={editVisionary?.id} />}
        <input
          type="hidden"
          name="current_image_url"
          value={editVisionary?.image_url || "/img/project-1.jpeg"}
        />

        {/* Image Preview & Upload */}
        <div className="space-y-3">
          <label className="block text-xs uppercase tracking-wider font-semibold text-muted-foreground">
            Profile Image
          </label>
          
          {previewUrl && (
            <div className="relative w-36 h-44 rounded-2xl overflow-hidden border-2 border-accent/40 shadow-lg bg-black group mb-3">
              <Image
                src={previewUrl}
                alt="Visionary Preview"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[10px] text-white font-medium uppercase tracking-wider">
                Current Photo
              </div>
            </div>
          )}

          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-muted/40 hover:border-accent/60 rounded-2xl cursor-pointer bg-secondary/10 hover:bg-secondary/20 transition-all group active:scale-[0.99] duration-150">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-2 text-muted-foreground group-hover:text-accent group-hover:scale-110 transition-all duration-200" />
                <p className="mb-1 text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-muted-foreground/70">
                  PNG, JPG, WEBP or JPEG (Max 5MB)
                </p>
              </div>
              <input
                type="file"
                name="image_file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Name & Role */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              defaultValue={editVisionary?.name || ""}
              required
              placeholder="e.g. Ar. Mohd Anas"
              className="w-full bg-background border border-muted/40 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-2">
              Role / Designation *
            </label>
            <input
              type="text"
              name="role"
              defaultValue={editVisionary?.role || ""}
              required
              placeholder="e.g. Chief Architect"
              className="w-full bg-background border border-muted/40 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
            />
          </div>
        </div>

        {/* Bio / Description */}
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-2">
            Description / Bio *
          </label>
          <textarea
            name="bio"
            rows={4}
            defaultValue={editVisionary?.bio || ""}
            required
            placeholder="Describe their expertise, leadership role, vision, and contributions..."
            className="w-full bg-background border border-muted/40 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all leading-relaxed"
          />
        </div>

        {/* Sort Order & Archived Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-2">
              Display Priority Order
            </label>
            <input
              type="number"
              name="sort_order"
              defaultValue={editVisionary?.sort_order ?? 1}
              className="w-full bg-background border border-muted/40 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
            />
          </div>

          <div className="pt-4 sm:pt-6">
            <label className="flex items-center space-x-3 cursor-pointer select-none group">
              <input
                type="checkbox"
                name="is_archived"
                value="true"
                defaultChecked={editVisionary?.is_archived ?? false}
                className="w-5 h-5 accent-accent rounded cursor-pointer transition-transform group-hover:scale-105"
              />
              <span className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                Archive this Visionary
              </span>
            </label>
            <p className="text-[11px] text-muted-foreground mt-1 ml-8">
              Archived visionaries are hidden from the public website.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-muted/20">
          <Link
            href="/admin/visionaries"
            className="px-5 py-2.5 rounded-xl border border-muted/40 text-sm font-medium hover:bg-secondary/40 hover:text-foreground text-muted-foreground transition-all active:scale-95 duration-150"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center justify-center space-x-2 px-6 py-2.5 bg-accent text-neutral-900 font-medium text-sm rounded-xl hover:bg-accent/90 transition-all duration-150 hover:scale-[1.02] active:scale-[0.96] shadow-lg hover:shadow-accent/20 active:shadow-inner cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-neutral-900" />
                <span>{isEdit ? "Updating..." : "Saving..."}</span>
              </>
            ) : (
              <>
                <Check size={16} />
                <span>{isEdit ? "Update Visionary" : "Save Visionary"}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
