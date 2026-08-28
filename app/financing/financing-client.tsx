"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Reveal, Stagger, StaggerItem } from "../components/motion";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Field, StepStrip, ringFor, EASE } from "../components/ui/form-parts";
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
    body: "A soft credit check, then a real payment range from a dozen lenders, usually within minutes.",
  },
  {
    title: "Choose and drive",
    body: "Shop knowing your budget. Nothing is locked in until you sign.",
  },
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
];

const FAQS = [
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
  const errors = useMemo(() => validate(v), [v]);

  const set = (k: keyof Values) => (val: string) =>
    setV((p) => ({ ...p, [k]: val }));
  const blur = (k: keyof Values) => () =>
    setTouched((p) => ({ ...p, [k]: true }));
  const mark = (k: keyof Values) => () =>
    setTouched((p) => ({ ...p, [k]: true }));

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(
      Object.fromEntries(Object.keys(EMPTY).map((k) => [k, true])) as Record<
        keyof Values,
        boolean
      >,
    );
    if (Object.keys(errors).length === 0) setSubmitted(true);
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
            <a href="tel:+19735550142">
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
            }}
          >
            Start over
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
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
      </div>

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

      <div className="grid gap-4 sm:grid-cols-2">
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
          label="Monthly income (before taxes)"
          touched={!!touched.income}
          error={errors.income}
          filled={!!v.income}
        >
          <Input
            id="f-income"
            inputMode="numeric"
            placeholder="$"
            value={v.income}
            onChange={(e) => set("income")(e.target.value)}
            onBlur={blur("income")}
            className={ringFor(!!touched.income, errors.income)}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          id="f-housing"
          label="Do you rent or own?"
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
          label="How would you describe your credit?"
          hint="No wrong answer — it just points us to the right lender."
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

      <Button type="submit" size="lg" className="mt-1 w-full">
        See my payment range
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
      <section className="relative overflow-hidden bg-navy pb-16 pt-32">
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
            <p className="eyebrow text-gold">Financing</p>
            <h1 className="display-2 mt-3 text-white">Financing made simple</h1>
            <p className="mt-4 text-lg leading-8 text-white/70">
              Getting pre-qualified takes about two minutes and{" "}
              <span className="text-white">
                does not affect your credit score
              </span>
              . You&apos;ll see a real payment range before you ever come in, and
              there&apos;s no obligation to buy.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-[12px] font-semibold text-white/75">
              {["Soft credit check", "12 lenders, one form", "No SSN to start"].map(
                (t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5"
                  >
                    {t}
                  </span>
                ),
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="prequalify" className="scroll-mt-24 py-14 sm:py-16">
        <div className="container-page mx-auto max-w-3xl">
          <StepStrip steps={STEPS} />
          <Reveal
            delay={0.05}
            className="mt-8 rounded-3xl bg-white p-6 ring-1 ring-line shadow-[var(--shadow-card)] sm:p-8"
          >
            <h2 className="font-heading text-xl font-bold text-ink">
              Get pre-qualified
            </h2>
            <p className="mt-1 text-[14px] text-navy-600">
              Short and low-pressure. Every field helps us match you to the right
              lender.
            </p>
            <div className="mt-6">
              <PreQualForm />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-red">Financing options</p>
            <h2 className="display-2 mt-2 text-ink">
              There&apos;s a path here for you
            </h2>
            <p className="mt-4 text-lg leading-8 text-navy-600">
              Not everyone reading this has perfect credit, and that&apos;s
              completely normal. Wherever you&apos;re starting from, we&apos;ll be
              honest about what&apos;s realistic and work to get you there.
            </p>
          </Reveal>

          <Stagger className="mt-12 grid gap-6 lg:grid-cols-3" stagger={0.1}>
            {OPTIONS.map(({ icon: Icon, title, body, note }) => (
              <StaggerItem
                key={title}
                className="flex flex-col rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]"
              >
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

      <section className="bg-mist py-20 sm:py-24">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-red">Who we work with</p>
            <h2 className="display-2 mt-2 text-ink">
              One form, a network of lenders
            </h2>
            <p className="mt-4 text-lg leading-8 text-navy-600">
              We&apos;re not tied to a single bank. Your application goes to about
              a dozen lenders at once, and they compete for it — which is how you
              end up with a better rate than you&apos;d get on your own.
            </p>
          </Reveal>

          <Stagger className="mt-10 flex flex-wrap gap-3" stagger={0.06}>
            {LENDERS.map((l) => (
              <StaggerItem
                key={l}
                as="span"
                className="rounded-full border border-line bg-white px-5 py-2.5 font-heading text-sm font-semibold text-navy-700 shadow-[var(--shadow-card)]"
              >
                {l}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow text-red">FAQ</p>
            <h2 className="display-2 mt-2 text-ink">Financing questions</h2>
            <p className="mt-4 text-lg leading-8 text-navy-600">
              The ones we hear most. If yours isn&apos;t here, call{" "}
              <a
                href="tel:+19735550142"
                className="font-semibold text-ink underline decoration-gold decoration-2 underline-offset-2"
              >
                (973) 555-0142
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

      <section className="bg-navy py-16 sm:py-20">
        <div className="container-page">
          <Reveal className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <h2 className="display-3 text-white">
                See your number before you shop
              </h2>
              <p className="mt-2 text-[15px] leading-7 text-white/70">
                Two minutes, a soft credit check, and no obligation. Worst case,
                you learn where you stand.
              </p>
            </div>
            <Button asChild variant="gold" size="lg" className="shrink-0">
              <Link href="#prequalify">
                Get pre-qualified
                <IconArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
