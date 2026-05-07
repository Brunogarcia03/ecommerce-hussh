"use client";

import { useRef, useState } from "react";
import Image from "next/image";

interface ProductProps {
  number?: string;
  title?: string;
  category?: string;
  img?: string;
  price?: string;
  tag?: string;
}

function Product({
  number = "001",
  title = "Hussh",
  category = "Remera",
  img = "/og-image.jpg",
  price = "$89",
  tag,
}: ProductProps) {
  const figRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = figRef.current?.getBoundingClientRect();
    if (!rect || !imgRef.current) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    imgRef.current.style.transform = `translate(${x}%, ${y}%) scale(1.12)`;
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (!imgRef.current) return;
    imgRef.current.style.transform = "translate(0%, 0%) scale(1.06)";
  };

  const handleMouseEnter = () => setHovered(true);

  return (
    <article className="group flex flex-col items-start w-full cursor-pointer">
      {/* Header */}
      <div className="flex items-center justify-between w-full mb-3">
        <div className="flex items-center gap-3">
          <span className="font-spline text-[1.65rem] leading-0 text-gray tabular-nums">
            {number}
          </span>
          <div className="flex flex-col text-start uppercase leading-none gap-0.5">
            <p className="text-[0.58rem] font-spline text-gray leading-none">
              {title}
            </p>
            <span className="text-[0.8rem] font-barlow font-semibold leading-none text-white">
              {category}
            </span>
          </div>
        </div>

        {/* Tag opcional */}
        {tag && (
          <span className="text-[0.55rem] font-spline uppercase border border-dashed border-gray text-gray px-2 py-0.5">
            {tag}
          </span>
        )}
      </div>

      {/* Imagen */}
      <div
        ref={figRef}
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "3/4" }}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Overlay hover */}
        <div
          className="absolute inset-0 z-10 transition-opacity duration-500"
          style={{ opacity: hovered ? 1 : 0, background: "rgba(4,4,4,0.15)" }}
        />

        {/* Clip reveal line — borde inferior animado */}
        <div
          className="absolute bottom-0 left-0 h-px bg-white z-20 transition-all duration-700 ease-out"
          style={{ width: hovered ? "100%" : "0%" }}
        />

        <img
          ref={imgRef}
          src={img}
          alt={category}
          draggable={false}
          className="w-full h-full object-cover transition-transform duration-700 ease-out will-change-transform"
          style={{ transform: "translate(0%, 0%) scale(1.06)" }}
        />

        {/* CTA que aparece al hover */}
        <div
          className="absolute bottom-0 left-0 w-full z-20 p-3 flex items-center justify-between transition-all duration-500"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(6px)",
          }}
        >
          <span className="font-barlow text-xl font-extrabold text-white uppercase">
            {price}
          </span>
          <span className="font-spline text-[0.6rem] uppercase text-white flex items-center gap-1">
            Ver
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              className="fill-white"
              viewBox="0 0 256 256"
            >
              <path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z" />
            </svg>
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between w-full mt-2 border-t border-white/10 pt-2">
        <div className="flex gap-1">
          {["S", "M", "L", "XL"].map((s) => (
            <span
              key={s}
              className="text-[0.55rem] font-spline uppercase text-gray hover:text-white transition-colors cursor-pointer px-1 border border-transparent hover:border-white/20"
            >
              {s}
            </span>
          ))}
        </div>
        <button className="text-[0.55rem] font-spline uppercase text-gray hover:text-white transition-colors flex items-center gap-1 group/btn">
          <span className="relative overflow-hidden inline-block cursor-pointer">
            <span className="flex items-center gap-x-px transition-transform duration-300 group-hover/btn:-translate-y-full cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                className="fill-white size-[0.55rem]"
                viewBox="0 0 256 256"
              >
                <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
              </svg>{" "}
              Add
            </span>
            <span className="absolute inset-0 flex items-center gap-x-px translate-y-full transition-transform duration-300 group-hover/btn:translate-y-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                className="fill-white size-[0.55rem]"
                viewBox="0 0 256 256"
              >
                <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
              </svg>{" "}
              Add
            </span>
          </span>
        </button>
      </div>
    </article>
  );
}

export default Product;
