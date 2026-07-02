"use client";

import { motion } from "framer-motion";
import ContactForm from "@/app/_components/contact/ContactForm";
import ContactInfo from "../_components/contact/ContactInfo";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-bg text-text">
      <ContactInfo>
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
          className="p-8 md:p-16"
        >
          <ContactForm />
        </motion.div>
      </ContactInfo>
    </main>
  );
}
