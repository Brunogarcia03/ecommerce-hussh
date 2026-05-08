"use client";

import { useRef, useState, useEffect } from "react";

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

export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(`(max-width:${breakpoint - 1}px)`);

    const update = () => setIsMobile(media.matches);

    update();

    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}

function VideoCard({ item }: { item: VideoItem }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [active, setActive] = useState(false);
  const [progress, setProgress] = useState(0);

  const isMobile = useIsMobile();

  const handleEnter = async () => {
    if (isMobile) return;

    setActive(true);

    try {
      await videoRef.current?.play();
    } catch {}
  };

  const handleLeave = () => {
    if (isMobile) return;

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

  const aspectRatio =
    item.span === "tall" ? "9/16" : item.span === "wide" ? "16/9" : "3/4";

  return (
    <div
      className="group relative flex flex-col cursor-pointer"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
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
          style={{
            transform: isMobile
              ? "scale(1)"
              : active
                ? "scale(1.04)"
                : "scale(1.1)",
          }}
          muted
          loop
          playsInline
          preload="metadata"
          autoPlay={isMobile}
          onTimeUpdate={handleTimeUpdate}
        />

        {/* Overlay */}
        <div
          className="absolute inset-0 z-20 transition-opacity duration-500 bg-black"
          style={{
            opacity: isMobile ? 0.2 : active ? 0.1 : 0.45,
          }}
        />

        {/* Top left */}
        <div className="absolute top-3 left-3 z-30 flex items-center gap-2">
          <span className="font-spline text-[0.55rem] text-white/40 tabular-nums">
            {item.index}
          </span>

          <span className="font-spline text-[0.55rem] text-white/40 uppercase">
            {item.title}
          </span>
        </div>

        {/* Season */}
        <div
          className="absolute top-3 right-3 z-30 transition-all duration-300"
          style={{
            opacity: isMobile ? 1 : active ? 0 : 1,
            transform:
              !isMobile && active ? "translateY(-4px)" : "translateY(0)",
          }}
        >
          <span className="font-spline text-[0.55rem] text-white/40 uppercase border border-dashed border-white/20 px-2 py-0.5">
            {item.season}
          </span>
        </div>

        {/* Play indicator */}
        {!isMobile && (
          <div
            className="absolute inset-0 z-30 flex items-center justify-center transition-all duration-300"
            style={{ opacity: active ? 0 : 1 }}
          >
            <div className="border border-dashed border-white/20 rounded-full w-10 h-10 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                className="fill-white/40"
                viewBox="0 0 256 256"
              >
                <path d="M240,128a15.74,15.74,0,0,1-7.6,13.51L88.32,229.65a16,16,0,0,1-16.2.3A15.86,15.86,0,0,1,64,216.13V39.87a15.86,15.86,0,0,1,8.12-13.82,16,16,0,0,1,16.2.3L232.4,114.49A15.74,15.74,0,0,1,240,128Z" />
              </svg>
            </div>
          </div>
        )}

        {/* Bottom overlay */}
        <div
          className="absolute bottom-0 left-0 w-full z-30 p-3 flex items-end justify-between transition-all duration-400"
          style={{
            opacity: isMobile ? 1 : active ? 1 : 0,
            transform: isMobile || active ? "translateY(0)" : "translateY(6px)",
          }}
        >
          <div className="flex flex-col gap-0.5">
            <span className="flex items-center gap-x-2 font-spline text-[0.55rem] text-gray font-bold uppercase">
              Playing
            </span>

            <span className="font-barlow text-xl font-extrabold text-white uppercase leading-none">
              {item.category}
            </span>
          </div>

          <span className="font-spline text-[0.55rem] text-white/60 uppercase flex items-center gap-1">
            View piece
          </span>
        </div>

        {/* Progress */}
        {!isMobile && (
          <div className="absolute bottom-0 left-0 w-full h-px bg-white/10 z-40">
            <div
              className="h-full bg-white transition-none"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>

      {/* External progress */}
      {!isMobile && (
        <div className="w-full h-px bg-white/10 mt-2 relative overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full bg-white/30 transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
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
    <section className="hidden video-section w-full bg-black text-white sm:px-6 pt-24 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-baseline justify-between mb-10 border-b border-white/20 pb-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
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
        Mobile:  1 col, todos apilados en orden natural
        Tablet:  2 cols, sin spans especiales
        Desktop: 4 cols bento con row/col spans
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {/* 1 — Tall: rowspan 2 solo en md+ */}
        <div className="col-span-2 md:col-span-1 md:[grid-row:1/3] md:[grid-column:1/2]">
          <VideoCard item={videos[0]} />
        </div>

        {/* 2 — Normal */}
        <div className="col-span-2 sm:col-span-1 md:[grid-row:1/2] md:[grid-column:2/3]">
          <VideoCard item={videos[1]} />
        </div>

        {/* 3 — Normal */}
        <div className="col-span-2 sm:col-span-1 md:[grid-row:1/2] md:[grid-column:3/4]">
          <VideoCard item={videos[2]} />
        </div>

        {/* 4 — Info card: oculta en mobile, visible en md+ */}
        <div className="hidden md:block md:[grid-row:1/2] md:[grid-column:4/5]">
          <InfoCard />
        </div>

        {/* 5 — Wide: full en mobile, colspan 2 en md+ */}
        <div className="col-span-2 md:[grid-row:2/3] md:[grid-column:2/4]">
          <VideoCard item={videos[3]} />
        </div>

        {/* 6 — Quote: oculta en mobile, visible en md+ */}
        <div className="hidden md:flex md:[grid-row:2/3] md:[grid-column:4/5] flex-col justify-end gap-3 border-t border-white/10 pt-4">
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
    </section>
  );
}
