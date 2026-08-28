"use client";

import { useState } from "react";
import { IconClock, IconMail, IconPhone, IconPin, IconCheck } from "./icons";
import { Reveal } from "./motion";

const HOURS = [
  { day: "Monday – Friday", time: "9:00 AM – 8:00 PM" },
  { day: "Saturday", time: "9:00 AM – 6:00 PM" },
  { day: "Sunday", time: "11:00 AM – 4:00 PM" },
];

const ADDRESS = "412 Route 46, Lodi, NJ 07644";

export default function LocationContact() {
  const [sent, setSent] = useState(false);

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
          {/* Left: map + details */}
          <div className="flex flex-col gap-6">
            <div className="overflow-hidden rounded-2xl ring-1 ring-line shadow-[var(--shadow-card)]">
              <iframe
                title="Map to Bergen Car Company in Lodi, New Jersey"
                src="https://www.google.com/maps?q=Lodi,+New+Jersey&z=13&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[300px] w-full border-0 sm:h-[360px]"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-white p-5 ring-1 ring-line">
                <IconPin className="h-5 w-5 text-red" />
                <p className="mt-2 font-heading text-sm font-semibold text-ink">
                  Showroom
                </p>
                <p className="mt-1 text-[14px] leading-6 text-navy-600">
                  {ADDRESS}
                </p>
              </div>
              <div className="rounded-2xl bg-white p-5 ring-1 ring-line">
                <IconPhone className="h-5 w-5 text-red" />
                <p className="mt-2 font-heading text-sm font-semibold text-ink">
                  Sales
                </p>
                <a
                  href="tel:+19735550142"
                  className="mt-1 block text-[14px] text-navy-600 hover:text-ink"
                >
                  (973) 555-0142
                </a>
                <a
                  href="mailto:sales@bergencarcompany.com"
                  className="mt-1 flex items-center gap-1.5 text-[13px] text-navy-500 hover:text-ink"
                >
                  <IconMail className="h-3.5 w-3.5" />
                  sales@bergencarcompany.com
                </a>
              </div>
              <div className="rounded-2xl bg-white p-5 ring-1 ring-line sm:col-span-2">
                <div className="flex items-center gap-2">
                  <IconClock className="h-5 w-5 text-red" />
                  <p className="font-heading text-sm font-semibold text-ink">
                    Hours
                  </p>
                </div>
                <dl className="mt-3 divide-y divide-line">
                  {HOURS.map((h) => (
                    <div
                      key={h.day}
                      className="flex justify-between py-2 text-[14px]"
                    >
                      <dt className="text-navy-600">{h.day}</dt>
                      <dd className="font-medium text-ink">{h.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>

          {/* Right: low-friction form */}
          <div className="rounded-2xl bg-white p-6 ring-1 ring-line shadow-[var(--shadow-card)] sm:p-8">
            {sent ? (
              <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/20 text-gold-600">
                  <IconCheck className="h-7 w-7" />
                </div>
                <h3 className="mt-4 font-heading text-xl font-bold text-ink">
                  Got it — thanks!
                </h3>
                <p className="mt-2 max-w-xs text-[15px] text-navy-600">
                  A Bergen Car Company advisor will reach out today during
                  business hours.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-6 text-sm font-semibold text-red hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="flex flex-col gap-4"
              >
                <h3 className="font-heading text-lg font-bold text-ink">
                  Ask us anything
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-1.5">
                    <span className="text-[13px] font-semibold text-navy-600">
                      Name
                    </span>
                    <input
                      required
                      name="name"
                      autoComplete="name"
                      className="rounded-xl border border-line bg-white px-3.5 py-3 text-[15px] text-ink outline-none transition-colors focus:border-navy focus:ring-2 focus:ring-navy/15"
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
                      className="rounded-xl border border-line bg-white px-3.5 py-3 text-[15px] text-ink outline-none transition-colors focus:border-navy focus:ring-2 focus:ring-navy/15"
                    />
                  </label>
                </div>
                <label className="flex flex-col gap-1.5">
                  <span className="text-[13px] font-semibold text-navy-600">
                    Email <span className="font-normal text-navy-400">(optional)</span>
                  </span>
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="rounded-xl border border-line bg-white px-3.5 py-3 text-[15px] text-ink outline-none transition-colors focus:border-navy focus:ring-2 focus:ring-navy/15"
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
                    className="resize-none rounded-xl border border-line bg-white px-3.5 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-navy-400 focus:border-navy focus:ring-2 focus:ring-navy/15"
                  />
                </label>
                <button
                  type="submit"
                  className="mt-1 inline-flex items-center justify-center rounded-full bg-red px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-red-600 active:scale-[0.98]"
                >
                  Send message
                </button>
                <p className="text-center text-[12px] text-navy-500">
                  No spam, no call-center. Replies come from our Lodi showroom.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
