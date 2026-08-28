import { IconStar } from "./icons";
import { Reveal, Stagger, StaggerItem } from "./motion";

const REVIEWS = [
  {
    name: "Marisol D.",
    city: "Garfield, NJ",
    car: "2021 Honda CR-V",
    text: "I dreaded car shopping and this was genuinely easy. The price online was the price I paid. Financing was sorted before I got there.",
  },
  {
    name: "Kevin R.",
    city: "Hackensack, NJ",
    car: "2020 Ram 1500",
    text: "Traded in my old truck and the offer was fair — I checked it against three other places. No pressure, no games. In and out in about an hour.",
  },
  {
    name: "Aisha T.",
    city: "Clifton, NJ",
    car: "2022 Toyota Corolla",
    text: "First car on my own credit. They walked me through every number and got me a credit union rate I didn't think I'd qualify for.",
  },
  {
    name: "Frank & Lucia P.",
    city: "Lodi, NJ",
    car: "2019 Subaru Outback",
    text: "Third car we've bought from Bergen over the years. Same honest people. Their service shop has taken care of all of them since.",
  },
];

export default function Reviews() {
  return (
    <section className="bg-mist py-20 sm:py-24">
      <div className="container-page">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <p className="eyebrow text-red">Customer reviews</p>
            <h2 className="display-2 mt-2 text-ink">
              600+ reviews, and they read like this
            </h2>
          </div>
          <div className="flex items-center gap-3 rounded-2xl bg-white px-5 py-3 ring-1 ring-line">
            <span className="flex text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <IconStar key={i} className="h-5 w-5" />
              ))}
            </span>
            <div>
              <p className="font-heading text-lg font-bold leading-none text-ink">
                4.9 / 5
              </p>
              <p className="text-[12px] text-navy-500">Google &amp; DealerRater</p>
            </div>
          </div>
        </Reveal>

        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {REVIEWS.map((r) => (
            <StaggerItem
              key={r.name}
              as="figure"
              className="flex flex-col rounded-2xl bg-white p-6 ring-1 ring-line shadow-[var(--shadow-card)]"
            >
              <span className="flex text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <IconStar key={i} className="h-4 w-4" />
                ))}
              </span>
              <blockquote className="mt-3 flex-1 text-[15px] leading-7 text-navy-700">
                &ldquo;{r.text}&rdquo;
              </blockquote>
              <figcaption className="mt-5 border-t border-line pt-4">
                <p className="font-heading text-sm font-semibold text-ink">
                  {r.name}
                </p>
                <p className="text-[13px] text-navy-500">
                  {r.city} · {r.car}
                </p>
              </figcaption>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
