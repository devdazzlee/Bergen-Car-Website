import Link from "next/link";
import {
  IconArrowRight,
  IconCheck,
  IconClock,
  IconKey,
  IconWallet,
} from "./icons";
import { Reveal, Stagger, StaggerItem } from "./motion";
import CountUp from "./count-up";

const PERKS = [
  "Soft credit check — your score isn't affected",
  "Real numbers from the lenders we work with",
  "Know your budget before you start looking",
];

const NEEDS = [
  { icon: IconKey, label: "Your driver's license" },
  { icon: IconWallet, label: "Proof of income" },
  { icon: IconClock, label: "About two minutes" },
];

export default function FinancingBanner() {
  return (
    <section id="financing" className="scroll-mt-24 bg-white py-16 sm:py-20">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl bg-navy px-6 py-12 sm:px-12 sm:py-14">
          <div
            aria-hidden
            className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-red/20 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-gold/10 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:22px_22px]"
          />

          <div className="relative grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-center">
            <Reveal>
              <p className="eyebrow text-gold">Pre-qualification</p>
              <h2 className="display-2 mt-3 text-balance text-white">
                See what your monthly payment would look like
              </h2>
              <p className="mt-4 max-w-lg text-lg leading-8 text-white/70">
                It takes about two minutes and it won&apos;t affect your credit
                score. You&apos;ll get a payment range based on your situation,
                so you can shop knowing what fits your budget.
              </p>

              <Stagger className="mt-6 space-y-2.5" stagger={0.08}>
                {PERKS.map((p) => (
                  <StaggerItem
                    key={p}
                    className="flex items-start gap-3 text-[15px] text-white/85"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold">
                      <IconCheck className="h-3.5 w-3.5" />
                    </span>
                    {p}
                  </StaggerItem>
                ))}
              </Stagger>
            </Reveal>

            <Reveal delay={0.1} className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur">
                <p className="text-sm text-white/60">
                  What most of our buyers pay
                </p>
                <p className="mt-1 font-heading text-4xl font-bold text-gold">
                  <CountUp value={260} prefix="$" />
                  <span className="mx-1">–</span>
                  <CountUp value={390} prefix="$" />
                  <span className="text-lg font-semibold text-white/70">/mo</span>
                </p>
                <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-gold-600 to-gold" />
                </div>
                <p className="mt-3 text-[13px] text-white/50">
                  Rough range · 72 months · depends on the car, your credit, and
                  your down payment
                </p>
                <Link
                  href="/financing"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-bold text-ink transition-colors hover:bg-gold-300 active:scale-[0.98]"
                >
                  Start pre-qualification
                  <IconArrowRight className="h-4 w-4" />
                </Link>
                <p className="mt-3 text-center text-[12px] text-white/45">
                  No SSN required to start
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-[12px] font-semibold uppercase tracking-wide text-white/50">
                  What you&apos;ll need
                </p>
                <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {NEEDS.map(({ icon: Icon, label }) => (
                    <li
                      key={label}
                      className="flex items-center gap-2 text-[13px] text-white/80"
                    >
                      <Icon className="h-4 w-4 shrink-0 text-gold" />
                      {label}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
