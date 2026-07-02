"use client";

import Image from "next/image";

export default function Logo() {
  return (
    <div className="text-2xl text-gold flex justify-between gap-3 hover:cursor-pointer mt-1">
      <div className="object-cover justify-center mt-1.5">
        {" "}
        <Image
          src="/gold-logo.jpg"
          alt="logo"
          width={20}
          height={20}
          className="object-cover"
        />
      </div>
      <span className="font-heading font-bold">Visitoonz Art Ent.</span>
    </div>
  );
}
