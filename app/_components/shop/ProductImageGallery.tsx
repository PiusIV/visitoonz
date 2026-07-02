// app/_components/shop/ProductImageGallery.tsx
"use client";
import { useState } from "react";
import Image from "next/image";
import { ProductImage } from "@/app/_lib/data-service";

export default function ProductImageGallery({
  images,
  name,
}: {
  images: ProductImage[];
  name: string;
}) {
  const sorted = [...images].sort((a, b) => a.sort_order - b.sort_order);
  const [active, setActive] = useState(0);

  if (!images.length) {
    return (
      <div className="relative aspect-4/5 bg-bg2 flex items-center justify-center">
        <i className="ti ti-camera text-6xl text-white/10" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative aspect-4/5 bg-bg2 overflow-hidden">
        <Image
          src={sorted[active].url}
          alt={sorted[active].alt_text ?? name}
          fill
          className="object-cover transition-opacity duration-300"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      {/* Thumbnails — only show if more than one image */}
      {sorted.length > 1 && (
        <div className="flex gap-2 overflow-x-auto scrollbar-none">
          {sorted.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative shrink-0 w-16 h-16 overflow-hidden border transition-all
                ${
                  active === i
                    ? "border-[#C9A84C]"
                    : "border-border hover:border-white/30"
                }`}
            >
              <Image
                src={img.url}
                alt={img.alt_text ?? `${name} ${i + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
