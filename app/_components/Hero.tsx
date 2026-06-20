import Image from "next/image";
import heroPhoto from "@/public/hero-image.png";
import HeroButton from "./HeroButton";
import Link from "next/link";
import Marquee from "react-fast-marquee";

export default function Hero() {
  const curYear = new Date().getFullYear();
  return (
    <section className="relative w-full h-screen min-h-150 flex flex-col overflow-hidden border-t border-gray-700">
      {/* Background image */}
      <Image
        src={heroPhoto}
        alt=""
        fill
        priority
        className="object-cover object-center z-0"
        sizes="100vw"
      />

      {/* Overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to right, rgba(8,7,6,0.78) 0%, rgba(8,7,6,0.38) 55%, transparent 100%), linear-gradient(to top, rgba(8,7,6,0.72) 0%, transparent 45%)",
        }}
      />

      {/* Content */}
      <nav className="relative z-20 px-12 py-6 font-serif text-lg md:text-5xl text-white mt-25 text-center">
        VISITOONZ ART ENTERPRISE - {curYear}
      </nav>

      <div className="relative z-20 flex-1 flex flex-col justify-left align-middle px-12 pb-16 text-white gap-25 md:gap-30">
        <h1 className="font-heading text-3xl md:text-5xl ">
          Perfection at its <br />
          <span className="italic font-bold text-gold">Peak</span>
        </h1>
        <p className="font-body font-bold text-justify">
          {" "}
          Fine photography prints, custom frames, mugs and throw pillows — each
          piece rooted in a moment worth keeping.
        </p>
        <div className="z-20 flex flex-row gap-2 md:gap-4">
          <Marquee speed={80} pauseOnHover={true} className="gap-4">
            {" "}
            <HeroButton>
              <Link href="/shop">Explore the shop &rarr;</Link>
            </HeroButton>
            <HeroButton>View Featured Collections &darr;</HeroButton>
          </Marquee>
        </div>
      </div>
    </section>
  );
}
