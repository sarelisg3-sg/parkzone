"use client";

import { useRef, useEffect, useId, useCallback, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Modal({ open, onClose, title, description, footer, children, className }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const id = useId();
  const titleId = `${id}-title`;
  const descriptionId = `${id}-description`;

  // Sync open state with the native dialog API
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  // Prevent background scroll while modal is open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close when clicking the backdrop (target is the dialog element itself, not children)
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onClick={handleBackdropClick}
      onClose={onClose}
      className={cn(
        "m-auto p-4 w-full max-w-lg border-0 bg-transparent",
        "[&::backdrop]:bg-neutral-950/60",
        className
      )}
    >
      <div
        className={cn(
          "flex flex-col overflow-hidden",
          "bg-white rounded-[var(--ds-radius-lg)] shadow-[var(--ds-shadow-xl)]",
          "max-h-[calc(90vh-2rem)]"
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-neutral-100 shrink-0">
          <div className="flex flex-col gap-1">
            <h2
              id={titleId}
              className="text-[length:var(--ds-text-base)] font-semibold text-neutral-900 leading-none"
            >
              {title}
            </h2>
            {description && (
              <p
                id={descriptionId}
                className="text-[length:var(--ds-text-sm)] text-neutral-500"
              >
                {description}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className={cn(
              "ml-4 shrink-0 rounded-[var(--ds-radius-sm)] p-1",
              "text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100",
              "transition-colors",
              "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-500"
            )}
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 overflow-y-auto flex-1">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 border-t border-neutral-100 shrink-0">
            {footer}
          </div>
        )}
      </div>
    </dialog>
  );
}
