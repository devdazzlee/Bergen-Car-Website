import { IconArrowRight, IconPin } from "./icons";
import { Reveal, Stagger, StaggerItem } from "./motion";

const AREAS = [
  "Lodi",
  "Hackensack",
  "Clifton",
  "Paramus",
  "Passaic",
  "Garfield",
  "Rutherford",
  "Wallington",
  "Saddle Brook",
  "Elmwood Park",
  "Hasbrouck Heights",
  "Wood-Ridge",
  "Teaneck",
  "Fair Lawn",
];

const SEARCHES = [
  "Used SUVs under $25,000",
  "Reliable commuter sedans",
  "Trucks with 4WD",
  "First cars under $15,000",
  "AWD for New Jersey winters",
  "First-time buyer financing",
];

const FACTS = [
  { big: "No hidden fees", small: "Window price is the price you pay" },
  { big: "Financing", small: "Soft-pull pre-qualification available" },
  { big: "Warranty", small: "Coverage included on every car" },
];

export default function SeoAbout() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-8 h-72 w-72 rounded-full bg-gold/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-navy/5 blur-3xl"
      />

      <div className="container-page relative grid gap-12 lg:grid-cols-12 lg:gap-x-16">
        {/* ---- Story ---- */}
        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow flex items-center gap-2 text-red">
              <span className="h-px w-8 bg-red/60" />
              About Bergen Car Company
            </p>
            <h2 className="display-2 mt-4 text-ink">
              A family used car dealership in Lodi, New Jersey
            </h2>
          </Reveal>

          <Stagger className="mt-8 space-y-5" stagger={0.12}>
            <StaggerItem>
              <p className="border-l-2 border-red pl-6 text-lg leading-8 text-ink">
                Bergen Car Company has been selling used cars in Lodi since 2008.
                We&apos;re a family-owned dealership on Route 46, a few minutes
                from the Garden State Parkway, Route 17, and Interstate 80, and
                most of our customers come from Lodi and the surrounding Bergen
                County towns.
              </p>
            </StaggerItem>
            <StaggerItem>
              <p className="text-[15px] leading-7 text-navy-600">
                We stock the kind of cars people actually drive to work and haul
                the kids around in — used SUVs, sedans, trucks, and hatchbacks
                from Toyota, Honda, Ford, Nissan, Hyundai, and Subaru, with a few
                nicer models mixed in. History reports are available on request,
                and every car is backed by a limited warranty. The price you see
                is the price you pay, plus New Jersey tax, title, registration,
                and one documentary fee. You're welcome to have any car checked
                by a mechanic you trust before you buy.
              </p>
            </StaggerItem>
            <StaggerItem>
              <p className="text-[15px] leading-7 text-navy-600">
                Need financing? We work with lenders, including local credit
                unions and programs for first-time buyers and folks rebuilding
                their credit, and getting pre-qualified uses a soft credit check
                that won&apos;t affect your score. Have a car to
                trade? We&apos;ll put a fair written offer in your hands in about
                twenty minutes, whether or not you buy from us.
              </p>
            </StaggerItem>
          </Stagger>

          <Reveal delay={0.05} className="mt-10 border-t border-line pt-6">
            <p className="font-heading text-[15px] font-medium italic text-navy-700">
              — The Bergen Car Company family, on Route 46 since 2008
            </p>
          </Reveal>

          <Stagger className="mt-6 grid grid-cols-3 gap-4" stagger={0.08}>
            {FACTS.map((f) => (
              <StaggerItem
                key={f.big}
                className="border-l-2 border-red/60 pl-4"
              >
                <p className="font-heading text-xl font-bold tracking-tight text-ink sm:text-2xl">
                  {f.big}
                </p>
                <p className="mt-1 text-[13px] leading-snug text-navy-500">
                  {f.small}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* ---- Sidebar ---- */}
        <div className="space-y-6 lg:col-span-5">
          <Reveal className="rounded-3xl border border-line bg-white p-6 shadow-[var(--shadow-card)] sm:p-7">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-red/10 text-red">
                <IconPin className="h-5 w-5" />
              </span>
              <h3 className="font-heading text-base font-bold text-ink">
                Areas we serve
              </h3>
            </div>
            <Stagger
              className="mt-5 flex flex-wrap gap-2"
              stagger={0.028}
              delayChildren={0.1}
            >
              {AREAS.map((a) => (
                <StaggerItem
                  key={a}
                  as="span"
                  className="cursor-default rounded-full bg-mist px-3 py-1.5 text-[13px] font-medium text-navy-700 transition-colors duration-200 hover:bg-navy hover:text-white"
                >
                  {a}, NJ
                </StaggerItem>
              ))}
            </Stagger>
          </Reveal>

          <Reveal
            delay={0.08}
            className="overflow-hidden rounded-3xl bg-navy p-6 text-white sm:p-7"
          >
            <h3 className="font-heading text-base font-bold text-white">
              Popular searches
            </h3>
            <p className="mt-1 text-[13px] text-white/55">
              Jump straight into the inventory
            </p>
            <Stagger
              className="mt-4 divide-y divide-white/10"
              stagger={0.06}
              delayChildren={0.12}
            >
              {SEARCHES.map((s) => (
                <StaggerItem key={s}>
                  <a
                    href="#inventory"
                    className="group flex items-center justify-between gap-4 py-3 text-[14px] font-medium text-white/80 transition-colors hover:text-white"
                  >
                    {s}
                    <IconArrowRight className="h-4 w-4 shrink-0 text-gold transition-transform duration-200 group-hover:translate-x-1" />
                  </a>
                </StaggerItem>
              ))}
            </Stagger>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
