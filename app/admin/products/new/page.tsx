"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  getAllCategories,
  getAllTags,
  createProduct,
  uploadProductImage,
  Category,
} from "@/app/_lib/data-service";
import {
  flattenCategories,
  findCategoryById,
  slugify,
  FlatCategory,
} from "@/app/_lib/admin-helpers";
import ProductFormFields from "@/app/_components/admin/ProductFormFields";
import CategorySelect from "@/app/_components/admin/CategorySelect";
import TagSelector from "@/app/_components/admin/TagSelector";
import ImagePreviewGrid from "@/app/_components/admin/ImagePreviewGrid";

type Tag = { id: string; name: string; slug: string };

type FormState = {
  name: string;
  slug: string;
  description: string;
  base_price: string;
  category_id: string;
};

export default function NewProductPage() {
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [flatCategories, setFlatCategories] = useState<FlatCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);

  const [form, setForm] = useState<FormState>({
    name: "",
    slug: "",
    description: "",
    base_price: "",
    category_id: "",
  });

  const loadInitialData = useCallback(async (): Promise<void> => {
    const cats = await getAllCategories();
    const tagList = await getAllTags();
    setCategories(cats);
    setTags(tagList as Tag[]);
    setFlatCategories(flattenCategories(cats));
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function run(): Promise<void> {
      await loadInitialData();
      if (cancelled) return;
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [loadInitialData]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ): void {
    const name = e.target.name;
    const value = e.target.value;
    setForm((prev) => {
      const updated: FormState = { ...prev, [name]: value };
      if (name === "name") {
        updated.slug = slugify(value);
      }
      return updated;
    });
  }

  function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>): void {
    const files = Array.from(e.target.files || []);
    setImages((prev) => [...prev, ...files]);
    setPreviews((prev) => [
      ...prev,
      ...files.map((f) => URL.createObjectURL(f)),
    ]);
  }

  function removeImage(index: number): void {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
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

    if (!form.category_id) {
      alert("Please select a category");
      return;
    }
    if (images.length === 0) {
      alert("Please add at least one image");
      return;
    }

    setLoading(true);

    try {
      const category = findCategoryById(categories, form.category_id);
      const categorySlug = category?.slug ?? "misc";

      const uploadedUrls: string[] = [];
      for (const file of images) {
        const url = await uploadProductImage(file, categorySlug);
        uploadedUrls.push(url);
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
            onChange={handleImageSelect}
            className="text-[13px] text-text"
          />
          <ImagePreviewGrid
            previews={previews}
            onRemove={removeImage}
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
