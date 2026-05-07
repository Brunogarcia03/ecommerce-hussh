"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const glitchRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Parallax en mouse move
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * 20;
      if (containerRef.current) {
        containerRef.current.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      }
    };

    // Glitch random
    const chars = "HSH//ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789//::..";
    let glitchInterval: ReturnType<typeof setInterval>;

    const startGlitch = () => {
      let count = 0;
      glitchInterval = setInterval(() => {
        if (!glitchRef.current) return;
        if (count < 8) {
          glitchRef.current.textContent = Array.from({ length: 3 })
            .map(() => chars[Math.floor(Math.random() * chars.length)])
            .join("");
          count++;
        } else {
          glitchRef.current.textContent = "404";
          clearInterval(glitchInterval);
        }
      }, 60);
    };

    const glitchLoop = setInterval(startGlitch, 3000);
    startGlitch();

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(glitchLoop);
      clearInterval(glitchInterval);
    };
  }, []);

  return (
    <main className="relative w-full h-svh bg-black text-white overflow-hidden flex flex-col justify-between p-6">
      {/* Backdrop grid lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Top bar */}
      <div className="flex items-center justify-between w-full border-b border-white/20 pb-6 z-10">
        <p className="font-spline text-[0.65rem] text-gray uppercase">
          HSH//Error
        </p>
        <p className="font-spline text-[0.65rem] text-gray uppercase">
          Status / Page not found
        </p>
        <p className="font-spline text-[0.65rem] text-gray uppercase">
          Code / 404
        </p>
      </div>

      {/* Centro */}
      <div
        ref={containerRef}
        className="absolute inset-0 flex flex-col items-center justify-center transition-transform duration-300 ease-out will-change-transform"
      >
        {/* 404 glitch */}
        <div className="relative flex items-center justify-center">
          {/* Sombra desplazada roja */}
          <span
            className="absolute font-barlow font-extrabold uppercase select-none pointer-events-none"
            style={{
              fontSize: "clamp(8rem, 22vw, 22rem)",
              lineHeight: 0.85,
              color: "transparent",
              WebkitTextStroke: "1px rgba(122,122,122,1)",
              transform: "translate(6px, 4px)",
            }}
            aria-hidden
          >
            404
          </span>

          {/* Sombra desplazada gris */}
          <span
            className="absolute font-barlow font-extrabold uppercase select-none pointer-events-none"
            style={{
              fontSize: "clamp(8rem, 22vw, 22rem)",
              lineHeight: 0.85,
              color: "transparent",
              WebkitTextStroke: "1px rgba(255,255,255,0.08)",
              transform: "translate(-4px, -3px)",
            }}
            aria-hidden
          >
            404
          </span>

          {/* Texto principal */}
          <span
            ref={glitchRef}
            className="relative font-barlow font-extrabold uppercase text-white"
            style={{
              fontSize: "clamp(8rem, 22vw, 22rem)",
              lineHeight: 0.85,
              WebkitTextStroke: "1px rgba(255,255,255,0.1)",
            }}
          >
            404
          </span>
        </div>

        {/* Descripción */}
        <div className="flex flex-col items-center gap-2 mt-6">
          <p className="font-spline text-[0.65rem] text-gray uppercase tracking-widest">
            :::.. Signal lost — Page not found ..:::
          </p>
          <p className="font-spline text-[0.65rem] text-white/30 uppercase">
            Return -- Base Layer
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between w-full border-t border-white/20 pt-6 gap-4 z-10">
        <div className="flex flex-col gap-1">
          <p className="font-spline text-[0.65rem] text-gray uppercase">
            Threads lost
          </p>
          <p className="font-spline text-[0.65rem] text-gray uppercase">
            Pattern not found
          </p>
          <p className="font-spline text-[0.65rem] text-gray uppercase">
            Fabric Memory / Null
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 border border-dashed border-gray text-gray hover:border-white hover:text-white transition-all duration-300 px-4 py-2 font-spline text-[0.65rem] uppercase"
          >
            <span className="relative overflow-hidden inline-block">
              <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                Return home
              </span>
              <span className="absolute inset-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                Return home
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
          </Link>

          <Link
            href="/catalog"
            className="group inline-flex items-center gap-2 border border-dashed border-gray text-gray hover:border-white hover:text-white transition-all duration-300 px-4 py-2 font-spline text-[0.65rem] uppercase"
          >
            <span className="relative overflow-hidden inline-block">
              <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                View catalog
              </span>
              <span className="absolute inset-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                View catalog
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
          </Link>
        </div>
      </div>
    </main>
  );
}
