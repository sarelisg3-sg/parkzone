"use client";

import { Banknote, Bell, Car, CircleHelp, CircleUserRound } from "lucide-react";
import { cn } from "@/lib/utils";

export function AccountMenu({
  open,
  nombre,
  onClose,
  onConfigurarVehiculo,
  onMetodosDePago,
  onLogout,
}: {
  open: boolean;
  nombre: string;
  onClose: () => void;
  onConfigurarVehiculo: () => void;
  onMetodosDePago: () => void;
  onLogout: () => void;
}) {
  const rows = [
    { label: "Configurar vehículo", icon: Car, onClick: onConfigurarVehiculo },
    { label: "Métodos de pago", icon: Banknote, onClick: onMetodosDePago },
    { label: "Notificaciones", icon: Bell },
    { label: "Ayuda y soporte", icon: CircleHelp },
  ];

  return (
    <div
      className={cn(
        "absolute inset-0 z-40",
        open ? "pointer-events-auto" : "pointer-events-none"
      )}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-neutral-950/50 transition-opacity",
          open ? "opacity-100" : "opacity-0"
        )}
      />
      <div
        className={cn(
          "absolute inset-y-0 right-0 flex w-[78%] flex-col bg-neutral-50 px-7 pb-8 pt-14 shadow-[var(--ds-shadow-xl)] transition-transform duration-200",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center gap-4">
          <CircleUserRound className="h-14 w-14 text-brand-800" strokeWidth={1.5} />
          <span className="text-[length:var(--ds-text-md)] font-bold text-brand-800">
            {nombre}
          </span>
        </div>
        <nav className="mt-12 flex flex-col gap-8">
          {rows.map(({ label, icon: Icon, onClick }) => (
            <button
              key={label}
              onClick={() => {
                if (onClick) {
                  onClick();
                  onClose();
                }
              }}
              disabled={!onClick}
              className="flex items-center gap-5 text-left text-[length:var(--ds-text-base)] text-brand-800 enabled:cursor-pointer disabled:cursor-default disabled:opacity-60"
            >
              <Icon className="h-6 w-6" strokeWidth={2} />
              {label}
            </button>
          ))}
        </nav>
        <button
          onClick={() => {
            onLogout();
            onClose();
          }}
          className="mt-auto self-start text-[length:var(--ds-text-base)] text-brand-800 cursor-pointer"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
