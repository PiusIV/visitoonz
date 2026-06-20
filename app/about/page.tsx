// app/about/page.tsx
import Link from "next/link";
import {
  Camera,
  Frame,
  Coffee,
  Heart,
  Home,
  Video,
  ArrowRight,
  User,
} from "lucide-react";

export const metadata = {
  title: "About — Visitoonz Art Enterprise",
  description: "The story behind the brand",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-bg text-text">
      {/* Hero strip */}
      <section className="border-b border-border/10 px-6 md:px-12 py-20 md:py-32 max-w-4xl">
        <span className="text-[10px] tracking-[0.22em] uppercase text-[#C9A84C] block mb-6">
          The brand
        </span>

        <h1 className="font-cormorant text-5xl md:text-7xl font-light leading-tight mb-8">
          Rooted in light,
          <br />
          <em className="italic text-[#C9A84C]">built by hand</em>
        </h1>

        <p className="text-sm text-[#7A7672] leading-relaxed max-width-md">
          A short paragraph here about your brother — who he is, where he&apos;s
          based, what drives him creatively. Keep it personal and specific, not
          generic.
        </p>
      </section>

      {/* Brand photo + story */}
      <section className="grid md:grid-cols-2 border-b border-border">
        <div className="relative aspect-4/5 bg-bg border-r border-border border-t">
          <div className="absolute inset-0 flex items-center justify-center">
            <User className="w-16 h-16 text-text" />
          </div>
        </div>

        <div className="p-10 md:p-16 flex flex-col justify-center gap-8 border-t border-border">
          <div>
            <span className="text-[10px] tracking-[0.18em] uppercase text-text block mb-3">
              The story
            </span>
            <p className="text-sm text-[#7A7672] leading-relaxed">
              Write about how the brand started, the inspiration behind it, and
              what makes the work distinctive. 2–3 sentences is enough.
            </p>
          </div>

          <div>
            <span className="text-[10px] tracking-[0.18em] uppercase text-text block mb-3">
              The work
            </span>
            <p className="text-sm text-[#7A7672] leading-relaxed">
              Describe the range of what&apos;s offered — photography prints,
              frames, mugs, pillows, interior decoration, multimedia.
            </p>
          </div>

          <div>
            <span className="text-[10px] tracking-[0.18em] uppercase text-text block mb-3">
              Commissions
            </span>
            <p className="text-sm text-[#7A7672] leading-relaxed">
              Open to custom work? Say so here — and link to the contact page.
            </p>
          </div>
        </div>
      </section>

      {/* What we offer */}
      <section className="border-b border-border">
        <div className="px-6 md:px-12 py-10 border-b border-border">
          <h2 className="font-cormorant text-3xl font-light text-text">
            What we offer
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3">
          {[
            { Icon: Camera, label: "Photography" },
            { Icon: Frame, label: "Picture Frames" },
            { Icon: Coffee, label: "Custom Mugs" },
            { Icon: Heart, label: "Throw Pillows" },
            { Icon: Home, label: "Interior Decoration" },
            { Icon: Video, label: "Multimedia Production" },
          ].map(({ Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-4 p-6 border-r border-b border-border last:border-r-0"
            >
              <Icon className="w-5 h-5 text-[#C9A84C]" />
              <span className="text-sm text-text">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 py-16 flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 bg-[#C9A84C] text-[#0A0A0A] text-[11px] font-medium tracking-widest uppercase px-6 py-3"
        >
          Browse the shop <ArrowRight className="w-4 h-4" />
        </Link>

        <Link
          href="/contact"
          className="text-[11px] tracking-widest uppercase text-[#7A7672] hover:text-[#F0EDE6] transition-colors"
        >
          Get in touch →
        </Link>
      </section>
    </main>
  );
}
