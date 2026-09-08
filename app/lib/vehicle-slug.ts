import type { Vehicle } from "./inventory";

/**
 * Descriptive vehicle URLs, using the same scheme as the AutoSalesReviews
 * backend (`backend/src/utils/vehicle-slug.ts`): a `year-make-model-trim`
 * descriptor followed by the trailing characters of the vehicle's own cuid.
 * Reusing the id tail keeps the URL uniquely resolvable with no extra stored
 * field and no collision bookkeeping.
 */
const SHORT_ID_LENGTH = 6;

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export type VehicleSlugSource = Pick<Vehicle, "id" | "year" | "make" | "model"> & {
  trim?: string | null;
};

/** Builds the `[year-make-model-trim]-[short-id]` URL segment for a vehicle. */
export function buildVehicleSlug(vehicle: VehicleSlugSource): string {
  const descriptor = generateSlug(
    [vehicle.year, vehicle.make, vehicle.model, vehicle.trim]
      .filter(Boolean)
      .join(" "),
  );
  const shortId = vehicle.id.slice(-SHORT_ID_LENGTH);
  return descriptor ? `${descriptor}-${shortId}` : shortId;
}

/** Canonical detail-page path for a vehicle. */
export function vehiclePath(vehicle: VehicleSlugSource): string {
  return `/inventory/${buildVehicleSlug(vehicle)}`;
}

/**
 * Pulls the short id back out of a vehicle slug for lookup. The descriptive
 * prefix is intentionally NOT validated against current vehicle data — a
 * stale year/make/model/trim in an old bookmarked or indexed URL should still
 * resolve to the right vehicle, not 404.
 */
export function extractVehicleShortId(vehicleSlug: string): string | null {
  const match = /-([a-z0-9]{6})$/i.exec(vehicleSlug);
  if (match) return match[1].toLowerCase();
  // No descriptor at all (pure short id, e.g. year/make/model/trim were empty).
  if (/^[a-z0-9]{6}$/i.test(vehicleSlug)) return vehicleSlug.toLowerCase();
  return null;
}

/**
 * Resolves any form of the URL segment we have ever linked to: the current
 * slug, the bare database id used before slugs existed, or a slug whose
 * descriptor has since gone stale. Callers compare the result's canonical
 * slug against the requested segment to decide whether to redirect.
 */
export function findVehicleBySegment(
  vehicles: Vehicle[],
  segment: string,
): Vehicle | undefined {
  const wanted = segment.toLowerCase();

  const bySlug = vehicles.find((v) => buildVehicleSlug(v) === wanted);
  if (bySlug) return bySlug;

  const byId = vehicles.find((v) => v.id.toLowerCase() === wanted);
  if (byId) return byId;

  const shortId = extractVehicleShortId(wanted);
  if (!shortId) return undefined;
  return vehicles.find((v) => v.id.toLowerCase().endsWith(shortId));
}
