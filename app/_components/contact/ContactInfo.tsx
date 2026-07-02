"use client";

import { motion } from "framer-motion";
import { Clock, Brush, MapPin } from "lucide-react";
import { FaInstagram, FaWhatsapp, FaFacebook } from "react-icons/fa6";
import Link from "next/link";

const info = [
  {
    Icon: Clock,
    label: "Response time",
    value: "Within 24 hours",
    sub: "We reply to every message",
    href: null,
  },
  {
    Icon: Brush,
    label: "Custom orders",
    value: "Open for commissions",
    sub: "Photography, frames, mugs, pillows, interior decor",
    href: null,
  },
  {
    Icon: MapPin,
    label: "Location",
    value: "Owerri, Nigeria",
    sub: "Available for local and remote projects",
    href: "https://maps.app.goo.gl/sCUuHL4Ams16eqAG8",
  },
  {
    Icon: FaInstagram,
    label: "Instagram",
    value: "@itz_visibility",
    sub: "Follow for latest works",
    href: "https://instagram.com/visitoonz",
  },
  {
    Icon: FaWhatsapp,
    label: "WhatsApp",
    value: "+234-813-131-8140",
    sub: "Chat with us directly",
    href: "https://wa.me/2348131318140",
  },
  {
    Icon: FaFacebook,
    label: "Facebook",
    value: "@Visitoonz",
    sub: "Chat with us directly",
    href: "https://facebook.com/Visitoonz",
  },
];

export default function ContactInfo({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <>
      <div className="border-b border-border px-6 md:px-12 py-16 md:py-24">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-[10px] tracking-[0.22em] uppercase text-gold block mb-4"
        >
          Get in touch
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="font-cormorant text-5xl md:text-7xl font-light leading-tight"
        >
          Let&apos;s make
          <br />
          <em className="italic text-gold">something great.</em>
        </motion.h1>
      </div>

      {/* Content */}
      <div className="grid md:grid-cols-2 border-b border-border">
        {/* Left — info */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="border-r border-border p-8 md:p-16 flex flex-col gap-10"
        >
          {info.map(({ Icon, label, value, sub, href }, i) => {
            const content = (
              <div className="flex gap-5">
                <div className="w-10 h-10 flex items-center justify-center border border-border shrink-0 mt-1 text-gold">
                  <Icon />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] tracking-[0.15em] uppercase text-gold">
                    {label}
                  </span>
                  <span className="text-[14px] text-text font-medium">
                    {value}
                  </span>
                  <span className="text-[12px] text-muted leading-relaxed">
                    {sub}
                  </span>
                </div>
              </div>
            );

            return (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: 0.3 + i * 0.1,
                }}
              >
                {href ? (
                  <Link
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-70 transition-opacity"
                  >
                    {content}
                  </Link>
                ) : (
                  content
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Right — form (passed in as children) */}
        {children}
      </div>
    </>
  );
}
