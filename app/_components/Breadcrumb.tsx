// app/_components/Breadcrumb.tsx
import Link from "next/link";

type Crumb = { label: string; href?: string };

export default function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav className="flex items-center gap-2 px-6 md:px-12 py-4 border-b border-border mt-20">
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-2">
          {crumb.href ? (
            <Link
              href={crumb.href}
              className="text-[11px] tracking-wider uppercase text-[#7A7672] hover:text-[#F0EDE6] transition-colors"
            >
              {crumb.label}
            </Link>
          ) : (
            <span className="text-[11px] tracking-wider uppercase text-[#C9A84C]">
              {crumb.label}
            </span>
          )}
          {i < crumbs.length - 1 && (
            <span className="text-[#7A7672] text-[10px]">→</span>
          )}
        </span>
      ))}
    </nav>
  );
}
