"use client";

import Image from "next/image";
import { useRef } from "react";

import img from "@/assets/images/img_8.jpg";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ParallaxImage({
  src = img.src,
  alt = "Parallax Image",
  width = 1920,
  height = 1080,
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !imageRef.current) return;

    gsap.to(imageRef.current, {
      y: -100,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="hidden img-hero w-full h-svh overflow-hidden"
    >
      <Image
        ref={imageRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="eager"
        className="w-full h-[120%] object-cover"
      />
    </div>
  );
}

export default ParallaxImage;
