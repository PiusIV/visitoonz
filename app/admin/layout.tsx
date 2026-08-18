"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/app/_lib/supabase";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  // Don't show the admin chrome on the login page itself
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-bg mt-25">
      <nav className="border-b border-border px-6 md:px-12 h-14 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link
            href="/admin/products"
            className="font-cormorant text-lg font-light tracking-widest uppercase text-text"
          >
            Admin
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/admin/products"
              className="text-[11px] tracking-widest uppercase text-muted hover:text-text transition-colors"
            >
              Products
            </Link>
            <Link
              href="/admin/products/new"
              className="text-[11px] tracking-widest uppercase text-muted hover:text-text transition-colors"
            >
              Add New
            </Link>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="text-[11px] tracking-widest uppercase text-muted hover:text-text transition-colors"
        >
          Sign out
        </button>
      </nav>
      {children}
    </div>
  );
}
