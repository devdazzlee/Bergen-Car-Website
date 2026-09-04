"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Reveal, Stagger, StaggerItem } from "../components/motion";
import { SectionHeading } from "../components/section-heading";
import { Marquee } from "../components/marquee";
import PageBanner, { BannerPills } from "../components/page-banner";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Field, FormShell, ringFor, EASE } from "../components/ui/form-parts";
import { currency } from "../lib/inventory";
import { isApiError, submitLead } from "../lib/api";
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
  IconClose,
  IconKey,
  IconPhone,
  IconShield,
  IconSpark,
} from "../components/icons";

const STEPS = [
  {
    title: "Apply",
    body: "The short form here — two minutes, no Social Security number needed.",
  },
  {
    title: "Get your numbers",
    body: "A soft credit check, then a real payment range from multiple lenders, usually within minutes.",
  },
  {
    title: "Choose and drive",
    body: "Shop knowing your budget. Nothing is locked in until you sign.",
  },
];

const CREDIT_RAIL = [
  "Excellent",
  "Good",
  "Fair",
  "Rebuilding",
  "New to credit",
];

const OPTIONS = [
  {
    icon: IconShield,
    title: "Strong credit",
    body: "If your credit is in good shape, we'll put lenders in competition for your business and bring you the lowest rate and term we can find.",
    note: "Expect the best rates and the quickest approval.",
  },
  {
    icon: IconSpark,
    title: "Building or rebuilding",
    body: "A rough patch — a late stretch, a past repo, a bankruptcy that's discharged — doesn't take you out of the running. Several of our lenders specialize in exactly this, and every on-time payment helps rebuild your score.",
    note: "A larger down payment or a co-signer can open up better terms, but neither is always required.",
  },
  {
    icon: IconKey,
    title: "New to credit",
    body: "First car, thin file, or no score yet? We work with first-time-buyer programs and credit unions that look at income and stability, not just a number.",
    note: "Bring proof of income and proof of residence and we'll take it from there.",
  },
];

const LENDERS = [
  "Local credit unions",
  "National banks",
  "Manufacturer lenders",
  "First-time buyer programs",
  "Credit-building lenders",
  "Regional community banks",
  "Online auto lenders",
];

const MYTHS = [
  {
    myth: "Checking my rate will ding my credit.",
    truth:
      "Pre-qualifying is a soft pull. It doesn't touch your score and other lenders can't see it. The only hard inquiry comes later, on one specific car, and only with your say-so.",
  },
  {
    myth: "Bad credit means I'll just get turned away.",
    truth:
      "Several of our lenders exist specifically for rebuilding credit. A discharged bankruptcy or an old repossession doesn't end the conversation — it just changes which lender we start with.",
  },
  {
    myth: "The dealer picks whatever loan pays them the most.",
    truth:
      "Your application goes to multiple lenders at once, and we show you the offers that come back — the actual terms, side by side, so you choose.",
  },
  {
    myth: "I need a big down payment or a co-signer.",
    truth:
      "Both can improve your terms; neither is always required. We work with low-down and zero-down programs for buyers who qualify, and we'll run the scenarios with you.",
  },
];

export const FAQS = [
  {
    q: "Will checking my rate hurt my credit?",
    a: "No. Getting pre-qualified uses a soft credit pull, which doesn't affect your score and isn't visible to other lenders. A hard inquiry only happens later, and only if you decide to move forward on a specific car — and we'll tell you before that happens.",
  },
  {
    q: "What documents do I need?",
    a: "To finalize, most lenders want a valid driver's license, proof of income (a recent pay stub or two, or bank statements if you're self-employed), and proof of residence (a utility bill or lease). If you're trading a car, bring the title and both keys. You don't need any of this just to get pre-qualified.",
  },
  {
    q: "Can I get approved with no credit history?",
    a: "Often, yes. We work with first-time-buyer programs and credit unions that weigh steady income and time at your job and address rather than a credit score. A down payment helps, and a co-signer helps more, but plenty of people get approved on their own.",
  },
  {
    q: "What if I've had a repossession or bankruptcy?",
    a: "It's more common than you'd think, and it's not a dead end. If a bankruptcy is discharged or a repo is a year or two behind you, several of our lenders will still work with you. Come in and talk to us — we'll be straight about what's realistic.",
  },
  {
    q: "How much should I put down?",
    a: "Whatever's comfortable. More money down lowers your monthly payment and can improve your rate, but we have lenders with low-down and zero-down programs for buyers who qualify. We'll show you a few scenarios so you can pick.",
  },
  {
    q: "Does getting pre-qualified mean I have to buy?",
    a: "Not at all. Pre-qualification just gives you a payment range to shop with. There's no obligation, no deposit, and no pressure. If the numbers don't work for you, that's a completely fine answer.",
  },
  {
    q: "How long is my approval good for?",
    a: "Most approvals hold for 30 days. If it lapses while you're deciding, we can usually refresh it with a quick update — it's not a start-from-scratch situation.",
  },
];

/* -------------------------------------------------------------- *
 * Payment estimator — illustrative only
 * -------------------------------------------------------------- */
const SAMPLE_APR = 7.9;

function monthlyPayment(price: number, down: number, term: number) {
  const principal = Math.max(0, price - down);
  const r = SAMPLE_APR / 100 / 12;
  const m = (principal * r) / (1 - Math.pow(1 + r, -term));
  return Math.round(m / 5) * 5;
}

function PaymentEstimator() {
  const [price, setPrice] = useState(20000);
  const [down, setDown] = useState(2000);
  const [term, setTerm] = useState(72);

  const financed = Math.max(0, price - down);
  const monthly = monthlyPayment(price, down, term);
  const barPct = Math.min(100, (monthly / 900) * 100);

  return (
    <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl bg-white shadow-[var(--shadow-widget)] ring-1 ring-line-strong">
      <div className="grid lg:grid-cols-[1fr_20rem]">
        {/* controls */}
        <div className="p-6 sm:p-8">
          <div className="space-y-7">
            <label className="block">
              <span className="flex items-baseline justify-between">
                <span className="text-[13px] font-semibold text-navy-600">
                  Vehicle price
                </span>
                <span className="font-heading text-base font-bold text-ink">
                  {currency(price)}
                </span>
              </span>
              <input
                type="range"
                min={5000}
                max={45000}
                step={500}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="mt-2 w-full accent-navy"
                aria-label="Vehicle price"
              />
            </label>

            <label className="block">
              <span className="flex items-baseline justify-between">
                <span className="text-[13px] font-semibold text-navy-600">
                  Cash down
                </span>
                <span className="font-heading text-base font-bold text-ink">
                  {currency(down)}
                </span>
              </span>
              <input
                type="range"
                min={0}
                max={15000}
                step={250}
                value={down}
                onChange={(e) => setDown(Number(e.target.value))}
                className="mt-2 w-full accent-navy"
                aria-label="Cash down"
              />
            </label>

            <div>
              <span className="text-[13px] font-semibold text-navy-600">
                Loan length
              </span>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {[48, 60, 72].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTerm(t)}
                    aria-pressed={term === t}
                    className={`rounded-xl border px-3 py-2.5 text-sm font-semibold transition-colors ${
                      term === t
                        ? "border-navy bg-navy text-white"
                        : "border-line-strong bg-white text-navy-700 hover:border-navy"
                    }`}
                  >
                    {t} mo
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* result */}
        <div className="flex flex-col justify-center bg-navy p-6 text-white sm:p-8">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white/50">
            Estimated monthly
          </p>
          <p className="mt-1 font-heading text-5xl font-bold tracking-tight text-gold tabular-nums">
            {currency(monthly)}
          </p>
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-gold-600 to-gold transition-[width] duration-500 ease-out"
              style={{ width: `${barPct}%` }}
            />
          </div>
          <dl className="mt-5 space-y-1.5 text-[13px] text-white/60">
            <div className="flex justify-between">
              <dt>Amount financed</dt>
              <dd className="font-medium text-white/90">{currency(financed)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Sample APR</dt>
              <dd className="font-medium text-white/90">{SAMPLE_APR}%</dd>
            </div>
            <div className="flex justify-between">
              <dt>Term</dt>
              <dd className="font-medium text-white/90">{term} months</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- *
 * Pre-qualification form
 * -------------------------------------------------------------- */
type Values = {
  name: string;
  email: string;
  phone: string;
  employment: string;
  income: string;
  housing: string;
  credit: string;
};
const EMPTY: Values = {
  name: "",
  email: "",
  phone: "",
  employment: "",
  income: "",
  housing: "",
  credit: "",
};

function validate(v: Values): Partial<Record<keyof Values, string>> {
  const e: Partial<Record<keyof Values, string>> = {};
  if (v.name.trim().length < 2) e.name = "Your full name, please.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email))
    e.email = "Double-check the email address.";
  if (v.phone.replace(/\D/g, "").length < 10)
    e.phone = "A 10-digit phone number so we can reach you.";
  if (!v.employment) e.employment = "Pick the closest option.";
  if (!(Number(v.income.replace(/[^0-9.]/g, "")) > 0))
    e.income = "A rough monthly figure is fine.";
  if (!v.housing) e.housing = "Pick the closest option.";
  if (!v.credit) e.credit = "There's an option for every situation.";
  return e;
}

function PreQualForm() {
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
  const mark = (k: keyof Values) => () =>
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
        type: "financing",
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
          You&apos;re all set, {v.name.split(" ")[0]}
        </h3>
        <p className="mt-2 max-w-sm text-[15px] leading-7 text-navy-600">
          We&apos;ve got your information. Someone from our Lodi showroom will
          text or email your payment range shortly, then follow up to walk
          through the options. No hard credit pull, no obligation.
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
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3">
      {formError ? (
        <p
          role="alert"
          className="rounded-xl bg-red/10 px-3.5 py-2.5 text-[13.5px] font-medium text-red"
        >
          {formError}
        </p>
      ) : null}
      <div className="grid gap-3 sm:grid-cols-3">
        <Field
          id="f-name"
          label="Full name"
          touched={!!touched.name}
          error={errors.name}
          filled={!!v.name}
        >
          <Input
            id="f-name"
            autoComplete="name"
            value={v.name}
            onChange={(e) => set("name")(e.target.value)}
            onBlur={blur("name")}
            className={ringFor(!!touched.name, errors.name)}
          />
        </Field>
        <Field
          id="f-phone"
          label="Phone"
          touched={!!touched.phone}
          error={errors.phone}
          filled={!!v.phone}
        >
          <Input
            id="f-phone"
            type="tel"
            autoComplete="tel"
            value={v.phone}
            onChange={(e) => set("phone")(e.target.value)}
            onBlur={blur("phone")}
            className={ringFor(!!touched.phone, errors.phone)}
          />
        </Field>
        <Field
          id="f-email"
          label="Email"
          touched={!!touched.email}
          error={errors.email}
          filled={!!v.email}
        >
          <Input
            id="f-email"
            type="email"
            autoComplete="email"
            value={v.email}
            onChange={(e) => set("email")(e.target.value)}
            onBlur={blur("email")}
            className={ringFor(!!touched.email, errors.email)}
          />
        </Field>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field
          id="f-employment"
          label="Employment"
          touched={!!touched.employment}
          error={errors.employment}
          filled={!!v.employment}
          showCheck={false}
        >
          <Select
            value={v.employment}
            onValueChange={(val) => {
              set("employment")(val);
              mark("employment")();
            }}
          >
            <SelectTrigger
              id="f-employment"
              className={ringFor(!!touched.employment, errors.employment)}
            >
              <SelectValue placeholder="Select…" />
            </SelectTrigger>
            <SelectContent>
              {[
                "Employed full-time",
                "Employed part-time",
                "Self-employed",
                "Retired",
                "Other",
              ].map((o) => (
                <SelectItem key={o} value={o}>
                  {o}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field
          id="f-income"
          label="Monthly income"
          touched={!!touched.income}
          error={errors.income}
          filled={!!v.income}
        >
          <Input
            id="f-income"
            inputMode="numeric"
            placeholder="Before taxes"
            value={v.income}
            onChange={(e) => set("income")(e.target.value)}
            onBlur={blur("income")}
            className={ringFor(!!touched.income, errors.income)}
          />
        </Field>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field
          id="f-housing"
          label="Rent or own?"
          touched={!!touched.housing}
          error={errors.housing}
          filled={!!v.housing}
          showCheck={false}
        >
          <Select
            value={v.housing}
            onValueChange={(val) => {
              set("housing")(val);
              mark("housing")();
            }}
          >
            <SelectTrigger
              id="f-housing"
              className={ringFor(!!touched.housing, errors.housing)}
            >
              <SelectValue placeholder="Select…" />
            </SelectTrigger>
            <SelectContent>
              {["Rent", "Own", "Live with family"].map((o) => (
                <SelectItem key={o} value={o}>
                  {o}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field
          id="f-credit"
          label="Credit"
          hint="No wrong answer — just points us to the right lender."
          touched={!!touched.credit}
          error={errors.credit}
          filled={!!v.credit}
          showCheck={false}
        >
          <Select
            value={v.credit}
            onValueChange={(val) => {
              set("credit")(val);
              mark("credit")();
            }}
          >
            <SelectTrigger
              id="f-credit"
              className={ringFor(!!touched.credit, errors.credit)}
            >
              <SelectValue placeholder="Select…" />
            </SelectTrigger>
            <SelectContent>
              {[
                "Excellent (720+)",
                "Good (660–719)",
                "Fair (600–659)",
                "Still building it",
                "Not sure",
              ].map((o) => (
                <SelectItem key={o} value={o}>
                  {o}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </div>

      <Button type="submit" size="lg" className="mt-1 w-full" disabled={submitting}>
        {submitting ? "Sending…" : "See my payment range"}
        <IconArrowRight className="h-4 w-4" />
      </Button>
      <p className="text-center text-[12px] leading-5 text-navy-500">
        Soft credit check — it won&apos;t affect your score, and no Social
        Security number is needed to get your range. We never sell your
        information.
      </p>
    </form>
  );
}

export default function FinancingClient() {
  return (
    <div className="bg-mist">
      <PageBanner
        eyebrow="Financing"
        title="Financing made simple"
        description={
          <p>
            Getting pre-qualified takes about two minutes and{" "}
            <span className="text-white">does not affect your credit score</span>
            . You&apos;ll see a real payment range before you ever come in, and
            there&apos;s no obligation to buy.
          </p>
        }
        image="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=2400&q=70"
        imageAlt="Driving a dependable used car after getting financed at Bergen Car Company"
      >
        <BannerPills
          items={["Soft credit check", "12 lenders, one form", "No SSN to start"]}
        />
      </PageBanner>

      <section id="prequalify" className="scroll-mt-24 py-14 sm:py-20">
        <div className="container-page">
          <FormShell
            asideTitle="How pre-qualifying works"
            steps={STEPS}
            formTitle="Get pre-qualified"
            formNote="Short and low-pressure. Every field helps us match you to the right lender."
            footNote="Soft credit check only — no SSN to start, and we never sell your information."
          >
            <PreQualForm />
          </FormShell>
        </div>
      </section>

      {/* payment estimator */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-page">
          <SectionHeading
            kicker="Ballpark it"
            title="What could this look like each month?"
            align="center"
          >
            Slide the numbers around to get a feel for a payment before you talk
            to anyone. It&apos;s an illustration, not an offer.
          </SectionHeading>

          <div className="mt-12">
            <Reveal>
              <PaymentEstimator />
            </Reveal>
          </div>

          <p className="mx-auto mt-5 max-w-2xl text-center text-[12.5px] leading-6 text-navy-500">
            Assumes a sample {SAMPLE_APR}% APR for illustration. Your real rate
            depends on your credit, the lender, the term, and the vehicle —{" "}
            <Link
              href="#prequalify"
              className="font-semibold text-navy underline decoration-gold decoration-2 underline-offset-2 hover:text-red"
            >
              get your actual number
            </Link>
            .
          </p>
        </div>
      </section>

      {/* options along the credit spectrum */}
      <section className="bg-mist py-20 sm:py-24">
        <div className="container-page">
          <SectionHeading
            kicker="Financing options"
            title="There&apos;s a path here from wherever you start"
          >
            Not everyone reading this has perfect credit, and that&apos;s
            completely normal. Wherever you&apos;re starting from, we&apos;ll be
            honest about what&apos;s realistic and work to get you there.
          </SectionHeading>

          <Reveal delay={0.05} className="mt-8">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-[12px] font-semibold">
              {CREDIT_RAIL.map((c, i) => (
                <span key={c} className="flex items-center gap-2">
                  <span className="rounded-full border border-line-strong bg-white px-3 py-1.5 text-navy-700">
                    {c}
                  </span>
                  {i < CREDIT_RAIL.length - 1 && (
                    <span aria-hidden className="text-navy-300">
                      →
                    </span>
                  )}
                </span>
              ))}
            </div>
          </Reveal>

          <Stagger className="mt-10 grid gap-6 lg:grid-cols-3" stagger={0.1}>
            {OPTIONS.map(({ icon: Icon, title, body, note }, i) => (
              <StaggerItem
                key={title}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-line-strong bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-transparent hover:shadow-[var(--shadow-lift)]"
              >
                <span
                  aria-hidden
                  className="absolute right-5 top-4 font-heading text-4xl font-bold text-cloud transition-colors group-hover:text-gold/25"
                >
                  0{i + 1}
                </span>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-gold">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold text-ink">
                  {title}
                </h3>
                <p className="mt-2 flex-1 text-[15px] leading-7 text-navy-600">
                  {body}
                </p>
                <p className="mt-4 border-t border-line pt-4 text-[13px] leading-6 text-navy-500">
                  {note}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* myth vs reality */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-page">
          <SectionHeading
            kicker="Clearing it up"
            title="What people assume vs. how it actually works"
          >
            Financing a used car comes loaded with bad assumptions. Here are the
            four we hear most, and the real version.
          </SectionHeading>

          <div className="mt-12 space-y-4">
            {MYTHS.map(({ myth, truth }, i) => (
              <motion.div
                key={myth}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
                className="grid gap-3 sm:grid-cols-2"
              >
                <div className="flex gap-3 rounded-2xl border border-line bg-mist/60 p-5">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy-400/15 text-navy-400">
                    <IconClose className="h-3.5 w-3.5" />
                  </span>
                  <p className="text-[14px] leading-7 text-navy-500 line-through decoration-navy-300">
                    {myth}
                  </p>
                </div>
                <div className="flex gap-3 rounded-2xl border border-gold/40 bg-gold/[0.07] p-5">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/25 text-gold-600">
                    <IconCheck className="h-3.5 w-3.5" />
                  </span>
                  <p className="text-[14px] leading-7 text-navy-700">{truth}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* lenders */}
      <section className="bg-mist py-20 sm:py-24">
        <div className="container-page">
          <SectionHeading
            kicker="Who we work with"
            title="One form, a network of lenders"
            align="center"
          >
            We&apos;re not tied to a single bank. Your application goes to
            multiple lenders at once, and they compete for it — which is how you end
            up with a better rate than you&apos;d get on your own.
          </SectionHeading>
        </div>

        <Reveal className="mt-12">
          <Marquee>
            {LENDERS.map((l) => (
              <span
                key={l}
                className="rounded-full border border-line bg-white px-5 py-2.5 font-heading text-sm font-semibold text-navy-700 shadow-[var(--shadow-card)]"
              >
                {l}
              </span>
            ))}
          </Marquee>
        </Reveal>

        <div className="container-page">
          <Reveal
            delay={0.1}
            className="mx-auto mt-10 flex max-w-md items-center gap-4 rounded-2xl border border-line-strong bg-white p-5 text-center shadow-[var(--shadow-card)]"
          >
            <span className="font-heading text-4xl font-bold tracking-tight text-navy">
              12
            </span>
            <p className="text-left text-[13px] leading-6 text-navy-600">
              lenders see your application from a single two-minute form. You
              pick the offer that comes back best.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow text-red">FAQ</p>
            <h2 className="display-2 mt-2 text-ink">Financing questions</h2>
            <p className="mt-4 text-lg leading-8 text-navy-600">
              The ones we hear most. If yours isn&apos;t here, call{" "}
              <a
                href="tel:+19739286300"
                className="font-semibold text-ink underline decoration-gold decoration-2 underline-offset-2"
              >
                (973) 928-6300
              </a>{" "}
              — no sales pitch, just a straight answer.
            </p>
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
                <p className="eyebrow text-gold">Worst case, you learn where you stand</p>
                <h2 className="display-3 mt-3 text-white">
                  See your number before you shop
                </h2>
                <p className="mt-3 text-[15px] leading-7 text-white/70">
                  Two minutes, a soft credit check, and no obligation.
                </p>
              </div>
              <Button asChild variant="gold" size="lg" className="shrink-0">
                <Link href="#prequalify">
                  Get pre-qualified
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
