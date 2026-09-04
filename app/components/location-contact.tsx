"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  IconArrowRight,
  IconCheck,
  IconClock,
  IconMail,
  IconPhone,
  IconPin,
  IconShield,
} from "./icons";
import { Reveal } from "./motion";
import { isApiError, submitLead } from "../lib/api";

const HOURS = [
  { label: "Monday – Friday", time: "9:00 AM – 8:00 PM", days: [1, 2, 3, 4, 5] },
  { label: "Saturday", time: "9:00 AM – 6:00 PM", days: [6] },
  { label: "Sunday", time: "11:00 AM – 4:00 PM", days: [0] },
];

const ADDRESS = "22 US 46 East, Lodi, NJ 07644";
const MAPS_LINK = "https://www.google.com/maps/dir/?api=1&destination=Lodi,+New+Jersey";

const inputClass =
  "rounded-xl border border-line bg-white px-3.5 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-navy-400 focus:border-navy focus:ring-2 focus:ring-navy/15";

export default function LocationContact() {
  const [sent, setSent] = useState(false);
  const [today, setToday] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Set after mount so static prerender doesn't freeze "today".
  useEffect(() => {
    const id = requestAnimationFrame(() => setToday(new Date().getDay()));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section id="contact" className="scroll-mt-24 bg-mist py-20 sm:py-24">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-red">Visit / Contact</p>
          <h2 className="display-2 mt-2 text-ink">
            We&apos;re on Route 46 in Lodi
          </h2>
          <p className="mt-4 text-lg leading-8 text-navy-600">
            Come by for a test drive, or send a quick note and we&apos;ll reply
            the same day.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Left: one card — map, details, hours */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-72px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden rounded-3xl bg-white ring-1 ring-line shadow-[var(--shadow-card)]"
          >
            <div className="relative">
              <iframe
                title="Map to Bergen Car Company in Lodi, New Jersey"
                src="https://www.google.com/maps?q=Lodi,+New+Jersey&z=13&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[280px] w-full border-0 sm:h-[320px]"
              />
              <span className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[12px] font-semibold text-ink shadow-md backdrop-blur">
                <IconPin className="h-3.5 w-3.5 text-red" />
                Bergen Car Company · Route 46
              </span>
            </div>

            <div className="p-6 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-3">
                  <IconPin className="mt-0.5 h-5 w-5 shrink-0 text-red" />
                  <div>
                    <p className="font-heading text-sm font-semibold text-ink">
                      Showroom
                    </p>
                    <p className="mt-0.5 text-[14px] leading-6 text-navy-600">
                      {ADDRESS}
                    </p>
                  </div>
                </div>
                <a
                  href={MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-mist px-3 py-2 text-[13px] font-semibold text-navy-700 transition-colors hover:bg-navy hover:text-white"
                >
                  Directions
                  <IconArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>

              <div className="my-5 h-px bg-line" />

              <div className="flex flex-wrap gap-x-8 gap-y-3">
                <a
                  href="tel:+19739286300"
                  className="flex items-center gap-2 text-[14px] font-medium text-navy-700 transition-colors hover:text-red"
                >
                  <IconPhone className="h-4 w-4 text-red" />
                  (973) 928-6300
                </a>
                <a
                  href="mailto:sales@bergencarcompany.com"
                  className="flex items-center gap-2 text-[14px] font-medium text-navy-700 transition-colors hover:text-red"
                >
                  <IconMail className="h-4 w-4 text-red" />
                  sales@bergencarcompany.com
                </a>
              </div>

              <div className="my-5 h-px bg-line" />

              <div className="flex items-center gap-2">
                <IconClock className="h-5 w-5 text-red" />
                <p className="font-heading text-sm font-semibold text-ink">
                  Hours
                </p>
              </div>
              <dl className="mt-3 space-y-1">
                {HOURS.map((h) => {
                  const isToday = today !== null && h.days.includes(today);
                  return (
                    <div
                      key={h.label}
                      className={`flex items-center justify-between rounded-lg px-3 py-2 text-[14px] transition-colors ${
                        isToday ? "bg-gold/15" : ""
                      }`}
                    >
                      <dt className="flex items-center gap-2 text-navy-600">
                        {h.label}
                        {isToday && (
                          <span className="rounded-full bg-gold px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ink">
                            Today
                          </span>
                        )}
                      </dt>
                      <dd className="font-medium text-ink">{h.time}</dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          </motion.div>

          {/* Right: contact form */}
          <Reveal
            delay={0.08}
            className="rounded-3xl bg-white p-6 ring-1 ring-line shadow-[var(--shadow-card)] sm:p-8"
          >
            {sent ? (
              <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/20 text-gold-600">
                  <IconCheck className="h-7 w-7" />
                </div>
                <h3 className="mt-4 font-heading text-xl font-bold text-ink">
                  Thanks — we&apos;ll be in touch
                </h3>
                <p className="mt-2 max-w-xs text-[15px] text-navy-600">
                  Someone from our Lodi showroom will get back to you today
                  during business hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSent(false);
                    setFormError(null);
                  }}
                  className="mt-6 text-sm font-semibold text-red hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const fd = new FormData(form);
                  setFormError(null);
                  setSubmitting(true);
                  try {
                    await submitLead({
                      type: "location-contact",
                      name: String(fd.get("name") ?? ""),
                      phone: String(fd.get("phone") ?? ""),
                      email: String(fd.get("email") ?? ""),
                      message: String(fd.get("message") ?? ""),
                    });
                    setSent(true);
                    form.reset();
                  } catch (err) {
                    setFormError(
                      isApiError(err)
                        ? err.message
                        : "Something went wrong. Please try again.",
                    );
                  } finally {
                    setSubmitting(false);
                  }
                }}
                className="flex flex-col gap-4"
              >
                {formError ? (
                  <p
                    role="alert"
                    className="rounded-xl bg-red/10 px-3.5 py-2.5 text-[13.5px] font-medium text-red"
                  >
                    {formError}
                  </p>
                ) : null}
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-red/10 text-red">
                    <IconMail className="h-5 w-5" />
                  </span>
                  <h3 className="font-heading text-lg font-bold text-ink">
                    Ask us anything
                  </h3>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-1.5">
                    <span className="text-[13px] font-semibold text-navy-600">
                      Name
                    </span>
                    <input
                      required
                      name="name"
                      autoComplete="name"
                      className={inputClass}
                    />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-[13px] font-semibold text-navy-600">
                      Phone
                    </span>
                    <input
                      required
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      className={inputClass}
                    />
                  </label>
                </div>
                <label className="flex flex-col gap-1.5">
                  <span className="text-[13px] font-semibold text-navy-600">
                    Email{" "}
                    <span className="font-normal text-navy-400">(optional)</span>
                  </span>
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    className={inputClass}
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-[13px] font-semibold text-navy-600">
                    How can we help?
                  </span>
                  <textarea
                    required
                    name="message"
                    rows={4}
                    defaultValue=""
                    placeholder="A vehicle you're interested in, a trade-in question, financing…"
                    className={`resize-none ${inputClass}`}
                  />
                </label>
                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-1 inline-flex items-center justify-center rounded-full bg-red px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-red-600 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60"
                >
                  {submitting ? "Sending…" : "Send message"}
                </button>
                <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-[12px] text-navy-500">
                  <span className="inline-flex items-center gap-1.5">
                    <IconClock className="h-3.5 w-3.5 text-navy-400" />
                    Same-day reply
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <IconShield className="h-3.5 w-3.5 text-navy-400" />
                    No spam, no call-center
                  </span>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
