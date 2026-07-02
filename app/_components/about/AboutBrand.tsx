"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import goldImage from "@/public/gold-logo.jpg";

export default function AboutBrand() {
  return (
    <section className="grid md:grid-cols-2 border-b border-border">
      {/* Brand photo */}
      <motion.div
        initial={{ opacity: 0, x: -32 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative aspect-4/5 bg-bg border-r border-border border-t"
      >
        <Image
          src={goldImage}
          alt="visi-gold-image"
          fill
          className="object-cover"
        />
      </motion.div>

      {/* Story content */}
      <motion.div
        initial={{ opacity: 0, x: 32 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="p-10 md:p-16 flex flex-col justify-center gap-8 border-t border-border"
      >
        {/* The story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          viewport={{ once: true }}
        >
          <span className="text-[10px] tracking-[0.18em] uppercase text-gold block mb-3">
            The story
          </span>
          <p className="text-sm text-muted leading-relaxed">
            It began in the year of our Lord, 2017, as a divine inspiration, and
            what was needed next was to bridge the gap between idea and
            execution.
          </p>
        </motion.div>

        {/* The work */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          <span className="text-[10px] tracking-[0.18em] uppercase text-gold block mb-3">
            The work
          </span>
          <p className="text-sm text-muted leading-relaxed">
            Photography prints, frames, mugs, pillows, interior decoration,
            multimedia — each piece made with intention.
          </p>
        </motion.div>

        {/* Commissions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          viewport={{ once: true }}
        >
          <span className="text-[10px] tracking-[0.18em] uppercase text-gold block mb-3">
            Commissions
          </span>
          <p className="text-sm text-muted leading-relaxed text-justify">
            Open to custom work?
            <br />
            Say no more — you&apos;ve heard our story, now come be part of
            history.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-6"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-gold/40 text-[11px] tracking-widest uppercase text-gold px-5 py-3 hover:bg-gold hover:text-[#0A0A0A] transition-all"
            >
              Contact Us <i className="ti ti-arrow-right" />
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
