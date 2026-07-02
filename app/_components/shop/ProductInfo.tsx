// app/_components/shop/ProductInfo.tsx
import { Product } from "@/app/_lib/data-service";

export default function ProductInfo({ product }: { product: Product }) {
  return (
    <div className="flex flex-col gap-6 font-body">
      {/* Category breadcrumb */}
      <div className="flex items-center gap-2 text-[10px] tracking-[0.18em] uppercase">
        {product.category?.parent && (
          <>
            <span className="text-muted">{product.category.parent.name}</span>
            <span className="text-muted">→</span>
          </>
        )}
        {product.category && (
          <span className="text-gold">{product.category.name}</span>
        )}
      </div>

      {/* Name */}
      <h1 className="font-cormorant text-4xl md:text-5xl font-light text-text leading-tight">
        {product.name}
      </h1>

      {/* Description */}
      {product.description && (
        <p className="text-[13px] text-muted leading-relaxed">
          {product.description}
        </p>
      )}

      {/* Attributes */}
      {product.attributes && Object.keys(product.attributes).length > 0 && (
        <div className="flex flex-col gap-3 border-t border-border pt-6">
          <span className="text-[10px] tracking-[0.18em] uppercase text-gold">
            Details
          </span>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(product.attributes).map(([key, value]) => (
              <div key={key} className="flex flex-col gap-1">
                <span className="text-[10px] tracking-wider uppercase text-muted">
                  {key}
                </span>
                <span className="text-[13px] text-text">{String(value)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
