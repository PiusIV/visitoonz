// app/admin/login/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/_lib/supabase";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log("login data:", data);
    console.log("login error:", error);

    setLoading(false);

    if (error) {
      setError("Invalid email or password");
      return;
    }

    router.push("/admin/products");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-bg flex items-center justify-center px-6">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm flex flex-col gap-6"
      >
        <div>
          <span className="text-[10px] tracking-[0.22em] uppercase text-gold block mb-3">
            Admin
          </span>
          <h1 className="font-cormorant text-4xl font-light text-text mb-2">
            Sign in
          </h1>
          <p className="text-[12px] text-muted">
            Manage products, prices and images
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[10px] tracking-widest uppercase text-gold">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-transparent border border-border px-4 py-3 text-[13px] text-text focus:outline-none focus:border-gold transition-colors"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[10px] tracking-widest uppercase text-gold">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-transparent border border-border px-4 py-3 text-[13px] text-text focus:outline-none focus:border-gold transition-colors"
          />
        </div>

        {error && <p className="text-[12px] text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-gold text-[#0A0A0A] text-[11px] font-medium tracking-widest uppercase px-6 py-3 hover:bg-[#E8C97A] transition-colors disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}
