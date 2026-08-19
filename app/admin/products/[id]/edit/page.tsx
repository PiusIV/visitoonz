"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  getAllCategories,
  getAllTags,
  uploadProductImage,
  Category,
} from "@/app/_lib/data-service";
import { supabase } from "@/app/_lib/supabase";
import {
  flattenCategories,
  findCategoryById,
  FlatCategory,
} from "@/app/_lib/admin-helpers";
import ProductFormFields from "@/app/_components/admin/ProductFormFields";
import CategorySelect from "@/app/_components/admin/CategorySelect";
import TagSelector from "@/app/_components/admin/TagSelector";
import ImagePreviewGrid from "@/app/_components/admin/ImagePreviewGrid";
import ExistingImageGrid from "@/app/_components/admin/ExistingImageGrid";

type Tag = { id: string; name: string; slug: string };
type ExistingImage = { id: string; url: string; is_primary: boolean };

type FormState = {
  name: string;
  slug: string;
  description: string;
  base_price: string;
  category_id: string;
};

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const productId = params.id;

  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [flatCategories, setFlatCategories] = useState<FlatCategory[]>([]);
  const [existingImages, setExistingImages] = useState<ExistingImage[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);

  const [form, setForm] = useState<FormState>({
    name: "",
    slug: "",
    description: "",
    base_price: "",
    category_id: "",
  });

  const loadData = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      const cats = await getAllCategories();
      const tagList = await getAllTags();
      setCategories(cats);
      setTags(tagList as Tag[]);
      setFlatCategories(flattenCategories(cats));

      const result = await supabase
        .from("products")
        .select(
          "*, images:product_images(id, url, is_primary), tags:product_tags(tag_id)",
        )
        .eq("id", productId)
        .single();

      if (result.error) throw result.error;
      const product = result.data;

      setForm({
        name: product.name,
        slug: product.slug,
        description: product.description ?? "",
        base_price: product.base_price ? product.base_price.toString() : "",
        category_id: product.category_id ?? "",
      });

      setExistingImages(product.images ?? []);
      const tagRows = (product.tags as { tag_id: string }[]) ?? [];
      setSelectedTagIds(tagRows.map((t) => t.tag_id));
    } catch (err) {
      console.error(err);
      alert("Failed to load product");
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    let cancelled = false;
    async function run(): Promise<void> {
      await loadData();
      if (cancelled) return;
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [loadData]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ): void {
    const name = e.target.name;
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleNewImageSelect(e: React.ChangeEvent<HTMLInputElement>): void {
    const files = Array.from(e.target.files || []);
    setNewImages((prev) => [...prev, ...files]);
    setNewPreviews((prev) => [
      ...prev,
      ...files.map((f) => URL.createObjectURL(f)),
    ]);
  }

  function removeNewImage(index: number): void {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
    setNewPreviews((prev) => prev.filter((_, i) => i !== index));
  }

  async function removeExistingImage(imageId: string): Promise<void> {
    const confirmed = confirm("Remove this image?");
    if (!confirmed) return;

    const result = await supabase
      .from("product_images")
      .delete()
      .eq("id", imageId);
    if (result.error) {
      alert("Failed to remove image");
      return;
    }
    setExistingImages((prev) => prev.filter((img) => img.id !== imageId));
  }

  async function setPrimaryImage(imageId: string): Promise<void> {
    await supabase
      .from("product_images")
      .update({ is_primary: false })
      .eq("product_id", productId);

    const result = await supabase
      .from("product_images")
      .update({ is_primary: true })
      .eq("id", imageId);

    if (result.error) {
      alert("Failed to set primary image");
      return;
    }

    setExistingImages((prev) =>
      prev.map((img) => ({ ...img, is_primary: img.id === imageId })),
    );
  }

  function toggleTag(tagId: string): void {
    setSelectedTagIds((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId],
    );
  }

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    setSaving(true);

    try {
      const updateResult = await supabase
        .from("products")
        .update({
          name: form.name,
          slug: form.slug,
          description: form.description,
          base_price: parseFloat(form.base_price),
          category_id: form.category_id,
        })
        .eq("id", productId);

      if (updateResult.error) throw updateResult.error;

      if (newImages.length > 0) {
        const category = findCategoryById(categories, form.category_id);
        const categorySlug = category?.slug ?? "misc";
        const hasExistingPrimary = existingImages.some((i) => i.is_primary);

        for (let i = 0; i < newImages.length; i++) {
          const url = await uploadProductImage(newImages[i], categorySlug);
          await supabase.from("product_images").insert({
            product_id: productId,
            url,
            is_primary: !hasExistingPrimary && i === 0,
            sort_order: existingImages.length + i,
          });
        }
      }

      await supabase.from("product_tags").delete().eq("product_id", productId);
      if (selectedTagIds.length > 0) {
        const tagRows = selectedTagIds.map((tagId) => ({
          product_id: productId,
          tag_id: tagId,
        }));
        await supabase.from("product_tags").insert(tagRows);
      }

      router.push("/admin/products");
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Check console for details.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-bg px-6 md:px-12 py-12">
        <p className="text-[13px] text-muted">Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-bg px-6 md:px-12 py-12">
      <h1 className="font-cormorant text-4xl font-light text-text mb-8">
        Edit product
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-2xl">
        <ProductFormFields form={form} onChange={handleChange} showSlug />

        <CategorySelect
          value={form.category_id}
          options={flatCategories}
          onChange={handleChange}
        />

        <TagSelector
          tags={tags}
          selectedIds={selectedTagIds}
          onToggle={toggleTag}
        />

        <div className="flex flex-col gap-2">
          <label className="text-[10px] tracking-widest uppercase text-gold">
            Current images
          </label>
          <ExistingImageGrid
            images={existingImages}
            onSetPrimary={setPrimaryImage}
            onRemove={removeExistingImage}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[10px] tracking-widest uppercase text-gold">
            Add more images
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleNewImageSelect}
            className="text-[13px] text-text"
          />
          <ImagePreviewGrid previews={newPreviews} onRemove={removeNewImage} />
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-gold text-[#0A0A0A] text-[11px] font-medium tracking-widest uppercase px-6 py-3 hover:bg-[#E8C97A] transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save changes"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/products")}
            className="text-[11px] tracking-widest uppercase text-muted hover:text-text"
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
}
