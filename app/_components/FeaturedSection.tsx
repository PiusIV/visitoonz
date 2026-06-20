// app/page.tsx
import { getFeaturedProducts, getPrimaryImage } from "@/app/_lib/data-service";
import Image from "next/image";
import Link from "next/link";

export default async function FeaturedSection() {
  const products = await getFeaturedProducts();

  return (
    <main className="min-h-screen bg-bg text-text">
      {/* Header */}
      <div className="px-6 md:px-12 py-10 border-b border-border">
        <span className="text-[10px] tracking-[0.22em] uppercase text-[#C9A84C] block mb-4">
          Featured pieces
        </span>
        <h1 className="font-cormorant text-4xl md:text-6xl font-light">
          Selected <em className="italic text-[#C9A84C]">works</em>
        </h1>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => {
          const image = getPrimaryImage(product);
          return (
            <Link
              key={product.id}
              href={`/shop/${product.category.slug}/${product.slug}`}
              className="group border-r border-b border-border flex flex-col"
            >
              {/* Image */}
              <div className="relative aspect-4/5 bg-[#1C1C1C] overflow-hidden">
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
                    <i className="ti ti-camera text-4xl text-text" />
                  </div>
                )}

                {/* Category tag */}
                <span className="absolute top-3 left-3 text-[10px] tracking-[0.08em] uppercase bg-[rgba(201,168,76,0.12)] text-[#C9A84C] border border-[#C9A84C] px-2 py-1">
                  {product.category.name}
                </span>
              </div>

              {/* Info */}
              <div className="p-4 border-t border-border flex flex-col gap-1 flex-1">
                <h3 className="text-sm font-medium text-[#F0EDE6] group-hover:text-[#C9A84C] transition-colors">
                  {product.name}
                </h3>
                {product.category.parent && (
                  <span className="text-[11px] uppercase tracking-wider text-text">
                    {product.category.parent.name}
                  </span>
                )}
                {product.description && (
                  <p className="text-[12px] text-text mt-1 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
