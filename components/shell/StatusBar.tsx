import { Signal, Wifi, BatteryFull } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatusBar({ light = false }: { light?: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-6 pt-3 pb-1 text-[13px] font-semibold select-none",
        light ? "text-white" : "text-neutral-900"
      )}
    >
      <span>9:41</span>
      <div className="flex items-center gap-1.5">
        <Signal className="h-3.5 w-3.5" strokeWidth={2.5} />
        <Wifi className="h-3.5 w-3.5" strokeWidth={2.5} />
        <BatteryFull className="h-4 w-4" strokeWidth={2} />
      </div>
    </div>
  );
}
