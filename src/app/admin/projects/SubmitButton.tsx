"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { ReactNode } from "react";

interface SubmitButtonProps {
  children: ReactNode;
  pendingText?: string;
  className?: string;
}

export function SubmitButton({ 
  children, 
  pendingText = "Saving...", 
  className = "bg-primary hover:bg-accent text-white dark:text-neutral-900 dark:hover:text-white px-8 py-3.5 rounded-md transition-colors tracking-[0.2em] uppercase text-xs font-semibold flex items-center justify-center gap-2"
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      disabled={pending}
      className={`${className} disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {pending ? (
        <>
          <Loader2 className="animate-spin h-3.5 w-3.5" />
          <span>{pendingText}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
