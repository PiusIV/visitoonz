// lib/data-service.js
import { createClient } from "./supabase/client";

const supabase = createClient();

// ─── PRODUCTS ───────────────────────────────────────────

export async function getFeaturedProducts() {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      category:categories(name, slug),
      images:product_images(url, alt_text, is_primary),
      variants:product_variants(label, price_modifier)
    `,
    )
    .eq("is_featured", true)
    .eq("is_available", true)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

// ────────────────────────────────────────────────────────

export async function getAllProducts() {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      category:categories(name, slug),
      images:product_images(url, alt_text, is_primary),
      variants:product_variants(label, price_modifier)
    `,
    )
    .eq("is_available", true)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

// ────────────────────────────────────────────────────────

export async function getProductsByCategory(categorySlug) {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      category:categories(name, slug),
      images:product_images(url, alt_text, is_primary),
      variants:product_variants(label, price_modifier)
    `,
    )
    .eq("category.slug", categorySlug)
    .eq("is_available", true)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

// ────────────────────────────────────────────────────────

export async function getProductBySlug(slug) {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      category:categories(name, slug),
      images:product_images(url, alt_text, is_primary, sort_order),
      variants:product_variants(id, label, price_modifier, stock_note),
      tags:product_tags(tag:tags(name, slug))
    `,
    )
    .eq("slug", slug)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

// ────────────────────────────────────────────────────────

export async function getProductsByTag(tagSlug) {
  const { data, error } = await supabase
    .from("product_tags")
    .select(
      `
      product:products(
        *,
        category:categories(name, slug),
        images:product_images(url, alt_text, is_primary)
      ),
      tag:tags(name, slug)
    `,
    )
    .eq("tag.slug", tagSlug);

  if (error) throw new Error(error.message);
  return data.map((row) => row.product);
}

// ─── CATEGORIES ─────────────────────────────────────────

export async function getAllCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true });

  if (error) throw new Error(error.message);
  return data;
}

// ────────────────────────────────────────────────────────

export async function getCategoryBySlug(slug) {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

// ─── TAGS ───────────────────────────────────────────────

export async function getAllTags() {
  const { data, error } = await supabase
    .from("tags")
    .select("*")
    .order("name", { ascending: true });

  if (error) throw new Error(error.message);
  return data;
}
