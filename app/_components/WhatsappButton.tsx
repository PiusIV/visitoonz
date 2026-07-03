"use client";

import { useEffect, useRef, useState } from "react";

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(true);
  const lastScroll = useRef(0); // persistent across renders

  // delay appearance (3s)
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;

      if (current > lastScroll.current && current > 100) {
        setShow(false);
      } else {
        setShow(true);
      }

      lastScroll.current = current; // safe mutation
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <a
      href="https://wa.me/2348131318140?text=Hello%20I%20need%20your%20service"
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 transition-all duration-300 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <span className="hidden md:block bg-black text-white text-sm px-3 py-1 rounded-md shadow">
        Chat with us
      </span>

      <div className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg animate-pulse hover:animate-none hover:scale-110 transition">
        <img src="/whatsapp-icon.svg" alt="WhatsApp" className="w-7 h-7" />
      </div>
    </a>
  );
}
