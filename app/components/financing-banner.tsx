import { IconArrowRight, IconCheck } from "./icons";
import { Reveal } from "./motion";

const PERKS = [
  "Soft credit check — your score isn't affected",
  "Real numbers from 12 lenders in minutes",
  "Know your budget before you browse",
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

          <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <Reveal>
              <p className="eyebrow text-gold">Pre-qualification</p>
              <h2 className="display-2 mt-3 text-white">
                See your real rate before you fall for a car
              </h2>
              <p className="mt-4 max-w-lg text-lg leading-8 text-white/70">
                Two minutes now saves an afternoon at a desk later. Get a
                personalized payment range with no impact to your credit score,
                then shop knowing exactly what fits.
              </p>

              <ul className="mt-6 space-y-2.5">
                {PERKS.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-2.5 text-[15px] text-white/85"
                  >
                    <IconCheck className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1} className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur">
              <p className="text-sm text-white/60">Typical approved buyer</p>
              <p className="mt-1 font-heading text-4xl font-bold text-gold">
                $310–$430
                <span className="text-lg font-semibold text-white/70">/mo</span>
              </p>
              <p className="mt-1 text-[13px] text-white/50">
                Illustrative range · 72 mo · varies with credit &amp; down payment
              </p>
              <a
                href="#contact"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-bold text-ink transition-colors hover:bg-gold-300 active:scale-[0.98]"
              >
                Start pre-qualification
                <IconArrowRight className="h-4 w-4" />
              </a>
              <p className="mt-3 text-center text-[12px] text-white/45">
                No SSN required to start
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
