"use client";
import { Category } from "@/app/_lib/data-service";

type FilterTab = {
  id: string;
  name: string;
  slug: string;
  subcategories?: Category[];
};

interface Props {
  categories: Category[];
  active: string;
  onChange: (slug: string) => void;
}

export default function CategoryFilterBar({
  categories,
  active,
  onChange,
}: Props) {
  const all: FilterTab = { id: "all", name: "All", slug: "all" };
  const tabs: FilterTab[] = [all, ...categories];

  return (
    <div className="border-b border-border px-6 md:px-12 overflow-x-auto scrollbar-none">
      <div className="flex items-center gap-1 py-3 min-w-max">
        {tabs.map((cat) => {
          const isActive = active === cat.slug;
          const subCount = cat.subcategories?.length ?? 0;

          return (
            <button
              key={cat.slug}
              onClick={() => onChange(cat.slug)}
              className={`flex items-center gap-2 px-4 py-2 text-[11px] tracking-widest uppercase transition-all rounded-full border
                ${
                  isActive
                    ? "bg-[#C9A84C] text-[#0A0A0A] border-[#C9A84C] font-medium"
                    : "text-muted border-border hover:text-text hover:border-white/20"
                }`}
            >
              {cat.name}
              {subCount > 0 && (
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded-full ${
                    isActive ? "bg-bg" : "bg-border"
                  }`}
                >
                  {subCount}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
