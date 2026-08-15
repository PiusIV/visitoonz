// app/login/page.tsx

export const dynamic = "force-dynamic";
export const revalidate = 0;

import { Suspense } from "react";
import GoogleSignInButton from "@/app/_components/GoogleSignInButton";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-bg flex items-center justify-center px-6">
      <div className="w-full max-w-sm flex flex-col items-center gap-8 text-center">
        <div>
          <span className="text-[10px] tracking-[0.22em] uppercase text-gold block mb-3">
            Welcome
          </span>
          <h1 className="font-cormorant text-4xl font-light text-text mb-2">
            Sign in to shop
          </h1>
          <p className="text-[12px] text-muted">
            Sign in with Google to browse and order our pieces
          </p>
        </div>

        <Suspense fallback={null}>
          <GoogleSignInButton />
        </Suspense>
      </div>
    </main>
  );
}
