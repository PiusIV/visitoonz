import { supabase } from "@/app/_lib/supabase";

// ─── TYPES

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
  base_price: number | null; // ← add this
  attributes: Record<string, unknown>;
  created_at: string;
  category: {
    id: string;
    name: string;
    slug: string;
    parent_id: string | null;
    parent: { id: string; name: string; slug: string } | null;
  };
  images: ProductImage[];
  variants: ProductVariant[];
  tags: { tag: Tag }[];
};

// Shape of a product row as it comes back from Supabase, before the
// `parent` field on `category` has been resolved by enrichWithParent.
type RawProduct = Omit<Product, "category"> & {
  category: Omit<Product["category"], "parent"> | null;
};

// Minimal category row used when walking the category tree.
type CategoryIdNode = {
  id: string;
  subcategories?: { id: string; subcategories?: { id: string }[] }[];
};

// ─── SHARED SELECT ───────────────────────────────────────

const PRODUCT_SELECT = `
  *,
  category:categories(id, name, slug, parent_id),
  images:product_images(url, alt_text, is_primary, sort_order),
  variants:product_variants(id, label, stock_note),
  tags:product_tags(tag:tags(name, slug))
`;

// ─── HELPERS

export function getPrimaryImage(product: Product): ProductImage | null {
  return product.images.find((i) => i.is_primary) ?? product.images[0] ?? null;
}

export function getSortedImages(product: Product): ProductImage[] {
  return [...product.images].sort((a, b) => a.sort_order - b.sort_order);
}

// Resolves parent category from flat categories list
async function enrichWithParent(products: RawProduct[]): Promise<Product[]> {
  const { data: allCats } = await supabase
    .from("categories")
    .select("id, name, slug, parent_id");

  if (!allCats) return products as Product[];

  return products.map((product) => {
    if (!product.category) return product as Product;

    const parent =
      allCats.find((c) => c.id === product.category!.parent_id) ?? null;

    return {
      ...product,
      category: {
        ...product.category,
        parent: parent
          ? { id: parent.id, name: parent.name, slug: parent.slug }
          : null,
      },
    } as Product;
  });
}

// ─── CATEGORIES ─────────────────────────────────────────

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

export async function getCategoryBySlug(slug: string): Promise<Category> {
  const { data, error } = await supabase
    .from("categories")
    .select(
      `
      *,
      subcategories:categories(id, name, slug, description)
    `,
    )
    .eq("slug", slug)
    .single();

  if (error) throw new Error(error.message);

  // Manually resolve parent
  if (data.parent_id) {
    const { data: parent } = await supabase
      .from("categories")
      .select("id, name, slug")
      .eq("id", data.parent_id)
      .single();

    return { ...data, parent } as Category;
  }

  return { ...data, parent: null } as Category;
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
  return enrichWithParent(data as RawProduct[]);
}

export async function getAllProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("is_available", true)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return enrichWithParent(data as RawProduct[]);
}

export async function getProductBySlug(slug: string): Promise<Product> {
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("slug", slug)
    .single();

  if (error) throw new Error(error.message);
  const [enriched] = await enrichWithParent([data as RawProduct]);
  return enriched;
}

export async function getProductsByCategory(
  categorySlug: string,
): Promise<Product[]> {
  const { data: cat, error: catError } = await supabase
    .from("categories")
    .select(`id, subcategories:categories(id, subcategories:categories(id))`)
    .eq("slug", categorySlug)
    .maybeSingle();

  if (catError) throw new Error(catError.message);

  const category = cat as CategoryIdNode;

  const childIds =
    category.subcategories?.flatMap((s) => [
      s.id,
      ...(s.subcategories?.map((g) => g.id) ?? []),
    ]) ?? [];

  const categoryIds = [category.id, ...childIds];

  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .in("category_id", categoryIds)
    .eq("is_available", true)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return enrichWithParent(data as RawProduct[]);
}

// ─── CATEGORY CONVENIENCE FUNCTIONS ─────────────────────

export async function getInteriorProducts(): Promise<Product[]> {
  return getProductsByCategory("interior-decoration");
}

export async function getCustomisationProducts(): Promise<Product[]> {
  return getProductsByCategory("customisation-branding");
}

export async function getMugsProducts(): Promise<Product[]> {
  return getProductsByCategory("mugs");
}

export async function getPillowsProducts(): Promise<Product[]> {
  return getProductsByCategory("pillows");
}

export async function getMultimediaProducts(): Promise<Product[]> {
  return getProductsByCategory("multimedia");
}

export async function getPhotographyProducts(): Promise<Product[]> {
  return getProductsByCategory("photography");
}

export async function getFramesProducts(): Promise<Product[]> {
  return getProductsByCategory("frames");
}

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

export async function getProductsByTag(tagSlug: string): Promise<Product[]> {
  type ProductTagRow = {
    product: RawProduct;
    tag: { name: string; slug: string };
  };

  const { data, error } = await supabase
    .from("product_tags")
    .select(
      `
      product:products(
        *,
        category:categories(id, name, slug, parent_id),
        images:product_images(url, alt_text, is_primary)
      ),
      tag:tags(name, slug)
    `,
    )
    .eq("tag.slug", tagSlug);

  if (error) throw new Error(error.message);
  const products = (data as unknown as ProductTagRow[]).map(
    (row) => row.product,
  );
  return enrichWithParent(products);
}

// app/_lib/data-service.ts

export async function createProduct(input: {
  name: string;
  slug: string;
  description: string;
  base_price: number;
  category_id: string;
  tagIds: string[];
  images: { url: string; is_primary: boolean; sort_order: number }[];
}) {
  // 1 — Insert product
  const { data: product, error: productError } = await supabase
    .from("products")
    .insert({
      name: input.name,
      slug: input.slug,
      description: input.description,
      base_price: input.base_price,
      category_id: input.category_id,
      is_available: true,
    })
    .select()
    .single();

  if (productError) throw new Error(productError.message);

  // 2 — Insert images
  if (input.images.length > 0) {
    const imageRows = input.images.map((img) => ({
      product_id: product.id,
      url: img.url,
      is_primary: img.is_primary,
      sort_order: img.sort_order,
    }));

    const { error: imagesError } = await supabase
      .from("product_images")
      .insert(imageRows);

    if (imagesError) throw new Error(imagesError.message);
  }

  // 3 — Insert tags
  if (input.tagIds.length > 0) {
    const tagRows = input.tagIds.map((tagId) => ({
      product_id: product.id,
      tag_id: tagId,
    }));

    const { error: tagsError } = await supabase
      .from("product_tags")
      .insert(tagRows);

    if (tagsError) throw new Error(tagsError.message);
  }

  return product;
}

export async function uploadProductImage(file: File, categorySlug: string) {
  const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-").toLowerCase()}`;
  const path = `${categorySlug}/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("product-images")
    .upload(path, file);

  if (uploadError) throw new Error(uploadError.message);

  const { data } = supabase.storage.from("product-images").getPublicUrl(path);
  return data.publicUrl;
}
