"use client";

import { useRef } from "react";

const lines = [
  "Hussh was born from the belief",
  "that clothing should speak quietly.",
  "No excess. No noise.",
  "Only what remains when everything",
  "unnecessary is removed.",
];

export default function About() {
  return (
    <section className="w-full bg-black text-white px-6 pt-24 pb-16 border-t border-white/20">
      {/* Header */}
      <div className="flex items-baseline justify-between mb-16 pb-6 border-b border-white/20">
        <h2 className="font-barlow text-3xl font-extrabold uppercase text-white">
          Manifesto
        </h2>
        <span className="font-spline text-[0.65rem] text-gray uppercase">
          HSH//001 — Origin
        </span>
      </div>

      {/* Layout: texto grande izquierda + meta derecha */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-16 items-end">
        {/* Texto principal */}
        <div className="flex flex-col gap-0">
          {lines.map((line, i) => (
            <p
              key={i}
              className="font-barlow font-extrabold uppercase text-white leading-[0.9] border-b border-white/10 py-4"
              style={{ fontSize: "clamp(2rem, 5vw, 5rem)" }}
            >
              {line}
            </p>
          ))}
        </div>

        {/* Meta columna derecha */}
        <div className="flex flex-col gap-6 md:w-52 shrink-0">
          <div className="flex flex-col gap-1 border-t border-white/20 pt-4">
            <span className="font-spline text-[0.55rem] text-gray uppercase">
              Founded
            </span>
            <span className="font-spline text-[0.65rem] text-white uppercase">
              2024 — Buenos Aires
            </span>
          </div>
          <div className="flex flex-col gap-1 border-t border-white/20 pt-4">
            <span className="font-spline text-[0.55rem] text-gray uppercase">
              Material
            </span>
            <span className="font-spline text-[0.65rem] text-white uppercase">
              Natural Fiber Only
            </span>
          </div>
          <div className="flex flex-col gap-1 border-t border-white/20 pt-4">
            <span className="font-spline text-[0.55rem] text-gray uppercase">
              Philosophy
            </span>
            <span className="font-spline text-[0.65rem] text-white uppercase">
              Less — But Better
            </span>
          </div>
          <div className="flex flex-col gap-1 border-t border-white/20 pt-4">
            <span className="font-spline text-[0.55rem] text-gray uppercase">
              Season
            </span>
            <span className="font-spline text-[0.65rem] text-white uppercase">
              SS 26 — Active
            </span>
          </div>
          <div className="flex gap-1 pt-4">
            <span className="font-spline text-[0.55rem] text-white">▊</span>
            <span className="font-spline text-[0.55rem] text-white/40">▊</span>
            <span className="font-spline text-[0.55rem] text-white/10">▊</span>
          </div>
        </div>
      </div>
    </section>
  );
}
