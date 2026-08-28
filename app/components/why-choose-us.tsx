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
    title: "150-point inspection",
    body: "Every car is inspected by our own ASE-certified techs before it hits the lot. The report comes with it.",
  },
  {
    icon: IconWallet,
    title: "Financing that fits",
    body: "We send one application to 12 lenders and bring you the real numbers — including credit unions and first-time buyers.",
  },
  {
    icon: IconSwap,
    title: "Straight trade-in offers",
    body: "Firm written offer in about 20 minutes. Apply it to your next car or take the check.",
  },
  {
    icon: IconWrench,
    title: "Warranty on every car",
    body: "A 3-month / 3,000-mile limited warranty is standard, with extended coverage available on most vehicles.",
  },
  {
    icon: IconKey,
    title: "Up-front pricing",
    body: "The price online is the price. No document surprises, no four-square, no back-and-forth.",
  },
  {
    icon: IconGauge,
    title: "On-site service center",
    body: "Bought here or not, our shop keeps your car running — oil, brakes, tires, diagnostics, and NJ inspection prep.",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why" className="scroll-mt-24 bg-white py-20 sm:py-24">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-red">Why Bergen</p>
          <h2 className="display-2 mt-2 text-ink">
            A used car process built to be boring
          </h2>
          <p className="mt-4 text-lg leading-8 text-navy-600">
            The stressful parts of buying a used car are the parts we removed on
            purpose.
          </p>
        </Reveal>

        <Stagger className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {POINTS.map(({ icon: Icon, title, body }) => (
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
  );
}
