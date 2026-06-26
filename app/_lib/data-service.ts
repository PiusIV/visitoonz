// lib/data-service.ts
import { supabase } from "@/app/_lib/supabase";
// ─── TYPES ──────────────────────────────────────────────

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  cover_image_url: string | null;
  parent_id: string | null;
  parent?: { id: string; name: string; slug: string } | null;
  subcategories?: Category[];
};

export type ProductImage = {
  url: string;
  alt_text: string | null;
  is_primary: boolean;
  sort_order: number;
};

export type ProductVariant = {
  id: string;
  label: string;
  stock_note: string | null;
};

export type Tag = {
  name: string;
  slug: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  is_available: boolean;
  is_featured: boolean;
  attributes: Record<string, unknown>;
  created_at: string;
  category: {
    id: string;
    name: string;
    slug: string;
    parent: { id: string; name: string; slug: string } | null;
  };
  images: ProductImage[];
  variants: ProductVariant[];
  tags: { tag: Tag }[];
};

export type Subcat = { id: string; subcategories?: { id: string }[] };

export type ProductTagRow = {
  product: Product;
  tag: { name: string; slug: string };
};

// ─── SHARED SELECT ───────────────────────────────────────

const PRODUCT_SELECT = `
  *,
  category:categories(
    id, name, slug,
    parent:categories(id, name, slug)
  ),
  images:product_images(url, alt_text, is_primary, sort_order),
  variants:product_variants(id, label, stock_note),
  tags:product_tags(tag:tags(name, slug))
`;

// ─── HELPERS ────────────────────────────────────────────

// Extracts the primary image from a product, falls back to first image
export function getPrimaryImage(product: Product): ProductImage | null {
  return product.images.find((i) => i.is_primary) ?? product.images[0] ?? null;
}

// Sorts images by sort_order
export function getSortedImages(product: Product): ProductImage[] {
  return [...product.images].sort((a, b) => a.sort_order - b.sort_order);
}

// ─── CATEGORIES ─────────────────────────────────────────

// All top-level categories with nested subcategories
// Returns: Interior Decoration, Customisation & Branding, Multimedia
export async function getAllCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select(
      `
      *,
      subcategories:categories(
        id, name, slug, description,
        subcategories:categories(id, name, slug)
      )
    `,
    )
    .is("parent_id", null)
    .order("name", { ascending: true });

  if (error) throw new Error(error.message);
  return data as Category[];
}

// ────────────────────────────────────────────────────────

export async function getCategoryBySlug(slug: string): Promise<Category> {
  const { data, error } = await supabase
    .from("categories")
    .select(
      `
      *,
      parent:categories!parent_id(id, name, slug),
      subcategories:categories(id, name, slug)
    `,
    )
    .eq("slug", slug)
    .single();

  if (error) throw new Error(error.message);
  return data as Category;
}

// ─── PRODUCTS ───────────────────────────────────────────

export async function getFeaturedProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("is_featured", true)
    .eq("is_available", true)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data as Product[];
}

// ────────────────────────────────────────────────────────

export async function getAllProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("is_available", true)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data as Product[];
}

// ────────────────────────────────────────────────────────

export async function getProductBySlug(slug: string): Promise<Product> {
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("slug", slug)
    .single();

  if (error) throw new Error(error.message);
  return data as Product;
}

// ────────────────────────────────────────────────────────

// Fetches products for a category AND all its children
// e.g. getProductsByCategory('customisation-branding')
//      → returns mugs + pillows automatically
export async function getProductsByCategory(
  categorySlug: string,
): Promise<Product[]> {
  // Step 1 — get category id + all subcategory ids
  const { data: cat, error: catError } = await supabase
    .from("categories")
    .select(
      `
      id,
      subcategories:categories(
        id,
        subcategories:categories(id)
      )
    `,
    )
    .eq("slug", categorySlug)
    .single();

  if (catError) throw new Error(catError.message);

  // Flatten all ids — parent + children + grandchildren
  const childIds =
    cat.subcategories?.flatMap((s: Subcat) => [
      s.id,
      ...(s.subcategories?.map((g) => g.id) ?? []),
    ]) ?? [];

  const categoryIds = [cat.id, ...childIds];

  // Step 2 — fetch all products in those categories
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .in("category_id", categoryIds)
    .eq("is_available", true)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data as Product[];
}

// ─── CATEGORY CONVENIENCE FUNCTIONS ─────────────────────

// Interior Decoration → frames + crafts
export async function getInteriorProducts(): Promise<Product[]> {
  return getProductsByCategory("interior-decoration");
}

// Customisation & Branding → mugs + pillows
export async function getCustomisationProducts(): Promise<Product[]> {
  return getProductsByCategory("customisation-branding");
}

// Mugs only
export async function getMugsProducts(): Promise<Product[]> {
  return getProductsByCategory("mugs");
}

// Pillows only
export async function getPillowsProducts(): Promise<Product[]> {
  return getProductsByCategory("pillows");
}

// Multimedia → photography + anything added later
export async function getMultimediaProducts(): Promise<Product[]> {
  return getProductsByCategory("multimedia");
}

// Photography only
export async function getPhotographyProducts(): Promise<Product[]> {
  return getProductsByCategory("photography");
}

// Frames only
export async function getFramesProducts(): Promise<Product[]> {
  return getProductsByCategory("frames");
}

// Crafts only
export async function getCraftsProducts(): Promise<Product[]> {
  return getProductsByCategory("crafts");
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

// ────────────────────────────────────────────────────────
export async function getProductsByTag(tagSlug: string): Promise<Product[]> {
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
  return (data as unknown as ProductTagRow[]).map((row) => row.product);
}
