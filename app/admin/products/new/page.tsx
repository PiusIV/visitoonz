"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct, uploadProductImage } from "@/app/_lib/data-service";
import { findCategoryById, slugify } from "@/app/_lib/admin-helpers";
import { useCategoriesAndTags } from "@/app/_lib/hooks/useCategoriesAndTags";
import { useImageUpload } from "@/app/_lib/hooks/useImageUpload";
import ProductFormFields from "@/app/_components/admin/ProductFormFields";
import CategorySelect from "@/app/_components/admin/CategorySelect";
import TagSelector from "@/app/_components/admin/TagSelector";
import ImagePreviewGrid from "@/app/_components/admin/ImagePreviewGrid";

type FormState = {
  name: string;
  slug: string;
  description: string;
  base_price: string;
  category_id: string;
};

export default function NewProductPage() {
  const router = useRouter();
  const { categories, tags, flatCategories } = useCategoriesAndTags();
  const { images, previews, handleSelect, remove } = useImageUpload();

  const [loading, setLoading] = useState<boolean>(false);
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const [form, setForm] = useState<FormState>({
    name: "",
    slug: "",
    description: "",
    base_price: "",
    category_id: "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ): void {
    const name = e.target.name;
    const value = e.target.value;
    setForm((prev) => {
      const updated: FormState = { ...prev, [name]: value };
      if (name === "name") updated.slug = slugify(value);
      return updated;
    });
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

    if (!form.category_id) return alert("Please select a category");
    if (images.length === 0) return alert("Please add at least one image");

    setLoading(true);
    try {
      const category = findCategoryById(categories, form.category_id);
      const categorySlug = category?.slug ?? "misc";

      const uploadedUrls: string[] = [];
      for (const file of images) {
        uploadedUrls.push(await uploadProductImage(file, categorySlug));
      }

      const imageRows = uploadedUrls.map((url, i) => ({
        url,
        is_primary: i === 0,
        sort_order: i,
      }));

      await createProduct({
        name: form.name,
        slug: form.slug,
        description: form.description,
        base_price: parseFloat(form.base_price),
        category_id: form.category_id,
        tagIds: selectedTagIds,
        images: imageRows,
      });

      router.push("/admin/products");
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Check console for details.");
    } finally {
      setLoading(false);
    }
  }

  const selectedCategory = flatCategories.find(
    (c) => c.id === form.category_id,
  );
  const urlPreview = form.slug
    ? `/shop/${selectedCategory ? selectedCategory.label.replace("— ", "").toLowerCase() : "category"}/${form.slug}`
    : undefined;

  return (
    <main className="min-h-screen bg-bg px-6 md:px-12 py-12">
      <h1 className="font-cormorant text-4xl font-light text-text mb-8">
        Add new product
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-2xl">
        <ProductFormFields
          form={form}
          onChange={handleChange}
          urlPreview={urlPreview}
        />
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
            Images
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleSelect}
            className="text-[13px] text-text"
          />
          <ImagePreviewGrid
            previews={previews}
            onRemove={remove}
            showPrimaryBadge
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-gold text-[#0A0A0A] text-[11px] font-medium tracking-widest uppercase px-6 py-3 hover:bg-[#E8C97A] transition-colors disabled:opacity-50 w-fit"
        >
          {loading ? "Saving..." : "Save product"}
        </button>
      </form>
    </main>
  );
}
