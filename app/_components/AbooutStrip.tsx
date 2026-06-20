// app/_components/AboutStrip.tsx
import Link from "next/link";

export default function AboutStrip() {
  return (
    <section className="border-t border-white/10">
      <div className="grid md:grid-cols-2 min-h-[400px]">
        {/* Left — text */}
        <div className="flex flex-col justify-center gap-6 px-8 md:px-16 py-16 border-r border-white/10">
          <span className="text-[10px] tracking-[0.22em] uppercase text-[#C9A84C]">
            The brand
          </span>

          <h2 className="font-cormorant text-4xl md:text-5xl font-light text-[#F0EDE6] leading-tight">
            Rooted in light,
            <br />
            <em className="italic text-[#C9A84C]">built by hand</em>
          </h2>

          <p className="text-[13px] text-[#7A7672] leading-relaxed max-w-sm">
            A creative brand built around photography, interior decoration,
            custom pieces and multimedia production — each work made with
            intention and care.
          </p>

          <Link
            href="/about"
            className="inline-flex items-center gap-2 w-fit text-[11px] tracking-widest uppercase text-[#C9A84C] border border-[#C9A84C]/40 px-5 py-2.5 hover:bg-[#C9A84C] hover:text-[#0A0A0A] transition-all"
          >
            Our story <i className="ti ti-arrow-right" />
          </Link>
        </div>

        {/* Right — stat blocks */}
        <div className="grid grid-cols-2">
          <div className="flex flex-col justify-center gap-2 p-10 border-r border-b border-white/10">
            <span className="font-cormorant text-5xl font-light text-[#C9A84C]">
              3+
            </span>
            <span className="text-[10px] tracking-[0.15em] uppercase text-[#7A7672]">
              Categories
            </span>
          </div>
          <div className="flex flex-col justify-center gap-2 p-10 border-b border-white/10">
            <span className="font-cormorant text-5xl font-light text-[#C9A84C]">
              12+
            </span>
            <span className="text-[10px] tracking-[0.15em] uppercase text-[#7A7672]">
              Pieces available
            </span>
          </div>
          <div className="flex flex-col justify-center gap-2 p-10 border-r border-white/10">
            <span className="font-cormorant text-5xl font-light text-[#C9A84C]">
              100%
            </span>
            <span className="text-[10px] tracking-[0.15em] uppercase text-[#7A7672]">
              Original work
            </span>
          </div>
          <div className="flex flex-col justify-center gap-2 p-10">
            <span className="font-cormorant text-5xl font-light text-[#C9A84C]">
              ∞
            </span>
            <span className="text-[10px] tracking-[0.15em] uppercase text-[#7A7672]">
              Custom orders
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
