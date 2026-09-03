"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { format } from "date-fns";
import { Reveal, Stagger, StaggerItem } from "../components/motion";
import { SectionHeading } from "../components/section-heading";
import PageBanner, { BannerPills } from "../components/page-banner";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { DatePicker } from "../components/ui/date-picker";
import { Field, FieldGroup, FormShell, ringFor, EASE } from "../components/ui/form-parts";
import { isApiError, submitLead } from "../lib/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  IconArrowRight,
  IconCheck,
  IconClock,
  IconCog,
  IconDisc,
  IconGauge,
  IconKey,
  IconMail,
  IconOil,
  IconPhone,
  IconPin,
  IconShield,
  IconTire,
  IconWallet,
  IconWrench,
} from "../components/icons";

const TEL = "tel:+19735550142";

const STEPS = [
  {
    title: "We confirm the time",
    body: "A quick call to lock the slot and make sure the parts are on hand.",
  },
  {
    title: "We quote it first",
    body: "A written estimate — parts, labor, time — before any work begins.",
  },
  {
    title: "We call before extras",
    body: "Anything not on your list, we stop and ask. You approve every line.",
  },
  {
    title: "You get the old parts",
    body: "Whatever we replace, we keep for you to see. Pick it up or we recycle it.",
  },
];

const SERVICES = [
  {
    icon: IconOil,
    title: "Oil & filter changes",
    body: "Full-synthetic or conventional — whatever your car's manufacturer actually calls for, not whatever's on special. We'll show you the old filter.",
    meta: "≈ 30 min",
  },
  {
    icon: IconDisc,
    title: "Brake service",
    body: "Pads, rotors, fluid, lines. We measure what's left on your pads and show you the number before we quote anything.",
    meta: "Same day",
  },
  {
    icon: IconTire,
    title: "Tire service",
    body: "Mount, balance, rotate, patch, and replace. We'll tell you honestly whether a tire can be safely repaired or needs replacing.",
    meta: "Walk-ins OK",
  },
  {
    icon: IconGauge,
    title: "Diagnostics",
    body: "Check-engine lights, warning messages, noises, leaks. We scan it, road-test it, and explain what we found in plain English.",
    meta: "≈ 1 hour",
  },
  {
    icon: IconCog,
    title: "Scheduled maintenance",
    body: "The 30k / 60k / 90k services from your owner's manual — done to spec, and we'll skip the line items that don't apply to your car.",
    meta: "By the mile",
  },
  {
    icon: IconWrench,
    title: "Repairs",
    body: "Suspension, cooling, electrical, belts, and more, for any make. If it's a job we shouldn't take on, we'll tell you and point you somewhere good.",
    meta: "Free estimate",
  },
];

const PRICING = [
  { job: "Oil & filter change", range: "$45 – $95" },
  { job: "Tire rotation", range: "$30 – $45" },
  { job: "Front brake pads & rotors (per axle)", range: "$260 – $420" },
  { job: "Battery, tested & installed", range: "$180 – $320" },
  { job: "NJ inspection prep & re-test", range: "from $45" },
  { job: "Check-engine diagnosis", range: "$95 – $140" },
  { job: "30k / 60k / 90k service", range: "$180 – $650" },
  { job: "A/C recharge & leak check", range: "$140 – $260" },
];

const QUOTE_STEPS = [
  {
    t: "We diagnose",
    b: "Scan, road-test, and physically check. We find the actual cause, not just the symptom.",
  },
  {
    t: "You get it in writing",
    b: "Parts, labor, and time, itemized — sent before anyone picks up a wrench.",
  },
  {
    t: "You approve it",
    b: "Nothing happens until you say go. Decline any line you want, no attitude.",
  },
  {
    t: "We call before extras",
    b: "If we open something up and find more, we stop and phone you first. No surprise additions.",
  },
];

const WHY = [
  {
    icon: IconShield,
    title: "Honest technicians",
    body: "The same people who inspect our cars. They're paid to fix your car right, not to run up a ticket.",
  },
  {
    icon: IconWallet,
    title: "Up-front pricing",
    body: "You get a written estimate before any work starts. If the job runs into something unexpected, we stop and call you first.",
  },
  {
    icon: IconCheck,
    title: "Only what's needed",
    body: "We'll tell you what's urgent, what can wait, and what's genuinely fine. “Looks good, see you next time” is an answer we give often.",
  },
  {
    icon: IconKey,
    title: "Genuine parts",
    body: "OEM or a quality equivalent, your choice — and we keep the old parts so you can see what came off.",
  },
];

const SERVICE_HOURS = [
  { day: "Monday – Friday", time: "7:30 AM – 6:00 PM" },
  { day: "Saturday", time: "8:00 AM – 3:00 PM" },
  { day: "Sunday", time: "Closed" },
];
const SALES_HOURS = [
  { day: "Monday – Friday", time: "9:00 AM – 8:00 PM" },
  { day: "Saturday", time: "9:00 AM – 6:00 PM" },
  { day: "Sunday", time: "11:00 AM – 4:00 PM" },
];
const TIME_SLOTS = [
  "First available",
  "Morning (7:30 – 10:00)",
  "Midday (10:00 – 1:00)",
  "Afternoon (1:00 – 4:00)",
  "Late afternoon (4:00 – 6:00)",
];
const YEARS = Array.from({ length: 30 }, (_, i) => String(2026 - i));

type Values = {
  name: string;
  phone: string;
  email: string;
  year: string;
  make: string;
  model: string;
  date?: Date;
  time: string;
  details: string;
};
const EMPTY: Values = {
  name: "",
  phone: "",
  email: "",
  year: "",
  make: "",
  model: "",
  date: undefined,
  time: "",
  details: "",
};

function validate(v: Values): Partial<Record<keyof Values, string>> {
  const e: Partial<Record<keyof Values, string>> = {};
  if (v.name.trim().length < 2) e.name = "Your full name, please.";
  if (v.phone.replace(/\D/g, "").length < 10) e.phone = "A 10-digit phone number.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email))
    e.email = "Double-check the email address.";
  if (!v.year) e.year = "Model year.";
  if (v.make.trim().length < 2) e.make = "What make is it?";
  if (v.model.trim().length < 1) e.model = "What model is it?";
  if (!v.date) e.date = "Pick a day that works.";
  if (!v.time) e.time = "Roughly what time?";
  if (v.details.trim().length < 4) e.details = "A quick note on what's going on.";
  return e;
}

function ScheduleForm() {
  const [v, setV] = useState<Values>(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>(
    {},
  );
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [serverFields, setServerFields] = useState<Partial<Record<keyof Values, string>>>({});
  const clientErrors = useMemo(() => validate(v), [v]);
  const errors = { ...clientErrors, ...serverFields };

  const set = (k: keyof Values) => (val: string) =>
    setV((p) => ({ ...p, [k]: val }));
  const blur = (k: keyof Values) => () =>
    setTouched((p) => ({ ...p, [k]: true }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(
      Object.fromEntries(Object.keys(EMPTY).map((k) => [k, true])) as Record<
        keyof Values,
        boolean
      >,
    );
    setFormError(null);
    setServerFields({});
    if (Object.keys(clientErrors).length > 0) return;
    setSubmitting(true);
    try {
      await submitLead({
        type: "service",
        name: v.name,
        phone: v.phone,
        email: v.email,
        year: v.year,
        make: v.make,
        model: v.model,
        date: v.date ? format(v.date, "yyyy-MM-dd") : "",
        time: v.time,
        details: v.details,
      });
      setSubmitted(true);
    } catch (err) {
      if (isApiError(err) && err.fields) setServerFields(err.fields);
      setFormError(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="flex flex-col items-center py-8 text-center"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/20 text-gold-600">
          <IconCheck className="h-7 w-7" />
        </span>
        <h3 className="mt-4 font-heading text-xl font-bold text-ink">
          Request received, {v.name.split(" ")[0]}
        </h3>
        <p className="mt-2 max-w-sm text-[15px] leading-7 text-navy-600">
          Someone from the service desk will call to lock in the exact time for
          your {v.year} {v.make} {v.model}
          {v.date ? ` around ${format(v.date, "EEE, MMM d")}` : ""} and go over
          what to expect. Nothing gets worked on without your OK.
        </p>
        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
          <Button asChild variant="navy">
            <a href={TEL}>
              <IconPhone className="h-4 w-4" />
              Call the service desk
            </a>
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              setSubmitted(false);
              setV(EMPTY);
              setTouched({});
              setFormError(null);
              setServerFields({});
            }}
          >
            Book another
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
      {formError ? (
        <p
          role="alert"
          className="rounded-xl bg-red/10 px-3.5 py-2.5 text-[13.5px] font-medium text-red"
        >
          {formError}
        </p>
      ) : null}
      <FieldGroup title="Your contact info">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field
          id="s-name"
          label="Full name"
          touched={!!touched.name}
          error={errors.name}
          filled={!!v.name}
        >
          <Input
            id="s-name"
            autoComplete="name"
            value={v.name}
            onChange={(e) => set("name")(e.target.value)}
            onBlur={blur("name")}
            className={ringFor(!!touched.name, errors.name)}
          />
        </Field>
        <Field
          id="s-phone"
          label="Phone"
          touched={!!touched.phone}
          error={errors.phone}
          filled={!!v.phone}
        >
          <Input
            id="s-phone"
            type="tel"
            autoComplete="tel"
            value={v.phone}
            onChange={(e) => set("phone")(e.target.value)}
            onBlur={blur("phone")}
            className={ringFor(!!touched.phone, errors.phone)}
          />
        </Field>
        <Field
          id="s-email"
          label="Email"
          touched={!!touched.email}
          error={errors.email}
          filled={!!v.email}
        >
          <Input
            id="s-email"
            type="email"
            autoComplete="email"
            value={v.email}
            onChange={(e) => set("email")(e.target.value)}
            onBlur={blur("email")}
            className={ringFor(!!touched.email, errors.email)}
          />
        </Field>
      </div>
      </FieldGroup>

      <FieldGroup title="The car and the appointment">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field
          id="s-year"
          label="Year"
          touched={!!touched.year}
          error={errors.year}
          filled={!!v.year}
          showCheck={false}
        >
          <Select
            value={v.year}
            onValueChange={(val) => {
              set("year")(val);
              blur("year")();
            }}
          >
            <SelectTrigger
              id="s-year"
              className={ringFor(!!touched.year, errors.year)}
            >
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {YEARS.map((y) => (
                <SelectItem key={y} value={y}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field
          id="s-make"
          label="Make"
          touched={!!touched.make}
          error={errors.make}
          filled={!!v.make}
        >
          <Input
            id="s-make"
            placeholder="e.g. Honda"
            value={v.make}
            onChange={(e) => set("make")(e.target.value)}
            onBlur={blur("make")}
            className={ringFor(!!touched.make, errors.make)}
          />
        </Field>
        <Field
          id="s-model"
          label="Model"
          touched={!!touched.model}
          error={errors.model}
          filled={!!v.model}
        >
          <Input
            id="s-model"
            placeholder="e.g. CR-V"
            value={v.model}
            onChange={(e) => set("model")(e.target.value)}
            onBlur={blur("model")}
            className={ringFor(!!touched.model, errors.model)}
          />
        </Field>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field
          id="s-date"
          label="Preferred date"
          touched={!!touched.date}
          error={errors.date}
          filled={!!v.date}
          showCheck={false}
        >
          <DatePicker
            id="s-date"
            value={v.date}
            onChange={(d) => setV((p) => ({ ...p, date: d }))}
            onClose={blur("date")}
            className={ringFor(!!touched.date, errors.date)}
            placeholder="Pick a date"
          />
        </Field>
        <Field
          id="s-time"
          label="Preferred time"
          touched={!!touched.time}
          error={errors.time}
          filled={!!v.time}
          showCheck={false}
        >
          <Select
            value={v.time}
            onValueChange={(val) => {
              set("time")(val);
              blur("time")();
            }}
          >
            <SelectTrigger
              id="s-time"
              className={ringFor(!!touched.time, errors.time)}
            >
              <SelectValue placeholder="Select…" />
            </SelectTrigger>
            <SelectContent>
              {TIME_SLOTS.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </div>

      <Field
        id="s-details"
        label="What does it need?"
        touched={!!touched.details}
        error={errors.details}
        filled={!!v.details}
        showCheck={false}
      >
        <Textarea
          id="s-details"
          rows={3}
          placeholder="e.g. oil change and the brakes squeak when cold"
          value={v.details}
          onChange={(e) => set("details")(e.target.value)}
          onBlur={blur("details")}
          className={ringFor(!!touched.details, errors.details)}
        />
      </Field>
      </FieldGroup>

      <Button type="submit" size="lg" className="mt-1 w-full" disabled={submitting}>
        {submitting ? "Sending…" : "Request this appointment"}
        <IconArrowRight className="h-4 w-4" />
      </Button>
      <p className="text-center text-[12px] leading-5 text-navy-500">
        This sends a request, not a locked booking — we&apos;ll call to confirm
        the exact time. No charge for an estimate, and nothing gets done without
        your approval.
      </p>
    </form>
  );
}

export default function ServiceClient() {
  return (
    <div className="bg-mist">
      <PageBanner
        eyebrow="Service & Parts"
        title="Keep your car running right"
        description={
          <p>
            Our service team is here for the life of your car, not just the
            sale — for any make or model, whether you bought it from us or not.
            You&apos;ll always know the price and the reason{" "}
            <span className="text-white">before</span> we touch anything.
          </p>
        }
        image="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=2400&q=70"
        imageAlt="A technician servicing a vehicle in the Bergen Car Company shop"
      >
        <BannerPills
          items={["Any make or model", "Only what's needed", "Written estimate first"]}
        />
      </PageBanner>

      <section id="service-form" className="scroll-mt-24 py-14 sm:py-20">
        <div className="container-page">
          <FormShell
            asideTitle="What to expect"
            steps={STEPS}
            formTitle="Schedule service"
            formNote="Tell us the car and what's going on. We'll call back to pin down the time."
            footNote="This is a request, not a locked booking. No charge for an estimate, and nothing gets done without your OK."
          >
            <ScheduleForm />
          </FormShell>
        </div>
      </section>

      {/* services */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-page">
          <SectionHeading
            kicker="What we do"
            title="Services we handle in-house"
          >
            Routine upkeep through real repairs, for any make. If it&apos;s a job
            we&apos;re not the right shop for, we&apos;ll say so.
          </SectionHeading>

          <Stagger
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.08}
          >
            {SERVICES.map(({ icon: Icon, title, body, meta }) => (
              <StaggerItem
                key={title}
                className="group flex flex-col rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-transparent hover:shadow-[var(--shadow-lift)]"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-gold transition-colors duration-300 group-hover:bg-red group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="rounded-full bg-mist px-2.5 py-1 text-[11px] font-semibold text-navy-600">
                    {meta}
                  </span>
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold text-ink">
                  {title}
                </h3>
                <p className="mt-2 flex-1 text-[15px] leading-7 text-navy-600">
                  {body}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* transparent pricing */}
      <section className="bg-mist py-20 sm:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeading
            kicker="No mystery invoices"
            title="What a visit actually costs"
            className="lg:sticky lg:top-28"
          >
            Typical all-in ranges for the jobs people ask about most. Your car
            might land outside a range — if it does, you&apos;ll hear it from us
            before we start, in writing.
          </SectionHeading>

          <Reveal
            delay={0.05}
            className="overflow-hidden rounded-3xl border border-line-strong bg-white shadow-[var(--shadow-card)]"
          >
            <ul>
              {PRICING.map((p, i) => (
                <li
                  key={p.job}
                  className={`flex items-center justify-between gap-4 px-5 py-4 text-[14px] sm:px-6 ${
                    i > 0 ? "border-t border-line" : ""
                  }`}
                >
                  <span className="font-medium text-navy-700">{p.job}</span>
                  <span className="shrink-0 font-heading font-bold text-gold-600">
                    {p.range}
                  </span>
                </li>
              ))}
            </ul>
            <p className="border-t border-line bg-mist/50 px-5 py-3.5 text-[12px] leading-6 text-navy-500 sm:px-6">
              Diagnosis fee is credited toward the repair if you have us do the
              work. No shop-supply padding, no “document fee” on a repair order.
            </p>
          </Reveal>
        </div>
      </section>

      {/* how we quote */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-page">
          <SectionHeading
            kicker="How we quote"
            title="The oversell stops at step two"
            align="center"
          >
            The thing people dread about a service department is being talked
            into work. Here&apos;s the order every job goes in.
          </SectionHeading>

          <ol className="relative mt-14 grid gap-10 sm:grid-cols-4 sm:gap-6">
            <span
              aria-hidden
              className="absolute left-6 right-6 top-6 hidden h-px bg-line-strong sm:block"
            />
            {QUOTE_STEPS.map((s, i) => (
              <motion.li
                key={s.t}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: EASE }}
                className="relative"
              >
                <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-navy font-heading text-base font-bold text-gold ring-4 ring-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-heading text-[15px] font-semibold text-ink">
                  {s.t}
                </h3>
                <p className="mt-1.5 text-[13.5px] leading-6 text-navy-600">
                  {s.b}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* why service with us */}
      <section className="bg-mist py-20 sm:py-24">
        <div className="container-page">
          <SectionHeading
            kicker="Why service with us"
            title="No upsell, no scare tactics"
          >
            The thing people dread about a dealership service department is being
            talked into work they don&apos;t need. Here&apos;s how we keep that
            from happening.
          </SectionHeading>

          <Stagger
            className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
            stagger={0.09}
          >
            {WHY.map(({ icon: Icon, title, body }) => (
              <StaggerItem key={title}>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-gold">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold text-ink">
                  {title}
                </h3>
                <p className="mt-2 text-[15px] leading-7 text-navy-600">{body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* hours & contact */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-page">
          <SectionHeading
            kicker="Hours &amp; contact"
            title="The service desk keeps its own hours"
          >
            We open earlier than the showroom so you can drop off before work.
            Same lot, Route 46 in Lodi.
          </SectionHeading>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
            <Reveal className="rounded-3xl bg-white p-6 ring-1 ring-line shadow-[var(--shadow-card)] sm:p-7">
              <div className="flex items-center gap-2">
                <IconClock className="h-5 w-5 text-red" />
                <h3 className="font-heading text-sm font-bold text-ink">
                  Service department
                </h3>
              </div>
              <dl className="mt-3 divide-y divide-line">
                {SERVICE_HOURS.map((h) => (
                  <div
                    key={h.day}
                    className="flex justify-between py-2.5 text-[14px]"
                  >
                    <dt className="text-navy-600">{h.day}</dt>
                    <dd className="font-medium text-ink">{h.time}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-4 border-t border-line pt-4">
                <p className="text-[12px] font-semibold uppercase tracking-wide text-navy-500">
                  Showroom &amp; sales
                </p>
                <dl className="mt-2 divide-y divide-line">
                  {SALES_HOURS.map((h) => (
                    <div
                      key={h.day}
                      className="flex justify-between py-2 text-[13px]"
                    >
                      <dt className="text-navy-500">{h.day}</dt>
                      <dd className="text-navy-600">{h.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>

            <Reveal
              delay={0.08}
              className="flex flex-col gap-4 rounded-3xl bg-navy p-6 text-white sm:p-7"
            >
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-wide text-white/50">
                  Service desk
                </p>
                <a
                  href={TEL}
                  className="mt-1 flex items-center gap-2 font-heading text-xl font-bold text-white transition-colors hover:text-gold"
                >
                  <IconPhone className="h-5 w-5 text-gold" />
                  (973) 555-0142
                </a>
                <a
                  href="mailto:service@bergencarcompany.com"
                  className="mt-2 flex items-center gap-2 text-[13px] text-white/70 hover:text-white"
                >
                  <IconMail className="h-4 w-4 text-gold" />
                  service@bergencarcompany.com
                </a>
              </div>
              <div className="mt-auto border-t border-white/10 pt-4">
                <p className="flex items-start gap-2 text-[14px] text-white/80">
                  <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  412 Route 46, Lodi, NJ 07644
                </p>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Lodi,+New+Jersey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-white/20"
                >
                  Get directions
                  <IconArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-navy py-16 sm:py-20">
        <div className="container-page">
          <Reveal className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <p className="eyebrow text-gold">About a minute</p>
              <h2 className="display-3 mt-3 text-white">Book service online</h2>
              <p className="mt-2 text-[15px] leading-7 text-white/70">
                Request a time and we&apos;ll call to confirm. You&apos;ll see the
                estimate before any work starts.
              </p>
            </div>
            <Button asChild variant="gold" size="lg" className="shrink-0">
              <Link href="#service-form">
                Schedule service
                <IconArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
