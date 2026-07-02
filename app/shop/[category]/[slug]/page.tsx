import {
  getProductBySlug,
  // getCategoryBySlug,
} from "@/app/_lib/data-service";
import Breadcrumb from "@/app/_components/Breadcrumb";
import ProductImageGallery from "@/app/_components/shop/ProductImageGallery";
import ProductInfo from "@/app/_components/shop/ProductInfo";
import ProductVariants from "@/app/_components/shop/ProductVariants";
import ContactCTA from "@/app/_components/ContactCTA";
// import RelatedProducts from "@/app/_components/shop/RelatedProducts";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug).catch(() => null);
  if (!product) return {};
  return {
    title: `${product.name} — Visitoonz Art Enterprise`,
    description: product.description ?? `View ${product.name}`,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const product = await getProductBySlug(slug).catch(() => null);
  if (!product) notFound();

  // Build breadcrumbs
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    ...(product.category?.parent
      ? [
          {
            label: product.category.parent.name,
            href: `/shop/${product.category.parent.slug}`,
          },
        ]
      : []),
    ...(product.category
      ? [
          {
            label: product.category.name,
            href: `/shop/${product.category.slug}`,
          },
        ]
      : []),
    { label: product.name },
  ];

  return (
    <main className="min-h-screen bg-bg">
      <Breadcrumb crumbs={crumbs} />

      {/* Product detail — two column on desktop */}
      <section className="grid md:grid-cols-2 border-b border-border">
        {/* Left — images */}
        <div className="border-r border-border p-6 md:p-10">
          <ProductImageGallery images={product.images} name={product.name} />
        </div>

        {/* Right — info */}
        <div className="p-6 md:p-10 flex flex-col gap-6">
          <ProductInfo product={product} />
          <ProductVariants variants={product.variants} />

          {/* Divider */}
          <div className="border-t border-border pt-6">
            <ContactCTA
              message={`Interested in "${product.name}"? Get in touch and we'll make it happen.`}
            />
          </div>
        </div>
      </section>

      {/* Related products */}
      {/* <RelatedProducts products={related} currentSlug={slug} /> */}
    </main>
  );
}
