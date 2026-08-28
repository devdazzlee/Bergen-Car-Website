import type { Vehicle } from "./inventory";

/* Deterministic, per-vehicle detail data. Same input id → same output every
 * render, so the page is stable and statically prerenderable. Values are
 * plausible stand-ins for what a real dealer feed would provide. */

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function pick<T>(arr: readonly T[], seed: number): T {
  const i = ((Math.trunc(seed) % arr.length) + arr.length) % arr.length;
  return arr[i];
}

const PEX = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1600`;

const DETAIL = {
  interior: PEX(17000848),
  dash: PEX(27667633),
  wheel: PEX(10182885),
};

export type GalleryImage = { src: string; label: string };

export function gallery(v: Vehicle): GalleryImage[] {
  return [
    { src: v.image, label: "Exterior" },
    { src: DETAIL.interior, label: "Interior" },
    { src: DETAIL.dash, label: "Dashboard" },
    { src: DETAIL.wheel, label: "Wheels" },
  ];
}

const WMI: Record<string, string> = {
  Toyota: "4T1",
  Honda: "2HG",
  Ford: "1FT",
  Chevrolet: "1G1",
  Nissan: "1N4",
  Hyundai: "5NP",
  Kia: "3KP",
  Subaru: "4S3",
  Mazda: "JM1",
  Volkswagen: "3VW",
  BMW: "WBA",
  Audi: "WAU",
  Lexus: "JTH",
  Tesla: "5YJ",
  Ram: "1C6",
  Jeep: "1C4",
};
const VIN_CHARS = "ABCDEFGHJKLMNPRSTUVWXYZ0123456789";

export function vin(v: Vehicle): string {
  const wmi = WMI[v.make] ?? "1HG";
  const h = hash(v.id + "vin");
  const body = Array.from(
    { length: 5 },
    (_, i) => VIN_CHARS[(h >>> (i * 3)) % VIN_CHARS.length],
  ).join("");
  const yc = "ABCDEFGHJKLMNPRSTVWXY12345"[(v.year - 2001) % 25];
  const plant = "ABCDEFHJ"[h % 8];
  const serial = String(1_000_000 + (h % 9_000_000));
  return (wmi + body + yc + plant + serial).slice(0, 17);
}

export function engine(v: Vehicle): string {
  if (v.fuel === "Electric") return "Dual electric motor";
  const t = v.trim.toLowerCase();
  if (v.bodyStyle === "Truck") return t.includes("v6") ? "3.5L V6" : "5.0L V8";
  if (t.includes("1.5t")) return "1.5L turbo 4-cylinder";
  if (t.includes("2.0t") || t.includes("tfsi") || t.includes("530"))
    return "2.0L turbo 4-cylinder";
  if (t.includes("v6") || v.model === "ES 350" || v.model === "Highlander")
    return "3.5L V6";
  if (v.make === "Subaru") return "2.5L boxer 4-cylinder";
  return "2.5L 4-cylinder";
}

export function interiorColor(v: Vehicle): string {
  const premium = ["BMW", "Audi", "Lexus", "Tesla"].includes(v.make);
  const options = premium
    ? (["Black leather", "Gray leather", "Beige leather"] as const)
    : ([
        "Black cloth",
        "Black leatherette",
        "Gray cloth",
        "Gray leather",
        "Beige cloth",
      ] as const);
  return pick(options, hash(v.id + "int"));
}

export function ownerCount(v: Vehicle): number {
  return hash(v.id) % 3 === 0 ? 2 : 1;
}

function milesPerYear(v: Vehicle): number {
  const yrs = Math.max(1, 2026 - v.year);
  return Math.round(v.mileage / yrs / 500) * 500;
}

const PAINT = [
  "The {color} paint still has a strong shine. There are a couple of small stone chips on the leading edge of the hood and a light scuff on the rear bumper — nothing you'd notice from a few feet away.",
  "The {color} finish is clean and even, with only fine swirl marks visible in direct sun. We found no dents, no rust, and no repainted panels.",
  "Paint is in good shape overall. There's a shallow door ding on the passenger side and a bit of curb rash on one front wheel; we've noted both so there are no surprises when you see it.",
];
const INSIDE = [
  "Inside, the {interior} seats are clean with no tears or burns. The driver's seat bolster shows the light wear you'd expect at this mileage.",
  "The cabin is tidy and smoke-free. Carpets and headliner are clean, and every button and screen works the way it should.",
  "The {interior} interior presents well. There's some shine on the steering wheel and a small mark on the center console, but nothing torn or broken.",
];
const MECH = [
  "Mechanically it's ready to go. We changed the oil, replaced the cabin and engine air filters, and mounted {tires}. The A/C blows cold and there are no warning lights on the dash.",
  "Our shop went through it, replaced the front brake pads and rotors, and topped off every fluid. It drives straight, shifts smoothly, and there are no leaks underneath.",
  "It came in running well. We serviced it, installed {tires}, and did a four-wheel alignment. Everything electrical works — windows, locks, backup camera, and Bluetooth.",
];
const TIRES = [
  "four new tires",
  "two new front tires",
  "a fresh matching set of all-season tires",
];

export function conditionParagraphs(v: Vehicle): string[] {
  const h = hash(v.id + "cond");
  const mpy = milesPerYear(v);
  const fill = (s: string) =>
    s
      .replaceAll("{color}", v.exteriorColor)
      .replaceAll("{interior}", interiorColor(v).toLowerCase())
      .replaceAll("{tires}", pick(TIRES, h >>> 2));
  return [
    `This ${v.year} ${v.make} ${v.model} ${v.trim} came to us ${
      ownerCount(v) === 1 ? "from a single previous owner" : "as a two-owner car"
    } and shows ${v.mileage.toLocaleString("en-US")} miles — roughly ${mpy.toLocaleString(
      "en-US",
    )} a year, ${
      mpy < 12000 ? "a bit below the national average" : "right about average"
    }.`,
    fill(pick(PAINT, h)),
    fill(pick(INSIDE, h >>> 1)),
    fill(pick(MECH, h >>> 3)),
  ];
}

export type HistoryRow = { label: string; value: string; ok: boolean };

export function historyRows(v: Vehicle): HistoryRow[] {
  const h = hash(v.id + "hist");
  const minorClaim = h % 6 === 0;
  return [
    {
      label: "Previous owners",
      value: ownerCount(v) === 1 ? "1 owner" : "2 owners",
      ok: true,
    },
    {
      label: "Accident history",
      value: minorClaim
        ? "One minor cosmetic claim — no structural or airbag damage"
        : "None reported",
      ok: !minorClaim,
    },
    {
      label: "Title",
      value: "Clean — no salvage, flood, or lemon branding",
      ok: true,
    },
    {
      label: "Service records",
      value: `${3 + (h % 6)} records on file`,
      ok: true,
    },
    {
      label: "Reported use",
      value: pick(
        ["Personal use", "Personal use", "Personal / commuter"],
        h >>> 1,
      ),
      ok: true,
    },
    {
      label: "Last registered",
      value: pick(
        [
          "Bergen County, NJ",
          "Passaic County, NJ",
          "Essex County, NJ",
          "Rockland County, NY",
        ],
        h >>> 2,
      ),
      ok: true,
    },
  ];
}

export const WARRANTY = {
  heading: "Limited warranty",
  covered: "Powertrain — engine, transmission, and drive axle",
  duration: "3 months or 3,000 miles, whichever comes first",
  split: "Bergen Car Company pays 100% of the parts and 100% of the labor for covered systems that fail during the warranty period.",
};
