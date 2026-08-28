"use client";

import Image from "next/image";
import { useEffect } from "react";
import { currency, estMonthly, miles, type Vehicle } from "../lib/inventory";
import {
  IconClose,
  IconCog,
  IconFuel,
  IconGauge,
  IconKey,
  IconRoad,
  IconSpark,
} from "./icons";

export default function QuickViewModal({
  vehicle,
  onClose,
}: {
  vehicle: Vehicle | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!vehicle) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [vehicle, onClose]);

  if (!vehicle) return null;

  const specs = [
    { icon: IconGauge, label: "Mileage", value: miles(vehicle.mileage) },
    { icon: IconRoad, label: "Drivetrain", value: vehicle.drivetrain },
    { icon: IconCog, label: "Transmission", value: vehicle.transmission },
    { icon: IconFuel, label: "Fuel", value: vehicle.fuel },
    { icon: IconSpark, label: "Efficiency", value: vehicle.mpg },
    { icon: IconKey, label: "Exterior", value: vehicle.exteriorColor },
  ];

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/70 p-0 backdrop-blur-sm animate-fade sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${vehicle.year} ${vehicle.make} ${vehicle.model} details`}
      onClick={onClose}
    >
      <div
        className="animate-fade-up relative max-h-[92svh] w-full max-w-3xl overflow-y-auto rounded-t-3xl bg-white shadow-[var(--shadow-widget)] sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 inline-flex items-center justify-center rounded-full bg-white/90 p-2 text-ink shadow-md transition-colors hover:bg-white"
          aria-label="Close"
        >
          <IconClose className="h-5 w-5" />
        </button>

        <div className="relative aspect-[16/10] w-full bg-cloud">
          <Image
            src={vehicle.image}
            alt={`${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.trim}`}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>

        <div className="p-5 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-navy-600">{vehicle.year}</p>
              <h2 className="display-3 text-ink">
                {vehicle.make} {vehicle.model}
              </h2>
              <p className="text-navy-600">{vehicle.trim}</p>
            </div>
            <div className="text-right">
              <p className="font-heading text-2xl font-bold text-gold-600">
                {currency(vehicle.price)}
              </p>
              <p className="text-sm text-navy-500">
                est. {currency(estMonthly(vehicle.price))}/mo
              </p>
            </div>
          </div>

          <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-3">
            {specs.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-2.5">
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-red" />
                <div>
                  <dt className="text-[12px] uppercase tracking-wide text-navy-500">
                    {label}
                  </dt>
                  <dd className="text-sm font-medium text-ink">{value}</dd>
                </div>
              </div>
            ))}
          </dl>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contact"
              onClick={onClose}
              className="inline-flex flex-1 items-center justify-center rounded-full bg-red px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-red-600 active:scale-[0.98]"
            >
              Check availability
            </a>
            <a
              href="#financing"
              onClick={onClose}
              className="inline-flex flex-1 items-center justify-center rounded-full bg-navy px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-navy-700 active:scale-[0.98]"
            >
              Get pre-qualified
            </a>
          </div>
          <p className="mt-3 text-center text-[12px] text-navy-500">
            Payment estimate: 72 mo · 7.5% APR · 10% down. On approved credit.
          </p>
        </div>
      </div>
    </div>
  );
}
