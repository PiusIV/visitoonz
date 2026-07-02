// app/_components/contact/ContactForm.tsx
"use client";
import { useState } from "react";
import { motion } from "framer-motion";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("https://formspree.io/f/xvzjwjnw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error();

      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center py-20 gap-6 text-center"
      >
        <div className="w-14 h-14 flex items-center justify-center border border-gold/40">
          <i className="ti ti-check text-gold text-2xl" />
        </div>
        <h3 className="font-cormorant text-3xl font-light text-text">
          Message sent
        </h3>
        <p className="text-[13px] text-muted max-w-xs leading-relaxed">
          Thank you for reaching out. We&apos;ll get back to you within 24
          hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-[11px] tracking-widest uppercase text-gold hover:text-text transition-colors"
        >
          Send another →
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Name + Email */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-[10px] tracking-[0.18em] uppercase text-gold">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Your name"
            className="bg-transparent border border-border px-4 py-3 text-[13px] text-text placeholder:text-muted focus:outline-none focus:border-gold transition-colors"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[10px] tracking-[0.18em] uppercase text-gold">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="your@email.com"
            className="bg-transparent border border-border px-4 py-3 text-[13px] text-text placeholder:text-muted focus:outline-none focus:border-gold transition-colors"
          />
        </div>
      </div>

      {/* Subject */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] tracking-[0.18em] uppercase text-gold">
          Subject
        </label>
        <select
          name="subject"
          value={form.subject}
          onChange={handleChange}
          required
          className="bg-bg border border-border px-4 py-3 text-[13px] text-text focus:outline-none focus:border-gold transition-colors appearance-none"
        >
          <option value="" disabled>
            Select a subject
          </option>
          <option value="custom-order">Custom Order</option>
          <option value="commission">Commission</option>
          <option value="photography">Photography</option>
          <option value="interior-decoration">Interior Decoration</option>
          <option value="multimedia">Multimedia Production</option>
          <option value="general">General Enquiry</option>
        </select>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] tracking-[0.18em] uppercase text-gold">
          Message
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={6}
          placeholder="Tell us what you have in mind..."
          className="bg-transparent border border-border px-4 py-3 text-[13px] text-text placeholder:text-muted focus:outline-none focus:border-gold transition-colors resize-none"
        />
      </div>

      {/* Submit */}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center gap-2 bg-gold text-[#0A0A0A] text-[11px] font-medium tracking-widest uppercase px-6 py-3 hover:bg-[#E8C97A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "loading" ? (
            <>
              Sending
              <i className="ti ti-loader-2 animate-spin" />
            </>
          ) : (
            <>
              Send message
              <i className="ti ti-arrow-right" />
            </>
          )}
        </button>

        {status === "error" && (
          <span className="text-[11px] text-red-400">
            Something went wrong. Try again.
          </span>
        )}
      </div>
    </form>
  );
}
