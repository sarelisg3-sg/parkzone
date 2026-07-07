import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = ["Perfil", "Vehículo", "Pago", "Saldo"] as const;

export function Stepper({ current }: { current: number }) {
  return (
    <div className="flex items-start px-6">
      {STEPS.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={label} className="flex flex-1 items-start last:flex-none">
            <div className="flex flex-col items-center gap-1">
              <div
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full border-2",
                  done && "border-brand-800 bg-brand-800",
                  active && "border-brand-800 bg-white",
                  !done && !active && "border-neutral-300 bg-white"
                )}
              >
                {done ? (
                  <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                ) : (
                  <div
                    className={cn(
                      "h-2 w-2 rounded-full",
                      active ? "bg-brand-800" : "bg-neutral-300"
                    )}
                  />
                )}
              </div>
              <span
                className={cn(
                  "text-[11px]",
                  active
                    ? "font-semibold text-brand-800"
                    : done
                      ? "text-brand-800"
                      : "text-neutral-500"
                )}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  "mt-3 h-0.5 flex-1",
                  done ? "bg-brand-800" : "bg-neutral-300"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
