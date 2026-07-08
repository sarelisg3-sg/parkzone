"use client";

import { useState } from "react";
import {
  Car,
  Banknote,
  Bell,
  CircleHelp,
  CircleUserRound,
  DollarSign,
  Wallet,
  History,
  CreditCard,
} from "lucide-react";
import { Input } from "@/components/Input/Input";
import { Header } from "@/components/shell/Header";
import { primaryBtn, accentBtn } from "@/components/screens/auth";
import { METER, type Tarjeta, type Vehiculo, type ParkingSession } from "@/lib/state";

const money = (n: number) =>
  `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export function PerfilScreen({
  nombre,
  onConfigurarVehiculo,
  onMetodosDePago,
  onLogout,
}: {
  nombre: string;
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
    <div className="flex h-full flex-col bg-neutral-50">
      <Header title="Perfil" />
      <div className="flex flex-1 flex-col px-7 pb-8 pt-10">
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
              onClick={onClick}
              disabled={!onClick}
              className="flex items-center gap-5 text-left text-[length:var(--ds-text-base)] text-brand-800 enabled:cursor-pointer disabled:cursor-default"
            >
              <Icon className="h-6 w-6" strokeWidth={2} />
              {label}
            </button>
          ))}
        </nav>
        <button
          onClick={onLogout}
          className="mt-auto self-start text-[length:var(--ds-text-base)] text-brand-800 cursor-pointer"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}

export function ConfigurarVehiculoScreen({
  vehiculo,
  onSave,
  onBack,
}: {
  vehiculo: Vehiculo;
  onSave: (v: Vehiculo) => void;
  onBack: () => void;
}) {
  const [placa, setPlaca] = useState(vehiculo.placa);
  const [marca, setMarca] = useState(vehiculo.marca);
  const [modelo, setModelo] = useState(vehiculo.modelo);
  return (
    <div className="flex h-full flex-col bg-neutral-50">
      <Header title="Configurar vehículo" onBack={onBack} />
      <form
        className="flex flex-1 flex-col overflow-y-auto px-6 pb-8 pt-8"
        onSubmit={(e) => {
          e.preventDefault();
          onSave({ placa, marca, modelo });
        }}
      >
        <Car className="mx-auto h-12 w-12 text-brand-800" strokeWidth={1.8} />
        <h2 className="mt-4 text-center text-[length:var(--ds-text-base)] font-semibold text-brand-800">
          Mi vehículo
        </h2>
        <div className="mt-6 flex flex-col gap-4">
          <Input label="Placa" value={placa} onChange={(e) => setPlaca(e.target.value)} />
          <Input label="Marca" value={marca} onChange={(e) => setMarca(e.target.value)} />
          <Input label="Modelo" value={modelo} onChange={(e) => setModelo(e.target.value)} />
        </div>
        <div className="mt-auto pt-10">
          <button type="submit" className={primaryBtn}>
            Agregar nuevo vehículo
          </button>
        </div>
      </form>
    </div>
  );
}

export function PagosMenuScreen({
  onMetodos,
  onSaldo,
  onHistorial,
}: {
  onMetodos: () => void;
  onSaldo: () => void;
  onHistorial: () => void;
}) {
  const rows = [
    { label: "Métodos de pago", icon: Wallet, onClick: onMetodos },
    { label: "Saldo", icon: DollarSign, onClick: onSaldo },
    { label: "Historial de pagos", icon: History, onClick: onHistorial },
  ];
  return (
    <div className="flex h-full flex-col bg-neutral-50">
      <Header title="Pagos" />
      <div className="flex flex-1 flex-col gap-5 px-6 pt-16">
        {rows.map(({ label, icon: Icon, onClick }) => (
          <button
            key={label}
            onClick={onClick}
            className="flex w-full cursor-pointer items-center gap-4 rounded-[var(--ds-radius-md)] bg-pz-accent px-4 py-2.5 text-[length:var(--ds-text-base)] text-white transition-colors hover:bg-pz-accent-hover"
          >
            <Icon className="h-5 w-5" strokeWidth={2} />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function MetodosDePagoScreen({
  tarjeta,
  onAddCard,
  onCardClick,
  onBack,
}: {
  tarjeta: Tarjeta;
  onAddCard: () => void;
  onCardClick: () => void;
  onBack: () => void;
}) {
  return (
    <div className="flex h-full flex-col bg-neutral-50">
      <Header title="Métodos de pago" onBack={onBack} />
      <div className="flex flex-1 flex-col overflow-y-auto px-6 pb-8 pt-8">
        <Banknote className="mx-auto h-12 w-12 text-brand-800" strokeWidth={1.8} />
        <h2 className="mt-4 text-center text-[length:var(--ds-text-base)] font-semibold text-brand-800">
          Mi método de pago
        </h2>
        <p className="mt-8 text-[length:var(--ds-text-sm)] text-neutral-700">
          Tarjeta de crédito
        </p>
        <button
          onClick={onCardClick}
          className="mt-2 flex w-full cursor-pointer items-center justify-between rounded-[var(--ds-radius-md)] bg-pz-accent px-4 py-2.5 text-white transition-colors hover:bg-pz-accent-hover"
        >
          <span className="flex items-center gap-3 text-[length:var(--ds-text-sm)]">
            <CreditCard className="h-5 w-5" strokeWidth={2} />
            {tarjeta.last4} - {tarjeta.name}
          </span>
          <span aria-hidden>›</span>
        </button>
        <button
          onClick={onAddCard}
          className="mt-5 flex w-full cursor-pointer items-center gap-3 rounded-[var(--ds-radius-md)] bg-brand-400 px-4 py-2.5 text-[length:var(--ds-text-sm)] text-white transition-colors hover:bg-brand-500"
        >
          <CreditCard className="h-5 w-5" strokeWidth={2} />
          Agregar método de pago
        </button>
      </div>
    </div>
  );
}

export function DetalleTarjetaScreen({
  tarjeta,
  onBack,
}: {
  tarjeta: Tarjeta;
  onBack: () => void;
}) {
  return (
    <div className="flex h-full flex-col bg-neutral-50">
      <Header title="Detalle de tarjeta" onBack={onBack} />
      <div className="flex flex-1 flex-col overflow-y-auto px-6 pb-8 pt-8">
        <CreditCard className="mx-auto h-12 w-12 text-brand-800" strokeWidth={1.8} />
        <h2 className="mt-4 text-center text-[length:var(--ds-text-base)] font-semibold text-brand-800">
          Tarjeta de crédito
        </h2>
        <div className="mt-8 flex flex-col gap-4">
          <div className="flex items-center gap-10">
            <span className="w-24 text-[length:var(--ds-text-md)] font-bold text-brand-800">
              Titular
            </span>
            <span className="text-[length:var(--ds-text-md)] text-brand-800">
              {tarjeta.name}
            </span>
          </div>
          <div className="flex items-center gap-10">
            <span className="w-24 text-[length:var(--ds-text-md)] font-bold text-brand-800">
              Número
            </span>
            <span className="text-[length:var(--ds-text-md)] text-brand-800">
              •••• •••• •••• {tarjeta.last4}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AgregarTarjetaScreen({
  onRegister,
  onBack,
}: {
  onRegister: (tarjeta: Tarjeta) => void;
  onBack: () => void;
}) {
  const [nombre, setNombre] = useState("");
  const [numero, setNumero] = useState("");
  return (
    <div className="flex h-full flex-col bg-neutral-50">
      <Header title="Métodos de pago" onBack={onBack} />
      <form
        className="flex flex-1 flex-col overflow-y-auto px-6 pb-8 pt-8"
        onSubmit={(e) => {
          e.preventDefault();
          onRegister({
            last4: numero.replace(/\D/g, "").slice(-4) || "1234",
            name: nombre.trim().split(/\s+/)[0] || "María",
          });
        }}
      >
        <Banknote className="mx-auto h-12 w-12 text-brand-800" strokeWidth={1.8} />
        <h2 className="mt-4 text-center text-[length:var(--ds-text-base)] font-semibold text-brand-800">
          Agregar método de pago
        </h2>
        <div className="mt-6 flex flex-col gap-4">
          <Input
            label="Nombre"
            placeholder="Ingresa el nombre del titular de la cuenta"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <Input
            label="Apellidos"
            placeholder="Ingresa los apellidos del titular de la cuenta"
          />
          <Input
            label="Número de la tarjeta de crédito / débito"
            placeholder="Ingresa el número de la tarjeta"
            inputMode="numeric"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
          />
          <div className="grid grid-cols-2 gap-6">
            <Input label="Fecha de vencimiento" placeholder="00/00" />
            <Input label="CVV" placeholder="---" inputMode="numeric" />
          </div>
        </div>
        <div className="mt-auto pt-8">
          <button type="submit" className={accentBtn}>
            Registrar tarjeta
          </button>
        </div>
      </form>
    </div>
  );
}

export function SaldoScreen({
  saldo,
  onBack,
}: {
  saldo: number;
  onBack: () => void;
}) {
  return (
    <div className="flex h-full flex-col bg-neutral-50">
      <Header title="Saldo" onBack={onBack} />
      <form
        className="flex flex-1 flex-col overflow-y-auto px-6 pb-8 pt-8"
        onSubmit={(e) => {
          e.preventDefault();
          onBack();
        }}
      >
        <DollarSign className="mx-auto h-12 w-12 text-brand-800" strokeWidth={1.8} />
        <h2 className="mt-4 text-center text-[length:var(--ds-text-base)] font-semibold text-brand-800">
          Mi saldo
        </h2>
        <p className="mt-6 text-center text-[length:var(--ds-text-2xl)] font-bold text-brand-800">
          {money(saldo)}
        </p>
        <div className="mt-8">
          <Input
            label="Abonar saldo a mi cuenta"
            placeholder="Ingresa el monto a abonar"
            inputMode="decimal"
          />
        </div>
        <div className="mt-auto pt-10">
          <button type="submit" className={primaryBtn}>
            Recargar saldo
          </button>
        </div>
      </form>
    </div>
  );
}

export function HistorialScreen({
  session,
  onBack,
}: {
  session: ParkingSession | null;
  onBack: () => void;
}) {
  return (
    <div className="flex h-full flex-col bg-neutral-50">
      <Header title="Historial de pagos" onBack={onBack} />
      <div className="flex flex-1 flex-col overflow-y-auto px-6 pb-8 pt-8">
        <History className="mx-auto h-12 w-12 text-brand-800" strokeWidth={1.8} />
        <h2 className="mt-4 text-center text-[length:var(--ds-text-base)] font-semibold text-brand-800">
          Mis pagos
        </h2>
        <div className="mt-8 flex flex-col gap-3">
          {session && (
            <div className="rounded-[var(--ds-radius-md)] border border-neutral-200 bg-white px-4 py-3">
              <div className="flex items-center justify-between">
                <span className="text-[length:var(--ds-text-sm)] font-semibold text-brand-800">
                  Parquímetro {session.meterId}
                </span>
                <span className="text-[length:var(--ds-text-sm)] font-bold text-brand-800">
                  {money(session.total)}
                </span>
              </div>
              <p className="mt-1 text-[length:var(--ds-text-xs)] text-neutral-500">
                Hoy ·{" "}
                {new Date(session.startedAt).toLocaleTimeString("es-MX", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
              </p>
            </div>
          )}
          {[
            { meter: "B117", total: 7, label: "Ayer · 4:15 PM" },
            { meter: METER.id, total: 14, label: "3 jul · 10:30 AM" },
          ].map((p) => (
            <div
              key={p.label}
              className="rounded-[var(--ds-radius-md)] border border-neutral-200 bg-white px-4 py-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[length:var(--ds-text-sm)] font-semibold text-brand-800">
                  Parquímetro {p.meter}
                </span>
                <span className="text-[length:var(--ds-text-sm)] font-bold text-brand-800">
                  {money(p.total)}
                </span>
              </div>
              <p className="mt-1 text-[length:var(--ds-text-xs)] text-neutral-500">
                {p.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
