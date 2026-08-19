// app/admin/products/page.tsx
"use client";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  getAllProducts,
  getPrimaryImage,
  Product,
} from "@/app/_lib/data-service";
import { supabase } from "@/app/_lib/supabase";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      await loadProducts();
      if (cancelled) return;
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [loadProducts]);

  async function handleDelete(productId: string, productName: string) {
    const confirmed = confirm(
      `Delete "${productName}"? This cannot be undone.`,
    );
    if (!confirmed) return;

    setDeletingId(productId);
    try {
      await supabase
        .from("product_images")
        .delete()
        .eq("product_id", productId);
      await supabase.from("product_tags").delete().eq("product_id", productId);
      await supabase
        .from("product_variants")
        .delete()
        .eq("product_id", productId);
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", productId);

      if (error) throw error;

      setProducts((prev) => prev.filter((p) => p.id !== productId));
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    } finally {
      setDeletingId(null);
    }
  }

  async function toggleAvailability(productId: string, current: boolean) {
    const { error } = await supabase
      .from("products")
      .update({ is_available: !current })
      .eq("id", productId);

    if (error) {
      alert("Failed to update availability");
      return;
    }

    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, is_available: !current } : p,
      ),
    );
  }

  return (
    <main className="min-h-screen bg-bg px-6 md:px-12 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-cormorant text-4xl font-light text-text">
            Products
          </h1>
          <p className="text-[12px] text-muted mt-1">
            {products.length} {products.length === 1 ? "product" : "products"}
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="bg-gold text-[#0A0A0A] text-[11px] font-medium tracking-widest uppercase px-5 py-2.5 hover:bg-[#E8C97A] transition-colors"
        >
          + Add product
        </Link>
      </div>

      {loading ? (
        <p className="text-[13px] text-muted">Loading...</p>
      ) : products.length === 0 ? (
        <div className="border border-border p-12 text-center">
          <p className="text-[13px] text-muted mb-4">No products yet</p>
          <Link
            href="/admin/products/new"
            className="text-[11px] tracking-widest uppercase text-gold"
          >
            Add your first product →
          </Link>
        </div>
      ) : (
        <div className="border border-border">
          <div className="hidden md:grid grid-cols-[80px_1fr_140px_120px_100px_140px] gap-4 px-4 py-3 border-b border-border bg-bg2 text-[10px] tracking-widest uppercase text-muted">
            <span>Image</span>
            <span>Name</span>
            <span>Category</span>
            <span>Price</span>
            <span>Status</span>
            <span>Actions</span>
          </div>

          {products.map((product) => {
            const image = getPrimaryImage(product);
            return (
              <div
                key={product.id}
                className="grid grid-cols-1 md:grid-cols-[80px_1fr_140px_120px_100px_140px] gap-4 px-4 py-4 border-b border-border last:border-b-0 items-center"
              >
                <div className="relative w-16 h-16 bg-bg2 shrink-0">
                  {image ? (
                    <Image
                      src={image.url}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] text-muted">
                      No image
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-[13px] text-text font-medium">
                    {product.name}
                  </p>
                  <p className="text-[11px] text-muted">/{product.slug}</p>
                </div>

                <span className="text-[12px] text-muted">
                  {product.category?.name ?? "—"}
                </span>

                <span className="text-[13px] text-gold">
                  {product.base_price
                    ? `₦${Number(product.base_price).toLocaleString()}`
                    : "—"}
                </span>

                <button
                  onClick={() =>
                    toggleAvailability(product.id, product.is_available)
                  }
                  className={`text-[10px] tracking-wide uppercase px-2 py-1 border w-fit
                    ${
                      product.is_available
                        ? "text-green-400 border-green-400/40"
                        : "text-muted border-border"
                    }`}
                >
                  {product.is_available ? "Live" : "Hidden"}
                </button>

                <div className="flex items-center gap-3">
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="text-[11px] tracking-widest uppercase text-gold hover:text-[#E8C97A]"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id, product.name)}
                    disabled={deletingId === product.id}
                    className="text-[11px] tracking-widest uppercase text-red-400 hover:text-red-300 disabled:opacity-50"
                  >
                    {deletingId === product.id ? "..." : "Delete"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
