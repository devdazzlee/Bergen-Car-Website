import { resolveApiBase } from "./api-base";

export type Vehicle = {
  id: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  price: number;
  mileage: number;
  bodyStyle:
    | "SUV"
    | "Sedan"
    | "Truck"
    | "Coupe"
    | "Hatchback"
    | "Minivan"
    | "Cargo Van"
    | "Passenger Van"
    | "Wagon"
    | "Convertible";
  drivetrain: "AWD" | "FWD" | "RWD" | "4WD";
  transmission: string;
  fuel: "Gasoline" | "Hybrid" | "Electric";
  exteriorColor: string;
  mpg: string;
  image: string;
  photos?: string[];
  tag?: "Certified" | "New Arrival" | "Price Drop" | "Low Miles";
  commercial?: boolean;
  formerPolice?: boolean;
  luxury?: boolean;
  handicapAccessible?: boolean;
  /** Real VIN from the Bergen API, when the vehicle has one on file. */
  vin?: string;
};

export const PRICE_RANGES = [
  { label: "Any price", min: 0, max: Infinity },
  { label: "Under $15,000", min: 0, max: 15000 },
  { label: "$15,000 – $20,000", min: 15000, max: 20000 },
  { label: "$20,000 – $25,000", min: 20000, max: 25000 },
  { label: "$25,000 – $35,000", min: 25000, max: 35000 },
  { label: "$35,000+", min: 35000, max: Infinity },
] as const;

/** URL-friendly id for a price range, e.g. "under-15000". Used to deep-link
 * into /inventory with a price filter pre-applied (see the homepage's
 * "Under $15,000" quick-browse link). */
export function priceRangeSlug(r: { min: number; max: number }): string {
  if (r.min === 0 && !Number.isFinite(r.max)) return "any";
  if (r.min === 0) return `under-${r.max}`;
  if (!Number.isFinite(r.max)) return `${r.min}-plus`;
  return `${r.min}-${r.max}`;
}

export const MILEAGE_RANGES = [
  { label: "Any mileage", min: 0, max: Infinity },
  { label: "Under 30,000 mi", min: 0, max: 30000 },
  { label: "30,000 – 60,000 mi", min: 30000, max: 60000 },
  { label: "60,000 – 90,000 mi", min: 60000, max: 90000 },
  { label: "Over 90,000 mi", min: 90000, max: Infinity },
] as const;

export const INVENTORY_SORTS = [
  { value: "year-desc", label: "Newest first" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "mileage-asc", label: "Lowest mileage" },
] as const;

export type InventorySort = (typeof INVENTORY_SORTS)[number]["value"];

export const SORTS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "year-desc", label: "Year: Newest" },
  { value: "mileage-asc", label: "Mileage: Lowest" },
] as const;

export type SortValue = (typeof SORTS)[number]["value"];

export const FUEL_TYPES: Vehicle["fuel"][] = ["Gasoline", "Hybrid", "Electric"];

export function makesOf(vehicles: Vehicle[]): string[] {
  return Array.from(new Set(vehicles.map((v) => v.make))).sort();
}

export function yearsOf(vehicles: Vehicle[]): number[] {
  return Array.from(new Set(vehicles.map((v) => v.year))).sort((a, b) => b - a);
}

export function bodyStylesOf(vehicles: Vehicle[]): Vehicle["bodyStyle"][] {
  return Array.from(new Set(vehicles.map((v) => v.bodyStyle))).sort();
}

export function modelsForMake(make: string, vehicles: Vehicle[]): string[] {
  const list = vehicles
    .filter((v) => make === "" || v.make === make)
    .map((v) => v.model);
  return Array.from(new Set(list)).sort();
}

export type VehicleFlag =
  | "commercial"
  | "formerPolice"
  | "luxury"
  | "handicapAccessible";

export function inferVehicleFlags(v: Vehicle): Vehicle {
  const hay = `${v.make} ${v.model} ${v.trim}`.toLowerCase();
  return {
    ...v,
    commercial:
      v.commercial === true ||
      v.bodyStyle === "Cargo Van" ||
      /\bcargo\b/.test(hay),
    formerPolice:
      v.formerPolice === true ||
      hay.includes("police interceptor") ||
      /\bppv\b/.test(hay) ||
      /\bpolice\b/.test(hay),
    handicapAccessible:
      v.handicapAccessible === true ||
      /wheelchair|handicap|braun|mobility|side entry|rear entry/.test(hay),
  };
}

export function featuredOf(vehicles: Vehicle[], count = 12): Vehicle[] {
  return vehicles.slice(0, count);
}

export const currency = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

export const miles = (n: number) => `${n.toLocaleString("en-US")} mi`;

/** Unique listing photos, `photos[]` first then the card `image`. */
export function listingPhotos(vehicle: Vehicle): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const url of [...(vehicle.photos ?? []), vehicle.image]) {
    const trimmed = typeof url === "string" ? url.trim() : "";
    if (!trimmed || seen.has(trimmed)) continue;
    seen.add(trimmed);
    out.push(trimmed);
  }
  return out;
}

/** Rough monthly estimate — 72 mo, 7.5% APR, 10% down. Illustration only. */
export function estMonthly(price: number): number {
  const principal = price * 0.9;
  const r = 0.075 / 12;
  const n = 72;
  const m = (principal * r) / (1 - Math.pow(1 + r, -n));
  return Math.round(m / 5) * 5;
}

export async function fetchInventory(): Promise<Vehicle[]> {
  const url = `${resolveApiBase()}/api/inventory`;
  let res: Response;
  try {
    res = await fetch(url, {
      // Static HTML export cannot prerender a no-store fetch. The lot is
      // snapshotted at build time; the Bergen API still refreshes every 30 min.
      cache: "force-cache",
    });
  } catch (error) {
    const detail = error instanceof Error ? error.message : "network error";
    throw new Error(`Cannot reach Bergen inventory API at ${url} (${detail})`);
  }
  if (!res.ok) {
    throw new Error(`Inventory request failed (${res.status}) from ${url}`);
  }
  const body = (await res.json()) as { data?: Vehicle[] };
  if (!Array.isArray(body.data)) {
    throw new Error(`Inventory response from ${url} is missing data[]`);
  }
  return body.data.map(inferVehicleFlags);
}

let inflight: Promise<Vehicle[]> | null = null;

/** Dedupes inventory fetches during a production/static build pass. */
export function getInventory(): Promise<Vehicle[]> {
  if (process.env.NODE_ENV !== "production") {
    return fetchInventory();
  }
  if (!inflight) inflight = fetchInventory();
  return inflight;
}
