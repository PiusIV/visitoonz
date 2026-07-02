"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid3X3, Heart, Mail } from "lucide-react";

const links = [
  { href: "/", label: "Home", Icon: Home },
  { href: "/shop", label: "Shop", Icon: Grid3X3 },
  { href: "/about", label: "About Us", Icon: Heart },
  { href: "/contact", label: "Contact Us", Icon: Mail },
];

export default function TopNav() {
  const path = usePathname();

  return (
    <nav className="hidden md:flex items-center justify-center">
      <div className="flex items-center gap-1 rounded-full border border-border px-3 py-2">
        {links.map(({ href, label, Icon }) => {
          const active = path === href;
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`
                relative flex items-center gap-2 rounded-full px-4 py-1.5 text-sm transition-all duration-200
                ${
                  active
                    ? "bg-[#C9A84C] text-text font-medium"
                    : "text-text hover:text-white hover:bg-border"
                }
              `}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="hidden xl:inline text-[11px] tracking-wide uppercase">
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
