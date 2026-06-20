"use client";

import Link from "next/link";

export default function Page() {
  return (
    <div>
      <p>Page not found, go back home &darr;</p>
      <button className="bg-gold text-text border border-border p-3">
        <Link href="/">Home</Link>
      </button>
    </div>
  );
}
