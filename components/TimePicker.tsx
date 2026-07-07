"use client";

import { useRef, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";

const ITEM_H = 36;

function Wheel({
  values,
  selected,
  onSelect,
  unit,
  disabled = false,
}: {
  values: number[];
  selected: number;
  onSelect: (value: number) => void;
  unit: string;
  disabled?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keep scroll position in sync when the value changes externally (e.g. reset)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const idx = values.indexOf(selected);
    const target = idx * ITEM_H;
    if (Math.abs(el.scrollTop - target) > 1) el.scrollTop = target;
  }, [selected, values]);

  const handleScroll = useCallback(() => {
    if (disabled) return;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      const el = ref.current;
      if (!el) return;
      const idx = Math.min(
        values.length - 1,
        Math.max(0, Math.round(el.scrollTop / ITEM_H))
      );
      onSelect(values[idx]);
    }, 80);
  }, [values, onSelect, disabled]);

  return (
    <div className="relative" style={{ height: ITEM_H * 3 }}>
      <div
        ref={ref}
        onScroll={handleScroll}
        className={cn(
          "h-full snap-y snap-mandatory overflow-y-auto overscroll-contain",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          disabled && "overflow-hidden"
        )}
      >
        <div style={{ height: ITEM_H }} aria-hidden />
        {values.map((v) => (
          <button
            key={v}
            onClick={() => !disabled && onSelect(v)}
            className={cn(
              "flex w-full snap-center items-center justify-end pr-1 text-[length:var(--ds-text-md)]",
              v === selected ? "font-medium text-neutral-900" : "text-neutral-400"
            )}
            style={{ height: ITEM_H }}
          >
            {v}
          </button>
        ))}
        <div style={{ height: ITEM_H }} aria-hidden />
      </div>
      {/* selection band */}
      <div
        className="pointer-events-none absolute inset-x-0 border-y border-neutral-200"
        style={{ top: ITEM_H, height: ITEM_H }}
      />
      {/* fade edges */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-white to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent" />
      <span className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 pl-1.5 text-[length:var(--ds-text-sm)] text-neutral-700">
        {unit}
      </span>
    </div>
  );
}

const HOURS = [0, 1, 2, 3, 4];
const MINUTES = [0, 15, 30, 45];

export function TimePicker({
  minutes,
  onChange,
}: {
  minutes: number;
  onChange: (totalMinutes: number) => void;
}) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;

  return (
    <div className="flex items-center justify-center gap-14 bg-white py-2">
      <Wheel
        values={HOURS}
        selected={h}
        onSelect={(nh) => onChange(nh * 60 + m)}
        unit="horas"
      />
      <Wheel
        values={MINUTES}
        selected={m}
        onSelect={(nm) => onChange(h * 60 + nm)}
        unit="min"
      />
      <Wheel values={[0]} selected={0} onSelect={() => {}} unit="sec" disabled />
    </div>
  );
}
