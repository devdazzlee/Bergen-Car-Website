"use client";

import Image from "next/image";
import Link from "next/link";
import { currency, estMonthly, miles, type Vehicle } from "../lib/inventory";
import { carfaxUrl, cardBlurb, features } from "../lib/vehicle-details";
import { vehiclePath } from "../lib/vehicle-slug";
import {
  IconArrowRight,
  IconCog,
  IconExternalLink,
  IconFuel,
  IconGauge,
  IconRoad,
} from "../components/icons";

const TAG_STYLES: Record<NonNullable<Vehicle["tag"]>, string> = {
  Certified: "bg-navy text-white",
  "New Arrival": "bg-gold text-ink",
  "Price Drop": "bg-red text-white",
  "Low Miles": "bg-white text-ink ring-1 ring-line",
};

export default function InventoryCard({
  vehicle,
  altText,
}: {
  vehicle: Vehicle;
  /** Overrides the default alt text (used by the category landing pages). */
  altText?: string;
}) {
  const topFeatures = features(vehicle).slice(0, 3);

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-line shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]">
      <Link href={vehiclePath(vehicle)} className="flex flex-1 flex-col">
        <div className="relative aspect-[16/11] overflow-hidden bg-cloud">
          <Image
            src={vehicle.image}
            alt={
              altText ??
              `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.trim}`
            }
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
          />
          {vehicle.tag && (
            <span
              className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide ${TAG_STYLES[vehicle.tag]}`}
            >
              {vehicle.tag}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-4">
          <p className="text-[13px] font-medium text-navy-600">{vehicle.year}</p>
          <h3 className="mt-0.5 font-heading text-[17px] font-semibold leading-snug text-ink">
            {vehicle.make} {vehicle.model}
          </h3>
          <p className="text-sm text-navy-600">{vehicle.trim}</p>
          <p className="mt-1.5 line-clamp-2 text-[13px] leading-5 text-navy-500">
            {cardBlurb(vehicle)}
          </p>

          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-navy-600">
            <span className="inline-flex items-center gap-1.5">
              <IconGauge className="h-4 w-4 text-navy-500" />
              {miles(vehicle.mileage)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <IconRoad className="h-4 w-4 text-navy-500" />
              {vehicle.drivetrain}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <IconFuel className="h-4 w-4 text-navy-500" />
              {vehicle.fuel}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <IconCog className="h-4 w-4 text-navy-500" />
              {vehicle.transmission}
            </span>
          </div>

          {topFeatures.length > 0 && (
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {topFeatures.map((f) => (
                <span
                  key={f}
                  className="rounded-full bg-mist px-2.5 py-1 text-[11px] font-medium text-navy-700"
                >
                  {f}
                </span>
              ))}
            </div>
          )}

          <div className="mt-4 flex items-end justify-between border-t border-line pt-3">
            <div>
              <p className="font-heading text-xl font-bold tracking-tight text-gold-600">
                {currency(vehicle.price)}
              </p>
              <p className="text-[12px] text-navy-500">
                est. {currency(estMonthly(vehicle.price))}/mo
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-red transition-transform duration-200 group-hover:translate-x-0.5">
              Details
              <IconArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>

      <div className="border-t border-line px-4 py-3">
        <a
          href={carfaxUrl(vehicle)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-line px-3 py-2 text-[12px] font-semibold text-navy-700 transition-colors hover:border-navy hover:bg-navy hover:text-white"
        >
          Free Carfax report
          <IconExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}
