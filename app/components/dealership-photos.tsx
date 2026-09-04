import Image from "next/image";
import { SectionHeading } from "./section-heading";
import { Stagger, StaggerItem } from "./motion";

/**
 * Lot / showroom / team imagery for the homepage.
 *
 * These are licensed stock stand-ins until the real 22 US 46 East photos are
 * shot. Each tile carries a small "Sample" tag so it is never mistaken for a
 * production photo. Image hosts are allow-listed in next.config remotePatterns.
 *
 * Layout note: every tile has an explicit aspect ratio, so nothing depends on a
 * sibling column's height to size itself.
 */
type Photo = {
  src: string;
  alt: string;
  label: string;
  desc: string;
};

const HERO: Photo = {
  src: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=2000&q=70",
  alt: "Sample photo — used cars on a dealership lot. To be replaced with a photo of Bergen Car Company at 22 US 46 East, Lodi.",
  label: "The lot on Route 46",
  desc: "Family-owned. The price on the window is the price you pay.",
};

const TILES: Photo[] = [
  {
    src: "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?auto=format&fit=crop&w=1400&q=70",
    alt: "Sample photo — a used SUV outside a dealership. To be replaced with a photo of the Bergen Car Company lot on Route 46.",
    label: "On the lot",
    desc: "Priced on the window.",
  },
  {
    src: "https://images.pexels.com/photos/29566905/pexels-photo-29566905.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "Sample photo — a row of used cars parked on a lot. To be replaced with a photo of the Bergen showroom.",
    label: "Stop by anytime",
    desc: "No appointment needed to look around.",
  },
  {
    src: "https://images.pexels.com/photos/7144207/pexels-photo-7144207.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "Sample photo — a salesperson handing keys to a customer. To be replaced with a photo of the Bergen Car Company team.",
    label: "The people",
    desc: "The family that owns the place is at the counter.",
  },
];

function SampleTag() {
  return (
    <span className="absolute right-3 top-3 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/85 ring-1 ring-inset ring-white/20 backdrop-blur-sm">
      Sample
    </span>
  );
}

export default function DealershipPhotos() {
  return (
    <section className="bg-mist py-14 sm:py-20">
      <div className="container-page">
        <SectionHeading kicker="Our dealership" title="Here on Route 46">
          A look at the lot and the people in Lodi. The photos here
          are licensed stand-ins while we shoot our own — the place is real, the
          pictures are on the way.
        </SectionHeading>

        <Stagger className="mt-10 grid gap-4 md:grid-cols-3" stagger={0.09}>
          {/* hero */}
          <StaggerItem
            as="figure"
            className="group relative overflow-hidden rounded-3xl ring-1 ring-line shadow-[var(--shadow-card)] transition-all duration-300 hover:shadow-[var(--shadow-lift)] md:col-span-3"
          >
            <div className="relative aspect-[16/10] w-full bg-navy sm:aspect-[2/1] lg:aspect-[24/9]">
              <Image
                src={HERO.src}
                alt={HERO.alt}
                fill
                sizes="100vw"
                className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-ink/5" />
              <SampleTag />
            </div>
            <figcaption className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
              <p className="font-heading text-xl font-bold text-white sm:text-2xl">
                {HERO.label}
              </p>
              <p className="mt-1 max-w-md text-[13px] leading-6 text-white/75 sm:text-[14px]">
                {HERO.desc}
              </p>
            </figcaption>
          </StaggerItem>

          {/* trio */}
          {TILES.map((photo) => (
            <StaggerItem
              key={photo.label}
              as="figure"
              className="group relative overflow-hidden rounded-3xl ring-1 ring-line shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
            >
              <div className="relative aspect-[5/4] w-full bg-navy">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />
                <SampleTag />
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 p-5">
                <p className="font-heading text-base font-bold text-white">
                  {photo.label}
                </p>
                <p className="mt-0.5 text-[12.5px] leading-5 text-white/70">
                  {photo.desc}
                </p>
              </figcaption>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
