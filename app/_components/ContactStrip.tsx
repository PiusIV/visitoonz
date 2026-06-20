// app/_components/ContactStrip.tsx
import Link from "next/link";

export default function ContactStrip() {
  return (
    <section className="border-t border-white/10">
      {/* Main CTA */}
      <div className="grid md:grid-cols-2 border-b border-white/10">
        {/* Left — text */}
        <div className="flex flex-col justify-center gap-6 px-8 md:px-16 py-16 border-r border-white/10">
          <span className="text-[10px] tracking-[0.22em] uppercase text-[#C9A84C]">
            Get in touch
          </span>
          <h2 className="font-cormorant text-4xl md:text-5xl font-light text-[#F0EDE6] leading-tight">
            Have something
            <br />
            <em className="italic text-[#C9A84C]">in mind?</em>
          </h2>
          <p className="text-[13px] text-[#7A7672] leading-relaxed max-w-sm">
            Whether it&apos;s a custom piece, a commission, or just a question —
            reach out and we&apos;ll get back to you as soon as possible.
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#C9A84C] text-[#0A0A0A] text-[11px] font-medium tracking-widest uppercase px-6 py-3 hover:bg-[#E8C97A] transition-colors"
            >
              Contact us <i className="ti ti-arrow-right" />
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-[11px] tracking-widest uppercase text-[#7A7672] hover:text-[#F0EDE6] transition-colors"
            >
              Browse shop <i className="ti ti-arrow-right" />
            </Link>
          </div>
        </div>

        {/* Right — quick info blocks */}
        <div className="flex flex-col divide-y divide-white/10">
          <div className="flex items-center gap-5 px-10 py-8">
            <div className="w-10 h-10 flex items-center justify-center border border-white/10 flex-shrink-0">
              <i className="ti ti-clock text-[#C9A84C] text-lg" />
            </div>
            <div>
              <span className="text-[10px] tracking-[0.15em] uppercase text-[#C9A84C] block mb-1">
                Response time
              </span>
              <span className="text-[13px] text-[#F0EDE6]">
                Within 24 hours
              </span>
            </div>
          </div>
          <div className="flex items-center gap-5 px-10 py-8">
            <div className="w-10 h-10 flex items-center justify-center border border-white/10 flex-shrink-0">
              <i className="ti ti-brush text-[#C9A84C] text-lg" />
            </div>
            <div>
              <span className="text-[10px] tracking-[0.15em] uppercase text-[#C9A84C] block mb-1">
                Custom orders
              </span>
              <span className="text-[13px] text-[#F0EDE6]">
                Open for commissions
              </span>
            </div>
          </div>
          <div className="flex items-center gap-5 px-10 py-8">
            <div className="w-10 h-10 flex items-center justify-center border border-white/10 flex-shrink-0">
              <i className="ti ti-map-pin text-[#C9A84C] text-lg" />
            </div>
            <div>
              <span className="text-[10px] tracking-[0.15em] uppercase text-[#C9A84C] block mb-1">
                Location
              </span>
              <span className="text-[13px] text-[#F0EDE6]">Lagos, Nigeria</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
