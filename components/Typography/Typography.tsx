import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ElementType, HTMLAttributes } from "react";

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "text-[length:var(--ds-text-3xl)] font-bold leading-tight tracking-tighter text-neutral-900",
      h2: "text-[length:var(--ds-text-2xl)] font-bold leading-tight tracking-tight text-neutral-900",
      h3: "text-[length:var(--ds-text-xl)] font-semibold leading-snug tracking-tight text-neutral-900",
      body: "text-[length:var(--ds-text-base)] font-normal leading-normal text-neutral-700",
      small: "text-[length:var(--ds-text-sm)] font-normal leading-normal text-neutral-600",
      muted: "text-[length:var(--ds-text-sm)] font-normal leading-normal text-neutral-500",
      code: [
        "font-mono text-[length:var(--ds-text-sm)]",
        "bg-neutral-100 text-neutral-800",
        "rounded-[var(--ds-radius-sm)] px-1 py-0.5",
      ].join(" "),
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

const elementMap: Record<string, ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  body: "p",
  small: "small",
  muted: "p",
  code: "code",
};

export interface TypographyProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {}

export function Typography({ className, variant, children, ...props }: TypographyProps) {
  const Tag = (elementMap[variant ?? "body"] ?? "p") as ElementType;
  return (
    <Tag className={cn(typographyVariants({ variant }), className)} {...props}>
      {children}
    </Tag>
  );
}
