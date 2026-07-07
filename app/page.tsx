import { ParkzoneApp } from "@/components/ParkzoneApp";
import { PhoneFrame } from "@/components/PhoneFrame";

export default function Home() {
  return (
    <main className="flex min-h-dvh flex-1 flex-col items-center justify-center gap-5 bg-neutral-900 px-4 py-6">
      <PhoneFrame>
        <ParkzoneApp />
      </PhoneFrame>
      <p className="text-center text-sm text-neutral-400">
        <span className="font-semibold text-neutral-200">ParkZone</span> —
        prototipo funcional · UX case study de Sareli Santiago García
      </p>
    </main>
  );
}
