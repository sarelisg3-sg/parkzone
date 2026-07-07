"use client";

import { Home, Wallet, User, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BottomTab } from "@/lib/state";

const TABS: { key: BottomTab; label: string; icon: typeof Home }[] = [
  { key: "inicio", label: "Inicio", icon: Home },
  { key: "pagos", label: "Pagos", icon: Wallet },
  { key: "perfil", label: "Perfil", icon: User },
  { key: "estado", label: "Estado", icon: Clock },
];

export function BottomNav({
  active,
  onChange,
}: {
  active: BottomTab;
  onChange: (tab: BottomTab) => void;
}) {
  return (
    <div className="bg-brand-800 pb-2 pt-2">
      <div className="flex items-center justify-around">
        {TABS.map(({ key, label, icon: Icon }) => {
          const isActive = key === active;
          return (
            <button
              key={key}
              onClick={() => onChange(key)}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1 cursor-pointer",
                isActive ? "text-white" : "text-brand-400"
              )}
            >
              <Icon className="h-5 w-5" strokeWidth={2} />
              <span className="text-[10px] font-medium">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
