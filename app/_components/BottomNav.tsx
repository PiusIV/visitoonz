"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home", icon: "ti-home" },
  { href: "/shop", label: "Shop", icon: "ti-grid-3x3" },
  { href: "/saved", label: "Saved", icon: "ti-heart" },
  { href: "/account", label: "Account", icon: "ti-user" },
];

export default function BottomNav() {
  const path = usePathname();

  return (
    <nav className="fixed bottom-4 left-0 right-0 z-50 flex justify-center md:hidden">
      <div className="flex items-center gap-1 rounded-full border border-white/10 bg-[#0A0A0A]/80 px-3 py-2 backdrop-blur-md shadow-lg">
        {links.map(({ href, label, icon }) => {
          const active = path === href;

          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`
                flex flex-col items-center justify-center gap-1 rounded-full px-3 py-1.5 text-[10px] transition-all duration-200
                ${
                  active
                    ? "bg-[#C9A84C] text-black"
                    : "text-neutral-400 hover:text-white hover:bg-white/10"
                }
              `}
            >
              <i className={`ti ${icon} text-xl`} />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

// // components/BottomNav.tsx
// "use client";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// const links = [
//   { href: "/", label: "Home", icon: "ti-home" },
//   { href: "/shop", label: "Shop", icon: "ti-grid-3x3" },
//   { href: "/saved", label: "Saved", icon: "ti-heart" },
//   { href: "/account", label: "Account", icon: "ti-user" },
// ];

// export default function BottomNav() {
//   const path = usePathname();
//   return (
//     <nav className="fixed bottom-0 left-0 right-0 flex border-t border-white/10 bg-[#0A0A0A] md:hidden">
//       {links.map(({ href, label, icon }) => (
//         <Link
//           key={href}
//           href={href}
//           className={`flex flex-1 flex-col items-center gap-1 py-2.5 text-[10px]
//           ${path === href ? "text-[#C9A84C]" : "text-neutral-500"}`}
//         >
//           <i className={`ti ${icon} text-xl`} />
//           {label}
//         </Link>
//       ))}
//     </nav>
//   );
// }
