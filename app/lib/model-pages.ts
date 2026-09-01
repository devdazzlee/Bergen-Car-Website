import { VEHICLES } from "./inventory";

/**
 * Model-specific landing pages ( /used-<make>-<model>-lodi-nj ).
 *
 * Only models with enough current stock get a dedicated page. The threshold is
 * MIN_STOCK units of the same make + model listed right now. `qualifyingModels()`
 * derives the list straight from inventory so it stays honest; MODEL_PAGES below
 * is the frozen set the pages are built from this deploy.
 *
 * There is deliberately no marketing copy here (model history, reputation, etc.)
 * — none was provided or approved. Pages show only data pulled from inventory.
 */

export const MIN_STOCK = 2;

export type ModelPage = { make: string; model: string; slug: string };

/** kebab slug for a make/model, e.g. Toyota + CR-V -> "toyota-cr-v". */
export function modelSlugPart(make: string, model: string): string {
  return `${make} ${model}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function pageSlug(make: string, model: string): string {
  return `used-${modelSlugPart(make, model)}-lodi-nj`;
}

/** Every make/model in current inventory with at least MIN_STOCK units. */
export function qualifyingModels(min = MIN_STOCK): ModelPage[] {
  const counts = new Map<string, { make: string; model: string; n: number }>();
  for (const v of VEHICLES) {
    const key = `${v.make}|||${v.model}`;
    const cur = counts.get(key) ?? { make: v.make, model: v.model, n: 0 };
    cur.n += 1;
    counts.set(key, cur);
  }
  return [...counts.values()]
    .filter((c) => c.n >= min)
    .sort((a, b) => b.n - a.n || `${a.make} ${a.model}`.localeCompare(`${b.make} ${b.model}`))
    .map((c) => ({
      make: c.make,
      model: c.model,
      slug: pageSlug(c.make, c.model),
    }));
}

/** The models that got a page this deploy. */
export const MODEL_PAGES: ModelPage[] = qualifyingModels();

export function stockFor(make: string, model: string) {
  return VEHICLES.filter((v) => v.make === make && v.model === model);
}
