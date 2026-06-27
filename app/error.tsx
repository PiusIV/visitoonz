"use client";

import Link from "next/link";

export default function Error() {
  return (
    <div className="h-screen w-full relative z-30 mx-auto">
      <p className="mt-20 text-center">
        Oops, there was an error encountered &darr;
      </p>

      <Link
        className="bg-gold text-text border border-border p-1 w-auto h-auto text-center"
        href="/"
      >
        Home
      </Link>
    </div>
  );
}
