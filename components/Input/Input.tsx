import { cn } from "@/lib/utils";
import type { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ className, label, error, id, ...props }: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-[var(--ds-radius-xs)]">
      {label && (
        <label
          htmlFor={inputId}
          className="text-[length:var(--ds-text-sm)] font-medium text-neutral-700"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          "h-10 w-full px-3",
          "rounded-[var(--ds-radius-md)] border border-neutral-200 bg-white",
          "text-[length:var(--ds-text-base)] text-neutral-900 placeholder:text-neutral-400",
          "transition-colors",
          "focus:outline-2 focus:outline-offset-0 focus:outline-brand-500 focus:border-brand-500",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-neutral-50",
          error && "border-error focus:outline-error",
          className
        )}
        aria-describedby={error ? `${inputId}-error` : undefined}
        aria-invalid={error ? true : undefined}
        {...props}
      />
      {error && (
        <p
          id={`${inputId}-error`}
          role="alert"
          className="text-[length:var(--ds-text-xs)] text-error"
        >
          {error}
        </p>
      )}
    </div>
  );
}
