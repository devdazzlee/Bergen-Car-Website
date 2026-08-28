import { Reveal } from "./motion";

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
  "Used SUVs under $30,000",
  "Certified pre-owned sedans",
  "Trucks with 4WD",
  "Low-mileage coupes",
  "Hybrid & electric cars",
  "First-time buyer financing",
];

export default function SeoAbout() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="container-page grid gap-12 lg:grid-cols-[1.3fr_0.7fr]">
        <Reveal as="article" className="max-w-2xl">
          <p className="eyebrow text-red">About Bergen Car Company</p>
          <h2 className="display-3 mt-2 text-ink">
            A used car dealership in Lodi, New Jersey — built on repeat customers
          </h2>
          <div className="mt-5 space-y-4 text-[15px] leading-7 text-navy-600">
            <p>
              Bergen Car Company has sold quality pre-owned vehicles in Lodi
              since 2008. We&apos;re a family-run dealership on Route 46, minutes
              from the Garden State Parkway, Route 17, and Interstate 80, serving
              drivers across Bergen County, Passaic County, and the greater New
              York City metro.
            </p>
            <p>
              Our inventory spans used SUVs, sedans, trucks, coupes, and
              hatchbacks from brands like Toyota, Honda, Ford, BMW,
              Mercedes-Benz, and Tesla. Every vehicle passes a 150-point
              inspection by ASE-certified technicians, comes with a free vehicle
              history report, and is backed by a limited warranty. Pricing is
              posted up front — the number you see online is the number you pay,
              plus New Jersey tax, title, registration, and a single
              documentary fee.
            </p>
            <p>
              Need financing? We work with a network of 12 lenders, including
              local credit unions and first-time-buyer and credit-rebuilding
              programs, so you can get pre-qualified with a soft credit check
              that won&apos;t affect your score. Have a car to trade? We&apos;ll
              give you a firm written offer in about 20 minutes, whether or not
              you buy from us.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.05} className="space-y-8">
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-navy-500">
              Areas we serve
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {AREAS.map((a) => (
                <li
                  key={a}
                  className="rounded-full bg-mist px-3 py-1.5 text-[13px] font-medium text-navy-700"
                >
                  {a}, NJ
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-navy-500">
              Popular searches
            </h3>
            <ul className="mt-3 space-y-2">
              {SEARCHES.map((s) => (
                <li key={s}>
                  <a
                    href="#inventory"
                    className="group inline-flex items-center gap-2 text-[14px] font-medium text-navy-700 hover:text-red"
                  >
                    <span className="h-px w-4 bg-navy-400 transition-all group-hover:w-6 group-hover:bg-red" />
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
