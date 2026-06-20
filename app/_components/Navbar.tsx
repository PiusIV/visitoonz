"use client";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import TopNav from "./TopNav";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 w-full flex justify-between items-center px-6 py-4 transition-all duration-300
      ${scrolled ? "bg-bg backdrop-blur-sm border-b border-border" : "bg-transparent"}`}
    >
      <Logo />
      <TopNav />
      <ThemeToggle />
    </div>
  );
}
