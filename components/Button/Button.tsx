import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "font-medium cursor-pointer",
    "rounded-[var(--ds-radius-md)]",
    "transition-colors",
    "focus-visible:outline-2 focus-visible:outline-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      variant: {
        primary:
          "bg-brand-600 text-white hover:bg-brand-700 focus-visible:outline-brand-500",
        secondary:
          "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 focus-visible:outline-neutral-400",
        outline:
          "border border-neutral-200 text-neutral-900 hover:bg-neutral-50 focus-visible:outline-neutral-400",
        ghost:
          "text-neutral-700 hover:bg-neutral-100 focus-visible:outline-neutral-400",
        destructive:
          "bg-error text-white hover:opacity-90 focus-visible:outline-error",
      },
      size: {
        sm: "h-8  px-3 text-[length:var(--ds-text-sm)]",
        md: "h-10 px-4 text-[length:var(--ds-text-base)]",
        lg: "h-12 px-6 text-[length:var(--ds-text-md)]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
