"use client";

import Image from "next/image";
import Link from "next/link";
import { currency, estMonthly, miles, type Vehicle } from "../lib/inventory";
import type { VehicleSpecial } from "../lib/specials";
import { IconArrowRight } from "../components/icons";

const BADGE: Record<VehicleSpecial["badge"], string> = {
  "Just reduced": "bg-red text-white",
  "Price drop": "bg-red text-white",
  "Low miles": "bg-white text-ink ring-1 ring-line-strong",
  "Manager's pick": "bg-navy text-white",
  "Under $12k": "bg-gold text-ink",
};

export default function SpecialCard({
  special,
  vehicles,
}: {
  special: VehicleSpecial;
  vehicles: Vehicle[];
}) {
  const v = vehicles.find((x) => x.id === special.vehicleId);
  if (!v) return null;
  const save = special.wasPrice ? special.wasPrice - v.price : 0;

  return (
    <Link
      href={`/inventory/${v.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-line-strong shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]"
    >
      <div className="relative aspect-[16/11] overflow-hidden bg-cloud">
        <Image
          src={v.image}
          alt={`${v.year} ${v.make} ${v.model} ${v.trim}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
        />
        <span
          className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide ${BADGE[special.badge]}`}
        >
          {special.badge}
        </span>
        {save > 0 && (
          <span className="absolute right-3 top-3 rounded-full bg-navy px-2.5 py-1 text-[11px] font-bold text-gold">
            Save {currency(save)}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[13px] font-medium text-navy-600">{v.year}</p>
        <h3 className="mt-0.5 font-heading text-[17px] font-semibold leading-snug text-ink">
          {v.make} {v.model}
        </h3>
        <p className="text-sm text-navy-600">{v.trim}</p>

        <p className="mt-3 font-heading text-[15px] font-semibold text-ink">
          {special.headline}
        </p>
        <p className="mt-1 flex-1 text-[13px] leading-6 text-navy-600">
          {special.detail}
        </p>

        <div className="mt-4 flex items-end justify-between border-t border-line pt-3">
          <div>
            <div className="flex items-baseline gap-2">
              <p className="font-heading text-xl font-bold tracking-tight text-gold-600">
                {currency(v.price)}
              </p>
              {special.wasPrice && (
                <p className="text-[13px] text-navy-400 line-through">
                  {currency(special.wasPrice)}
                </p>
              )}
            </div>
            <p className="text-[12px] text-navy-500">
              est. {currency(estMonthly(v.price))}/mo · {miles(v.mileage)}
            </p>
          </div>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-red transition-transform duration-200 group-hover:translate-x-0.5">
            See this car
            <IconArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
