"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home", icon: "ti-home" },
  { href: "/shop", label: "Shop", icon: "ti-grid-3x3" },
  { href: "/saved", label: "Saved", icon: "ti-heart" },
  { href: "/account", label: "Account", icon: "ti-user" },
];

export default function TopNav() {
  const path = usePathname();

  return (
    <nav className="hidden lg:flex items-center justify-center sticky top-0 z-30">
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-md">
        {links.map(({ href, label, icon }) => {
          const active = path === href;

          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`
                relative flex items-center gap-2 rounded-full px-3 py-1.5 text-sm transition-all duration-200
                ${
                  active
                    ? "bg-[#C9A84C] text-black"
                    : "text-neutral-400 hover:text-white hover:bg-white/10"
                }
              `}
            >
              <i className={`ti ${icon} text-base`} />
              <span className="hidden xl:inline">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
