"use client";
import { motion } from "framer-motion";
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

const offers = [
  { Icon: Camera, label: "Photography" },
  { Icon: Frame, label: "Picture Frames" },
  { Icon: Coffee, label: "Custom Mugs" },
  { Icon: Heart, label: "Throw Pillows" },
  { Icon: Home, label: "Interior Decoration" },
  { Icon: Video, label: "Multimedia Production" },
];

export default function AboutOffer() {
  return (
    <main>
      <section className="border-b border-border">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="px-6 md:px-12 py-10 border-b border-border"
        >
          <h2 className="font-cormorant text-3xl font-light text-text">
            What we <em className="italic text-gold">offer</em>
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3">
          {offers.map(({ Icon, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 p-6 border-r border-b border-border last:border-r-0"
            >
              <Icon className="w-5 h-5 text-gold shrink-0" />
              <span className="text-sm text-text">{label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 py-16 flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-gold text-[#0A0A0A] text-[11px] font-medium tracking-widest uppercase px-6 py-3 hover:bg-[#E8C97A] transition-colors"
          >
            Browse the shop <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          viewport={{ once: true }}
        >
          <Link
            href="/contact"
            className="text-[11px] tracking-widest uppercase text-muted hover:text-text transition-colors"
          >
            Get in touch →
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
