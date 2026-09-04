"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Reveal, Stagger, StaggerItem } from "../components/motion";
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
import { currency } from "../lib/inventory";
import { isApiError, submitLead } from "../lib/api";
import {
  IconArrowRight,
  IconCheck,
  IconClock,
  IconKey,
  IconPhone,
  IconShield,
  IconStar,
} from "../components/icons";

const YEARS = Array.from({ length: 24 }, (_, i) => String(2026 - i));
const MAKES = [
  "Acura","Audi","BMW","Buick","Cadillac","Chevrolet","Chrysler","Dodge","Ford",
  "GMC","Honda","Hyundai","Infiniti","Jeep","Kia","Land Rover","Lexus","Lincoln",
  "Mazda","Mercedes-Benz","Mini","Mitsubishi","Nissan","Ram","Subaru","Tesla",
  "Toyota","Volkswagen","Volvo","Other",
];

const HOW = [
  {
    title: "Tell us about your car",
    body: "Year, make, model, mileage, and an honest condition note. VIN optional — two minutes on your phone is enough to start.",
  },
  {
    title: "Bring it in for a quick look",
    body: "About twenty minutes looking it over in person. We confirm what you described and put a firm number in writing.",
  },
  {
    title: "Get paid the same day",
    body: "Like the offer? We cut the check that day and handle the title, payoff, and paperwork here.",
  },
];

const WE_BUY = [
  "High-mileage cars",
  "Older models — 2010 and up",
  "Cars you still owe money on",
  "Minor dents, scratches, curb rash",
  "Only one key",
  "Out-of-state titles",
  "Salvage or rebuilt (case by case)",
  "Not currently running (we'll ask first)",
];

const COMPARE = {
  cols: ["Sell to us", "Private sale", "Online instant offer", "Trade-in here"],
  rows: [
    { label: "Time until you're paid", v: ["Same day", "1–4 weeks", "1–3 days", "Same day"] },
    { label: "Top-dollar potential", v: ["Strong", "Highest", "Usually lowest", "Strong + NJ tax savings"] },
    { label: "Strangers at your house", v: ["None", "Several", "None", "None"] },
    { label: "Loan payoff handled for you", v: ["Yes", "You do it", "Sometimes", "Yes"] },
    { label: "Title & DMV paperwork", v: ["We do it", "You do it", "Varies", "We do it"] },
    { label: "Have to buy a car?", v: ["No", "—", "No", "That's the idea"] },
  ],
};

const WHY = [
  {
    icon: IconKey,
    title: "No purchase required",
    body: "You don't have to buy a car from us to sell us yours. That assumption keeps a lot of people from calling — and it's simply not how we work.",
  },
  {
    icon: IconClock,
    title: "Fast, same-day process",
    body: "Most sellers get a written offer the day they submit, and a firm number the day they bring the car in. No weeks of back-and-forth.",
  },
  {
    icon: IconShield,
    title: "Fair offers, with the math",
    body: "We price against live auction data and local comps, then show what we expect to spend getting it lot-ready. Nothing quietly shaved at signing.",
  },
  {
    icon: IconCheck,
    title: "Paid on the spot",
    body: "Accept the offer and we pay you that day — check or wire. Title, payoff, and paperwork are handled here so you aren't chasing lenders yourself.",
  },
];

const BRING = [
  "Your driver's license",
  "The title — or your loan account number if it's financed",
  "Both key fobs, if you have them",
  "Any service records you've kept (they help the number)",
];

export const FAQS = [
  {
    q: "Do I have to buy a car to sell mine here?",
    a: "No. This page exists for private sellers who just want a fair cash offer — not a trade toward something on our lot. Plenty of people sell us a car and never buy one. If you later decide to shop with us, great. If not, that's completely fine.",
  },
  {
    q: "How is the offer calculated?",
    a: "Three things: the current wholesale (auction) value for your exact year, trim, mileage, and condition; what comparable cars are actually selling for near Lodi; and our realistic cost to inspect, recondition, and warranty it. We'll walk you through each piece so the number isn't a mystery.",
  },
  {
    q: "What if I still owe money on my loan?",
    a: "That's normal. If your car is worth more than you owe, the equity comes to you after we pay off the lender. If you owe more than it's worth, we'll show you the shortfall clearly before you agree to anything — no surprises at the desk.",
  },
  {
    q: "How is this different from a trade-in?",
    a: "Trade-in is for buyers putting a car toward a purchase here. Sell Your Car is for sellers who want cash with zero obligation to shop. Same appraisal standards either way — different goal, different page.",
  },
  {
    q: "Will the in-person offer match the estimate?",
    a: "It should, as long as the car matches what you described. The inspection confirms mileage, condition, title status, and that there isn't frame damage or something major you missed. If anything changes the number, we explain it — we don't drop the offer as a last-minute tactic.",
  },
  {
    q: "What do I need to bring?",
    a: "Driver's license, title (or loan account info if it's financed), and both sets of keys if you have them. If the title has a co-owner, they'll need to sign too. We'll tell you exactly what's missing before you make the trip.",
  },
];

/* Very rough public-data ballpark — clearly labelled as such in the UI. */
function roughRange(year: string, mileage: string, condition: string) {
  const y = Number(year);
  const mi = Number(mileage.replace(/\D/g, ""));
  if (!y || !mi || !condition) return null;
  const age = Math.max(0, 2026 - y);
  let base = 27000 * Math.pow(0.88, age) - (mi / 1000) * 42;
  const mult =
    ({ Excellent: 1.08, Good: 1, Fair: 0.85, Poor: 0.66 } as Record<string, number>)[
      condition
    ] ?? 1;
  base = Math.max(1000, base * mult);
  return {
    lo: Math.round((base * 0.85) / 250) * 250,
    hi: Math.round((base * 1.15) / 250) * 250,
  };
}

type Values = {
  year: string;
  make: string;
  model: string;
  trim: string;
  mileage: string;
  condition: string;
  vin: string;
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
  vin: "",
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
  if (v.vin && v.vin.replace(/[^A-Za-z0-9]/g, "").length !== 17)
    e.vin = "A VIN is 17 characters, or leave it blank.";
  if (v.zip.replace(/\D/g, "").length !== 5) e.zip = "A 5-digit ZIP code.";
  if (v.name.trim().length < 2) e.name = "Your full name, please.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email))
    e.email = "Double-check the email address.";
  if (v.phone.replace(/\D/g, "").length < 10)
    e.phone = "A 10-digit phone number.";
  return e;
}

function SellForm() {
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
  const ballpark = roughRange(v.year, v.mileage, v.condition);

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
        type: "sell",
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
          get it back to you today during business hours — in writing. No
          obligation to sell, and no expectation that you buy anything from us.
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
                id="s-make"
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
            id="s-model"
            label="Model"
            touched={!!touched.model}
            error={errors.model}
            filled={!!v.model}
          >
            <Input
              id="s-model"
              placeholder="e.g. Camry"
              value={v.model}
              onChange={(e) => set("model")(e.target.value)}
              onBlur={blur("model")}
              className={ringFor(!!touched.model, errors.model)}
            />
          </Field>
          <Field id="s-trim" label="Trim" touched={!!touched.trim} filled={!!v.trim}>
            <Input
              id="s-trim"
              placeholder="Optional"
              value={v.trim}
              onChange={(e) => set("trim")(e.target.value)}
              onBlur={blur("trim")}
            />
          </Field>
          <Field
            id="s-mileage"
            label="Mileage"
            touched={!!touched.mileage}
            error={errors.mileage}
            filled={!!v.mileage}
          >
            <Input
              id="s-mileage"
              inputMode="numeric"
              placeholder="68,000"
              value={v.mileage}
              onChange={(e) => set("mileage")(e.target.value)}
              onBlur={blur("mileage")}
              className={ringFor(!!touched.mileage, errors.mileage)}
            />
          </Field>
          <Field
            id="s-condition"
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
                id="s-condition"
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
            id="s-vin"
            label="VIN"
            hint="Optional — speeds up our valuation."
            touched={!!touched.vin}
            error={errors.vin}
            filled={!!v.vin}
          >
            <Input
              id="s-vin"
              autoComplete="off"
              maxLength={17}
              placeholder="Optional"
              value={v.vin}
              onChange={(e) =>
                set("vin")(
                  e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""),
                )
              }
              onBlur={blur("vin")}
              className={ringFor(!!touched.vin, errors.vin)}
            />
          </Field>
          <Field
            id="s-zip"
            label="ZIP code"
            touched={!!touched.zip}
            error={errors.zip}
            filled={!!v.zip}
          >
            <Input
              id="s-zip"
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

      {ballpark && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="rounded-2xl border border-gold/40 bg-gold/[0.08] p-4"
        >
          <p className="text-[12px] font-semibold uppercase tracking-wide text-gold-600">
            Very rough ballpark
          </p>
          <p className="mt-1 font-heading text-xl font-bold text-ink">
            {currency(ballpark.lo)} – {currency(ballpark.hi)}
          </p>
          <p className="mt-1 text-[12px] leading-5 text-navy-600">
            A wide estimate from public depreciation data — not an offer. Your
            real, firm number comes from us after a 20-minute look.
          </p>
        </motion.div>
      )}

      <FieldGroup title="How to reach you with the offer">
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
        </div>
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
      </FieldGroup>

      <Button type="submit" size="lg" className="mt-1 w-full" disabled={submitting}>
        {submitting ? "Sending…" : "Get my cash offer"}
        <IconArrowRight className="h-4 w-4" />
      </Button>
      <p className="text-center text-[12px] leading-5 text-navy-500">
        No obligation to sell. No requirement to buy a car from us. We never sell
        your information — the final number is confirmed in person.
      </p>
    </form>
  );
}

export default function SellClient() {
  return (
    <div className="bg-mist">
      <PageBanner
        eyebrow="Sell your car"
        title="Sell us your car, no purchase required"
        description={
          <p>
            Looking to sell — not trade? We buy cars from private sellers
            outright.{" "}
            <span className="text-white">
              You do not have to buy anything from us
            </span>
            . Fair offer, a look in person, paid the same day.
          </p>
        }
        image="https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=2400&q=70"
        imageAlt="A private seller bringing a used car to Bergen Car Company in Lodi, New Jersey"
      >
        <BannerPills
          items={["No purchase required", "Same-day pay", "Private sellers welcome"]}
        />
      </PageBanner>

      {/* form */}
      <section id="sell-form" className="scroll-mt-28 py-14 sm:py-20">
        <div className="container-page">
          <FormShell
            asideTitle="How it works"
            steps={HOW}
            formTitle="Tell us about your car"
            formNote={
              <>
                A short form — not a sales pitch. Putting a car toward a purchase
                instead?{" "}
                <Link
                  href="/trade"
                  className="font-semibold text-navy underline-offset-2 hover:text-red hover:underline"
                >
                  Use the trade-in page
                </Link>
                .
              </>
            }
            footNote="No obligation to buy anything from us. Private sellers welcome."
          >
            <SellForm />
          </FormShell>
        </div>
      </section>

      {/* what we buy */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-red">What we buy</p>
            <h2 className="display-2 mt-2 text-ink">
              Your car is probably fine
            </h2>
            <p className="mt-4 text-lg leading-8 text-navy-600">
              People talk themselves out of calling because they assume the car
              is &ldquo;not worth it.&rdquo; Most of the time, it is. A short
              list of things that don&apos;t scare us off:
            </p>
          </Reveal>

          <Stagger
            className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
            stagger={0.06}
          >
            {WE_BUY.map((t) => (
              <StaggerItem
                key={t}
                className="flex items-start gap-3 rounded-2xl border border-line bg-mist/50 p-4"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold-600">
                  <IconCheck className="h-3.5 w-3.5" />
                </span>
                <span className="text-[14px] font-medium leading-6 text-ink">
                  {t}
                </span>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.1} className="mt-6 text-[13px] text-navy-500">
            Not sure yours qualifies? Submit it anyway, or call{" "}
            <a
              href="tel:+19739286300"
              className="font-semibold text-navy hover:text-red"
            >
              (973) 928-6300
            </a>{" "}
            — we&apos;ll tell you straight.
          </Reveal>
        </div>
      </section>

      {/* compare */}
      <section className="bg-mist py-20 sm:py-24">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-red">Weigh your options</p>
            <h2 className="display-2 mt-2 text-ink">
              Selling to us vs. the alternatives
            </h2>
            <p className="mt-4 text-lg leading-8 text-navy-600">
              We&apos;re not going to pretend we win every row. A patient private
              sale can net you more. If speed, certainty, and not dealing with
              strangers matter, this is usually the better trade.
            </p>
          </Reveal>

          <Reveal
            delay={0.05}
            className="mt-10 overflow-x-auto rounded-3xl border border-line-strong bg-white shadow-[var(--shadow-card)]"
          >
            <table className="w-full min-w-[42rem] text-left text-[14px]">
              <thead>
                <tr className="border-b border-line-strong">
                  <th className="p-4 font-semibold text-navy-500"> </th>
                  {COMPARE.cols.map((c, i) => (
                    <th
                      key={c}
                      className={`p-4 font-heading font-bold ${
                        i === 0
                          ? "bg-navy text-gold"
                          : "text-navy-600"
                      }`}
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE.rows.map((row) => (
                  <tr
                    key={row.label}
                    className="border-b border-line last:border-0"
                  >
                    <td className="p-4 font-medium text-ink">{row.label}</td>
                    {row.v.map((val, i) => (
                      <td
                        key={i}
                        className={`p-4 ${
                          i === 0
                            ? "bg-gold/[0.07] font-semibold text-ink"
                            : "text-navy-600"
                        }`}
                      >
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      {/* why sell to us */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-red">Why sell to us</p>
            <h2 className="display-2 mt-2 text-ink">
              A dealership that actually wants to buy your car
            </h2>
          </Reveal>

          <Stagger className="mt-12 grid gap-6 sm:grid-cols-2" stagger={0.09}>
            {WHY.map(({ icon: Icon, title, body }) => (
              <StaggerItem
                key={title}
                className="flex gap-4 rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy text-gold">
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

      {/* what to bring + seller quote */}
      <section className="bg-navy py-20 text-white sm:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="eyebrow text-gold">Bring these when you come in</p>
            <h2 className="display-3 mt-2 text-white">
              A short checklist, so you only make one trip
            </h2>
            <ul className="mt-6 space-y-3">
              {BRING.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                    <IconCheck className="h-4 w-4" />
                  </span>
                  <span className="text-[15px] leading-7 text-white/85">{b}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[13px] leading-6 text-white/55">
              If the title lists a co-owner, they&apos;ll need to sign too.
              Missing something? We&apos;ll tell you before you drive over.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <figure className="rounded-3xl bg-white/[0.06] p-7 ring-1 ring-white/10">
              <span className="flex text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <IconStar key={i} className="h-4 w-4" />
                ))}
              </span>
              <blockquote className="mt-4 text-[16px] leading-8 text-white/90">
                &ldquo;Sold them my wife&apos;s Odyssey when we downsized. No
                haggling theater, no &lsquo;let me talk to my manager.&rsquo;
                They looked it over, the number matched the estimate, check in my
                hand in about 40 minutes.&rdquo;
              </blockquote>
              <figcaption className="mt-5 border-t border-white/10 pt-4 text-[13px] text-white/55">
                <span className="font-semibold text-white/80">Dev P.</span> ·
                Maywood, NJ
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* faq */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow text-red">FAQ</p>
            <h2 className="display-2 mt-2 text-ink">
              The questions people ask before they sell
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-navy-600">
              Most hesitation comes from thinking we&apos;ll only take the car if
              you buy one. We won&apos;t. If something else is on your mind, call
              the showroom — a real person answers.
            </p>
            <a
              href="tel:+19739286300"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-line-strong bg-mist px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-navy hover:bg-navy hover:text-white"
            >
              <IconPhone className="h-4 w-4 text-gold" />
              (973) 928-6300
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

      {/* bottom CTA */}
      <section className="bg-mist py-16 sm:py-20">
        <div className="container-page">
          <Reveal className="overflow-hidden rounded-3xl bg-navy p-8 sm:p-12">
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-xl">
                <p className="eyebrow text-gold">No purchase required</p>
                <h2 className="display-3 mt-3 text-white">
                  Sell only if the number feels right
                </h2>
                <p className="mt-3 text-[15px] leading-7 text-white/70">
                  Get a written offer today, bring the car in when it suits
                  you, and walk away with a check — or walk away with no hard
                  feelings.
                </p>
              </div>
              <Button asChild variant="gold" size="lg" className="shrink-0">
                <a href="#sell-form">
                  Get my cash offer
                  <IconArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
