"use client";

import { useRef, useState } from "react";

interface VideoItem {
  id: string;
  index: string;
  title: string;
  category: string;
  season: string;
  src: string;
  span?: "tall" | "wide" | "normal";
}

const videos: VideoItem[] = [
  {
    id: "v1",
    index: "001",
    title: "Base_Layer",
    category: "T-Shirt",
    season: "SS 26",
    src: "/videos/vid_5.mp4",
    span: "tall",
  },
  {
    id: "v2",
    index: "002",
    title: "Raw_Cut",
    category: "Trousers",
    season: "SS 26",
    src: "/videos/vid_6.mp4",
    span: "normal",
  },
  {
    id: "v3",
    index: "003",
    title: "Soft_Shell",
    category: "Jacket",
    season: "FW 26",
    src: "/videos/vid_3.mp4",
    span: "normal",
  },
  {
    id: "v4",
    index: "004",
    title: "Void_Dress",
    category: "Dress",
    season: "SS 26",
    src: "/videos/vid_1.mp4",
    span: "wide",
  },
];

function VideoCard({ item }: { item: VideoItem }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleEnter = () => {
    setActive(true);
    videoRef.current?.play();
  };

  const handleLeave = () => {
    setActive(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setProgress(0);
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setProgress((v.currentTime / v.duration) * 100);
  };

  // Aspect ratio según el span
  const aspectRatio =
    item.span === "tall" ? "9/16" : item.span === "wide" ? "16/9" : "3/4";

  return (
    <div
      className="group relative flex flex-col cursor-pointer"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Video container */}
      <div className="relative overflow-hidden w-full" style={{ aspectRatio }}>
        {/* Placeholder */}
        <div className="absolute inset-0 bg-white/5 flex items-center justify-center z-0">
          <span className="font-barlow text-[5rem] font-extrabold text-white/5 uppercase">
            {item.category.slice(0, 2)}
          </span>
        </div>

        {/* Video */}
        <video
          ref={videoRef}
          src={item.src}
          className="absolute inset-0 w-full h-full object-cover z-10 transition-transform duration-700 ease-out will-change-transform"
          style={{ transform: active ? "scale(1.04)" : "scale(1.1)" }}
          muted
          loop
          playsInline
          preload="metadata"
          onTimeUpdate={handleTimeUpdate}
        />

        {/* Overlay */}
        <div
          className="absolute inset-0 z-20 transition-opacity duration-500 bg-black"
          style={{ opacity: active ? 0.1 : 0.45 }}
        />

        {/* Top left — index + title */}
        <div className="absolute top-3 left-3 z-30 flex items-center gap-2">
          <span className="font-spline text-[0.55rem] text-white/40 tabular-nums">
            {item.index}
          </span>
          <span className="font-spline text-[0.55rem] text-white/40 uppercase">
            {item.title}
          </span>
        </div>

        {/* Top right — season tag */}
        <div
          className="absolute top-3 right-3 z-30 transition-all duration-300"
          style={{
            opacity: active ? 0 : 1,
            transform: active ? "translateY(-4px)" : "translateY(0)",
          }}
        >
          <span className="font-spline text-[0.55rem] text-white/40 uppercase border border-dashed border-white/20 px-2 py-[2px]">
            {item.season}
          </span>
        </div>

        {/* Play indicator — centro */}
        <div
          className="absolute inset-0 z-30 flex items-center justify-center transition-all duration-300"
          style={{ opacity: active ? 0 : 1 }}
        >
          <div className="border border-dashed border-white/20 rounded-full w-10 h-10 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              className="fill-white/40 translate-x-[1px]"
              viewBox="0 0 256 256"
            >
              <path d="M240,128a15.74,15.74,0,0,1-7.6,13.51L88.32,229.65a16,16,0,0,1-16.2.3A15.86,15.86,0,0,1,64,216.13V39.87a15.86,15.86,0,0,1,8.12-13.82,16,16,0,0,1,16.2.3L232.4,114.49A15.74,15.74,0,0,1,240,128Z" />
            </svg>
          </div>
        </div>

        {/* Bottom overlay — category + CTA */}
        <div
          className="absolute bottom-0 left-0 w-full z-30 p-3 flex items-end justify-between transition-all duration-400"
          style={{
            opacity: active ? 1 : 0,
            transform: active ? "translateY(0)" : "translateY(6px)",
          }}
        >
          <div className="flex flex-col gap-[2px]">
            <span className="font-spline text-[0.55rem] text-white/50 uppercase">
              ▶ Playing
            </span>
            <span className="font-barlow text-xl font-extrabold text-white uppercase leading-none">
              {item.category}
            </span>
          </div>
          <span className="font-spline text-[0.55rem] text-white/60 uppercase flex items-center gap-1">
            View piece
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="8"
              height="8"
              className="fill-white/60"
              viewBox="0 0 256 256"
            >
              <path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z" />
            </svg>
          </span>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-white/10 z-40">
          <div
            className="h-full bg-white transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Progress bar exterior */}
      <div className="w-full h-px bg-white/10 mt-2 relative overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full bg-white/30 transition-none"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

// Card estática de texto/info para el bento
function InfoCard() {
  return (
    <div className="relative flex flex-col justify-between border border-dashed border-white/15 p-5 aspect-square">
      <div>
        <p className="font-spline text-[0.55rem] text-gray uppercase mb-4">
          HSH//Editorial
        </p>
        <h3 className="font-barlow text-4xl font-extrabold text-white uppercase leading-[0.85]">
          Moving
          <br />
          Image
          <br />
          <span className="text-gray">SS 26</span>
        </h3>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between border-t border-white/10 pt-3">
          <span className="font-spline text-[0.55rem] text-gray uppercase">
            Format
          </span>
          <span className="font-spline text-[0.55rem] text-white uppercase">
            Vertical — 9:16
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-spline text-[0.55rem] text-gray uppercase">
            Season
          </span>
          <span className="font-spline text-[0.55rem] text-white uppercase">
            Spring / Summer
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-spline text-[0.55rem] text-gray uppercase">
            Pieces
          </span>
          <span className="font-spline text-[0.55rem] text-white uppercase">
            04 Selected
          </span>
        </div>
      </div>
      <div className="absolute bottom-4 right-4 flex gap-1">
        <span className="font-spline text-[0.55rem] text-white/30">▊</span>
        <span className="font-spline text-[0.55rem] text-white/15">▊</span>
      </div>
    </div>
  );
}

export default function VideoSection() {
  return (
    <section className="w-full bg-black text-white px-6 pt-24 pb-16">
      {/* Header */}
      <div className="flex items-baseline justify-between mb-10 border-b border-white/20 pb-6">
        <div className="flex items-baseline gap-4">
          <h2 className="font-barlow text-3xl font-extrabold uppercase text-white">
            Editorial
          </h2>
          <span className="font-spline text-[0.65rem] text-gray">
            SS 26 — Moving Image
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-spline text-[0.55rem] text-gray uppercase">
            Hover to play
          </span>
        </div>
      </div>

      {/*
        Bento grid — layout:
        Desktop (4 cols, 2 rows):
        [ tall(rowspan 2) ] [ normal ] [ normal ] [ info ]
                            [ wide (colspan 2)  ] [ info ]  <- info stacks

        Se logra con grid-rows explícito y las celdas usando row/col span
      */}
      <div
        className="grid gap-[1.6rem]"
        style={{
          gridTemplateColumns: "repeat(4, 1fr)",
          gridTemplateRows: "auto auto",
        }}
      >
        {/* 1 — Tall: rowspan 2 */}
        <div style={{ gridRow: "1 / 3", gridColumn: "1 / 2" }}>
          <VideoCard item={videos[0]} />
        </div>

        {/* 2 — Normal */}
        <div style={{ gridRow: "1 / 2", gridColumn: "2 / 3" }}>
          <VideoCard item={videos[1]} />
        </div>

        {/* 3 — Normal */}
        <div style={{ gridRow: "1 / 2", gridColumn: "3 / 4" }}>
          <VideoCard item={videos[2]} />
        </div>

        {/* 4 — Info card */}
        <div style={{ gridRow: "1 / 2", gridColumn: "4 / 5" }}>
          <InfoCard />
        </div>

        {/* 5 — Wide: colspan 2 */}
        <div style={{ gridRow: "2 / 3", gridColumn: "2 / 4" }}>
          <VideoCard item={videos[3]} />
        </div>

        {/* 6 — Info card pequeña bottom right */}
        <div
          style={{ gridRow: "2 / 3", gridColumn: "4 / 5" }}
          className="flex flex-col justify-end gap-3 border-t border-white/10 pt-4"
        >
          <p className="font-spline text-[0.55rem] text-gray uppercase leading-relaxed">
            Natural fabrics.
            <br />
            Minimal construction.
            <br />
            Crafted for silence.
          </p>
          <div className="flex gap-1 mt-auto">
            <span className="font-spline text-[0.55rem] text-white">▊</span>
            <span className="font-spline text-[0.55rem] text-white/40">▊</span>
            <span className="font-spline text-[0.55rem] text-white/10">▊</span>
          </div>
        </div>
      </div>

      {/* Bottom meta */}
      <div className="flex items-center justify-between mt-12 pt-6 border-t border-white/20">
        <p className="font-spline text-[0.55rem] text-gray uppercase">
          HSH//Editorial — Collection SS 26
        </p>
        <p className="font-spline text-[0.55rem] text-gray uppercase">
          04 Moving Images — Hover to Preview
        </p>
      </div>
    </section>
  );
}
