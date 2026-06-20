// app/about/page.tsx
import Marquee from "react-fast-marquee";
import Link from "next/link";
import {
  Camera,
  Frame,
  Coffee,
  Heart,
  Home,
  Video,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import goldImage from "@/public/gold-logo.jpg";

export const metadata = {
  title: "About — Visitoonz Art Enterprise",
  description: "The story behind the brand",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-bg text-text">
      {/* Hero strip */}
      <section className="border-b border-border/10 px-6 md:px-12 h-screen py-20 md:py-32 max-w-4xl">
        <Marquee speed={50} pauseOnHover={true}>
          {" "}
          <span className="text-[10px] tracking-[0.22em] uppercase text-[#C9A84C] block mb-12 underline">
            Ife Chukwu
          </span>
        </Marquee>

        <h1 className="font-cormorant text-5xl md:text-7xl font-light leading-tight mb-18">
          Rooted in light,
          <br />
          <em className="italic text-[#C9A84C]">built by God</em>
        </h1>

        <p className="text-sm text-[#7A7672] leading-relaxed max-width-md mt-8 text-justify">
          the brand, Visitoonz, which is now known as Visitoonz Art Enterprise,
          a subsidiary of Visitoonz Photography & Visitoonz Interior Decor, was
          once known as Visitoonz Awt, a small scale business which has scaled
          in less than a decade into the brand it is and represents today. it
          continues to grow, and so do we...
        </p>
      </section>

      {/* Brand photo + story */}
      <section className="grid md:grid-cols-2 border-b border-border">
        <div className="relative aspect-4/5 bg-bg border-r border-border border-t">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* <User className="w-16 h-16 text-text" /> */}
            <Image src={goldImage} alt="visi-gold-image" fill />
          </div>
        </div>

        <div className="p-10 md:p-16 flex flex-col justify-center gap-8 border-t border-border">
          <div>
            <span className="text-[10px] tracking-[0.18em] uppercase text-text block mb-3">
              The story
            </span>
            <p className="text-sm text-[#7A7672] leading-relaxed">
              it began in the year of our Lord, 2017, as a divine inspiration,
              and what was needed next was to bridge the gap between idea and
              execution.
            </p>
          </div>

          <div>
            <span className="text-[10px] tracking-[0.18em] uppercase text-text block mb-3">
              The work
            </span>
            <p className="text-sm text-[#7A7672] leading-relaxed">
              — photography prints, frames, mugs, pillows, interior decoration,
              multimedia. --
            </p>
          </div>

          <div>
            <span className="text-[10px] tracking-[0.18em] uppercase text-text block mb-3">
              Commissions
            </span>
            <p className="text-sm text-[#7A7672] leading-relaxed text-justify">
              Open to custom work? <br />
              say no more, you&apos;ve heard our story, now come be part of
              history!
            </p>
            <div className="flex gap-4 justify-center md:justify-start mt-5">
              <p className="align-middle p-3">&rarr;</p>
              <button className="border border-border p-3 w-auto text-text">
                <Link href="/contact">Contact Us</Link>
              </button>
            </div>
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
          className="text-[11px] tracking-widest uppercase text-[#7A7672] hover:text-text transition-colors"
        >
          Get in touch →
        </Link>
      </section>
    </main>
  );
}
