import { Reveal, Stagger, StaggerItem } from "./motion";
import AutosalesReviewsBadgeSlot from "./autosalesreviews-badge-slot";
import type { DealerRating } from "../lib/dealer-rating";

const POINTS = [
  {
    title: "No hidden fees",
    body: "The price on the window is the price you pay. Tax, title, registration, and one documentary fee — that's the whole list.",
  },
  {
    title: "Financing available",
    body: "Pre-qualify with a soft credit check that won't touch your score. We shop lenders, including local credit unions.",
  },
  {
    title: "Warranty included",
    body: "Every car comes with a 3-month / 3,000-mile limited powertrain warranty. Longer coverage is optional.",
  },
  {
    title: "Fair written trade-ins",
    body: "A number in writing, usually the same day. Put it toward a car here or take the check — no obligation to buy.",
  },
];

export default function TrustBar({
  rating = null,
}: {
  rating?: DealerRating | null;
}) {
  return (
    <section id="about" className="scroll-mt-24 bg-navy text-white">
      <div className="container-page py-14 lg:py-20">
        <Reveal className="flex max-w-3xl flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow text-gold">What you can count on</p>
            <h2 className="display-3 mt-2 text-white">
              Straight pricing, real financing, coverage after you buy
            </h2>
          </div>
          <AutosalesReviewsBadgeSlot variant="dark" rating={rating} />
        </Reveal>

        <Stagger className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          {POINTS.map((p) => (
            <StaggerItem key={p.title} className="border-l-2 border-red/70 pl-4">
              <p className="font-heading text-lg font-bold tracking-tight text-white">
                {p.title}
              </p>
              <p className="mt-2 text-[13px] leading-6 text-white/60">{p.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
