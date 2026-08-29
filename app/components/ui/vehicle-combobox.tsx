"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "../../lib/utils";
import { currency, miles, type Vehicle } from "../../lib/inventory";
import { IconSearch } from "../icons";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

function Chevron(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function VehicleCombobox({
  vehicles,
  value,
  onChange,
  onClose,
  id,
  className,
  invalid = false,
  placeholder = "Search by make, model, or year…",
}: {
  vehicles: Vehicle[];
  value?: Vehicle;
  onChange: (v: Vehicle) => void;
  onClose?: () => void;
  id?: string;
  className?: string;
  invalid?: boolean;
  placeholder?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  const results = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return vehicles;
    const tokens = q.split(/\s+/);
    return vehicles.filter((v) => {
      const hay =
        `${v.year} ${v.make} ${v.model} ${v.trim} ${v.bodyStyle} ${v.fuel}`.toLowerCase();
      return tokens.every((t) => hay.includes(t));
    });
  }, [query, vehicles]);

  return (
    <Popover
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) {
          setQuery("");
          onClose?.();
        }
      }}
    >
      <PopoverTrigger asChild>
        <button
          type="button"
          id={id}
          aria-label="Choose a vehicle to test drive"
          className={cn(
            "flex h-11 w-full items-center justify-between gap-2 rounded-xl border border-line-strong bg-white px-3.5 text-left text-[15px] font-medium text-ink outline-none transition-[border-color,box-shadow] duration-200 focus:border-navy focus:ring-2 focus:ring-navy/15",
            !value && "font-normal text-navy-400",
            invalid && "border-gold/70 ring-2 ring-gold/15",
            className,
          )}
        >
          <span className="line-clamp-1">
            {value
              ? `${value.year} ${value.make} ${value.model} · ${value.trim}`
              : "Pick the car you'd like to drive"}
          </span>
          <Chevron className="shrink-0 text-navy-500" />
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="w-[var(--radix-popover-trigger-width)] overflow-hidden p-0"
      >
        <div className="relative border-b border-line">
          <IconSearch className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="h-11 w-full bg-transparent pl-10 pr-3.5 text-[14px] text-ink outline-none placeholder:text-navy-400"
          />
        </div>

        <div className="max-h-72 overflow-y-auto p-1.5">
          {results.length === 0 ? (
            <p className="px-3 py-6 text-center text-[13px] text-navy-500">
              No cars match “{query}”. Try a make or a year.
            </p>
          ) : (
            results.map((v) => {
              const active = value?.id === v.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => {
                    onChange(v);
                    setQuery("");
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-mist",
                    active && "bg-mist",
                  )}
                >
                  <span className="relative h-11 w-16 shrink-0 overflow-hidden rounded-md bg-cloud">
                    <Image
                      src={v.image}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-heading text-[13.5px] font-semibold text-ink">
                      {v.year} {v.make} {v.model}
                    </span>
                    <span className="block truncate text-[12px] text-navy-500">
                      {v.trim} · {currency(v.price)} · {miles(v.mileage)}
                    </span>
                  </span>
                  {v.tag ? (
                    <span className="shrink-0 rounded-full bg-navy/[0.06] px-2 py-0.5 text-[10px] font-semibold text-navy-600">
                      {v.tag}
                    </span>
                  ) : null}
                </button>
              );
            })
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
