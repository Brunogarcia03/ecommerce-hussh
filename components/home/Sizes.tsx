"use client";

import { useState } from "react";

const measurements = [
  { size: "XS", chest: "84–88", waist: "66–70", hips: "88–92", length: "65" },
  { size: "S", chest: "88–92", waist: "70–74", hips: "92–96", length: "67" },
  { size: "M", chest: "92–96", waist: "74–78", hips: "96–100", length: "69" },
  { size: "L", chest: "96–100", waist: "78–82", hips: "100–104", length: "71" },
  {
    size: "XL",
    chest: "100–104",
    waist: "82–86",
    hips: "104–108",
    length: "73",
  },
];

const cols = ["Size", "Chest", "Waist", "Hips", "Length"];

export default function SizeGuideModal() {
  const [open, setOpen] = useState(false);
  const [unit, setUnit] = useState<"cm" | "in">("cm");

  const convert = (val: string) => {
    if (unit === "cm") return val;
    return val
      .split("–")
      .map((n) => (parseFloat(n) / 2.54).toFixed(1))
      .join("–");
  };

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setOpen(true)}
        className="hidden group md:inline-flex items-center gap-2 border border-dashed border-gray text-gray hover:border-white hover:text-white transition-all duration-300 px-3 py-1 font-spline text-[0.65rem] uppercase"
      >
        <span className="relative overflow-hidden inline-block">
          <span className="block transition-transform duration-300 group-hover:-translate-y-full">
            Size Guide
          </span>
          <span className="absolute inset-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
            Size Guide
          </span>
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          className="fill-gray group-hover:fill-white transition-colors"
          viewBox="0 0 256 256"
        >
          <path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z" />
        </svg>
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 flex items-end md:items-center justify-center bg-black/80 z-999"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="w-full md:max-w-2xl bg-black border border-white/20 p-6 flex flex-col gap-6">
            {/* Modal header */}
            <div className="flex items-baseline justify-between border-b border-white/20 pb-4">
              <div className="flex items-baseline gap-3">
                <h3 className="font-barlow text-2xl font-extrabold uppercase text-white">
                  Size Guide
                </h3>
                <span className="font-spline text-[0.55rem] text-gray uppercase">
                  All measurements in {unit}
                </span>
              </div>
              <div className="flex items-center gap-3">
                {/* Unit toggle */}
                <div className="flex border border-dashed border-white/20">
                  {(["cm", "in"] as const).map((u) => (
                    <button
                      key={u}
                      onClick={() => setUnit(u)}
                      className={`font-spline text-[0.6rem] uppercase px-3 py-1 transition-colors ${
                        unit === u
                          ? "bg-white text-black"
                          : "text-gray hover:text-white"
                      }`}
                    >
                      {u}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="font-spline text-[0.6rem] text-gray hover:text-white uppercase transition-colors"
                >
                  [ Close ]
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    {cols.map((col) => (
                      <th
                        key={col}
                        className="font-spline text-[0.55rem] text-gray uppercase text-left pb-3 pr-6"
                      >
                        {col}
                        {col !== "Size" ? ` (${unit})` : ""}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {measurements.map((row) => (
                    <tr
                      key={row.size}
                      className="border-b border-white/10 hover:bg-white/5 transition-colors group"
                    >
                      <td className="font-barlow text-lg font-extrabold text-white uppercase py-3 pr-6">
                        {row.size}
                      </td>
                      <td className="font-spline text-[0.65rem] text-white/70 py-3 pr-6">
                        {convert(row.chest)}
                      </td>
                      <td className="font-spline text-[0.65rem] text-white/70 py-3 pr-6">
                        {convert(row.waist)}
                      </td>
                      <td className="font-spline text-[0.65rem] text-white/70 py-3 pr-6">
                        {convert(row.hips)}
                      </td>
                      <td className="font-spline text-[0.65rem] text-white/70 py-3">
                        {convert(row.length)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Tip */}
            <p className="font-spline text-[0.55rem] text-gray uppercase border-t border-white/10 pt-4">
              // Measure over light clothing — If between sizes, size up.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
