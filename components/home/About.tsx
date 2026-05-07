"use client";

import { useState } from "react";

const lines = [
  "Hussh was born from the belief",
  "that clothing should speak quietly.",
  "No excess. No noise.",
  "Only what remains when everything",
  "unnecessary is removed.",
];

const triggerWords = ["noise.", "everything"];

export default function About() {
  const [activeTrigger, setActiveTrigger] = useState(false);

  return (
    <section className="hidden about relative w-full bg-black text-white px-6 pt-24 pb-16 overflow-hidden">
      {/* Header */}
      <div className="relative z-10 flex justify-between items-end border-b border-white/10 pb-6">
        <h2 className="font-barlow text-3xl font-extrabold uppercase">
          Manifest
        </h2>

        <span className="font-spline text-[0.65rem] text-gray uppercase">
          HSH//001 — Origin
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 grid md:grid-cols-[1fr_auto] gap-20">
        {/* Text */}
        <div className="flex flex-col mt-4">
          {lines.map((line, i) => (
            <div key={i} className="flex flex-wrap gap-x-4 gap-y-2">
              {line.split(" ").map((word, index) => {
                const isTrigger = triggerWords.includes(word.toLowerCase());

                return (
                  <span
                    key={index}
                    onMouseEnter={() => {
                      if (isTrigger) setActiveTrigger(true);
                    }}
                    onMouseLeave={() => {
                      if (isTrigger) setActiveTrigger(false);
                    }}
                    className={`
                      group/word
                      relative
                      inline-block
                      cursor-default
                      font-barlow
                      font-extrabold
                      uppercase
                      leading-[0.88]
                      transition-all
                      duration-700
                      ease-out
                      will-change-transform
                      
                      ${
                        activeTrigger
                          ? "text-white blur-0"
                          : "md:text-white/20 md:blur-[3px]"
                      }

                      hover:text-white
                      hover:blur-0
                    `}
                    style={{
                      fontSize: "clamp(2rem,5vw,5.5rem)",
                    }}
                  >
                    {/* Trigger glow */}
                    {isTrigger && (
                      <span
                        className="
                          absolute
                          inset-0
                          md:opacity-0
                          md:blur-xl
                          transition-opacity
                          duration-500
                          md:bg-white/10
                          rounded-full
                          group-hover/word:opacity-100
                        "
                      />
                    )}

                    {/* Ghost layer */}
                    <span
                      className={`
                        absolute
                        inset-0
                        text-white
                        md:opacity-0
                        md:blur-md
                        transition-all
                        duration-500

                        ${
                          activeTrigger
                            ? "md:opacity-20 md:blur-none"
                            : "md:group-hover/word:opacity-40"
                        }
                      `}
                    >
                      {word}
                    </span>

                    {/* Main */}
                    <span className="relative">{word}</span>
                  </span>
                );
              })}
            </div>
          ))}
        </div>

        {/* Meta */}
        <div className="hidden md:flex flex-col gap-6 w-56 mt-4">
          {[
            ["Founded", "2024 — Buenos Aires"],
            ["Material", "Natural Fiber Only"],
            ["Philosophy", "Less — But Better"],
            ["Season", "SS 26 — Active"],
          ].map(([k, v]) => (
            <div
              key={k}
              className="border-b border-white/10 pb-4 flex flex-col gap-1"
            >
              <span className="font-spline text-[0.55rem] text-gray uppercase">
                {k}
              </span>

              <span className="font-spline text-[0.65rem] text-white uppercase">
                {v}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
