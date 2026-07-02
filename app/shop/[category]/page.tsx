import {
  getCategoryBySlug,
  getProductsByCategory,
} from "@/app/_lib/data-service";
import Breadcrumb from "@/app/_components/Breadcrumb";
import CategoryHero from "@/app/_components/shop/CategoryHero";
import SubcategoryTabs from "@/app/_components/shop/SubcategoryTabs";
import ProductGrid from "@/app/_components/shop/ProductGrid";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  const cat = await getCategoryBySlug(category);
  if (!cat) return {};
  return {
    title: `${cat.name} — Visitoonz Art Enterprise`,
    description: cat.description ?? `Browse our ${cat.name} collection`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  const [cat, products] = await Promise.all([
    getCategoryBySlug(category),
    getProductsByCategory(category),
  ]);

  if (!cat) notFound();

  // Build breadcrumbs
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    ...(cat.parent
      ? [{ label: cat.parent.name, href: `/shop/${cat.parent.slug}` }]
      : []),
    { label: cat.name },
  ];

  return (
    <main className="min-h-screen bg-bg">
      <Breadcrumb crumbs={crumbs} />
      <CategoryHero category={cat} />

      {/* Show subcategory tabs if this category has children */}
      {cat.subcategories && cat.subcategories.length > 0 && (
        <SubcategoryTabs
          subcategories={cat.subcategories}
          parentSlug={cat.slug}
        />
      )}

      <ProductGrid products={products} />
    </main>
  );
}
