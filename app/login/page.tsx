import { Suspense } from "react";
import GoogleSignInButton from "@/app/_components/login/GoogleSignInButton";
import Spinner from "../_ui/Spinner";

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
            Sign in with Google to browse and place your orders in the shop
          </p>
        </div>

        <Suspense fallback={<Spinner />}>
          <GoogleSignInButton />
        </Suspense>
      </div>
    </main>
  );
}
