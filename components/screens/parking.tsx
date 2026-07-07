"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { MapPin, CheckCircle2, Clock } from "lucide-react";
import { TimePicker } from "@/components/TimePicker";
import { Header } from "@/components/shell/Header";
import { primaryBtn, accentBtn } from "@/components/screens/auth";
import { METER, computeTotal, type ParkingSession, type Vehiculo } from "@/lib/state";

const money = (n: number) =>
  `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

function MapCanvas({ children }: { children?: React.ReactNode }) {
  return (
    <div className="relative flex-1 overflow-hidden bg-neutral-100">
      <Image
        src="/map.png"
        alt="Mapa de la zona Polanco con parquímetros cercanos"
        fill
        className="object-cover"
        priority
      />
      {children}
    </div>
  );
}

export function HomeScreen({ onEstacionar }: { onEstacionar: () => void }) {
  return (
    <div className="flex h-full flex-col bg-neutral-50">
      <Header title="¡Comencemos!" />
      <MapCanvas>
        <button
          onClick={onEstacionar}
          className="absolute inset-x-8 bottom-8 h-11 cursor-pointer rounded-[var(--ds-radius-full)] bg-brand-400/90 text-[length:var(--ds-text-base)] font-medium text-white shadow-[var(--ds-shadow-md)] transition-colors hover:bg-brand-400"
        >
          Estacionar
        </button>
      </MapCanvas>
    </div>
  );
}

export function MeterDetectedScreen({
  onBack,
  onSelect,
}: {
  onBack: () => void;
  onSelect: () => void;
}) {
  return (
    <div className="flex h-full flex-col bg-neutral-50">
      <Header title="Parquímetro" onBack={onBack} />
      <MapCanvas>
        {/* pin */}
        <MapPin
          className="absolute left-1/2 top-[57%] h-9 w-9 -translate-x-1/2 fill-white text-brand-800"
          strokeWidth={2}
        />
        {/* tooltip card */}
        <div className="absolute left-1/2 top-[18%] w-[68%] -translate-x-1/2">
          <div className="rounded-[var(--ds-radius-lg)] bg-brand-800/95 px-5 py-4 text-center text-white shadow-[var(--ds-shadow-lg)]">
            <p className="text-[length:var(--ds-text-base)]">
              Parquímetro <span className="font-bold">{METER.id}</span>
            </p>
            <p className="mt-2 text-[length:var(--ds-text-sm)]">
              <span className="font-bold">Tarifa:</span> {money(METER.rate)} -{" "}
              {METER.rateMinutes} min.
            </p>
            <p className="text-[length:var(--ds-text-sm)]">
              <span className="font-bold">Horario:</span> {METER.horario}
            </p>
            <button
              onClick={onSelect}
              className="mt-4 w-full cursor-pointer rounded-[var(--ds-radius-md)] bg-white/25 py-2 text-[length:var(--ds-text-base)] text-white transition-colors hover:bg-white/35"
            >
              Seleccionar
            </button>
          </div>
          {/* pointer */}
          <div className="mx-auto h-0 w-0 border-x-[10px] border-t-[10px] border-x-transparent border-t-brand-800/95" />
        </div>
      </MapCanvas>
    </div>
  );
}

export function ParametrosScreen({
  title,
  minutes,
  vehiculo,
  onMinutesChange,
  onConfirm,
  onCancel,
  onBack,
}: {
  title: string;
  minutes: number;
  vehiculo: Vehiculo;
  onMinutesChange: (m: number) => void;
  onConfirm: () => void;
  onCancel: () => void;
  onBack: () => void;
}) {
  return (
    <div className="flex h-full flex-col bg-neutral-50">
      <Header title={title} onBack={onBack} />
      <div className="flex flex-1 flex-col overflow-y-auto px-6 pb-6 pt-8">
        <p className="text-center text-[length:var(--ds-text-md)] text-brand-800">
          {money(METER.rate)} - {METER.rateMinutes} min.
          <br />
          De {METER.horario}
        </p>
        <p className="mt-8 text-[length:var(--ds-text-md)] font-bold text-brand-800">
          Tiempo
        </p>
        <div className="mt-2">
          <TimePicker minutes={minutes} onChange={onMinutesChange} />
        </div>
        <dl className="mt-8 flex flex-col gap-4">
          <div className="flex items-center gap-10">
            <dt className="w-20 text-[length:var(--ds-text-md)] font-bold text-brand-800">
              Total
            </dt>
            <dd className="text-[length:var(--ds-text-md)] text-brand-800">
              {money(computeTotal(minutes))}
            </dd>
          </div>
          <div className="flex items-center gap-10">
            <dt className="w-20 text-[length:var(--ds-text-md)] font-bold text-brand-800">
              Vehículo
            </dt>
            <dd className="flex flex-1 items-center justify-between text-[length:var(--ds-text-md)] text-brand-800">
              {vehiculo.placa}
              <span className="rounded-[var(--ds-radius-md)] border border-brand-800 px-3 py-1 text-[length:var(--ds-text-xs)]">
                Cambiar
              </span>
            </dd>
          </div>
        </dl>
        <div className="mt-auto flex flex-col gap-4 pt-8">
          <button
            onClick={onConfirm}
            disabled={minutes === 0}
            className={`${primaryBtn} disabled:pointer-events-none disabled:opacity-50`}
          >
            Confirmar
          </button>
          <button
            onClick={onCancel}
            className="text-center text-[length:var(--ds-text-sm)] text-brand-800 cursor-pointer"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export function PagoScreen({
  total,
  tarjeta,
  onPay,
  onCancel,
  onBack,
  onAddCard,
}: {
  total: number;
  tarjeta: { last4: string; name: string };
  onPay: () => void;
  onCancel: () => void;
  onBack: () => void;
  onAddCard: () => void;
}) {
  return (
    <div className="flex h-full flex-col bg-neutral-50">
      <Header title="Pago" onBack={onBack} />
      <div className="flex flex-1 flex-col overflow-y-auto px-6 pb-6 pt-8">
        <p className="text-center text-[length:var(--ds-text-md)] text-brand-800">
          Parquímetro
          <br />
          <span className="font-bold">{METER.id}</span>
        </p>
        <div className="mt-6 flex items-center gap-10">
          <span className="text-[length:var(--ds-text-md)] font-bold text-brand-800">
            Total
          </span>
          <span className="text-[length:var(--ds-text-md)] text-brand-800">
            {money(total)}
          </span>
        </div>
        <p className="mt-5 text-center text-[length:var(--ds-text-base)] font-semibold text-brand-800">
          Mi método de pago
        </p>
        <p className="mt-4 text-[length:var(--ds-text-sm)] text-neutral-700">
          Tarjeta de crédito
        </p>
        <button className="mt-2 flex w-full cursor-pointer items-center justify-between rounded-[var(--ds-radius-md)] bg-pz-accent px-4 py-2.5 text-white transition-colors hover:bg-pz-accent-hover">
          <span className="flex items-center gap-3 text-[length:var(--ds-text-sm)]">
            <CardIcon />
            {tarjeta.last4} - {tarjeta.name}
          </span>
          <span aria-hidden>›</span>
        </button>
        <button
          onClick={onAddCard}
          className="mt-4 flex w-full cursor-pointer items-center gap-3 rounded-[var(--ds-radius-md)] bg-brand-400 px-4 py-2.5 text-[length:var(--ds-text-sm)] text-white transition-colors hover:bg-brand-500"
        >
          <CardIcon plus />
          Agregar método de pago
        </button>
        <div className="mt-auto flex flex-col gap-4 pt-10">
          <button onClick={onPay} className={primaryBtn}>
            Pagar
          </button>
          <button
            onClick={onCancel}
            className="text-center text-[length:var(--ds-text-sm)] text-brand-800 cursor-pointer"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

function CardIcon({ plus = false }: { plus?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
      {plus && <path d="M17 14v4M15 16h4" strokeWidth="1.8" />}
    </svg>
  );
}

export function PaySuccessScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <button
      onClick={onDone}
      className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-8 bg-neutral-50"
      aria-label="Continuar"
    >
      <CheckCircle2 className="h-40 w-40 text-brand-400" strokeWidth={1.2} />
      <p className="px-10 text-center text-[length:var(--ds-text-md)] font-bold text-brand-800">
        Tu pago ha sido realizado con éxito
      </p>
    </button>
  );
}

function formatDuration(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60);
  const m = Math.round(totalMinutes % 60);
  if (h === 0) return `${m} minutos`;
  if (m === 0) return `${h} ${h === 1 ? "hora" : "horas"}`;
  return `${h} ${h === 1 ? "hora" : "horas"} ${m} minutos`;
}

export function EstadoScreen({
  session,
  vehiculo,
  onEstacionar,
  onAgregarTiempo,
  onConfirm,
  onBack,
}: {
  session: ParkingSession | null;
  vehiculo: Vehiculo;
  onEstacionar: () => void;
  onAgregarTiempo: () => void;
  onConfirm: () => void;
  onBack: () => void;
}) {
  // Clock state so the remaining time ticks live (kept out of render for purity)
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    if (!session) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [session]);

  const remainingMinutes = session
    ? now === null
      ? session.durationMinutes
      : Math.max(
          0,
          (session.startedAt + session.durationMinutes * 60_000 - now) / 60_000
        )
    : 0;
  const endsAt = session
    ? new Date(session.startedAt + session.durationMinutes * 60_000)
    : null;

  return (
    <div className="flex h-full flex-col bg-neutral-50">
      <Header title="Estado" onBack={onBack} />
      <div className="flex flex-1 flex-col overflow-y-auto px-6 pb-6 pt-8">
        <Clock className="mx-auto h-12 w-12 text-brand-800" strokeWidth={1.8} />
        <p className="mt-4 text-center text-[length:var(--ds-text-base)] font-semibold text-brand-800">
          Mi estacionamiento
        </p>
        {session ? (
          <>
            <dl className="mt-8 flex flex-col gap-4">
              {[
                ["Tiempo", formatDuration(remainingMinutes)],
                [
                  "Termina",
                  endsAt!.toLocaleTimeString("es-MX", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  }),
                ],
                ["Total", money(session.total)],
                ["Vehículo", vehiculo.placa],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center gap-8">
                  <dt className="w-24 text-[length:var(--ds-text-md)] font-bold text-brand-800">
                    {label}
                  </dt>
                  <dd className="text-[length:var(--ds-text-md)] text-brand-800">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-auto flex flex-col gap-3 pt-10">
              <button onClick={onAgregarTiempo} className={accentBtn}>
                Agregar tiempo
              </button>
              <button onClick={onConfirm} className={primaryBtn}>
                Confirmar
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="mt-16 text-center text-[length:var(--ds-text-sm)] text-neutral-700">
              No tienes vehículos estacionados
              <br />
              por el momento
            </p>
            <div className="mt-auto pt-10">
              <button onClick={onEstacionar} className={accentBtn}>
                Estacionar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
