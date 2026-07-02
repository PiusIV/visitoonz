// app/_components/ContactCTA.tsx
import Link from "next/link";

export default function ContactCTA({ message }: { message?: string }) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <span className="text-[10px] tracking-[0.2em] uppercase text-gold block mb-2">
          Interested?
        </span>
        <p className="text-[13px] text-muted leading-relaxed">
          {message ??
            "Want this piece or something custom? Reach out and we'll make it happen."}
        </p>
      </div>

      <Link
        href="/contact"
        className="inline-flex items-center gap-2 bg-[#C9A84C] text-[#0A0A0A] text-[11px] font-medium tracking-widest uppercase px-6 py-3 w-fit hover:bg-[#E8C97A] transition-colors"
      >
        Get in touch <i className="ti ti-arrow-right" />
      </Link>
    </div>
  );
}
