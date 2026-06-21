// app/about/page.tsx
import {
  ArrowRight,
  Camera,
  Coffee,
  Frame,
  Heart,
  Home,
  Video,
} from "lucide-react";
import Link from "next/link";
import AboutBrand from "@/app/_components/about/AboutBrand";
import AboutHero from "../_components/about/AboutHero";

export const metadata = {
  title: "About — Visitoonz Art Enterprise",
  description: "The story behind the brand",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-bg text-text">
      <AboutHero />
      <AboutBrand />

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
          className="text-[11px] tracking-widest uppercase text-[#7A7672] hover:text-text transition-colors"
        >
          Get in touch →
        </Link>
      </section>
    </main>
  );
}
