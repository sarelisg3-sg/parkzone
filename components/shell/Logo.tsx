import { cn } from "@/lib/utils";

/* ParkZone mark: dashed circle + location pin, from the Figma welcome screen */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      className={cn("h-24 w-24", className)}
      aria-hidden
    >
      <circle
        cx="50"
        cy="50"
        r="40"
        stroke="var(--ds-brand-800)"
        strokeWidth="11"
        strokeLinecap="butt"
        strokeDasharray="38 12 18 12 38 60"
        className="opacity-95"
      />
      <path
        d="M50 30c-9.4 0-17 7.4-17 16.5 0 11.5 14 24 16.2 25.9a1.2 1.2 0 0 0 1.6 0C53 70.5 67 58 67 46.5 67 37.4 59.4 30 50 30Z"
        fill="var(--ds-brand-400)"
      />
      <circle cx="50" cy="46" r="6.5" fill="white" />
    </svg>
  );
}

export function LogoWordmark({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        "text-center font-bold italic tracking-tight",
        "text-[length:var(--ds-text-lg)]",
        className
      )}
    >
      <span className="text-brand-800">Park</span>
      <span className="text-brand-400">Zone</span>
    </p>
  );
}
