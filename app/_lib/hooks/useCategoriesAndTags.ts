import { useState, useEffect, useCallback } from "react";
import {
  getAllCategories,
  getAllTags,
  Category,
} from "@/app/_lib/data-service";
import { flattenCategories, FlatCategory } from "@/app/_lib/admin-helpers";

type Tag = { id: string; name: string; slug: string };

export function useCategoriesAndTags() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [flatCategories, setFlatCategories] = useState<FlatCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const load = useCallback(async (): Promise<void> => {
    setLoading(true);
    const cats = await getAllCategories();
    const tagList = await getAllTags();
    setCategories(cats);
    setTags(tagList as Tag[]);
    setFlatCategories(flattenCategories(cats));
    setLoading(false);
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function run(): Promise<void> {
      await load();
      if (cancelled) return;
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [load]);

  return { categories, tags, flatCategories, loading };
}
