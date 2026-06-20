// app/_components/EmptyState.tsx
import Link from "next/link";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-32 px-6 text-center border-t border-white/10">
      <i className="ti ti-mood-empty text-5xl text-white/10 mb-6" />
      <h3 className="font-cormorant text-2xl font-light text-[#F0EDE6] mb-2">
        Nothing here yet
      </h3>
      <p className="text-[12px] text-[#7A7672] mb-8 max-w-xs leading-relaxed">
        This collection is being curated. Check back soon or browse other
        categories.
      </p>
      <Link
        href="/shop"
        className="inline-flex items-center gap-2 bg-[#C9A84C] text-[#0A0A0A] text-[11px] font-medium tracking-widest uppercase px-5 py-2.5"
      >
        Browse all <i className="ti ti-arrow-right" />
      </Link>
    </div>
  );
}
