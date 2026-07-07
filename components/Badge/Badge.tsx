import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

const badgeVariants = cva(
  [
    "inline-flex items-center",
    "rounded-[var(--ds-radius-full)]",
    "px-2.5 py-0.5",
    "text-[length:var(--ds-text-xs)] font-medium",
  ].join(" "),
  {
    variants: {
      variant: {
        default:  "bg-neutral-100 text-neutral-700",
        success:  "bg-success-muted text-success",
        warning:  "bg-warning-muted text-warning",
        error:    "bg-error-muted   text-error",
        info:     "bg-info-muted    text-info",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}
