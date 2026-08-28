import CountUp from "./count-up";
import { Reveal, Stagger, StaggerItem } from "./motion";

const STATS = [
  { value: 18, suffix: "", label: "Years on Route 46", sub: "Family-owned since 2008" },
  { value: 7400, suffix: "+", label: "Cars sold to neighbors", sub: "Across Bergen County and beyond" },
  { value: 4.9, decimals: true, label: "Average review score", sub: "From 612 real customers" },
  { value: 12, suffix: "", label: "Lenders we work with", sub: "Including local credit unions" },
];

export default function TrustBar() {
  return (
    <section id="about" className="scroll-mt-24 bg-navy text-white">
      <div className="container-page py-14 lg:py-20">
        <Reveal className="max-w-xl">
          <p className="eyebrow text-gold">A little about us</p>
          <h2 className="display-3 mt-2 text-white">
            Serving Lodi and Bergen County since 2008
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
