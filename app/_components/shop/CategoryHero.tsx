"use client";
import { motion } from "framer-motion";
import { Category } from "@/app/_lib/data-service";

export default function CategoryHero({ category }: { category: Category }) {
  return (
    <div className="border-b border-border px-6 md:px-12 py-12">
      {category.parent && (
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-[10px] tracking-[0.22em] uppercase text-gold block mb-3"
        >
          {category.parent.name}
        </motion.span>
      )}

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className="font-cormorant text-4xl md:text-6xl font-light text-text"
      >
        {category.name}
      </motion.h1>

      {category.description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="text-[13px] text-muted leading-relaxed max-w-lg mt-4"
        >
          {category.description}
        </motion.p>
      )}
    </div>
  );
}
