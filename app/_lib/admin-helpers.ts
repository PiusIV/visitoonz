import type { Category } from "@/app/_lib/data-service";

export type FlatCategory = {
  id: string;
  label: string;
};

export function flattenCategories(cats: Category[]): FlatCategory[] {
  const flat: FlatCategory[] = [];
  cats.forEach((cat) => {
    flat.push({ id: cat.id, label: cat.name });
    if (cat.subcategories) {
      cat.subcategories.forEach((sub) => {
        flat.push({ id: sub.id, label: "— " + sub.name });
      });
    }
  });
  return flat;
}

export function findCategoryById(
  cats: Category[],
  categoryId: string,
): Category | undefined {
  const topLevelMatch = cats.find((c) => c.id === categoryId);
  const subMatch = cats
    .flatMap((c) => c.subcategories ?? [])
    .find((s) => s.id === categoryId);
  return topLevelMatch || subMatch;
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}
