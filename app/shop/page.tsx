import { getAllProducts, getAllCategories } from "@/app/_lib/data-service";
import ShopClient from "@/app/_components/shop/ShopClient";
import { Suspense } from "react";
import Spinner from "@/app/_ui/Spinner";

export const metadata = {
  title: "Our Shop — Visitoonz Art Enterprise",
  description: "Interior Decor, Custom Branding, Multimedia Production",
};

interface SearchParamsProps {
  // searchParams: { category?: string };
  // typing searchParams as a promise is standard in next.js, hence the await keyword
  searchParams: Promise<{ category?: string }>;
}

export default async function ShopPage({ searchParams }: SearchParamsProps) {
  const { category } = await searchParams;

  const [products, categories] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
  ]);

  const activeFilter = category ?? "all";

  const filtered =
    activeFilter === "all"
      ? products
      : products.filter((product) => {
          if (!product.category) return false;
          if (product.category.slug === activeFilter) return true;
          if (product.category.parent?.slug === activeFilter) return true;
          return false;
        });

  return (
    <main className="min-h-screen bg-bg mt-5">
      <Suspense fallback={<Spinner />}>
        <ShopClient
          products={filtered}
          categories={categories}
          activeFilter={activeFilter}
        />
      </Suspense>
    </main>
  );
}
