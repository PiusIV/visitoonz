"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid3X3, Heart, User } from "lucide-react";

const links = [
  { href: "/", label: "Home", Icon: Home },
  { href: "/shop", label: "Shop", Icon: Grid3X3 },
  { href: "/about", label: "About Us", Icon: Heart },
  { href: "/login", label: "Account", Icon: User },
];

export default function BottomNav() {
  const path = usePathname();

  return (
    <nav className="fixed bottom-4 left-0 right-0 z-50 flex justify-center md:hidden">
      <div className="flex items-center gap-1 rounded-full border border-white/10 bg-[#0A0A0A]/80 px-3 py-2 backdrop-blur-md shadow-lg">
        {links.map(({ href, label, Icon }) => {
          const active = path === href;

          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`
                flex flex-col items-center justify-center gap-1 rounded-full px-3 py-1.5 text-[10px] transition-all
                ${
                  active
                    ? "bg-[#C9A84C] text-black"
                    : "text-neutral-400 hover:text-white hover:bg-white/10"
                }
              `}
            >
              <Icon className="w-3 h-3" />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
