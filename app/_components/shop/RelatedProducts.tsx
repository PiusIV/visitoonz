// app/_components/shop/RelatedProducts.tsx
import { Product } from "@/app/_lib/data-service";
import ProductCard from "@/app/_components/shop/ProductCard";

export default function RelatedProducts({
  products,
  currentSlug,
}: {
  products: Product[];
  currentSlug: string;
}) {
  const related = products.filter((p) => p.slug !== currentSlug).slice(0, 4);

  if (!related.length) return null;

  return (
    <section className="border-t border-border">
      <div className="px-6 md:px-12 py-10 border-b border-border flex items-baseline justify-between">
        <h2 className="font-cormorant text-3xl font-light text-text">
          You may also <em className="italic text-gold">like</em>
        </h2>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {related.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
