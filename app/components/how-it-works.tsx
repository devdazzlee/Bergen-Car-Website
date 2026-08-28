import { Reveal, Stagger, StaggerItem } from "./motion";
import { IconSearch, IconWallet, IconKey, IconCheck } from "./icons";

const STEPS = [
  {
    icon: IconSearch,
    title: "Find it",
    body: "Filter the inventory by year, make, model, and budget. Every listing shows the real price and its inspection report.",
  },
  {
    icon: IconWallet,
    title: "Get your number",
    body: "Pre-qualify in two minutes with a soft credit check. You'll see a payment range from up to 12 lenders before you commit.",
  },
  {
    icon: IconKey,
    title: "Drive it in Lodi",
    body: "Book a test drive that fits your schedule. Bring your trade — we'll appraise it while you're out on the road.",
  },
  {
    icon: IconCheck,
    title: "Done in one visit",
    body: "Paperwork is prepped before you arrive. Most customers are signed, insured, and driving home the same afternoon.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-mist py-20 sm:py-24">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-red">How it works</p>
          <h2 className="display-2 mt-2 text-ink">
            Four steps. No back-and-forth.
          </h2>
          <p className="mt-4 text-lg leading-8 text-navy-600">
            We rebuilt the used-car process around your time instead of a
            sales desk.
          </p>
        </Reveal>

        <Stagger className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ icon: Icon, title, body }, i) => (
            <StaggerItem key={title} className="relative">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-navy font-heading text-lg font-bold text-gold">
                  {i + 1}
                </span>
                <Icon className="h-6 w-6 text-red" />
              </div>
              <h3 className="mt-5 font-heading text-lg font-semibold text-ink">
                {title}
              </h3>
              <p className="mt-2 text-[15px] leading-7 text-navy-600">{body}</p>
              {i < STEPS.length - 1 && (
                <span
                  aria-hidden
                  className="absolute -right-4 top-6 hidden h-px w-8 bg-line lg:block"
                />
              )}
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
