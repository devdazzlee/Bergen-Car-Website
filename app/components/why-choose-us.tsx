import {
  IconShield,
  IconWallet,
  IconSwap,
  IconWrench,
  IconKey,
  IconGauge,
} from "./icons";
import { Reveal, Stagger, StaggerItem } from "./motion";

const POINTS = [
  {
    icon: IconShield,
    title: "History reports on request",
    body: "Ask for the vehicle history report on any car you're considering. You're also welcome to take it to a mechanic you trust before you buy — we'll hold it while you do.",
  },
  {
    icon: IconWallet,
    title: "We'll help with the financing",
    body: "We work with lenders, including local credit unions, and fill out the application with you. Good credit, rebuilding it, or buying your first car — we'll find what works.",
  },
  {
    icon: IconSwap,
    title: "A fair price for your trade",
    body: "Bring your car in and we'll give you a written offer, usually in about twenty minutes. Put it toward your next car or just take the check.",
  },
  {
    icon: IconWrench,
    title: "A warranty comes standard",
    body: "Every car includes a 3-month / 3,000-mile warranty, and you can add longer coverage on most of them if you want the extra peace of mind.",
  },
  {
    icon: IconKey,
    title: "The price is the price",
    body: "What you see on the window and online is what you pay, plus the usual state fees. No surprise add-ons once you sit down.",
  },
  {
    icon: IconGauge,
    title: "You still talk to us after",
    body: "We're a small lot. If something comes up after you buy, you call the same people who sold you the car — not a service desk that doesn't know your name.",
  },
];

export default function WhyChooseUs({
  eyebrow = "Why people buy here",
  heading = "We treat you the way we’d want to be treated",
  intro = "A lot of our customers were sent here by a friend or a relative. Here’s what keeps them coming back for the next one.",
  background = "bg-white",
}: {
  eyebrow?: string;
  heading?: string;
  intro?: string;
  background?: string;
} = {}) {
  return (
    <section id="why" className={`scroll-mt-24 py-20 sm:py-24 ${background}`}>
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-red">{eyebrow}</p>
          <h2 className="display-2 mt-2 text-ink">{heading}</h2>
          <p className="mt-4 text-lg leading-8 text-navy-600">{intro}</p>
        </Reveal>

        <Stagger
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.08}
        >
          {POINTS.map(({ icon: Icon, title, body }, i) => (
            <StaggerItem
              key={title}
              className="group relative overflow-hidden rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-transparent hover:shadow-[var(--shadow-lift)]"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-red transition-transform duration-300 group-hover:scale-x-100"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute right-5 top-5 font-heading text-sm font-bold text-cloud"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-gold transition-colors duration-300 group-hover:bg-red group-hover:text-white">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold text-ink">
                {title}
              </h3>
              <p className="mt-2 text-[15px] leading-7 text-navy-600">{body}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal
          delay={0.1}
          className="mt-8 border-l-2 border-gold pl-5 text-[15px] italic leading-7 text-navy-700"
        >
          And the people at the counter are the same people who own the place.
        </Reveal>
      </div>
    </section>
  );
}
