"use client";

import { useSyncExternalStore, type ReactNode } from "react";

/* Exact screen size of the Figma frames (iPhone 14: 390×844).
   The frame never changes proportions — it scales uniformly to fit
   the viewport, like Figma's prototype viewer. */
const SCREEN_W = 390;
const SCREEN_H = 844;
const BORDER = 10;
const OUTER_W = SCREEN_W + BORDER * 2;
const OUTER_H = SCREEN_H + BORDER * 2;

function subscribe(onChange: () => void) {
  window.addEventListener("resize", onChange);
  return () => window.removeEventListener("resize", onChange);
}

function getScale() {
  const availW = window.innerWidth - 32;
  const availH = window.innerHeight - 112; // room for page padding + caption
  return Math.min(1, availW / OUTER_W, availH / OUTER_H);
}

export function PhoneFrame({ children }: { children: ReactNode }) {
  const scale = useSyncExternalStore(subscribe, getScale, () => 1);

  return (
    <div
      style={{ width: OUTER_W * scale, height: OUTER_H * scale }}
      className="shrink-0"
    >
      <div
        style={{
          width: OUTER_W,
          height: OUTER_H,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
        className="relative overflow-hidden rounded-[3rem] border-[10px] border-neutral-950 bg-neutral-50 shadow-[var(--ds-shadow-2xl)]"
      >
        {/* notch */}
        <div className="pointer-events-none absolute left-1/2 top-0 z-50 h-6 w-36 -translate-x-1/2 rounded-b-2xl bg-neutral-950" />
        {children}
      </div>
    </div>
  );
}
