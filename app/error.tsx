"use client";

import Link from "next/link";

export default function Error() {
  return (
    <div className="h-screen w-full">
      <p>Oops, there was an error encountered &darr;</p>
      <button className="bg-gold text-text border border-border p-3">
        <Link href="/">Home</Link>
      </button>
    </div>
  );
}
