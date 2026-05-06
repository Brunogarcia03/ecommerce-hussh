"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  category: { name: string };
}

const getImage = (product: Product): string | null => {
  const img = product.images?.[0];
  if (
    typeof img === "string" &&
    img.startsWith("http") &&
    !img.includes("placehold")
  )
    return img;
  return null;
};

const formatIndex = (i: number) => String(i + 1).padStart(3, "0");

const formatTitle = (title: string) =>
  title.trim().replace(/\s+/g, "_").slice(0, 20);

// Imagen con parallax al hover
function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const figureRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = figureRef.current?.getBoundingClientRect();
    if (!rect || !imgRef.current) return;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    imgRef.current.style.transform = `translate(0%, ${y}%) scale(1.2)`;
  };

  const handleMouseLeave = () => {
    if (!imgRef.current) return;
    imgRef.current.style.transform = "translate(0%, 0%) scale(1.2)";
  };

  return (
    <figure
      ref={figureRef}
      className="w-full aspect-[16/9] overflow-hidden"
      style={{ clipPath: "inset(0%)" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={imgRef}
        className="w-full h-full transition-transform duration-500 ease-out"
        style={{
          transform: "translate(0%, 0%) scale(1.2)",
          transformOrigin: "50% 50%",
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={1600}
          height={900}
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>
    </figure>
  );
}

// Placeholder cuando no hay imagen
function ImagePlaceholder({ category }: { category: string }) {
  return (
    <figure className="w-full aspect-[16/9] overflow-hidden bg-white/5 flex items-center justify-center">
      <span className="font-barlow text-6xl font-extrabold text-white/10 uppercase">
        {category.slice(0, 2)}
      </span>
    </figure>
  );
}

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products?limit=8")
      .then((r) => r.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="w-full bg-black px-6 py-12">
        <ul className="flex flex-col">
          {Array.from({ length: 4 }).map((_, i) => (
            <li key={i} className="border-t border-white/20 py-6 animate-pulse">
              <div className="h-4 w-32 bg-white/10 mb-4 rounded" />
              <div className="w-full aspect-[16/9] bg-white/5 rounded" />
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section className="w-full bg-black px-6 py-12">
      {/* Header de sección */}
      <div className="flex items-baseline justify-between mb-8 border-b border-white/20 pb-6">
        <h2 className="font-barlow text-3xl font-extrabold uppercase text-white">
          Collection
        </h2>
        <p className="text-gray text-[0.72rem]">
          {products.length} items — SS 26
        </p>
      </div>

      <ul className="flex flex-col">
        {products.map((product, i) => {
          const img = getImage(product);

          return (
            <li
              key={product.id}
              className="group border-t border-white/20 py-6 last:border-b last:border-white/20"
            >
              {/* Head: índice + nombre + categoría */}
              <div className="flex items-baseline justify-between mb-4">
                <div className="flex items-baseline gap-4">
                  {/* Número de índice */}
                  <p className="text-gray text-[0.72rem] tabular-nums">
                    {formatIndex(i)}
                  </p>

                  {/* Nombre _ Categoría */}
                  <h4 className="font-barlow text-xl md:text-2xl font-semibold text-white uppercase leading-tight">
                    <span>{formatTitle(product.title)}</span>
                    <span className="text-gray"> {product.category?.name}</span>
                  </h4>
                </div>

                {/* Precio */}
                <span className="font-barlow text-xl font-extrabold text-white">
                  ${product.price}
                </span>
              </div>

              {/* Imagen con parallax — se revela al hover */}
              <a
                href={`/product/${product.id}`}
                className="block overflow-hidden"
              >
                <div className="transition-all duration-500 ease-out max-h-0 group-hover:max-h-[600px]">
                  {img ? (
                    <ParallaxImage src={img} alt={product.title} />
                  ) : (
                    <ImagePlaceholder
                      category={product.category?.name ?? "??"}
                    />
                  )}
                </div>

                {/* Footer del item */}
                <div className="flex items-center justify-between mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-gray text-[0.65rem] uppercase">
                    {product.category?.name} — View Item
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12px"
                    height="12px"
                    className="fill-gray"
                    viewBox="0 0 256 256"
                  >
                    <path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z" />
                  </svg>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
