"use client";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";

export default function AboutHero() {
  return (
    <section className="border-b border-border px-6 md:px-12 min-h-screen py-20 md:py-32 max-w-4xl flex flex-col justify-center">
      {/* Marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-12"
      >
        <Marquee speed={50} pauseOnHover={true}>
          <span className="text-[10px] tracking-[0.22em] uppercase text-gold underline mx-8">
            Ife Chukwu
          </span>
          <span className="text-[10px] tracking-[0.22em] uppercase text-muted mx-8">
            ✦
          </span>
          <span className="text-[10px] tracking-[0.22em] uppercase text-gold underline mx-8">
            Visitoonz Art Enterprise
          </span>
          <span className="text-[10px] tracking-[0.22em] uppercase text-muted mx-8">
            ✦
          </span>
        </Marquee>
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="font-cormorant text-5xl md:text-7xl font-light leading-tight mb-8"
      >
        Rooted in light,
        <br />
        <em className="italic text-gold">built by God, for men.</em>
      </motion.h1>

      {/* Body */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
        className="text-sm text-muted leading-relaxed max-w-xl mt-4 text-justify"
      >
        The brand, Visitoonz, which is now known as Visitoonz Art Enterprise, a
        subsidiary of Visitoonz Photography & Visitoonz Interior Decor, was once
        known as Visitoonz Awt — a small scale business which has scaled in less
        than a decade into the brand it is and represents today. It continues to
        grow, and so do we...
      </motion.p>
    </section>
  );
}
