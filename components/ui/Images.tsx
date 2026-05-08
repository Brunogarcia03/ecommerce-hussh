"use client";

import Image from "next/image";
import { useRef } from "react";

import img from "@/assets/images/img_8.jpg";
import img_res from "@/assets/images/img_hero_02.jpg";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ParallaxImage({
  src = img.src,
  responsive,
  alt = "Parallax Image",
  width = 1920,
  height = 1080,
}: {
  src?: string;
  responsive?: string;
  alt?: string;
  width?: number;
  height?: number;
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
      className="hidden img-hero w-full h-svh overflow-hidden mt-5 md:mt-0"
    >
      <Image
        ref={imageRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="eager"
        className="hidden md:block w-full h-[120%] object-cover"
      />
      {responsive && (
        <Image
          ref={imageRef}
          src={responsive || img_res.src}
          alt={alt}
          width={1080}
          height={1920}
          loading="eager"
          className="block md:hidden w-full h-[120%] object-cover"
        />
      )}
    </div>
  );
}

export default ParallaxImage;
