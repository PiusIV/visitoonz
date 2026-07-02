// app/_components/shop/ProductVariants.tsx
"use client";
import { useState } from "react";
import { ProductVariant } from "@/app/_lib/data-service";

export default function ProductVariants({
  variants,
}: {
  variants: ProductVariant[];
}) {
  const [selected, setSelected] = useState<string | null>(
    variants[0]?.id ?? null,
  );

  if (!variants.length) return null;

  return (
    <div className="flex flex-col gap-3 border-t border-border pt-6">
      <span className="text-[10px] tracking-[0.18em] uppercase text-gold">
        Options
      </span>
      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => (
          <button
            key={variant.id}
            onClick={() => setSelected(variant.id)}
            className={`px-4 py-2 text-[11px] tracking-widest uppercase border transition-all
              ${
                selected === variant.id
                  ? "bg-[#C9A84C] text-[#0A0A0A] border-[#C9A84C]"
                  : "text-muted border-border hover:text-text hover:border-white/30"
              }`}
          >
            {variant.label}
            {variant.stock_note && (
              <span className="ml-2 text-[9px] opacity-60">
                {variant.stock_note}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
