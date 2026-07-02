"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Product, getPrimaryImage } from "@/app/_lib/data-service";

export default function FeaturedSection({ products }: { products: Product[] }) {
  return (
    <section className="border-t border-border">
      {/* Header */}
      <div className="px-6 md:px-12 py-10 border-b border-border">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-[10px] tracking-[0.22em] uppercase text-gold block mb-4"
        >
          Featured pieces
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          viewport={{ once: true }}
          className="font-cormorant text-4xl md:text-6xl font-light text-text"
        >
          Selected <em className="italic text-gold">works</em>
        </motion.h2>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product, i) => {
          const image = getPrimaryImage(product);

          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
              viewport={{ once: true }}
            >
              <Link
                href={
                  product.category
                    ? `/shop/${product.category.slug}/${product.slug}`
                    : `/shop/${product.slug}`
                }
                className="group border-r border-b border-border flex flex-col h-full"
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
                      <i className="ti ti-camera text-4xl text-white/10" />
                    </div>
                  )}

                  {product.category && (
                    <span className="absolute top-3 left-3 text-[10px] tracking-[0.08em] uppercase bg-[rgba(201,168,76,0.12)] text-gold border border-gold/40 px-2 py-1">
                      {product.category.name}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="p-4 border-t border-border flex flex-col gap-1.5 flex-1">
                  <h3 className="text-sm font-medium text-text group-hover:text-gold transition-colors leading-snug">
                    {product.name}
                  </h3>
                  {product.category?.parent?.name && (
                    <span className="text-[11px] uppercase tracking-wider text-muted">
                      {product.category.parent.name}
                    </span>
                  )}
                  {product.description && (
                    <p className="text-[12px] text-muted mt-1 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  )}
                  <span className="mt-auto pt-2 text-[11px] tracking-widest uppercase text-muted group-hover:text-gold transition-colors">
                    View →
                  </span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
