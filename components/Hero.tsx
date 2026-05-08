"use client";

import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import CustomEase from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");
CustomEase.create("glide", "0.8, 0, 0.2, 1");

const Hero = () => {
  useGSAP(() => {
    // RAF loop para que Lenis funcione cuando se reactive
    function raf(time: number) {
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    let preloaderComplete = false;

    const preloaderTexts = document.querySelectorAll(".preloader p");
    const preloaderBtn = document.querySelector(".preloader-btn-container");
    const btnOutlineTrack = document.querySelector(
      ".stroke-track",
    ) as SVGCircleElement;
    const pbcSvgStrokes = document.querySelector(".pbc-svg-strokes");
    const btnOutlineProgress = document.querySelector(".stroke-progress");
    const svgPathLength = btnOutlineTrack.getTotalLength();

    gsap.set([btnOutlineTrack, btnOutlineProgress], {
      strokeDasharray: svgPathLength,
      strokeDashoffset: svgPathLength,
    });

    preloaderTexts.forEach((p) => {
      new SplitText(p, { type: "lines", linesClass: "line", mask: "lines" });
    });

    new SplitText(".hero h1", {
      type: "lines,chars",
      linesClass: "line",
      charsClass: "char",
      mask: "lines",
    });

    gsap.set(".img-hero", {
      clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
    });

    gsap.set("#pbc-border", { opacity: 0 });

    gsap.set(".hero h1 .line", {
      overflow: "hidden",
      paddingBottom: "0.15em",
      marginTop: "-0.15em",
    });

    gsap.set(".hero h1 .char", { y: "120%" });

    const introTl = gsap.timeline({ delay: 1 });

    introTl
      .to(".preloader .p-row p .line", {
        y: "0%",
        duration: 0.75,
        ease: "power3.out",
        stagger: 0.1,
      })
      .to(
        btnOutlineTrack,
        { strokeDashoffset: 0, duration: 2, ease: "hop" },
        "<",
      )
      .to(
        ".pbc-svg-strokes svg",
        { rotation: 270, duration: 2, ease: "hop" },
        "<",
      );

    const progressStops = [0.2, 0.25, 0.85, 1].map((base, i) => {
      if (i === 3) return 1;
      return base + (Math.random() - 0.5) * 0.1;
    });

    progressStops.forEach((stop, i) => {
      introTl.to(btnOutlineProgress, {
        strokeDashoffset: svgPathLength - svgPathLength * stop,
        duration: 0.75,
        ease: "glide",
        delay: i === 0 ? 0.3 : 0.3 + Math.random() * 0.2,
      });
    });

    introTl
      .to(
        "#pbc-logo",
        { opacity: 0, duration: 0.35, ease: "power1.out" },
        "-=0.25",
      )
      .to(
        preloaderBtn,
        {
          scale: 0.9,
          duration: 1.5,
          ease: "hop",
          onStart: () => {
            preloaderBtn?.classList.add("cursor-pointer");
            pbcSvgStrokes?.classList.add("hover:scale-[0.9]");
          },
        },
        "-=0.5",
      )
      .to(
        "#pbc-label .line",
        {
          y: "0%",
          duration: 0.75,
          ease: "power3.out",
          onComplete: () => {
            preloaderComplete = true;
          },
        },
        "-=0.75",
      )
      .to("#pbc-border", { opacity: 1, duration: 0.75 }, "<");

    preloaderBtn?.addEventListener("click", () => {
      if (!preloaderComplete) return;
      preloaderComplete = false;

      const exitTl = gsap.timeline();

      exitTl
        .to(".preloader", { scale: 0.75, duration: 1.25, ease: "hop" })
        .to("#pbc-border", { opacity: 0, duration: 0.75 }, "<")
        .to(
          [btnOutlineTrack, btnOutlineProgress],
          {
            strokeDashoffset: -svgPathLength,
            duration: 1.25,
            ease: "hop",
          },
          "<",
        )
        .to(
          "#pbc-label .line",
          { y: "-100%", duration: 0.75, ease: "power3.out" },
          "-=1.25",
        )
        .to(
          "#pbc-outro-label .line",
          { y: "0%", duration: 0.75, ease: "power3.out" },
          "-=0.75",
        )
        .to(".preloader", {
          clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
          duration: 1.5,
          ease: "hop",
        })
        .to(
          ".preloader-revealer",
          {
            clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
            duration: 1.5,
            ease: "hop",
            onComplete: () => {
              gsap.set(".preloader", { display: "none" });
              const heroEl = document.querySelector(".hero") as HTMLElement;
              if (heroEl) {
                heroEl.style.position = "relative";
                heroEl.style.inset = "unset";
              }
            },
          },
          "-=1.45",
        )
        .to(".hero", { scale: 1, duration: 1.25, ease: "hop" })
        .to(
          ".hero h1 .char",
          {
            y: "0%",
            duration: 1,
            ease: "glide",
            stagger: 0.15,
            delay: 0.15,
            onComplete: () => {
              gsap.set(".preloader-backdrop", { display: "none" });
              document.querySelector(".img-hero")?.classList.remove("hidden");
              document
                .querySelector(".product-grid")
                ?.classList.remove("hidden");
              document
                .querySelector(".video-section")
                ?.classList.remove("hidden");
              document
                .querySelector(".instagram-section")
                ?.classList.remove("hidden");
              document.querySelector(".about")?.classList.remove("hidden");
            },
          },
          "<",
        )
        .to(
          ".hero-meta",
          { opacity: 1, duration: 1.2, ease: "power2.out", delay: 0.2 },
          "<",
        )
        .to(".img-hero", {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1.5,
          ease: "power2.out",
          onComplete: () => {
            document.querySelector("footer")?.classList.remove("hidden");
          },
        });
    });
  });

  return (
    <>
      <div className="preloader-backdrop fixed w-full h-svh bg-white text-gray flex flex-col justify-between z-0">
        <div className="pb-row w-full p-6 flex justify-between">
          <div className="pb-col">
            <p>HSH//001 Cotton Weave</p>
            <p>HSH//002 Raw Denim</p>
            <p>HSH//003 Linen Blend</p>
            <p>HSH//004 Merino Knit</p>
            <p>HSH//005 Silk Trace</p>
          </div>
          <div className="pb-col">
            <p>Sector / Apparel</p>
            <p>SKU 0019 04AR 002610</p>
          </div>
          <div className="pb-col">
            <p>Material / Natural Fiber</p>
            <p>Status / In Season</p>
          </div>
          <div className="pb-col">
            <img
              className="w-10 h-10 p-1 border border-gray border-dashed"
              id="pb-logo"
              src="/logo-white.svg"
              alt="Logo Hussh"
            />
          </div>
          <div className="pb-col">
            <p>:::..:::.::::..:::</p>
          </div>
        </div>
        <div className="pb-row w-full p-6 flex justify-between items-end">
          <div className="pb-col">
            <p>Fabric Memory</p>
          </div>
          <div className="pb-col">
            <p>// / / ///// / / / ///</p>
          </div>
          <div className="pb-col">
            <p>Shrink offset {">"} 2%</p>
          </div>
          <div className="pb-col">
            <p>Threads Aligning</p>
            <p>Pattern Emerging</p>
          </div>
          <div className="pb-col">
            <p>Collection Pending</p>
            <p>Return -- Base Layer</p>
          </div>
          <div className="pb-col">
            <p>SS-26</p>
          </div>
        </div>
      </div>

      <div
        className="preloader fixed w-full h-svh bg-black text-white flex flex-col justify-between will-change-transform z-2"
        style={{
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          willChange: "clip-path",
        }}
      >
        <div className="p-row w-full p-6 flex justify-between">
          <p>Initiating</p>
        </div>
        <div className="p-row w-full p-6 flex justify-between">
          <div className="p-col flex gap-24 items-end">
            <div className="p-sub-col">
              <p>Phase 01</p>
              <p>Sequence</p>
            </div>
            <div className="p-sub-col">
              <p>Signal Scan</p>
              <p>07 Layers</p>
            </div>
          </div>
          <div className="p-col">
            <p>PX-17</p>
          </div>
        </div>

        <div className="preloader-btn-container absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 sm:w-80 sm:h-80 group">
          <div
            id="pbc-border"
            className="bg-transparent border border-dashed border-gray rounded-full w-[80%] h-[80%] group-hover:size-full transition-discrete duration-300 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          />
          <img
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16"
            id="pbc-logo"
            src="/logo.svg"
            alt="LOGO"
          />
          <p
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[0.9rem] leading-0 text-center cursor-pointer"
            id="pbc-label"
          >
            ENTER
          </p>
          <p
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[0.9rem] leading-0 text-center"
            id="pbc-outro-label"
          >
            Access Granted
          </p>

          <div className="pbc-svg-strokes absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full transition-discrete duration-300 will-change-transform">
            <svg
              viewBox="0 0 320 320"
              className="w-full h-full will-change-transform"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="stroke-track"
                cx={160}
                cy={160}
                r={155}
                stroke="#2b2b2b"
                strokeWidth={2}
                strokeDasharray={974}
                strokeDashoffset={974}
              />
              <circle
                className="stroke-progress"
                cx={160}
                cy={160}
                r={155}
                stroke="#fff"
                strokeWidth={2}
                strokeDasharray={974}
                strokeDashoffset={974}
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
