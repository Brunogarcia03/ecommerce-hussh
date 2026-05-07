"use client";

import { useRef, useState } from "react";
import Image from "next/image";

import ig_1 from "@/assets/images/instagram/ig_1.jpg";
import ig_2 from "@/assets/images/instagram/ig_2.jpg";
import ig_3 from "@/assets/images/instagram/ig_3.jpg";
import ig_4 from "@/assets/images/instagram/ig_4.jpg";
import ig_5 from "@/assets/images/instagram/ig_5.jpg";
import ig_6 from "@/assets/images/instagram/ig_6.jpg";
import NavLink from "../ui/NavLink";

interface IGPost {
  id: string;
  src: string;
  handle: string;
  tag: string;
  isVideo?: boolean;
}

const posts: IGPost[] = [
  {
    id: "p1",
    src: ig_1.src,
    handle: "@hussh",
    tag: "SS 26",
    isVideo: false,
  },
  {
    id: "p2",
    src: "/videos/ig_1.mp4",
    handle: "@user.name",
    tag: "UGC",
    isVideo: true,
  },
  {
    id: "p3",
    src: ig_2.src,
    handle: "@hussh",
    tag: "Editorial",
    isVideo: false,
  },
  {
    id: "p4",
    src: "/videos/ig_2.mp4",
    handle: "@user.name",
    tag: "UGC",
    isVideo: true,
  },
  {
    id: "p5",
    src: ig_3.src,
    handle: "@hussh",
    tag: "SS 26",
    isVideo: false,
  },

  {
    id: "p6",
    src: ig_4.src,
    handle: "@hussh",
    tag: "SS 26",
    isVideo: false,
  },
  {
    id: "p7",
    src: ig_5.src,
    handle: "@hussh",
    tag: "SS 26",
    isVideo: false,
  },
  {
    id: "p8",
    src: "/videos/ig_3.mp4",
    handle: "@user.name",
    tag: "UGC",
    isVideo: true,
  },
  {
    id: "p9",
    src: ig_6.src,
    handle: "@hussh",
    tag: "SS 26",
    isVideo: false,
  },
];

function IGCard({ post }: { post: IGPost }) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleEnter = () => {
    setHovered(true);
    if (post.isVideo) videoRef.current?.play();
  };

  const handleLeave = () => {
    setHovered(false);
    if (post.isVideo && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className="relative overflow-hidden shrink-0 cursor-pointer"
      style={{ width: "clamp(180px, 22vw, 280px)", aspectRatio: "1/1" }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Placeholder bg */}
      <div className="absolute inset-0 bg-white/5" />

      {/* Imagen o Video — mismo tamaño, mismo comportamiento */}
      {post.isVideo ? (
        <video
          ref={videoRef}
          src={post.src}
          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out"
          style={{ transform: hovered ? "scale(1.06)" : "scale(1.12)" }}
          muted
          loop
          playsInline
          preload="metadata"
        />
      ) : (
        <Image
          src={post.src}
          alt={post.handle}
          fill
          className="object-cover object-top transition-transform duration-700 ease-out"
          style={{ transform: hovered ? "scale(1.06)" : "scale(1.12)" }}
        />
      )}

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black transition-opacity duration-400"
        style={{ opacity: hovered ? 0.15 : 0.5 }}
      />

      {/* Badge de video — solo cuando es video y no está en hover */}
      {post.isVideo && (
        <div
          className="absolute top-3 right-3 z-10 transition-all duration-300"
          style={{
            opacity: hovered ? 0 : 1,
            transform: hovered ? "translateY(-4px)" : "translateY(0)",
          }}
        >
          <div className="border border-dashed border-white rounded-full w-7 h-7 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="8"
              height="8"
              className="fill-white"
              viewBox="0 0 256 256"
            >
              <path d="M240,128a15.74,15.74,0,0,1-7.6,13.51L88.32,229.65a16,16,0,0,1-16.2.3A15.86,15.86,0,0,1,64,216.13V39.87a15.86,15.86,0,0,1,8.12-13.82,16,16,0,0,1,16.2.3L232.4,114.49A15.74,15.74,0,0,1,240,128Z" />
            </svg>
          </div>
        </div>
      )}

      {/* Info */}
      <div
        className="absolute bottom-0 left-0 w-full p-3 flex items-center justify-between transition-all duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(6px)",
        }}
      >
        <span className="font-spline text-[0.55rem] text-white uppercase">
          {post.handle}
        </span>
        <span className="font-spline text-[0.5rem] text-gray uppercase border border-dashed border-gray px-2 py-0.5">
          {post.tag}
        </span>
      </div>
    </div>
  );
}

export default function InstagramStrip() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (trackRef.current?.offsetLeft ?? 0));
    setScrollLeft(trackRef.current?.scrollLeft ?? 0);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - (trackRef.current.offsetLeft ?? 0);
    trackRef.current.scrollLeft = scrollLeft - (x - startX);
  };

  const onMouseUp = () => setIsDragging(false);

  return (
    <section className="hidden instagram-section w-full bg-black text-white pt-24 pb-4 md:pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-baseline justify-between mb-10 pb-6 border-b border-white/20 md:px-6">
        <div className="flex flex-col md:flex-row items-baseline gap-4">
          <h2 className="font-barlow text-3xl font-extrabold uppercase text-white">
            @hussh
          </h2>
          <span className="font-spline text-[0.65rem] text-gray">
            Community — Drag to explore
          </span>
        </div>
        <NavLink href="https://instagram.com/hussh">Follow us</NavLink>
      </div>

      {/* Drag scroll strip */}
      <div
        ref={trackRef}
        className="flex gap-[1.6rem] overflow-x-auto md:px-6 pb-2 scrollbar-none select-none"
        style={{
          cursor: isDragging ? "grabbing" : "grab",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {posts.map((post) => (
          <IGCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
