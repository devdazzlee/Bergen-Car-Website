import CountUp from "./count-up";
import { Reveal, Stagger, StaggerItem } from "./motion";

const STATS = [
  { value: 18, suffix: "", label: "Years in business", sub: "Family-run since 2008" },
  { value: 7400, suffix: "+", label: "Cars delivered", sub: "To neighbors across NJ" },
  { value: 4.9, decimals: true, label: "Average rating", sub: "612 verified reviews" },
  { value: 12, suffix: "", label: "Lenders on desk", sub: "One form, real options" },
];

export default function TrustBar() {
  return (
    <section id="about" className="scroll-mt-24 bg-navy text-white">
      <div className="container-page py-14 lg:py-20">
        <Reveal className="max-w-xl">
          <p className="eyebrow text-gold">By the numbers</p>
          <h2 className="display-3 mt-2 text-white">
            Eighteen years of doing this the boring, honest way
          </h2>
        </Reveal>

        <Stagger className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 lg:mt-12 lg:grid-cols-4">
          {STATS.map((s) => (
            <StaggerItem key={s.label} className="border-l-2 border-red/70 pl-4">
              <p className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">
                {s.decimals ? (
                  <>
                    4.9<span className="text-gold">★</span>
                  </>
                ) : (
                  <CountUp value={s.value} suffix={s.suffix} />
                )}
              </p>
              <p className="mt-2 text-sm font-semibold text-white/90">{s.label}</p>
              <p className="text-[13px] text-white/55">{s.sub}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
