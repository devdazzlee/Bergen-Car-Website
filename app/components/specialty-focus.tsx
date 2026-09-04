import Image from "next/image";
import Link from "next/link";
import { listingPhotos, type Vehicle } from "../lib/inventory";
import { firstPhotoWithoutDealerWatermark } from "../lib/dealer-watermark";
import {
  FEATURED_SPECIALTIES,
  categoryAlt,
  getCategory,
  vehiclesForSpecialty,
  type FeaturedSpecialty,
} from "../lib/vehicle-categories";
import { IconArrowRight } from "./icons";
import { Reveal, Stagger, StaggerItem } from "./motion";

function SampleTag() {
  return (
    <span className="absolute right-3 top-3 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/85 ring-1 ring-inset ring-white/20 backdrop-blur-sm">
      Sample
    </span>
  );
}

/**
 * Licensed stock photos shown when no in-stock vehicle for a specialty has a
 * clean (non-watermarked) listing photo yet — e.g. no handicap-accessible unit
 * is currently in the live feed. Real photo, honestly tagged "Sample", rather
 * than an empty gradient tile.
 */
const FALLBACK_PHOTO: Record<string, string> = {
  "used-cargo-vans-lodi-nj":
    "https://images.pexels.com/photos/11446697/pexels-photo-11446697.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "used-police-cars-lodi-nj":
    "https://images.pexels.com/photos/5880087/pexels-photo-5880087.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "used-handicap-accessible-vehicles-lodi-nj":
    "https://images.pexels.com/photos/19956153/pexels-photo-19956153.jpeg?auto=compress&cs=tinysrgb&w=1200",
};

async function firstCleanSpecialtyListing(
  specialty: FeaturedSpecialty,
  vehicles: Vehicle[],
): Promise<{ vehicle: Vehicle; photo: string } | null> {
  for (const vehicle of vehiclesForSpecialty(specialty, vehicles)) {
    const photo = await firstPhotoWithoutDealerWatermark(
      listingPhotos(vehicle),
    );
    if (photo) return { vehicle, photo };
  }
  return null;
}

export default async function SpecialtyFocus({
  vehicles,
}: {
  vehicles: Vehicle[];
}) {
  const tiles = await Promise.all(
    FEATURED_SPECIALTIES.map(async (s) => {
      const listing = await firstCleanSpecialtyListing(s, vehicles);
      return { s, vehicle: listing?.vehicle, photo: listing?.photo ?? null };
    }),
  );

  return (
    <section
      aria-labelledby="specialty-heading"
      className="relative z-10 pt-10 sm:pt-12"
    >
      <div className="container-page">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="eyebrow text-red">What we specialize in</p>
            <h2 id="specialty-heading" className="display-3 mt-2 text-ink">
              Work vans, police cars, and handicap-accessible vehicles
            </h2>
            <p className="mt-3 text-[15px] leading-7 text-navy-600">
              These three are the heart of the lot. Sedans, SUVs, trucks, and
              everything else stay fully available below — shop the specialty
              you need, or keep browsing the whole inventory.
            </p>
          </div>
          <Link
            href="/inventory"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-red hover:underline"
          >
            See the full lot
            <IconArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <Stagger className="mt-8 grid gap-5 sm:grid-cols-3" stagger={0.08}>
          {tiles.map(({ s, vehicle, photo }) => {
            const cat = getCategory(s.slug);
            const sampleNoun = cat?.altNoun ?? s.label.toLowerCase();
            const alt =
              photo && vehicle
                ? categoryAlt(sampleNoun, vehicle.year, vehicle.make, vehicle.model)
                : `Sample photo of a ${sampleNoun} in Lodi, NJ.`;
            // A real in-stock photo wins; otherwise fall back to a licensed
            // stock photo (tagged "Sample") instead of an empty tile.
            const displaySrc = photo ?? FALLBACK_PHOTO[s.slug];

            return (
              <StaggerItem key={s.slug}>
                <Link
                  href={s.href}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-line shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] hover:ring-navy/20"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-navy">
                    {displaySrc ? (
                      <>
                        <Image
                          src={displaySrc}
                          alt={alt}
                          fill
                          sizes="(max-width: 640px) 100vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                        />
                        {!photo && (
                          <>
                            <div
                              aria-hidden
                              className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/5 to-transparent"
                            />
                            <SampleTag />
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <div
                          aria-hidden
                          className="absolute inset-0 bg-gradient-to-br from-navy via-navy-600 to-ink"
                        />
                        <p className="absolute inset-x-4 bottom-4 text-[13px] leading-5 text-white/70">
                          {alt}
                        </p>
                        <SampleTag />
                      </>
                    )}
                    <span className="absolute left-3 top-3 rounded-full bg-navy/90 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-white">
                      Specialty
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-heading text-xl font-bold tracking-tight text-ink">
                      {s.label}
                    </h3>
                    <p className="mt-1.5 flex-1 text-[14px] leading-6 text-navy-600">
                      {s.blurb}
                    </p>
                    {vehicle && (
                      <p className="mt-2 text-[12px] text-navy-400">
                        {vehicle.year} {vehicle.make} {vehicle.model}
                      </p>
                    )}
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-red transition-transform duration-200 group-hover:translate-x-0.5">
                      Shop {s.label.toLowerCase()}
                      <IconArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
