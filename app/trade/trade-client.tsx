"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Reveal, Stagger, StaggerItem } from "../components/motion";
import { SectionHeading } from "../components/section-heading";
import PageBanner, { BannerPills } from "../components/page-banner";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Field, FieldGroup, FormShell, ringFor, EASE } from "../components/ui/form-parts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import {
  IconArrowRight,
  IconCheck,
  IconClock,
  IconClose,
  IconPhone,
  IconShield,
  IconWallet,
} from "../components/icons";
import { isApiError, submitLead } from "../lib/api";

const YEARS = Array.from({ length: 24 }, (_, i) => String(2026 - i));
const MAKES = [
  "Acura","Audi","BMW","Buick","Cadillac","Chevrolet","Chrysler","Dodge","Ford",
  "GMC","Honda","Hyundai","Infiniti","Jeep","Kia","Land Rover","Lexus","Lincoln",
  "Mazda","Mercedes-Benz","Mini","Mitsubishi","Nissan","Ram","Subaru","Tesla",
  "Toyota","Volkswagen","Volvo","Other",
];

const STEPS = [
  {
    title: "Tell us about your car",
    body: "Year, make, model, mileage, honest condition. No VIN or title needed yet.",
  },
  {
    title: "Get your estimate",
    body: "Priced against live auction data and local comps, sent to you the same day — with the math.",
  },
  {
    title: "Bring it in, drive away",
    body: "A 20-minute appraisal confirms it. Trade it, or take the cash. Your call.",
  },
];

const BREAKDOWN = [
  {
    label: "What comparable cars retail for near Lodi",
    pct: 100,
    tone: "muted",
    caption: "The retail comps — what your car would sell for on a lot, reconditioned and warrantied.",
  },
  {
    label: "Today's wholesale (auction) value for your exact car",
    pct: 78,
    tone: "muted",
    caption: "Year, trim, mileage, and condition, priced against live auction data.",
  },
  {
    label: "Our cost to recondition, inspect & warranty it",
    pct: 15,
    tone: "cost",
    caption: "Subtracted — the real spend to get it lot-ready and covered.",
  },
  {
    label: "A fair trade offer lands here",
    pct: 72,
    tone: "offer",
    caption: "We start from these numbers, not a guess, and we show you each one.",
  },
];

const COMPARE = [
  {
    label: "Best-case money",
    us: "A fair market trade value",
    them: "Often a few hundred to a couple thousand more",
    themWins: true,
  },
  {
    label: "Time until it's done",
    us: "Same day",
    them: "Days to weeks of listing and calls",
    themWins: false,
  },
  {
    label: "Strangers at your home",
    us: "None",
    them: "Test drives with people you don't know",
    themWins: false,
  },
  {
    label: "NJ sales-tax savings",
    us: "Trade value lowers the tax on your next car",
    them: "No tax benefit",
    themWins: false,
  },
  {
    label: "Loan payoff & title",
    us: "We deal with your lender and the DMV",
    them: "You handle the payoff and paperwork",
    themWins: false,
  },
];

const WHY = [
  {
    icon: IconShield,
    title: "No lowball offers",
    body: "We'll show you the math — the auction value, the local retail comps, and what we expect to spend getting it lot-ready. Nothing hidden.",
  },
  {
    icon: IconClock,
    title: "Same-day written offer",
    body: "You get a number in writing, usually within a few hours during business hours. It's good for seven days, no pressure to decide on the spot.",
  },
  {
    icon: IconWallet,
    title: "Credit or cash — your choice",
    body: "Apply the value to any vehicle on the lot, or just take the check and walk. You don't have to buy a car from us to sell us yours.",
  },
  {
    icon: IconCheck,
    title: "We handle the payoff",
    body: "Still owe money on it? We deal directly with your lender to pay off the loan and sort out any equity or difference with you.",
  },
];

export const FAQS = [
  {
    q: "How do you decide what my car is worth?",
    a: "Three things: the current wholesale (auction) value for your exact year, trim, mileage, and condition; what comparable cars are actually selling for at dealers near Lodi right now; and our realistic cost to recondition, inspect, and warranty it. We start from those numbers, not from a guess, and we'll walk you through each one.",
  },
  {
    q: "Won't I get more selling it myself?",
    a: "Sometimes — a private sale can net a few hundred to a couple thousand more on the right car. But it also means listing it, fielding calls, meeting strangers, and handling the title and payoff yourself. Plenty of people decide the trade is worth it for the convenience and the tax savings in New Jersey. We'll tell you honestly if we think your car is one that sells well privately.",
  },
  {
    q: "What if I still owe money on it?",
    a: "That's normal and it's not a problem. If your car is worth more than you owe, the difference goes toward your next car or back to you. If you owe more than it's worth, we can usually roll the shortfall into financing — we'll show you exactly how that affects the payment before you agree to anything.",
  },
  {
    q: "Do I have to buy a car from you to trade one in?",
    a: "No. We'll buy your car outright whether or not you're shopping with us. If you do end up buying here, applying the trade value reduces the sales tax you pay in New Jersey, which is often worth more than it sounds.",
  },
  {
    q: "Will the in-person number match the estimate?",
    a: "It should, as long as the car is roughly what you described. The appraisal just confirms mileage, condition, and that there are no surprises like frame damage or a branded title. If something's different, we'll explain the change — we don't drop the number at the last minute as a tactic.",
  },
];

type Values = {
  year: string;
  make: string;
  model: string;
  trim: string;
  mileage: string;
  condition: string;
  zip: string;
  name: string;
  email: string;
  phone: string;
};
const EMPTY: Values = {
  year: "",
  make: "",
  model: "",
  trim: "",
  mileage: "",
  condition: "",
  zip: "",
  name: "",
  email: "",
  phone: "",
};

function validate(v: Values): Partial<Record<keyof Values, string>> {
  const e: Partial<Record<keyof Values, string>> = {};
  if (!v.year) e.year = "Pick the model year.";
  if (!v.make) e.make = "Pick the make.";
  if (v.model.trim().length < 1) e.model = "What model is it?";
  if (!(Number(v.mileage.replace(/[^0-9]/g, "")) > 0))
    e.mileage = "Roughly how many miles?";
  if (!v.condition) e.condition = "Your honest read is fine.";
  if (v.zip.replace(/\D/g, "").length !== 5) e.zip = "A 5-digit ZIP code.";
  if (v.name.trim().length < 2) e.name = "Your full name, please.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email))
    e.email = "Double-check the email address.";
  if (v.phone.replace(/\D/g, "").length < 10)
    e.phone = "A 10-digit phone number.";
  return e;
}

function TradeForm() {
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
        type: "trade",
        ...v,
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
          Got it, {v.name.split(" ")[0]}
        </h3>
        <p className="mt-2 max-w-sm text-[15px] leading-7 text-navy-600">
          We&apos;ll work up a real number on your {v.year} {v.make} {v.model} and
          get it back to you today during business hours — in writing, with the
          math behind it. No obligation to do anything with it.
        </p>
        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
          <Button asChild variant="navy">
            <a href="tel:+19739286300">
              <IconPhone className="h-4 w-4" />
              Call us now
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
            Start over
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
      <FieldGroup title="Your vehicle">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field
          id="t-year"
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
              id="t-year"
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
          id="t-make"
          label="Make"
          touched={!!touched.make}
          error={errors.make}
          filled={!!v.make}
          showCheck={false}
        >
          <Select
            value={v.make}
            onValueChange={(val) => {
              set("make")(val);
              blur("make")();
            }}
          >
            <SelectTrigger
              id="t-make"
              className={ringFor(!!touched.make, errors.make)}
            >
              <SelectValue placeholder="Make" />
            </SelectTrigger>
            <SelectContent>
              {MAKES.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field
          id="t-model"
          label="Model"
          touched={!!touched.model}
          error={errors.model}
          filled={!!v.model}
        >
          <Input
            id="t-model"
            placeholder="e.g. Camry"
            value={v.model}
            onChange={(e) => set("model")(e.target.value)}
            onBlur={blur("model")}
            className={ringFor(!!touched.model, errors.model)}
          />
        </Field>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field
          id="t-trim"
          label="Trim"
          touched={!!touched.trim}
          filled={!!v.trim}
        >
          <Input
            id="t-trim"
            placeholder="Optional"
            value={v.trim}
            onChange={(e) => set("trim")(e.target.value)}
            onBlur={blur("trim")}
          />
        </Field>
        <Field
          id="t-mileage"
          label="Mileage"
          touched={!!touched.mileage}
          error={errors.mileage}
          filled={!!v.mileage}
        >
          <Input
            id="t-mileage"
            inputMode="numeric"
            placeholder="68,000"
            value={v.mileage}
            onChange={(e) => set("mileage")(e.target.value)}
            onBlur={blur("mileage")}
            className={ringFor(!!touched.mileage, errors.mileage)}
          />
        </Field>
        <Field
          id="t-condition"
          label="Condition"
          touched={!!touched.condition}
          error={errors.condition}
          filled={!!v.condition}
          showCheck={false}
        >
          <Select
            value={v.condition}
            onValueChange={(val) => {
              set("condition")(val);
              blur("condition")();
            }}
          >
            <SelectTrigger
              id="t-condition"
              className={ringFor(!!touched.condition, errors.condition)}
            >
              <SelectValue placeholder="Condition" />
            </SelectTrigger>
            <SelectContent>
              {["Excellent", "Good", "Fair", "Poor"].map((o) => (
                <SelectItem key={o} value={o}>
                  {o}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field
          id="t-zip"
          label="ZIP code"
          touched={!!touched.zip}
          error={errors.zip}
          filled={!!v.zip}
        >
          <Input
            id="t-zip"
            inputMode="numeric"
            maxLength={5}
            placeholder="07644"
            value={v.zip}
            onChange={(e) => set("zip")(e.target.value.replace(/\D/g, ""))}
            onBlur={blur("zip")}
            className={ringFor(!!touched.zip, errors.zip)}
          />
        </Field>
      </div>

      </FieldGroup>

      <FieldGroup title="Where to send the estimate">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field
            id="t-name"
            label="Full name"
            touched={!!touched.name}
            error={errors.name}
            filled={!!v.name}
          >
            <Input
              id="t-name"
              autoComplete="name"
              value={v.name}
              onChange={(e) => set("name")(e.target.value)}
              onBlur={blur("name")}
              className={ringFor(!!touched.name, errors.name)}
            />
          </Field>
          <Field
            id="t-phone"
            label="Phone"
            touched={!!touched.phone}
            error={errors.phone}
            filled={!!v.phone}
          >
            <Input
              id="t-phone"
              type="tel"
              autoComplete="tel"
              value={v.phone}
              onChange={(e) => set("phone")(e.target.value)}
              onBlur={blur("phone")}
              className={ringFor(!!touched.phone, errors.phone)}
            />
          </Field>
          <Field
            id="t-email"
            label="Email"
            touched={!!touched.email}
            error={errors.email}
            filled={!!v.email}
          >
            <Input
              id="t-email"
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

      <Button type="submit" size="lg" className="mt-1 w-full" disabled={submitting}>
        {submitting ? "Sending…" : "Get my trade-in estimate"}
        <IconArrowRight className="h-4 w-4" />
      </Button>
      <p className="text-center text-[12px] leading-5 text-navy-500">
        No obligation, no hard credit check, and we never sell your information.
        An estimate isn&apos;t a locked offer — the final number is confirmed in
        person.
      </p>
    </form>
  );
}

export default function TradeClient() {
  return (
    <div className="bg-mist">
      <PageBanner
        eyebrow="Trade-in"
        title="Get a real value for your trade-in"
        description={
          <p>
            Tell us about your car and we&apos;ll send a fair,{" "}
            <span className="text-white">no-obligation</span> estimate the same
            day — with the numbers we used to get there. Trade it toward
            anything on the lot, or just take the cash.
          </p>
        }
        image="https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=2400&q=70"
        imageAlt="A used car arriving for a trade-in appraisal at Bergen Car Company"
      >
        <BannerPills items={["No-obligation", "Same-day estimate", "We show our math"]} />
      </PageBanner>

      <section id="trade-form" className="scroll-mt-24 py-14 sm:py-20">
        <div className="container-page">
          <FormShell
            asideTitle="How it works"
            steps={STEPS}
            formTitle="Tell us about your car"
            formNote={
              <>
                Quick and straightforward. Just selling — not shopping?{" "}
                <Link
                  href="/sell"
                  className="font-semibold text-navy underline-offset-2 hover:text-red hover:underline"
                >
                  Use Sell Your Car instead
                </Link>
                .
              </>
            }
            footNote="No obligation, no hard credit check. We never sell your information."
          >
            <TradeForm />
          </FormShell>
        </div>
      </section>

      {/* how we get to your number */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-page">
          <SectionHeading
            kicker="No black box"
            title="How we get to your number"
          >
            A trade offer isn&apos;t a vibe. It&apos;s built from three real
            figures, and you get to see all three.
          </SectionHeading>

          <div className="mt-12 space-y-6">
            {BREAKDOWN.map((row, i) => (
              <motion.div
                key={row.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                className={
                  row.tone === "offer"
                    ? "rounded-2xl border border-gold/40 bg-gold/[0.06] p-5"
                    : ""
                }
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <p
                    className={`text-[14px] font-semibold ${
                      row.tone === "offer" ? "text-ink" : "text-navy-700"
                    }`}
                  >
                    {row.tone === "cost" ? "− " : ""}
                    {row.label}
                  </p>
                </div>
                <div className="mt-2 h-3 overflow-hidden rounded-full bg-mist">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${row.pct}%` }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      duration: 0.9,
                      delay: 0.15 + i * 0.1,
                      ease: EASE,
                    }}
                    className={`h-full rounded-full ${
                      row.tone === "offer"
                        ? "bg-gradient-to-r from-gold-600 to-gold"
                        : row.tone === "cost"
                          ? "bg-red/70"
                          : "bg-navy/70"
                    }`}
                  />
                </div>
                <p className="mt-2 text-[12.5px] leading-6 text-navy-500">
                  {row.caption}
                </p>
              </motion.div>
            ))}
          </div>

          <p className="mt-6 text-[12.5px] leading-6 text-navy-500">
            Bars are illustrative. Your car&apos;s actual figures are itemized on
            the written offer we send the same day.
          </p>
        </div>
      </section>

      {/* trade vs private sale */}
      <section className="bg-mist py-20 sm:py-24">
        <div className="container-page">
          <SectionHeading
            kicker="An honest comparison"
            title="Trade with us, or sell it yourself"
          >
            A private sale usually nets a bit more money. Almost everything else
            tips the other way. Here&apos;s the trade-off, laid out straight.
          </SectionHeading>

          <Reveal
            delay={0.05}
            className="mt-10 overflow-hidden rounded-3xl border border-line-strong bg-white shadow-[var(--shadow-card)]"
          >
            <div className="grid grid-cols-[1.1fr_1fr_1fr] bg-navy text-white">
              <div className="px-4 py-3.5 text-[12px] font-semibold uppercase tracking-wide text-white/50 sm:px-6">
                &nbsp;
              </div>
              <div className="px-4 py-3.5 text-center text-[13px] font-bold sm:px-6">
                Trade with us
              </div>
              <div className="px-4 py-3.5 text-center text-[13px] font-semibold text-white/70 sm:px-6">
                Sell it privately
              </div>
            </div>
            {COMPARE.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[1.1fr_1fr_1fr] border-t border-line text-[13px] leading-6"
              >
                <div className="px-4 py-4 font-semibold text-navy-700 sm:px-6">
                  {row.label}
                </div>
                <div className="flex items-start gap-2 bg-gold/[0.05] px-4 py-4 text-navy-700 sm:px-6">
                  <span
                    className={`mt-0.5 shrink-0 ${row.themWins ? "text-navy-300" : "text-gold-600"}`}
                  >
                    {row.themWins ? (
                      <IconClose className="h-3.5 w-3.5" />
                    ) : (
                      <IconCheck className="h-3.5 w-3.5" />
                    )}
                  </span>
                  {row.us}
                </div>
                <div className="flex items-start gap-2 px-4 py-4 text-navy-600 sm:px-6">
                  <span
                    className={`mt-0.5 shrink-0 ${row.themWins ? "text-gold-600" : "text-navy-300"}`}
                  >
                    {row.themWins ? (
                      <IconCheck className="h-3.5 w-3.5" />
                    ) : (
                      <IconClose className="h-3.5 w-3.5" />
                    )}
                  </span>
                  {row.them}
                </div>
              </div>
            ))}
          </Reveal>
          <p className="mt-4 text-[12.5px] text-navy-500">
            If your car is one that sells well privately, we&apos;ll tell you so —
            and you&apos;re always free to get other offers and bring them back.
          </p>
        </div>
      </section>

      {/* why trade with us */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-page">
          <SectionHeading
            kicker="Why trade with us"
            title="The part people dread, minus the games"
          >
            Trading a car in is where it&apos;s easiest to feel taken advantage
            of. Here&apos;s how we try not to be that dealer.
          </SectionHeading>

          <Stagger className="mt-12 grid gap-6 sm:grid-cols-2" stagger={0.09}>
            {WHY.map(({ icon: Icon, title, body }) => (
              <StaggerItem
                key={title}
                className="group flex gap-4 rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-[var(--shadow-lift)]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy text-gold transition-colors duration-300 group-hover:bg-red group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-ink">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-[15px] leading-7 text-navy-600">
                    {body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* straight talk + FAQ */}
      <section className="bg-mist py-20 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow text-red">Straight talk</p>
            <h2 className="display-2 mt-2 text-ink">
              &ldquo;Aren&apos;t trade-in offers always lowballed?&rdquo;
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-navy-600">
              It&apos;s a fair worry, and it&apos;s the reason this page exists. A
              trade offer will usually be below a private-sale price, because we
              take on the risk, the reconditioning, and the warranty. But
              &ldquo;below private sale&rdquo; is not the same as
              &ldquo;lowball,&rdquo; and we&apos;ll never quietly shave the number
              at signing.
            </p>
            <p className="mt-3 text-[15px] leading-7 text-navy-600">
              If your car is one that sells well privately, we&apos;ll say so. And
              you&apos;re always free to get other offers and bring them to us.
            </p>
            <a
              href="#trade-form"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-navy-700 active:scale-[0.98]"
            >
              Get my estimate
              <IconArrowRight className="h-4 w-4" />
            </a>
          </Reveal>

          <Reveal
            delay={0.05}
            className="overflow-hidden rounded-3xl bg-white ring-1 ring-line shadow-[var(--shadow-card)]"
          >
            <Accordion type="single" collapsible defaultValue="item-0">
              {FAQS.map((f, i) => (
                <AccordionItem key={f.q} value={`item-${i}`}>
                  <AccordionTrigger>{f.q}</AccordionTrigger>
                  <AccordionContent>{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      <section className="bg-mist pb-16 sm:pb-20">
        <div className="container-page">
          <Reveal className="overflow-hidden rounded-3xl bg-navy p-8 sm:p-12">
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-xl">
                <p className="eyebrow text-gold">No obligation to trade, sell, or buy</p>
                <h2 className="display-3 mt-3 text-white">
                  See what your car is worth
                </h2>
                <p className="mt-3 text-[15px] leading-7 text-white/70">
                  A couple of minutes now, a real number back today.
                </p>
              </div>
              <Button asChild variant="gold" size="lg" className="shrink-0">
                <Link href="#trade-form">
                  Value my trade
                  <IconArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
