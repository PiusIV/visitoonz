import Image from "next/image";
import Link from "next/link";
import goldImage from "@/public/gold-logo.jpg";

export default function AboutBrand() {
  return (
    <section className="grid md:grid-cols-2 border-b border-border">
      {/* Brand photo + story */}
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
            it began in the year of our Lord, 2017, as a divine inspiration, and
            what was needed next was to bridge the gap between idea and
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
  );
}
