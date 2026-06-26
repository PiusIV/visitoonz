import Image from "next/image";
import Link from "next/link";
import { Product, getPrimaryImage } from "@/app/_lib/data-service";
import { CameraIcon } from "lucide-react";

export default function ProductCard({ product }: { product: Product }) {
  const image = getPrimaryImage(product);

  // Guard — if no category, fall back to /shop
  const href = product.category
    ? `/shop/${product.category.slug}/${product.slug}`
    : `/shop/${product.slug}`;

  return (
    <Link
      href={href}
      className="group border-r border-b border-border flex flex-col"
    >
      {/* Image */}
      <div className="relative aspect-4/5 bg-bg overflow-hidden">
        {image ? (
          <Image
            src={image.url}
            alt={image.alt_text ?? product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <CameraIcon />
          </div>
        )}

        {/* Category tag — only show if category exists */}
        {product.category && (
          <span className="absolute top-3 left-3 text-[10px] tracking-[0.08em] uppercase bg-[rgba(201,168,76,0.12)] text-[#C9A84C] border border-[#C9A84C]/40 px-2 py-1">
            {product.category.name}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4 border-t border-border  flex flex-col gap-1.5 flex-1">
        <h3 className="text-sm font-medium text-text group-hover:text-[#C9A84C] transition-colors leading-snug">
          {product.name}
        </h3>
        {product.category?.parent && (
          <span className="text-[11px] uppercase tracking-wider text-[#7A7672]">
            {product.category.parent.name}
          </span>
        )}
        {product.description && (
          <p className="text-[12px] text-[#7A7672] mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        )}
        <span className="mt-auto pt-2 text-[11px] tracking-widest uppercase text-[#7A7672] group-hover:text-[#C9A84C] transition-colors">
          View →
        </span>
      </div>
    </Link>
  );
}
