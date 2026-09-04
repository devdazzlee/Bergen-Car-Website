import { miles, type Vehicle } from "./inventory";

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

/** The vehicle's real VIN when the API provided one; otherwise the
 * deterministic fabricated stand-in. Prefer this over calling `vin()`
 * directly anywhere a VIN is shown to a shopper. */
export function displayVin(v: Vehicle): string {
  const real = v.vin?.trim();
  return real ? real : vin(v);
}

/** Public Carfax vehicle-history lookup for this VIN. Uses the vehicle's
 * real VIN when the API supplied one; only falls back to the fabricated
 * stand-in VIN for a vehicle that genuinely has none on file. */
export function carfaxUrl(v: Vehicle): string {
  return `https://www.carfax.com/vehicle/${displayVin(v)}`;
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

/* --------------------------- Features list --------------------------- */

const BODY_FEATURES: Partial<Record<Vehicle["bodyStyle"], string[]>> = {
  SUV: ["Roof rails", "60/40 split-folding rear seats", "Rear cargo cover"],
  Truck: ["Spray-in bed liner", "Trailer tow package", "Running boards"],
  Minivan: [
    "Power sliding side doors",
    "Stow-and-go third-row seating",
    "Rear-seat climate controls",
  ],
  "Cargo Van": [
    "Cargo partition behind the front seats",
    "Rear swing-out doors",
    "Shelving-ready interior",
  ],
  "Passenger Van": [
    "High-capacity bench seating",
    "Rear HVAC controls",
  ],
  Wagon: ["Roof rails", "60/40 split-folding rear seats"],
  Convertible: ["Power-operated soft top", "Wind deflector"],
  Hatchback: ["60/40 split-folding rear seats", "Cargo area tie-downs"],
  Sedan: ["60/40 split-folding rear seats", "Trunk pass-through"],
  Coupe: ["Sport-tuned suspension"],
};

const TECH_POOL = [
  "Backup camera",
  "Apple CarPlay & Android Auto",
  "Bluetooth hands-free calling",
  "Cruise control",
  "Power windows, locks & mirrors",
  "Keyless entry",
  "Alloy wheels",
  "Heated front seats",
  "Remote start",
  "Blind-spot monitoring",
] as const;

/** Deterministic, fact-driven feature list — body style, drivetrain, fuel
 * type, and any classifier flags first, then a rotating set of common
 * equipment so the list still reads differently car to car. */
export function features(v: Vehicle): string[] {
  const h = hash(v.id + "feat");
  const out: string[] = [...(BODY_FEATURES[v.bodyStyle] ?? [])];

  if (v.fuel === "Hybrid") {
    out.push("Hybrid drivetrain with regenerative braking");
  } else if (v.fuel === "Electric") {
    out.push("DC fast-charging capable", "Regenerative braking");
  }

  if (v.commercial) out.push("Contractor-ready cargo area");
  if (v.formerPolice) {
    out.push(
      "Police-package suspension and brakes",
      "Heavy-duty alternator and electrical system",
    );
  }
  if (v.handicapAccessible) {
    out.push("Wheelchair ramp or lift", "Floor-mounted tie-down anchors");
  }
  if (v.luxury) {
    out.push(
      "Leather-appointed seating",
      "Premium audio system",
      "Adaptive cruise control",
    );
  }

  const trim = v.trim.toLowerCase();
  if (/turbo|1\.5t|2\.0t|tfsi/.test(trim)) out.push("Turbocharged engine");
  if (v.drivetrain === "AWD" || v.drivetrain === "4WD") {
    out.push(`${v.drivetrain} traction for wet or winter roads`);
  }

  const start = h % TECH_POOL.length;
  for (let i = 0; i < TECH_POOL.length && out.length < 9; i++) {
    const f = TECH_POOL[(start + i) % TECH_POOL.length];
    if (!out.includes(f)) out.push(f);
  }

  return Array.from(new Set(out)).slice(0, 9);
}

/* ----------------------------- Good fit for ----------------------------- */

function fitAudience(v: Vehicle): string {
  if (v.commercial) return "contractors and small businesses that need cargo room";
  if (v.formerPolice) return "drivers who want a heavy-duty, highway-proven daily";
  if (v.handicapAccessible) return "riders who need wheelchair or mobility access";
  if (v.luxury) return "buyers who want premium features at a used-car price";
  switch (v.bodyStyle) {
    case "Truck":
      return "towing, hauling, and job-site duty";
    case "SUV":
    case "Minivan":
      return "families who need cargo and passenger room";
    case "Passenger Van":
      return "carpools, teams, and groups";
    case "Wagon":
      return "buyers who want SUV-like cargo room without the size";
    case "Convertible":
      return "weekend and fair-weather driving";
    case "Coupe":
      return "drivers who want a sportier daily driver";
    case "Hatchback":
      return "easy city parking and daily commuting";
    default:
      return v.fuel === "Electric" || v.fuel === "Hybrid"
        ? "keeping fuel costs down on a daily commute"
        : "a straightforward, reliable daily commuter";
  }
}

/** Paragraph explaining who this specific car suits, grounded in its real
 * body style, drivetrain, fuel economy, flags, and yearly mileage. */
export function fitParagraph(v: Vehicle): string {
  const mpy = milesPerYear(v);
  const audience = fitAudience(v);
  const usePattern =
    mpy < 10000
      ? "lighter-than-average use"
      : mpy > 15000
        ? "higher yearly mileage, consistent with steady use"
        : "normal, everyday use";
  const econ =
    v.fuel === "Electric"
      ? `it's electric, rated at ${v.mpg}, so there's no gas stop to plan around`
      : v.fuel === "Hybrid"
        ? `the hybrid drivetrain is rated at ${v.mpg}, which keeps fuel stops less frequent`
        : `it's rated at ${v.mpg}`;
  const provenance = v.formerPolice
    ? " It's a former police vehicle, which means a stiffer suspension, upgraded brakes, and a heavier-duty electrical system than the civilian trim — inspected and reconditioned before it went up for sale."
    : "";
  return `This ${v.year} ${v.make} ${v.model} is a good fit for ${audience}. At ${miles(
    v.mileage,
  )} — about ${mpy.toLocaleString("en-US")} miles a year — it's seen ${usePattern}, and ${econ}.${provenance}`;
}

/** Short, fact-driven line for the inventory card — no filler, no boilerplate
 * repeated across cars. Rotates between a few real details per vehicle. */
export function cardBlurb(v: Vehicle): string {
  const h = hash(v.id + "blurb");
  const mpy = milesPerYear(v);
  const feats = features(v);
  const feat = (feats[h % feats.length] ?? feats[0] ?? "a clean, inspected condition").toLowerCase();
  const owner = ownerCount(v) === 1 ? "One-owner" : "Two-owner";
  const templates = [
    `${owner} ${v.model} with ${miles(v.mileage)} — about ${mpy.toLocaleString("en-US")} mi/yr — and ${feat}.`,
    `${v.exteriorColor} ${v.trim}, well suited for ${fitAudience(v)}, with ${feat}.`,
    `${miles(v.mileage)} on the odometer, ${owner.toLowerCase()}, includes ${feat}.`,
  ];
  return pick(templates, h >>> 2);
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
  "It starts, drives, and shifts the way it should. The A/C blows cold, there are no warning lights on the dash, and it currently wears {tires}.",
  "It drives straight and shifts smoothly. No warning lights, and we didn't see leaks underneath on the lot.",
  "It's a clean driver as presented. Windows, locks, backup camera, and Bluetooth all work, and it currently wears {tires}.",
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
