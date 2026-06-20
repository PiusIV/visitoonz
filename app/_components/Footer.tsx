"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaArrowRight,
} from "react-icons/fa";

// ---- Content config ---------------------------------------------------

const navColumns = [
  {
    heading: "Shop",
    links: [
      { label: "New arrivals", href: "/shop/new" },
      { label: "Best sellers", href: "/shop/best-sellers" },
      { label: "Collections", href: "/shop/collections" },
      { label: "Sale", href: "/shop/sale" },
    ],
  },
  {
    heading: "About",
    links: [
      { label: "Our story", href: "/about" },
      { label: "Journal", href: "/journal" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Shipping", href: "/shipping" },
      { label: "Returns", href: "/returns" },
      { label: "FAQ", href: "/faq" },
      { label: "Size guide", href: "/size-guide" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of service", href: "/terms" },
      { label: "Accessibility", href: "/accessibility" },
    ],
  },
];

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com", Icon: FaInstagram },
  { label: "Facebook", href: "https://facebook.com", Icon: FaFacebook },
  { label: "Twitter", href: "https://twitter.com", Icon: FaTwitter },
  { label: "YouTube", href: "https://youtube.com", Icon: FaYoutube },
];

// -----------------------------------------------------------------------

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || status === "submitting") return;
    setStatus("submitting");

    setTimeout(() => {
      setStatus("done");
      setEmail("");
    }, 600);
  }

  return (
    <footer
      style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
      className="border-t"
    >
      <div
        style={{ borderColor: "var(--border)" }}
        className="mx-auto max-w-6xl border-t-0 px-6 py-16 sm:px-8 lg:px-10"
      >
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_repeat(4,1fr)] lg:gap-8">
          {/* Brand + newsletter */}
          <div className="max-w-sm lg:max-w-none">
            <Link
              href="/"
              className="font-heading text-2xl tracking-tight"
              style={{ color: "var(--text)" }}
            >
              Visitoonz
            </Link>

            <p
              className="font-body mt-4 text-sm leading-relaxed"
              style={{ color: "var(--muted)" }}
            >
              The digital hub of Visitoonz Enterprise. New drops and dispatches,
              straight to your inbox.
            </p>

            <form onSubmit={handleSubmit} className="mt-6">
              <label
                htmlFor="footer-email"
                className="font-body mb-2 block text-xs uppercase tracking-wide"
                style={{ color: "var(--muted)" }}
              >
                Stay in the loop
              </label>

              <div className="flex flex-col gap-3">
                <input
                  id="footer-email"
                  type="email"
                  required
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status !== "idle"}
                  style={{
                    borderColor: "var(--border)",
                    color: "var(--text)",
                  }}
                  className="font-body w-full border-0 border-b bg-transparent py-2 text-sm outline-none transition-colors placeholder:opacity-50 focus:[border-color:var(--gold)] disabled:opacity-60"
                />

                <button
                  type="submit"
                  disabled={status !== "idle"}
                  style={{
                    backgroundColor: "var(--gold)",
                    color: "var(--bg)",
                  }}
                  className="font-body group inline-flex w-fit items-center justify-center gap-1.5 rounded-full px-5 py-2 text-sm transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "done" ? "Subscribed" : "Subscribe"}
                  {status !== "done" && (
                    <FaArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  )}
                </button>
              </div>

              {status === "done" && (
                <p
                  className="font-body mt-2 text-xs"
                  style={{ color: "var(--gold)" }}
                  role="status"
                >
                  You&apos;re on the list.
                </p>
              )}
            </form>
          </div>

          {/* Nav columns */}
          {navColumns.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h3
                className="font-body text-xs uppercase tracking-wide"
                style={{ color: "var(--muted)" }}
              >
                {col.heading}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-body text-sm transition-colors hover:[color:var(--gold)]"
                      style={{ color: "var(--text)" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Divider */}
        <div
          style={{ borderColor: "var(--border)" }}
          className="mt-14 border-t pt-6"
        >
          <div className="flex flex-col-reverse items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-body text-xs" style={{ color: "var(--muted)" }}>
              &copy; {new Date().getFullYear()} Visitoonz Enterprise. All rights
              reserved.
            </p>

            <div className="flex items-center gap-4">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{ color: "var(--muted)" }}
                  className="transition-colors hover:text-[var(--gold)]"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
