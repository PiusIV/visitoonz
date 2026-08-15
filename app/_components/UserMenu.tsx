// app/_components/UserMenu.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/app/_lib/supabase";
import type { User } from "@supabase/supabase-js";

export default function UserMenu() {
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      },
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    setOpen(false);
    router.push("/");
    router.refresh();
  }

  if (!user) {
    // in the future i might remove this sign in text entirely
    return (
      <button
        onClick={() => router.push("/login")}
        className="text-[11px] tracking-widest uppercase text-muted hover:text-text transition-colors"
      >
        Sign in
      </button>
    );
  }

  const avatarUrl = user.user_metadata?.avatar_url;
  const name = user.user_metadata?.full_name ?? user.email;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-8 h-8 rounded-full overflow-hidden border border-border hover:border-gold transition-colors"
      >
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={name ?? "User"}
            width={38}
            height={38}
            className="cursor-pointer object-cover w-full h-full"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-bg2 text-[11px] text-gold">
            {name?.[0]?.toUpperCase() ?? "U"}
          </div>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-10 w-56 bg-bg border border-border shadow-lg z-50">
          <div className="px-4 py-3 border-b border-border">
            <p className="text-[12px] text-text truncate">{name}</p>
            <p className="text-[10px] text-muted truncate">{user.email}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full text-left px-4 py-3 text-[11px] tracking-widest uppercase text-muted hover:text-text hover:bg-bg2 transition-colors"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
