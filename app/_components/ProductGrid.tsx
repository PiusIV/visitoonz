// app/_components/ProductGrid.tsx
import { Product } from "@/app/_lib/data-service";
import ProductCard from "./ProductCard";
import EmptyState from "./EmptyState";

export default function ProductGrid({ products }: { products: Product[] }) {
  if (!products.length) return <EmptyState />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 border-t border-white/10">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
