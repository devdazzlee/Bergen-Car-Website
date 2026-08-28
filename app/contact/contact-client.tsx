"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Reveal, Stagger, StaggerItem } from "../components/motion";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Field, ringFor, EASE } from "../components/ui/form-parts";
import {
  IconArrowRight,
  IconChat,
  IconCheck,
  IconClock,
  IconMail,
  IconPhone,
  IconPin,
} from "../components/icons";

const TEL = "tel:+19735550142";
const SMS = "sms:+19735550142";
const EMAIL = "sales@bergencarcompany.com";
const ADDRESS = "412 Route 46, Lodi, NJ 07644";
const MAPS = "https://www.google.com/maps/dir/?api=1&destination=412+Route+46,+Lodi,+NJ";

/* Showroom hours by weekday: [open, close] in 24h, or null when closed. */
const HOURS: Record<number, [number, number] | null> = {
  0: [11, 16],
  1: [9, 20],
  2: [9, 20],
  3: [9, 20],
  4: [9, 20],
  5: [9, 20],
  6: [9, 18],
};
const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function fmtHour(h: number) {
  const period = h >= 12 ? "PM" : "AM";
  const hr = h % 12 === 0 ? 12 : h % 12;
  return `${hr} ${period}`;
}

type OpenStatus = { open: boolean; label: string } | null;

function computeStatus(now: Date | null): OpenStatus {
  if (!now) return null;
  const day = now.getDay();
  const h = now.getHours() + now.getMinutes() / 60;
  const today = HOURS[day];
  if (today && h >= today[0] && h < today[1]) {
    return { open: true, label: `Open now — closes ${fmtHour(today[1])}` };
  }
  if (today && h < today[0]) {
    return { open: false, label: `Closed — opens today at ${fmtHour(today[0])}` };
  }
  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7;
    const slot = HOURS[d];
    if (slot) {
      const when = i === 1 ? "tomorrow" : DAY_NAMES[d];
      return {
        open: false,
        label: `Closed — opens ${when} at ${fmtHour(slot[0])}`,
      };
    }
  }
  return { open: false, label: "Closed" };
}

function useOpenStatus(): OpenStatus {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const tick = () => setNow(new Date());
    const raf = requestAnimationFrame(tick);
    const id = window.setInterval(tick, 60_000);
    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(id);
    };
  }, []);
  return computeStatus(now);
}

/* ---------------- data ---------------- */

const METHODS = [
  {
    icon: IconPhone,
    label: "Call",
    value: "(973) 555-0142",
    href: TEL,
    sub: "Fastest during business hours. Ask for whoever fits your question.",
  },
  {
    icon: IconChat,
    label: "Text",
    value: "(973) 555-0142",
    href: SMS,
    sub: "Same number. Good for a quick question or a photo request.",
  },
  {
    icon: IconMail,
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    sub: "We read every one. Replies usually come within a few hours.",
  },
  {
    icon: IconPin,
    label: "Visit",
    value: ADDRESS,
    href: MAPS,
    sub: "Walk-ins welcome, no appointment needed. Parking is free, out front.",
  },
];

const DEPARTMENTS = [
  {
    name: "Sales",
    person: "Ask for Marcus",
    phone: "(973) 555-0142",
    tel: TEL,
    email: "sales@bergencarcompany.com",
    best: "A specific car, a test drive, or putting a hold on something.",
    hours: "Mon–Sat",
  },
  {
    name: "Financing",
    person: "Ask for Denise",
    phone: "(973) 555-0148",
    tel: "tel:+19735550148",
    email: "finance@bergencarcompany.com",
    best: "Pre-qualification, rates, and how a trade payoff affects the numbers.",
    hours: "Mon–Fri",
  },
  {
    name: "Service",
    person: "Ask for Rich",
    phone: "(973) 555-0151",
    tel: "tel:+19735550151",
    email: "service@bergencarcompany.com",
    best: "Appointments, repair estimates, and parts — for any make.",
    hours: "Mon–Sat, from 7:30 AM",
  },
];

const HOURS_ROWS = [
  { day: "Monday – Friday", time: "9:00 AM – 8:00 PM" },
  { day: "Saturday", time: "9:00 AM – 6:00 PM" },
  { day: "Sunday", time: "11:00 AM – 4:00 PM" },
];

const TOPICS = ["General question", "A specific car", "Financing", "Trade-in", "Service"];

const REASSURE = [
  "A person replies — never a bot or a call center.",
  "We answer the actual question. No \"come in and we'll talk about it.\"",
  "If you're just looking, we won't chase you with follow-ups.",
];

/* ---------------- form ---------------- */

type Values = { name: string; email: string; phone: string; message: string };
const EMPTY: Values = { name: "", email: "", phone: "", message: "" };

function validate(v: Values): Partial<Record<keyof Values, string>> {
  const e: Partial<Record<keyof Values, string>> = {};
  if (v.name.trim().length < 2) e.name = "Your full name, please.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email))
    e.email = "Double-check the email address.";
  if (v.phone && v.phone.replace(/\D/g, "").length < 10)
    e.phone = "That doesn't look like a full number.";
  if (v.message.trim().length < 4) e.message = "A sentence is plenty.";
  return e;
}

function ContactForm() {
  const [v, setV] = useState<Values>(EMPTY);
  const [topic, setTopic] = useState<string | null>(null);
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const [sent, setSent] = useState(false);
  const errors = useMemo(() => validate(v), [v]);

  const set = (k: keyof Values) => (val: string) =>
    setV((p) => ({ ...p, [k]: val }));
  const blur = (k: keyof Values) => () =>
    setTouched((p) => ({ ...p, [k]: true }));

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true, message: true });
    if (Object.keys(errors).length === 0) setSent(true);
  }

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="flex flex-col items-center py-10 text-center"
      >
        <motion.span
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.05, type: "spring", stiffness: 260, damping: 18 }}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/20 text-gold-600"
        >
          <IconCheck className="h-8 w-8" />
        </motion.span>
        <h3 className="mt-4 font-heading text-xl font-bold text-ink">
          Message sent, {v.name.split(" ")[0]}
        </h3>
        <p className="mt-2 max-w-sm text-[15px] leading-7 text-navy-600">
          It landed with a real person at the Lodi showroom. You&apos;ll hear
          back today during business hours — usually a lot sooner.
        </p>
        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
          <Button asChild variant="navy">
            <a href={TEL}>
              <IconPhone className="h-4 w-4" />
              Or call now
            </a>
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              setSent(false);
              setV(EMPTY);
              setTouched({});
              setTopic(null);
            }}
          >
            Send another
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          id="c-name"
          label="Name"
          touched={!!touched.name}
          error={errors.name}
          filled={!!v.name}
        >
          <Input
            id="c-name"
            autoComplete="name"
            value={v.name}
            onChange={(e) => set("name")(e.target.value)}
            onBlur={blur("name")}
            className={ringFor(!!touched.name, errors.name)}
          />
        </Field>
        <Field
          id="c-phone"
          label="Phone (optional)"
          touched={!!touched.phone}
          error={errors.phone}
          filled={!!v.phone}
        >
          <Input
            id="c-phone"
            type="tel"
            autoComplete="tel"
            value={v.phone}
            onChange={(e) => set("phone")(e.target.value)}
            onBlur={blur("phone")}
            className={ringFor(!!touched.phone, errors.phone)}
          />
        </Field>
      </div>

      <Field
        id="c-email"
        label="Email"
        touched={!!touched.email}
        error={errors.email}
        filled={!!v.email}
      >
        <Input
          id="c-email"
          type="email"
          autoComplete="email"
          value={v.email}
          onChange={(e) => set("email")(e.target.value)}
          onBlur={blur("email")}
          className={ringFor(!!touched.email, errors.email)}
        />
      </Field>

      <div>
        <p className="text-[13px] font-semibold text-navy-600">
          What&apos;s this about? <span className="font-normal text-navy-400">(optional)</span>
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {TOPICS.map((t) => {
            const active = topic === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setTopic(active ? null : t)}
                className={`rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-colors ${
                  active
                    ? "bg-navy text-white"
                    : "bg-mist text-navy-600 hover:bg-cloud"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      <Field
        id="c-message"
        label="Message"
        touched={!!touched.message}
        error={errors.message}
        filled={!!v.message}
        showCheck={false}
      >
        <Textarea
          id="c-message"
          rows={4}
          placeholder={
            topic === "A specific car"
              ? "Which car, and what would you like to know?"
              : "How can we help?"
          }
          value={v.message}
          onChange={(e) => set("message")(e.target.value)}
          onBlur={blur("message")}
          className={ringFor(!!touched.message, errors.message)}
        />
      </Field>

      <Button type="submit" size="lg" className="mt-1 w-full">
        Send message
        <IconArrowRight className="h-4 w-4" />
      </Button>
      <p className="text-center text-[12px] leading-5 text-navy-500">
        Goes straight to the showroom. No auto-responders, no marketing list.
      </p>
    </form>
  );
}

/* ---------------- page ---------------- */

export default function ContactClient() {
  const status = useOpenStatus();

  return (
    <div className="bg-mist">
      {/* header */}
      <section className="relative overflow-hidden bg-navy pb-14 pt-32">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:22px_22px]"
        />
        <div
          aria-hidden
          className="absolute -right-24 top-4 h-72 w-72 rounded-full bg-gold/10 blur-3xl"
        />
        <div className="container-page relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="max-w-2xl"
          >
            <p className="eyebrow text-gold">Contact</p>
            <h1 className="display-2 mt-3 text-white">Get in touch</h1>
            <p className="mt-4 text-lg leading-8 text-white/70">
              A real person at our Lodi showroom will get back to you — usually
              within about 15 minutes during business hours. Pick whatever&apos;s
              easiest below.
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[13px] font-semibold"
            >
              <span className="relative flex h-2.5 w-2.5">
                {status?.open && (
                  <span
                    className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70"
                    style={{ background: "#34d399" }}
                  />
                )}
                <span
                  className="relative inline-flex h-2.5 w-2.5 rounded-full"
                  style={{ background: status?.open ? "#34d399" : "#94a3b8" }}
                />
              </span>
              <span className={status?.open ? "text-white" : "text-white/60"}>
                {status ? status.label : "Checking hours…"}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* contact methods */}
      <section className="py-14 sm:py-16">
        <div className="container-page">
          <Stagger
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            stagger={0.08}
          >
            {METHODS.map(({ icon: Icon, label, value, href, sub }) => (
              <StaggerItem key={label} as="div" className="min-w-0">
                <a
                  href={href}
                  target={label === "Visit" ? "_blank" : undefined}
                  rel={label === "Visit" ? "noopener noreferrer" : undefined}
                  className="group flex h-full min-w-0 flex-col rounded-2xl border border-line bg-white p-5 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1.5 hover:border-transparent hover:shadow-[var(--shadow-lift)]"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy text-gold transition-colors duration-300 group-hover:bg-red group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="mt-4 text-[12px] font-semibold uppercase tracking-wide text-navy-500">
                    {label}
                  </p>
                  <p className="mt-0.5 font-heading text-[15.5px] font-bold leading-snug text-ink [overflow-wrap:anywhere]">
                    {value}
                  </p>
                  <p className="mt-2 flex-1 text-[13px] leading-6 text-navy-600">
                    {sub}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-red">
                    {label === "Visit" ? "Get directions" : `Open ${label.toLowerCase()}`}
                    <IconArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* form | map + hours */}
      <section id="message" className="scroll-mt-24 pb-16 sm:pb-20">
        <div className="container-page grid gap-8 lg:grid-cols-2 lg:gap-10">
          <Reveal className="rounded-3xl bg-white p-6 ring-1 ring-line shadow-[var(--shadow-card)] sm:p-8">
            <h2 className="font-heading text-xl font-bold text-ink">
              Send a message
            </h2>
            <p className="mt-1 text-[14px] text-navy-600">
              Four fields. It goes to the showroom, not a queue.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </Reveal>

          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-72px" }}
              transition={{ duration: 0.6, ease: EASE }}
              className="relative overflow-hidden rounded-3xl ring-1 ring-line shadow-[var(--shadow-card)]"
            >
              <iframe
                title="Map to Bergen Car Company, 412 Route 46, Lodi, NJ"
                src="https://www.google.com/maps?q=412+Route+46,+Lodi,+NJ&z=14&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[280px] w-full border-0 sm:h-[320px]"
              />
              <span className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[12px] font-semibold text-ink shadow-md backdrop-blur">
                <IconPin className="h-3.5 w-3.5 text-red" />
                Bergen Car Company · Route 46
              </span>
            </motion.div>

            <Reveal
              delay={0.08}
              className="rounded-3xl bg-white p-6 ring-1 ring-line shadow-[var(--shadow-card)] sm:p-7"
            >
              <div className="flex items-center gap-2">
                <IconClock className="h-5 w-5 text-red" />
                <h3 className="font-heading text-sm font-bold text-ink">
                  Showroom hours
                </h3>
              </div>
              <dl className="mt-3 divide-y divide-line">
                {HOURS_ROWS.map((h) => (
                  <div
                    key={h.day}
                    className="flex justify-between py-2.5 text-[14px]"
                  >
                    <dt className="text-navy-600">{h.day}</dt>
                    <dd className="font-medium text-ink">{h.time}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 border-t border-line pt-4 text-[13px] leading-6 text-navy-500">
                We&apos;re on Route 46 eastbound, a minute past the Garden State
                Parkway and about five from Route 17. Free parking right in front
                — pull in and someone will come out.
              </p>
              <a
                href={MAPS}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-700 active:scale-[0.98]"
              >
                Get directions
                <IconArrowRight className="h-4 w-4" />
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* department contacts */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-red">Reach the right person</p>
            <h2 className="display-2 mt-2 text-ink">
              Three desks, three direct lines
            </h2>
            <p className="mt-4 text-lg leading-8 text-navy-600">
              You can always call the main number, but if you know what you need,
              here&apos;s who picks up.
            </p>
          </Reveal>

          <Stagger className="mt-12 grid gap-6 lg:grid-cols-3" stagger={0.1}>
            {DEPARTMENTS.map((d) => (
              <StaggerItem
                key={d.name}
                className="flex flex-col rounded-2xl border border-line bg-white p-6 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]"
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="font-heading text-lg font-bold text-ink">
                    {d.name}
                  </h3>
                  <span className="text-[12px] font-semibold text-navy-500">
                    {d.hours}
                  </span>
                </div>
                <p className="mt-0.5 text-[13px] font-semibold uppercase tracking-wide text-red">
                  {d.person}
                </p>
                <p className="mt-3 text-[14px] leading-6 text-navy-600">
                  {d.best}
                </p>
                <div className="mt-4 flex flex-col gap-2 border-t border-line pt-4 text-[14px]">
                  <a
                    href={d.tel}
                    className="inline-flex items-center gap-2 font-semibold text-ink transition-colors hover:text-red"
                  >
                    <IconPhone className="h-4 w-4 text-red" />
                    {d.phone}
                  </a>
                  <a
                    href={`mailto:${d.email}`}
                    className="inline-flex items-center gap-2 text-navy-600 transition-colors hover:text-ink"
                  >
                    <IconMail className="h-4 w-4 text-navy-400" />
                    {d.email}
                  </a>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* reassurance */}
      <section className="bg-navy py-14 sm:py-16">
        <div className="container-page">
          <Reveal>
            <h2 className="font-heading text-lg font-bold text-white">
              What happens when you reach out
            </h2>
          </Reveal>
          <Stagger
            className="mt-5 grid gap-4 sm:grid-cols-3"
            stagger={0.1}
          >
            {REASSURE.map((r) => (
              <StaggerItem
                key={r}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold">
                  <IconCheck className="h-3.5 w-3.5" />
                </span>
                <p className="text-[13.5px] leading-6 text-white/80">{r}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </div>
  );
}
