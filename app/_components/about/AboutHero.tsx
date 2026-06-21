import Marquee from "react-fast-marquee";

export default function AboutHero() {
  return (
    <section className="border-b border-border px-6 md:px-12 h-screen py-20 md:py-32 max-w-4xl">
      {/* Hero strip */}
      <Marquee speed={50} pauseOnHover={true}>
        {" "}
        <span className="text-[10px] tracking-[0.22em] uppercase text-[#C9A84C] block mb-12 underline">
          Ife Chukwu
        </span>
      </Marquee>

      <h1 className="font-cormorant text-5xl md:text-7xl font-light leading-tight mb-18">
        Rooted in light,
        <br />
        <em className="italic text-[#C9A84C]">built by God, for men.</em>
      </h1>

      <p className="text-sm text-[#7A7672] leading-relaxed max-width-md mt-8 text-justify">
        the brand, Visitoonz, which is now known as Visitoonz Art Enterprise, a
        subsidiary of Visitoonz Photography & Visitoonz Interior Decor, was once
        known as Visitoonz Awt, a small scale business which has scaled in less
        than a decade into the brand it is and represents today. it continues to
        grow, and so do we...
      </p>
    </section>
  );
}
