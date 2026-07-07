import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  footer?: ReactNode;
}

export function Card({ className, title, description, footer, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--ds-radius-lg)] border border-neutral-200 bg-white",
        "shadow-[var(--ds-shadow-sm)] overflow-hidden",
        className
      )}
      {...props}
    >
      {(title || description) && (
        <div className="px-6 py-5 border-b border-neutral-100">
          {title && (
            <h3 className="text-[length:var(--ds-text-base)] font-semibold text-neutral-900 leading-none">
              {title}
            </h3>
          )}
          {description && (
            <p className="mt-1.5 text-[length:var(--ds-text-sm)] text-neutral-500">
              {description}
            </p>
          )}
        </div>
      )}
      <div className="p-6">{children}</div>
      {footer && (
        <div className="px-6 py-4 border-t border-neutral-100 text-[length:var(--ds-text-sm)] text-neutral-500">
          {footer}
        </div>
      )}
    </div>
  );
}
