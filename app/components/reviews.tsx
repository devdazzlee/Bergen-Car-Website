import { IconStar } from "./icons";
import { Reveal, Stagger, StaggerItem } from "./motion";

const REVIEWS = [
  {
    name: "Marisol D.",
    initials: "MD",
    city: "Garfield, NJ",
    car: "2019 Honda CR-V",
    text: "I was dreading the whole thing and it turned out fine. The price was the price, no surprises, and they had my financing worked out before I got there.",
  },
  {
    name: "Kevin R.",
    initials: "KR",
    city: "Hackensack, NJ",
    car: "2020 Toyota Camry",
    text: "Bought a Camry for my daughter's first car. They walked us through everything and didn't push any extras on us. I'd send my friends here.",
  },
  {
    name: "Aisha T.",
    initials: "AT",
    city: "Clifton, NJ",
    car: "2019 Hyundai Elantra",
    text: "Traded in my old car and the offer was fair — I checked it against two other places. Everything was done in about an hour.",
  },
  {
    name: "Frank & Lucia P.",
    initials: "FP",
    city: "Lodi, NJ",
    car: "2021 Toyota 4Runner",
    text: "Third car we've bought from Bergen over the years. Same honest people, and their shop has taken care of all of them since.",
  },
];

export default function Reviews() {
  return (
    <section className="relative overflow-hidden bg-mist py-20 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 right-4 select-none font-heading text-[12rem] leading-none text-cloud sm:right-16 sm:text-[18rem]"
      >
        &rdquo;
      </div>

      <div className="container-page relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal className="max-w-xl">
            <p className="eyebrow text-red">What our customers say</p>
            <h2 className="display-2 mt-2 text-ink">In their words</h2>
          </Reveal>

          <Reveal
            delay={0.05}
            className="flex items-center gap-4 rounded-2xl bg-white px-5 py-4 ring-1 ring-line shadow-[var(--shadow-card)]"
          >
            <div>
              <span className="flex text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <IconStar key={i} className="h-5 w-5" />
                ))}
              </span>
              <p className="mt-1 font-heading text-lg font-bold leading-none text-ink">
                4.9 / 5
              </p>
            </div>
            <span className="h-10 w-px bg-line" />
            <div className="text-[12px] text-navy-500">
              <p className="font-semibold text-navy-700">612 reviews</p>
              <p>Google &amp; DealerRater</p>
            </div>
          </Reveal>
        </div>

        <Stagger
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.09}
        >
          {REVIEWS.map((r, i) => {
            const featured = i === 0;
            return (
              <StaggerItem
                key={r.name}
                as="figure"
                className={`group relative flex flex-col overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 ${
                  featured
                    ? "bg-navy text-white shadow-[var(--shadow-lift)]"
                    : "bg-white ring-1 ring-line shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-lift)]"
                }`}
              >
                {!featured && (
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gold transition-transform duration-300 group-hover:scale-x-100"
                  />
                )}
                <span
                  aria-hidden
                  className="font-heading text-5xl leading-none text-gold/70"
                >
                  &ldquo;
                </span>
                <span className="mt-1 flex text-gold">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <IconStar key={k} className="h-4 w-4" />
                  ))}
                </span>
                <blockquote
                  className={`mt-3 flex-1 text-[15px] leading-7 ${
                    featured ? "text-white/90" : "text-navy-700"
                  }`}
                >
                  {r.text}
                </blockquote>
                <figcaption
                  className={`mt-5 flex items-center gap-3 border-t pt-4 ${
                    featured ? "border-white/15" : "border-line"
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[13px] font-bold ${
                      featured ? "bg-white/15 text-white" : "bg-navy text-white"
                    }`}
                  >
                    {r.initials}
                  </span>
                  <span className="min-w-0">
                    <span
                      className={`block font-heading text-sm font-semibold ${
                        featured ? "text-white" : "text-ink"
                      }`}
                    >
                      {r.name}
                    </span>
                    <span
                      className={`block truncate text-[13px] ${
                        featured ? "text-white/55" : "text-navy-500"
                      }`}
                    >
                      {r.city} · {r.car}
                    </span>
                  </span>
                </figcaption>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
