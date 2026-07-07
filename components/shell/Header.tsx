import { ChevronLeft } from "lucide-react";
import { StatusBar } from "./StatusBar";

export function Header({
  title,
  onBack,
}: {
  title: string;
  onBack?: () => void;
}) {
  return (
    <div className="bg-brand-800">
      <StatusBar light />
      <div className="relative flex h-11 items-center justify-center px-4">
        {onBack && (
          <button
            onClick={onBack}
            aria-label="Volver"
            className="absolute left-2 flex h-9 w-9 items-center justify-center text-white cursor-pointer"
          >
            <ChevronLeft className="h-6 w-6" strokeWidth={2.5} />
          </button>
        )}
        <h1 className="text-[length:var(--ds-text-base)] font-normal text-white">
          {title}
        </h1>
      </div>
    </div>
  );
}
