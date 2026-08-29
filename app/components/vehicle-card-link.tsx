import Image from "next/image";
import Link from "next/link";
import { currency, estMonthly, miles, type Vehicle } from "../lib/inventory";
import { IconArrowRight, IconGauge, IconRoad } from "./icons";

const TAG_STYLES: Record<NonNullable<Vehicle["tag"]>, string> = {
  Certified: "bg-navy text-white",
  "New Arrival": "bg-gold text-ink",
  "Price Drop": "bg-red text-white",
  "Low Miles": "bg-white text-ink ring-1 ring-line",
};

/**
 * Same visual language as the Inventory page card, but a plain link straight to
 * the vehicle detail page — no quick-view modal. Used on the city landing pages.
 */
export default function VehicleCardLink({ vehicle }: { vehicle: Vehicle }) {
  return (
    <Link
      href={`/inventory/${vehicle.id}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-line shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]"
    >
      <div className="relative aspect-[16/11] overflow-hidden bg-cloud">
        <Image
          src={vehicle.image}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.trim}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
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

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-navy-600">
          <span className="inline-flex items-center gap-1.5">
            <IconGauge className="h-4 w-4 text-navy-500" />
            {miles(vehicle.mileage)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <IconRoad className="h-4 w-4 text-navy-500" />
            {vehicle.drivetrain}
          </span>
        </div>

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
            View
            <IconArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
