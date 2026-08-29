"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { Reveal, Stagger, StaggerItem } from "../components/motion";
import PageBanner, { BannerPills } from "../components/page-banner";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { DatePicker } from "../components/ui/date-picker";
import { VehicleCombobox } from "../components/ui/vehicle-combobox";
import { Field, FieldGroup, ringFor, EASE } from "../components/ui/form-parts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  VEHICLES,
  currency,
  miles,
  estMonthly,
  type Vehicle,
} from "../lib/inventory";
import {
  IconArrowRight,
  IconCalendar,
  IconCheck,
  IconClock,
  IconKey,
  IconPhone,
  IconPin,
  IconRoad,
  IconShield,
  IconSpark,
} from "../components/icons";

const TEL = "tel:+19735550142";
const PHONE = "(973) 555-0142";

const TIME_SLOTS = [
  "First available",
  "Morning (9:00 – 11:00)",
  "Midday (11:00 – 1:00)",
  "Afternoon (1:00 – 4:00)",
  "Evening (4:00 – 7:00)",
];
const TIME_HOUR: Record<string, number> = {
  "First available": 10,
  "Morning (9:00 – 11:00)": 9,
  "Midday (11:00 – 1:00)": 11,
  "Afternoon (1:00 – 4:00)": 13,
  "Evening (4:00 – 7:00)": 16,
};

const EXPECT = [
  {
    icon: IconKey,
    title: "Arrive & meet your salesperson",
    body: "Ask for whoever you booked with at the front desk. The keys and plates are already pulled — no standing around while someone goes to “find the car.”",
  },
  {
    icon: IconRoad,
    title: "Take it for a real drive",
    body: "Twenty to thirty minutes, your route. Get it on Route 46 and the side streets, try the parking, the brakes, the seats. We'll ride along to answer questions or give you space — your call.",
  },
  {
    icon: IconShield,
    title: "No pressure to decide on the spot",
    body: "Liked it? We'll talk numbers. Didn't? That's genuinely fine. Nobody here is on a commission-only plan, so “I want to think about it” is a normal thing for us to hear.",
  },
];

const WORRIES = [
  {
    q: "Can I bring my kids?",
    a: "Yes — and bring the car seats too. A test drive is the best way to check they actually fit across the back. There's seating out front if someone would rather wait.",
  },
  {
    q: "Can I drive more than one?",
    a: "Please do. Back-to-back is the only real way to feel the difference between two cars. Tell us what you're deciding between and we'll have both ready.",
  },
  {
    q: "What if I'm running late?",
    a: `Just call ${PHONE}. We hold the slot 20 minutes, and pushing it back is no problem — traffic on 46 is a fact of life around here.`,
  },
  {
    q: "Do I need financing sorted first?",
    a: "No. Drive first, work out numbers after. If you'd like a payment estimate before you fall for something, the financing page does that with a soft credit check that won't touch your score.",
  },
];

type Values = {
  name: string;
  phone: string;
  email: string;
  date?: Date;
  time: string;
  notes: string;
};
const EMPTY: Values = {
  name: "",
  phone: "",
  email: "",
  date: undefined,
  time: "",
  notes: "",
};

function validate(v: Values, vehicle?: Vehicle) {
  const e: Partial<Record<keyof Values | "vehicle", string>> = {};
  if (!vehicle) e.vehicle = "Pick which car you'd like to drive.";
  if (v.name.trim().length < 2) e.name = "Your full name, please.";
  if (v.phone.replace(/\D/g, "").length < 10) e.phone = "A 10-digit phone number.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email))
    e.email = "Double-check the email address.";
  if (!v.date) e.date = "Pick a day that works.";
  if (!v.time) e.time = "Roughly what time?";
  return e;
}

function gcalLink(vehicle: Vehicle, date: Date, timeLabel: string) {
  const hour = TIME_HOUR[timeLabel] ?? 10;
  const start = new Date(date);
  start.setHours(hour, 0, 0, 0);
  const end = new Date(start);
  end.setHours(hour + 1);
  const pad = (n: number) => String(n).padStart(2, "0");
  const stamp = (d: Date) =>
    `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(
      d.getHours(),
    )}${pad(d.getMinutes())}00`;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `Test drive — ${vehicle.year} ${vehicle.make} ${vehicle.model}`,
    dates: `${stamp(start)}/${stamp(end)}`,
    ctz: "America/New_York",
    details:
      "Test drive at Bergen Car Company. Bring a valid driver's license. No obligation to buy.",
    location: "412 Route 46, Lodi, NJ 07644",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2.5">
      <dt className="shrink-0 text-[12px] font-semibold uppercase tracking-wide text-white/45">
        {label}
      </dt>
      <dd className="text-right text-[14px] font-medium text-white">{value}</dd>
    </div>
  );
}

function Booking() {
  const params = useSearchParams();
  const preselected = useMemo(
    () => VEHICLES.find((v) => v.id === params.get("vehicle")),
    [params],
  );

  const [vehicle, setVehicle] = useState<Vehicle | undefined>(preselected);
  const [v, setV] = useState<Values>(EMPTY);
  const [touched, setTouched] = useState<
    Partial<Record<keyof Values | "vehicle", boolean>>
  >({});
  const [submitted, setSubmitted] = useState(false);

  const errors = useMemo(() => validate(v, vehicle), [v, vehicle]);

  const set = (k: keyof Values) => (val: string) =>
    setV((p) => ({ ...p, [k]: val }));
  const blur = (k: keyof Values | "vehicle") => () =>
    setTouched((p) => ({ ...p, [k]: true }));

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({
      vehicle: true,
      name: true,
      phone: true,
      email: true,
      date: true,
      time: true,
      notes: true,
    });
    if (Object.keys(errors).length === 0) setSubmitted(true);
  }

  function reset() {
    setSubmitted(false);
    setV(EMPTY);
    setTouched({});
    setVehicle(undefined);
  }

  return (
    <Reveal className="mx-auto max-w-2xl overflow-hidden rounded-3xl bg-white shadow-[var(--shadow-widget)] ring-1 ring-line-strong">
      {/* card header strip */}
      <div className="flex items-center justify-between gap-3 border-b border-line-strong bg-navy px-6 py-4 text-white sm:px-8">
        <p className="flex items-center gap-2 font-heading text-[15px] font-bold">
          <IconCalendar className="h-4 w-4 text-gold" />
          {submitted ? "Your appointment" : "Book your test drive"}
        </p>
        <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/80">
          {submitted ? "Confirmed" : "About a minute · no obligation"}
        </span>
      </div>

      <div className="px-6 py-7 sm:px-8 sm:py-9">
        <AnimatePresence mode="wait">
          {submitted && vehicle ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <div className="flex flex-col items-center text-center">
                <motion.span
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.4, ease: EASE }}
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/20 text-gold-600"
                >
                  <IconCheck className="h-7 w-7" />
                </motion.span>
                <h3 className="mt-4 font-heading text-2xl font-bold text-ink">
                  You&apos;re on the calendar, {v.name.split(" ")[0]}
                </h3>
                <p className="mt-2 max-w-md text-[15px] leading-7 text-navy-600">
                  We&apos;ve got the {vehicle.year} {vehicle.make} {vehicle.model}{" "}
                  set aside for you
                  {v.date ? ` on ${format(v.date, "EEEE, MMMM d")}` : ""}. Someone
                  will text a confirmation to {v.phone} within the hour to lock
                  the exact time.
                </p>
              </div>

              <dl className="mt-6 divide-y divide-white/10 rounded-2xl bg-navy px-5 py-3 sm:px-6">
                <Row
                  label="Vehicle"
                  value={`${vehicle.year} ${vehicle.make} ${vehicle.model} · ${vehicle.trim}`}
                />
                {v.date && (
                  <Row label="Date" value={format(v.date, "EEE, MMM d, yyyy")} />
                )}
                <Row label="Time" value={v.time} />
                <Row label="Name" value={v.name} />
                <Row label="Phone" value={v.phone} />
                <Row label="Email" value={v.email} />
                {v.notes.trim() && <Row label="Notes" value={v.notes.trim()} />}
              </dl>

              <p className="mt-5 flex items-start gap-2 rounded-xl bg-mist/70 px-4 py-3 text-[13px] leading-6 text-navy-600">
                <IconShield className="mt-0.5 h-4 w-4 shrink-0 text-navy-400" />
                This still isn&apos;t a commitment to buy anything — it&apos;s a
                drive. Show up, take it around the block, and decide nothing until
                you&apos;re ready.
              </p>

              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
                {v.date && (
                  <Button asChild variant="navy">
                    <a
                      href={gcalLink(vehicle, v.date, v.time)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IconCalendar className="h-4 w-4" />
                      Add to Google Calendar
                    </a>
                  </Button>
                )}
                <Button asChild variant="outline">
                  <Link href="/inventory">Browse more cars</Link>
                </Button>
                <Button variant="ghost" onClick={reset}>
                  Book another
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
                <FieldGroup title="Which car?">
                  <Field
                    id="td-vehicle"
                    label="Vehicle"
                    touched={!!touched.vehicle}
                    error={errors.vehicle}
                    filled={!!vehicle}
                    showCheck={false}
                    hint={
                      preselected && vehicle?.id === preselected.id
                        ? "Pre-filled from the car you were looking at — change it anytime."
                        : undefined
                    }
                  >
                    <VehicleCombobox
                      id="td-vehicle"
                      vehicles={VEHICLES}
                      value={vehicle}
                      onChange={(nv) => {
                        setVehicle(nv);
                        blur("vehicle")();
                      }}
                      onClose={blur("vehicle")}
                      invalid={!!touched.vehicle && !!errors.vehicle}
                    />
                  </Field>

                  <AnimatePresence initial={false}>
                    {vehicle && (
                      <motion.div
                        key={vehicle.id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.32, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <div className="flex gap-4 rounded-2xl border border-line bg-mist/50 p-3">
                          <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl bg-cloud">
                            <Image
                              src={vehicle.image}
                              alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                              fill
                              sizes="112px"
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-heading text-[15px] font-bold text-ink">
                              {vehicle.year} {vehicle.make} {vehicle.model}
                            </p>
                            <p className="text-[12.5px] text-navy-500">
                              {vehicle.trim} · {vehicle.drivetrain} ·{" "}
                              {miles(vehicle.mileage)}
                            </p>
                            <p className="mt-1 text-[13px] font-semibold text-gold-600">
                              {currency(vehicle.price)}
                              <span className="font-normal text-navy-500">
                                {" "}
                                · est. {currency(estMonthly(vehicle.price))}/mo
                              </span>
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setVehicle(undefined)}
                            className="self-start text-[12px] font-semibold text-navy-500 underline-offset-2 hover:text-red hover:underline"
                          >
                            Change
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </FieldGroup>

                <FieldGroup title="Your details">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field
                      id="td-name"
                      label="Full name"
                      touched={!!touched.name}
                      error={errors.name}
                      filled={!!v.name}
                    >
                      <Input
                        id="td-name"
                        autoComplete="name"
                        value={v.name}
                        onChange={(e) => set("name")(e.target.value)}
                        onBlur={blur("name")}
                        className={ringFor(!!touched.name, errors.name)}
                      />
                    </Field>
                    <Field
                      id="td-phone"
                      label="Phone"
                      touched={!!touched.phone}
                      error={errors.phone}
                      filled={!!v.phone}
                    >
                      <Input
                        id="td-phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="(973) 555-0000"
                        value={v.phone}
                        onChange={(e) => set("phone")(e.target.value)}
                        onBlur={blur("phone")}
                        className={ringFor(!!touched.phone, errors.phone)}
                      />
                    </Field>
                  </div>
                  <Field
                    id="td-email"
                    label="Email"
                    touched={!!touched.email}
                    error={errors.email}
                    filled={!!v.email}
                  >
                    <Input
                      id="td-email"
                      type="email"
                      autoComplete="email"
                      value={v.email}
                      onChange={(e) => set("email")(e.target.value)}
                      onBlur={blur("email")}
                      className={ringFor(!!touched.email, errors.email)}
                    />
                  </Field>
                </FieldGroup>

                <FieldGroup title="When works for you?">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field
                      id="td-date"
                      label="Preferred date"
                      touched={!!touched.date}
                      error={errors.date}
                      filled={!!v.date}
                      showCheck={false}
                    >
                      <DatePicker
                        id="td-date"
                        value={v.date}
                        onChange={(d) => setV((p) => ({ ...p, date: d }))}
                        onClose={blur("date")}
                        className={ringFor(!!touched.date, errors.date)}
                        placeholder="Pick a date"
                      />
                    </Field>
                    <Field
                      id="td-time"
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
                          id="td-time"
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
                    id="td-notes"
                    label="Anything we should know? (optional)"
                    touched={!!touched.notes}
                    filled={!!v.notes}
                    showCheck={false}
                  >
                    <Textarea
                      id="td-notes"
                      rows={3}
                      placeholder="e.g. deciding between this and the RAV4, or I'll have my two kids with me"
                      value={v.notes}
                      onChange={(e) => set("notes")(e.target.value)}
                      onBlur={blur("notes")}
                    />
                  </Field>
                </FieldGroup>

                <Button type="submit" size="lg" className="mt-1 w-full">
                  Confirm my test drive
                  <IconArrowRight className="h-4 w-4" />
                </Button>
                <p className="text-center text-[12px] leading-5 text-navy-500">
                  Booking a test drive is not a commitment to buy. We&apos;ll
                  text to confirm the exact time — that&apos;s the only follow-up
                  you&apos;ll get.
                </p>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

export default function TestDriveClient() {
  return (
    <div className="bg-mist">
      <PageBanner
        eyebrow="Test drive"
        title="Come take it for a spin"
        description={
          <p>
            Pick a car, pick a time, and the keys will be waiting. It takes about
            a minute to book — and booking one is{" "}
            <span className="text-white">not</span> a commitment to buy anything.
          </p>
        }
        image="https://images.pexels.com/photos/7144207/pexels-photo-7144207.jpeg?auto=compress&cs=tinysrgb&w=2400"
        imageAlt="A salesperson handing car keys to a customer beside a car on the showroom floor"
      >
        <BannerPills
          items={[
            "About a minute to book",
            "No obligation to buy",
            "Keys ready when you arrive",
          ]}
        />
      </PageBanner>

      {/* booking */}
      <section id="book" className="scroll-mt-24 py-14 sm:py-20">
        <div className="container-page">
          <Reveal className="mx-auto mb-10 max-w-2xl text-center">
            <p className="eyebrow text-red">Book it</p>
            <h2 className="display-2 mt-2 text-ink">
              Two quick steps and you&apos;re set
            </h2>
            <p className="mt-3 text-[15px] leading-7 text-navy-600">
              Choose the car you want to drive, tell us when, and we&apos;ll have
              it up front with plates on.
            </p>
          </Reveal>
          <Booking />
        </div>
      </section>

      {/* what to expect */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-red">What to expect</p>
            <h2 className="display-2 mt-2 text-ink">
              How a test drive here actually goes
            </h2>
            <p className="mt-4 text-lg leading-8 text-navy-600">
              Thirty minutes, start to finish. No sales script, no clipboard
              ambush in the parking lot.
            </p>
          </Reveal>

          <Stagger
            className="mt-12 grid gap-6 sm:grid-cols-3"
            stagger={0.1}
          >
            {EXPECT.map(({ icon: Icon, title, body }, i) => (
              <StaggerItem
                key={title}
                className="group relative flex flex-col rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-transparent hover:shadow-[var(--shadow-lift)]"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-gold transition-colors duration-300 group-hover:bg-red group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="font-heading text-3xl font-bold text-cloud">
                    {i + 1}
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

      {/* the honest / no-pressure section */}
      <section className="relative overflow-hidden bg-navy py-20 sm:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-gold/10 blur-3xl"
        />
        <div className="container-page relative grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <Reveal>
            <p className="eyebrow flex items-center gap-2 text-gold">
              <span className="h-px w-8 bg-gold/70" />
              The honest part
            </p>
            <h2 className="display-2 mt-4 text-white">
              Booking a test drive isn&apos;t agreeing to buy a car
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/75">
              It&apos;s the single biggest reason people put off coming in — the
              worry that showing up means getting worked over until they sign
              something. It doesn&apos;t. A test drive is a test drive.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-white/60">
              Drive two or three. Leave. Sleep on it. Come back next week if you
              want. The car will still be here, or another one like it will be.
            </p>
          </Reveal>

          <Stagger className="grid gap-3" stagger={0.08}>
            {[
              {
                icon: IconCheck,
                t: "No deposit, no paperwork to drive",
                b: "A valid license is the only thing you hand over, and you get it right back.",
              },
              {
                icon: IconClock,
                t: "Leave whenever you like",
                b: "Before, during, or after the drive. Nobody will block the door with a four-square worksheet.",
              },
              {
                icon: IconSpark,
                t: "Zero commission-only pressure",
                b: "Our people are paid to help you find the right car, not to trap you in the one you drove.",
              },
            ].map(({ icon: Icon, t, b }) => (
              <StaggerItem
                key={t}
                className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-gold">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-heading text-[15px] font-semibold text-white">
                    {t}
                  </p>
                  <p className="mt-1 text-[13px] leading-6 text-white/55">{b}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* before you come in */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow text-red">Before you come in</p>
            <h2 className="display-3 mt-2 text-ink">Bring one thing</h2>
            <p className="mt-4 text-[15px] leading-7 text-navy-600">
              A valid driver&apos;s license. That&apos;s the whole list. We make a
              copy, you drive — our dealer policy covers the insurance, and the
              plates go on before you pull out.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Valid driver's license",
                "About 30 minutes",
                "Optional: your trade-in, if you want it appraised while you're here",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[14px] text-navy-700"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold-600">
                    <IconCheck className="h-3.5 w-3.5" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 flex items-center gap-2 text-[13px] text-navy-500">
              <IconPin className="h-4 w-4 text-navy-400" />
              412 Route 46, Lodi, NJ 07644
            </p>
          </Reveal>

          <div>
            <Reveal className="mb-6">
              <h3 className="font-heading text-lg font-bold text-ink">
                Quick answers
              </h3>
              <p className="mt-1 text-[14px] text-navy-600">
                The stuff people ask when they&apos;re on the fence about booking.
              </p>
            </Reveal>
            <Stagger className="grid gap-4 sm:grid-cols-2" stagger={0.08}>
              {WORRIES.map(({ q, a }) => (
                <StaggerItem
                  key={q}
                  className="rounded-2xl border border-line bg-white p-5 shadow-[var(--shadow-card)] transition-shadow duration-300 hover:shadow-[var(--shadow-lift)]"
                >
                  <p className="font-heading text-[15px] font-semibold text-ink">
                    {q}
                  </p>
                  <p className="mt-2 text-[13.5px] leading-6 text-navy-600">{a}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* bottom CTA */}
      <section className="bg-mist pb-16 sm:pb-20">
        <div className="container-page">
          <Reveal className="relative overflow-hidden rounded-3xl bg-navy p-8 sm:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-16 select-none font-heading text-[11rem] leading-none text-white/[0.05] sm:text-[15rem]"
            >
              &rarr;
            </div>
            <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-xl">
                <p className="eyebrow text-gold">Rather just show up?</p>
                <h2 className="display-3 mt-3 text-white">
                  Walk-ins are always welcome
                </h2>
                <p className="mt-3 text-[15px] leading-7 text-white/70">
                  The lot&apos;s open every day during showroom hours. Booking
                  just means the keys are waiting and someone&apos;s expecting
                  you — but you don&apos;t have to.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-2.5 sm:flex-row">
                <Button asChild variant="gold" size="lg">
                  <a href={TEL}>
                    <IconPhone className="h-4 w-4" />
                    {PHONE}
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/30 bg-transparent text-white hover:border-white hover:bg-white hover:text-navy"
                >
                  <Link href="/inventory">
                    Browse inventory
                    <IconArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
