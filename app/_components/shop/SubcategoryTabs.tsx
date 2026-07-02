// app/_components/shop/SubcategoryTabs.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Category } from "@/app/_lib/data-service";

export default function SubcategoryTabs({
  subcategories,
  parentSlug,
}: {
  subcategories: Category[];
  parentSlug: string;
}) {
  const path = usePathname();

  if (!subcategories.length) return null;

  return (
    <div className="border-b border-border px-6 md:px-12 overflow-x-auto scrollbar-none">
      <div className="flex items-center gap-1 py-3 min-w-max">
        {/* All tab */}
        <Link
          href={`/shop/${parentSlug}`}
          className={`flex items-center gap-2 px-4 py-2 text-[11px] tracking-widest uppercase transition-all rounded-full border
            ${
              path === `/shop/${parentSlug}`
                ? "bg-[#C9A84C] text-[#0A0A0A] border-[#C9A84C] font-medium"
                : "text-muted border-border hover:text-text hover:border-white/20"
            }`}
        >
          All
        </Link>

        {subcategories.map((sub) => {
          const isActive = path === `/shop/${sub.slug}`;
          return (
            <Link
              key={sub.slug}
              href={`/shop/${sub.slug}`}
              className={`flex items-center gap-2 px-4 py-2 text-[11px] tracking-widest uppercase transition-all rounded-full border
                ${
                  isActive
                    ? "bg-[#C9A84C] text-[#0A0A0A] border-[#C9A84C] font-medium"
                    : "text-muted border-border hover:text-text hover:border-white/20"
                }`}
            >
              {sub.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
