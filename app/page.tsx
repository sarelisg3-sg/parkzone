import { ParkzoneApp } from "@/components/ParkzoneApp";

export default function Home() {
  return (
    <main className="flex min-h-dvh flex-1 flex-col items-center justify-center gap-6 bg-neutral-900 px-4 py-8">
      {/* iPhone frame */}
      <div className="relative h-[812px] max-h-[calc(100dvh-7rem)] w-[390px] max-w-full shrink-0 overflow-hidden rounded-[3rem] border-[10px] border-neutral-950 bg-neutral-50 shadow-[var(--ds-shadow-2xl)]">
        {/* notch */}
        <div className="pointer-events-none absolute left-1/2 top-0 z-50 h-6 w-36 -translate-x-1/2 rounded-b-2xl bg-neutral-950" />
        <ParkzoneApp />
      </div>
      <p className="text-center text-sm text-neutral-400">
        <span className="font-semibold text-neutral-200">ParkZone</span> —
        prototipo funcional · UX case study de Sareli Santiago García
      </p>
    </main>
  );
}
