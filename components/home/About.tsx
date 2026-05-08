"use client";

import { useEffect, useRef } from "react";

import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const text = `
Hussh was born from the belief
that clothing should speak quietly.
No excess. No noise.
Only what remains when everything
unnecessary is removed.
`;

const triggerWords = ["noise.", "everything"];

export default function About() {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const split = new SplitText(textRef.current, {
      type: "words",
      wordsClass: "manifest-word",
    });

    const words = split.words as HTMLElement[];

    gsap.set(words, {
      opacity: 0.18,
      filter: "blur(3px)",
      willChange: "opacity, filter",
    });

    const resetState = () => {
      gsap.killTweensOf(words);

      words.forEach((word, index) => {
        const center = Math.floor(words.length / 2);

        const distanceFromCenter = Math.abs(index - center);

        gsap.to(word, {
          opacity: 0.18,
          filter: "blur(3px)",
          duration: 0.9,
          delay: distanceFromCenter * 0.015,
          ease: "expo.out",
        });
      });
    };

    const revealAll = (activeIndex: number) => {
      gsap.killTweensOf(words);

      words.forEach((word, index) => {
        const distance = Math.abs(index - activeIndex);

        gsap.to(word, {
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.85,
          delay: distance * 0.035,
          ease: "expo.out",
        });
      });
    };

    words.forEach((word, index) => {
      const clean = word.textContent?.trim().toLowerCase() || "";

      const isTrigger = triggerWords.includes(clean);

      word.addEventListener("mouseenter", () => {
        if (isTrigger) {
          revealAll(index);
        } else {
          gsap.killTweensOf(word);

          gsap.to(word, {
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.45,
            ease: "power3.out",
          });
        }
      });

      word.addEventListener("mouseleave", () => {
        if (isTrigger) {
          resetState();
        } else {
          gsap.to(word, {
            opacity: 0.18,
            filter: "blur(3px)",
            duration: 0.6,
            ease: "power3.out",
          });
        }
      });
    });

    return () => {
      split.revert();
    };
  }, []);

  return (
    <section className="hidden about relative w-full bg-black text-white sm:px-6 pt-24 pb-16 overflow-hidden">
      {/* Header */}
      <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between border-b border-white/10 pb-6">
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
        <div className="mt-6">
          <div
            ref={textRef}
            className="
              font-barlow
              font-extrabold
              uppercase
              leading-[0.88]
              tracking-[-0.04em]
              cursor-default
              flex
              flex-wrap
              gap-x-[0.22em]
              gap-y-[0.08em]
            "
            style={{
              fontSize: "clamp(2rem,5vw,5.5rem)",
            }}
          >
            {text}
          </div>
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
