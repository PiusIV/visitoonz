"use client";
import { useRouter } from "next/navigation";
import { Product, Category } from "@/app/_lib/data-service";
import CategoryFilterBar from "@/app/_components/shop/CategoryFilterBar";
import ProductGrid from "@/app/_components/ProductGrid";
import ShopHeader from "@/app/_components/shop/ShopHeader";
import { XIcon } from "lucide-react";

type Props = {
  products: Product[];
  allProducts: Product[];
  categories: Category[];
  activeFilter: string;
};

export default function ShopClient({
  products,
  categories,
  activeFilter,
}: Props) {
  const router = useRouter();

  function handleFilterChange(slug: string) {
    if (slug === "all") {
      router.push("/shop");
    } else {
      router.push(`/shop?category=${slug}`);
    }
  }

  return (
    <div>
      <ShopHeader count={products.length} />

      <CategoryFilterBar
        categories={categories}
        active={activeFilter}
        onChange={handleFilterChange}
      />

      {activeFilter !== "all" && (
        <div className="px-6 md:px-12 py-4 border-b border-border flex items-center justify-between">
          <span className="text-[11px] tracking-widest uppercase text-muted">
            Showing:{" "}
            <span className="text-gold">
              {categories.find((c) => c.slug === activeFilter)?.name ??
                activeFilter}
            </span>
          </span>
          <button
            onClick={() => handleFilterChange("all")}
            className="text-[11px] tracking-widest uppercase text-muted hover:text-foreground transition-colors flex items-center gap-1"
          >
            Clear <XIcon className="w-3 h-3" />
          </button>
        </div>
      )}

      <ProductGrid products={products} />
    </div>
  );
}
