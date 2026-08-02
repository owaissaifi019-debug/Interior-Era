"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, AlertCircle, Loader2 } from "lucide-react";
import { updateSettingsAction } from "./actions";

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

interface Settings {
  id: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  instagram: string;
  linkedin: string;
  twitter: string;
  stats: Stat[];
}

export default function SettingsForm({ settings }: { settings: Settings | null }) {
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const defaultStats = [
    { value: 100, suffix: "+", label: "Successful Projects" },
    { value: 5, suffix: "+", label: "Years Experience" },
    { value: 50, suffix: "+", label: "Happy Clients" },
    { value: 100, suffix: "%", label: "Creative Designs" }
  ];

  const currentStats = settings?.stats || defaultStats;

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    setNotification(null);

    const formData = new FormData(e.currentTarget);
    try {
      const result = await updateSettingsAction(formData);
      if (result && result.success) {
        setNotification({
          type: "success",
          message: "Settings saved successfully!"
        });
      } else {
        setNotification({
          type: "error",
          message: result?.error || "Failed to save settings."
        });
      }
    } catch (err: any) {
      setNotification({
        type: "error",
        message: err?.message || "An unexpected error occurred."
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl border backdrop-blur-md max-w-sm ${
              notification.type === "success"
                ? "bg-emerald-500/10 dark:bg-emerald-500/15 border-emerald-500/20 text-emerald-500 shadow-emerald-500/5"
                : "bg-red-500/10 dark:bg-red-500/15 border-red-500/20 text-red-500 shadow-red-500/5"
            }`}
          >
            {notification.type === "success" ? (
              <Check className="h-5 w-5 shrink-0" />
            ) : (
              <AlertCircle className="h-5 w-5 shrink-0" />
            )}
            <div className="flex-1 text-sm font-medium tracking-wide">
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

      <form onSubmit={handleSubmit} className="bg-background rounded-xl border border-muted/20 shadow-sm p-8 space-y-6">
        <input type="hidden" name="id" value={settings?.id} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground" htmlFor="phone">Phone Number</label>
            <input 
              className="rounded-md px-4 py-3 bg-secondary/30 border border-muted/50 focus:outline-none focus:border-accent transition-colors"
              name="phone"
              id="phone"
              defaultValue={settings?.phone || ""}
              required 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground" htmlFor="whatsapp">WhatsApp Number (e.g. 9910620810)</label>
            <input 
              className="rounded-md px-4 py-3 bg-secondary/30 border border-muted/50 focus:outline-none focus:border-accent transition-colors"
              name="whatsapp"
              id="whatsapp"
              defaultValue={settings?.whatsapp || ""}
              required 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground" htmlFor="email">Public Email Address</label>
            <input 
              className="rounded-md px-4 py-3 bg-secondary/30 border border-muted/50 focus:outline-none focus:border-accent transition-colors"
              name="email"
              id="email"
              type="email"
              defaultValue={settings?.email || ""}
              required 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground" htmlFor="address">Studio Address</label>
            <input 
              className="rounded-md px-4 py-3 bg-secondary/30 border border-muted/50 focus:outline-none focus:border-accent transition-colors"
              name="address"
              id="address"
              defaultValue={settings?.address || ""}
              required 
            />
          </div>
        </div>

        <hr className="border-muted/20 my-8" />
        
        <div>
          <h3 className="text-lg font-serif font-medium mb-1 text-accent">Homepage Metrics / Stats</h3>
          <p className="text-xs text-muted-foreground mb-6">Manage the counter values, suffixes, and labels shown in the homepage stats section.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[0, 1, 2, 3].map((index) => {
              const stat = currentStats[index] || { value: 0, suffix: "+", label: "" };
              return (
                <div key={index} className="bg-secondary/15 p-5 rounded-lg border border-muted/30 space-y-4 animate-in fade-in duration-300">
                  <h4 className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">Stat Card #{index + 1}</h4>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2 flex flex-col gap-1.5">
                      <label className="text-[9px] uppercase tracking-wider text-muted-foreground" htmlFor={`stat_${index}_value`}>Number</label>
                      <input 
                        type="number"
                        name={`stat_${index}_value`}
                        id={`stat_${index}_value`}
                        defaultValue={stat.value}
                        className="rounded px-3 py-2 bg-secondary/30 border border-muted/50 text-sm focus:outline-none focus:border-accent"
                        required
                      />
                    </div>
                    
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] uppercase tracking-wider text-muted-foreground" htmlFor={`stat_${index}_suffix`}>Suffix</label>
                      <input 
                        type="text"
                        name={`stat_${index}_suffix`}
                        id={`stat_${index}_suffix`}
                        defaultValue={stat.suffix}
                        className="rounded px-3 py-2 bg-secondary/30 border border-muted/50 text-sm text-center focus:outline-none focus:border-accent"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] uppercase tracking-wider text-muted-foreground" htmlFor={`stat_${index}_label`}>Label Description</label>
                    <input 
                      type="text"
                      name={`stat_${index}_label`}
                      id={`stat_${index}_label`}
                      defaultValue={stat.label}
                      className="rounded px-3 py-2 bg-secondary/30 border border-muted/50 text-sm focus:outline-none focus:border-accent"
                      required
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <hr className="border-muted/20 my-8" />
        <h3 className="text-lg font-serif font-medium mb-4 text-accent">Social Media Links</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground" htmlFor="instagram">Instagram Link</label>
            <input 
              className="rounded-md px-4 py-3 bg-secondary/30 border border-muted/50 focus:outline-none focus:border-accent transition-colors"
              name="instagram"
              id="instagram"
              defaultValue={settings?.instagram || ""}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground" htmlFor="linkedin">LinkedIn Link</label>
            <input 
              className="rounded-md px-4 py-3 bg-secondary/30 border border-muted/50 focus:outline-none focus:border-accent transition-colors"
              name="linkedin"
              id="linkedin"
              defaultValue={settings?.linkedin || ""}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground" htmlFor="twitter">Twitter Link</label>
            <input 
              className="rounded-md px-4 py-3 bg-secondary/30 border border-muted/50 focus:outline-none focus:border-accent transition-colors"
              name="twitter"
              id="twitter"
              defaultValue={settings?.twitter || ""}
            />
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <button 
            type="submit" 
            disabled={isSaving}
            className="bg-primary hover:bg-accent text-white dark:text-neutral-900 dark:hover:text-white px-8 py-3.5 rounded-md transition-colors tracking-[0.2em] uppercase text-xs font-semibold flex items-center justify-center gap-2 min-w-[180px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4.5 w-4.5 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <span>Save Settings</span>
            )}
          </button>
        </div>
      </form>
    </>
  );
}
