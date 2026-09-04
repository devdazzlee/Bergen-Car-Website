import type { CategoryFilter } from "./vehicle-categories";
import { VEHICLE_CATEGORIES } from "./vehicle-categories";
import type { Vehicle } from "./inventory";

const MIN_PER_CATEGORY = 20;

const IMG = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=70`;

const PEX = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1400`;

/** Stock photos for auto-generated category filler vehicles. */
const BOOST_PHOTOS = [
  IMG("photo-1519641471654-76ce0107ad1b"),
  IMG("photo-1621007947382-bb3c3994e3fb"),
  IMG("photo-1605893477799-b99e3b8b93fe"),
  IMG("photo-1560958089-b8a1929cea89"),
  PEX(21821470),
  PEX(27138933),
  PEX(20512070),
];

type Seed = Pick<
  Vehicle,
  | "make"
  | "model"
  | "trim"
  | "bodyStyle"
  | "drivetrain"
  | "transmission"
  | "fuel"
  | "exteriorColor"
  | "mpg"
> & {
  commercial?: boolean;
  formerPolice?: boolean;
  luxury?: boolean;
  handicapAccessible?: boolean;
};

/** Demo templates cycled when a category needs more than hand-entered stock. */
const BOOST_SEEDS: Record<string, Seed[]> = {
  "used-suvs-lodi-nj": [
    { make: "Honda", model: "Pilot", trim: "EX-L", bodyStyle: "SUV", drivetrain: "AWD", transmission: "9-Speed Automatic", fuel: "Gasoline", exteriorColor: "Modern Steel Metallic", mpg: "20 city / 27 hwy" },
    { make: "Toyota", model: "RAV4", trim: "XLE", bodyStyle: "SUV", drivetrain: "AWD", transmission: "8-Speed Automatic", fuel: "Gasoline", exteriorColor: "Blueprint", mpg: "27 city / 35 hwy" },
    { make: "Subaru", model: "Forester", trim: "Premium", bodyStyle: "SUV", drivetrain: "AWD", transmission: "CVT", fuel: "Gasoline", exteriorColor: "Crystal Black Silica", mpg: "26 city / 33 hwy" },
    { make: "Mazda", model: "CX-5", trim: "Touring", bodyStyle: "SUV", drivetrain: "AWD", transmission: "6-Speed Automatic", fuel: "Gasoline", exteriorColor: "Soul Red Crystal", mpg: "25 city / 31 hwy" },
    { make: "Hyundai", model: "Santa Fe", trim: "SEL", bodyStyle: "SUV", drivetrain: "AWD", transmission: "8-Speed Automatic", fuel: "Gasoline", exteriorColor: "Stormy Sea", mpg: "21 city / 28 hwy" },
  ],
  "used-sedans-lodi-nj": [
    { make: "Honda", model: "Accord", trim: "Sport", bodyStyle: "Sedan", drivetrain: "FWD", transmission: "CVT", fuel: "Gasoline", exteriorColor: "Still Night Pearl", mpg: "29 city / 35 hwy" },
    { make: "Toyota", model: "Camry", trim: "SE", bodyStyle: "Sedan", drivetrain: "FWD", transmission: "8-Speed Automatic", fuel: "Gasoline", exteriorColor: "Midnight Black", mpg: "28 city / 39 hwy" },
    { make: "Nissan", model: "Altima", trim: "SV", bodyStyle: "Sedan", drivetrain: "FWD", transmission: "CVT", fuel: "Gasoline", exteriorColor: "Gun Metallic", mpg: "28 city / 39 hwy" },
    { make: "Hyundai", model: "Sonata", trim: "SEL", bodyStyle: "Sedan", drivetrain: "FWD", transmission: "8-Speed Automatic", fuel: "Gasoline", exteriorColor: "Portofino Gray", mpg: "27 city / 37 hwy" },
    { make: "Kia", model: "K5", trim: "GT-Line", bodyStyle: "Sedan", drivetrain: "FWD", transmission: "8-Speed Automatic", fuel: "Gasoline", exteriorColor: "Passion Red", mpg: "27 city / 37 hwy" },
  ],
  "used-pickup-trucks-lodi-nj": [
    { make: "Ford", model: "F-150", trim: "XLT SuperCrew", bodyStyle: "Truck", drivetrain: "4WD", transmission: "10-Speed Automatic", fuel: "Gasoline", exteriorColor: "Oxford White", mpg: "18 city / 24 hwy" },
    { make: "Chevrolet", model: "Silverado 1500", trim: "LT Trail Boss", bodyStyle: "Truck", drivetrain: "4WD", transmission: "8-Speed Automatic", fuel: "Gasoline", exteriorColor: "Summit White", mpg: "16 city / 21 hwy" },
    { make: "Ram", model: "1500", trim: "Laramie", bodyStyle: "Truck", drivetrain: "4WD", transmission: "8-Speed Automatic", fuel: "Gasoline", exteriorColor: "Granite Crystal", mpg: "17 city / 23 hwy" },
    { make: "Toyota", model: "Tundra", trim: "SR5 CrewMax", bodyStyle: "Truck", drivetrain: "4WD", transmission: "6-Speed Automatic", fuel: "Gasoline", exteriorColor: "Magnetic Gray", mpg: "13 city / 17 hwy" },
    { make: "GMC", model: "Sierra 1500", trim: "Elevation", bodyStyle: "Truck", drivetrain: "4WD", transmission: "8-Speed Automatic", fuel: "Gasoline", exteriorColor: "Onyx Black", mpg: "16 city / 22 hwy", commercial: true },
  ],
  "used-minivans-lodi-nj": [
    { make: "Honda", model: "Odyssey", trim: "EX", bodyStyle: "Minivan", drivetrain: "FWD", transmission: "10-Speed Automatic", fuel: "Gasoline", exteriorColor: "Platinum White Pearl", mpg: "19 city / 28 hwy" },
    { make: "Chrysler", model: "Pacifica", trim: "Touring", bodyStyle: "Minivan", drivetrain: "FWD", transmission: "9-Speed Automatic", fuel: "Gasoline", exteriorColor: "Bright White", mpg: "19 city / 28 hwy" },
    { make: "Toyota", model: "Sienna", trim: "LE", bodyStyle: "Minivan", drivetrain: "FWD", transmission: "8-Speed Automatic", fuel: "Gasoline", exteriorColor: "Celestial Silver", mpg: "18 city / 24 hwy" },
    { make: "Kia", model: "Carnival", trim: "LX", bodyStyle: "Minivan", drivetrain: "FWD", transmission: "8-Speed Automatic", fuel: "Gasoline", exteriorColor: "Aurora Black", mpg: "19 city / 26 hwy" },
  ],
  "used-cargo-vans-lodi-nj": [
    { make: "Ford", model: "Transit 250", trim: "Cargo", bodyStyle: "Cargo Van", drivetrain: "RWD", transmission: "6-Speed Automatic", fuel: "Gasoline", exteriorColor: "Oxford White", mpg: "14 city / 18 hwy", commercial: true },
    { make: "Ram", model: "ProMaster 1500", trim: "Cargo", bodyStyle: "Cargo Van", drivetrain: "FWD", transmission: "9-Speed Automatic", fuel: "Gasoline", exteriorColor: "Bright White", mpg: "17 city / 23 hwy", commercial: true },
    { make: "Mercedes-Benz", model: "Sprinter 2500", trim: "Cargo", bodyStyle: "Cargo Van", drivetrain: "RWD", transmission: "7-Speed Automatic", fuel: "Gasoline", exteriorColor: "Arctic White", mpg: "18 city / 22 hwy", commercial: true },
    { make: "Nissan", model: "NV200", trim: "Cargo", bodyStyle: "Cargo Van", drivetrain: "FWD", transmission: "CVT", fuel: "Gasoline", exteriorColor: "Brilliant Silver", mpg: "24 city / 26 hwy", commercial: true },
  ],
  "used-passenger-vans-lodi-nj": [
    { make: "Ford", model: "Transit 350", trim: "XLT Passenger", bodyStyle: "Passenger Van", drivetrain: "RWD", transmission: "10-Speed Automatic", fuel: "Gasoline", exteriorColor: "Oxford White", mpg: "12 city / 16 hwy", commercial: true },
    { make: "Chevrolet", model: "Express 3500", trim: "LT Passenger", bodyStyle: "Passenger Van", drivetrain: "RWD", transmission: "6-Speed Automatic", fuel: "Gasoline", exteriorColor: "Summit White", mpg: "11 city / 16 hwy", commercial: true },
    { make: "Mercedes-Benz", model: "Sprinter 2500", trim: "Passenger", bodyStyle: "Passenger Van", drivetrain: "RWD", transmission: "7-Speed Automatic", fuel: "Gasoline", exteriorColor: "Arctic White", mpg: "14 city / 18 hwy", commercial: true, luxury: true },
  ],
  "used-commercial-vehicles-lodi-nj": [
    { make: "Ford", model: "Transit 250", trim: "Cargo", bodyStyle: "Cargo Van", drivetrain: "RWD", transmission: "6-Speed Automatic", fuel: "Gasoline", exteriorColor: "Oxford White", mpg: "14 city / 18 hwy", commercial: true },
    { make: "Ford", model: "F-250", trim: "XL Super Duty", bodyStyle: "Truck", drivetrain: "4WD", transmission: "6-Speed Automatic", fuel: "Gasoline", exteriorColor: "Oxford White", mpg: "13 city / 17 hwy", commercial: true },
    { make: "Ram", model: "ProMaster 1500", trim: "Cargo", bodyStyle: "Cargo Van", drivetrain: "FWD", transmission: "9-Speed Automatic", fuel: "Gasoline", exteriorColor: "Bright White", mpg: "17 city / 23 hwy", commercial: true },
    { make: "Chevrolet", model: "Express 2500", trim: "Cargo", bodyStyle: "Cargo Van", drivetrain: "RWD", transmission: "6-Speed Automatic", fuel: "Gasoline", exteriorColor: "Summit White", mpg: "11 city / 16 hwy", commercial: true },
  ],
  "used-police-cars-lodi-nj": [
    { make: "Ford", model: "Police Interceptor Sedan", trim: "AWD", bodyStyle: "Sedan", drivetrain: "AWD", transmission: "6-Speed Automatic", fuel: "Gasoline", exteriorColor: "Oxford White", mpg: "16 city / 24 hwy", formerPolice: true },
    { make: "Dodge", model: "Charger", trim: "Police Pursuit", bodyStyle: "Sedan", drivetrain: "RWD", transmission: "8-Speed Automatic", fuel: "Gasoline", exteriorColor: "Black", mpg: "16 city / 25 hwy", formerPolice: true },
    { make: "Ford", model: "Police Interceptor Utility", trim: "AWD", bodyStyle: "SUV", drivetrain: "AWD", transmission: "6-Speed Automatic", fuel: "Gasoline", exteriorColor: "Silver", mpg: "16 city / 21 hwy", formerPolice: true },
  ],
  "used-handicap-accessible-vehicles-lodi-nj": [
    { make: "Chrysler", model: "Pacifica", trim: "Touring Wheelchair", bodyStyle: "Minivan", drivetrain: "FWD", transmission: "9-Speed Automatic", fuel: "Gasoline", exteriorColor: "Bright White", mpg: "19 city / 28 hwy", handicapAccessible: true },
    { make: "Toyota", model: "Sienna", trim: "LE Mobility", bodyStyle: "Minivan", drivetrain: "FWD", transmission: "8-Speed Automatic", fuel: "Gasoline", exteriorColor: "Celestial Silver", mpg: "18 city / 24 hwy", handicapAccessible: true },
    { make: "Honda", model: "Odyssey", trim: "EX Side-Entry", bodyStyle: "Minivan", drivetrain: "FWD", transmission: "10-Speed Automatic", fuel: "Gasoline", exteriorColor: "Platinum White Pearl", mpg: "19 city / 28 hwy", handicapAccessible: true },
    { make: "BraunAbility", model: "Chrysler Voyager", trim: "Wheelchair Van", bodyStyle: "Minivan", drivetrain: "FWD", transmission: "9-Speed Automatic", fuel: "Gasoline", exteriorColor: "Bright White", mpg: "19 city / 28 hwy", handicapAccessible: true },
  ],
  "used-coupes-lodi-nj": [
    { make: "Ford", model: "Mustang", trim: "EcoBoost", bodyStyle: "Coupe", drivetrain: "RWD", transmission: "10-Speed Automatic", fuel: "Gasoline", exteriorColor: "Oxford White", mpg: "21 city / 31 hwy" },
    { make: "Chevrolet", model: "Camaro", trim: "LT", bodyStyle: "Coupe", drivetrain: "RWD", transmission: "8-Speed Automatic", fuel: "Gasoline", exteriorColor: "Summit White", mpg: "22 city / 31 hwy" },
    { make: "BMW", model: "430i", trim: "Coupe", bodyStyle: "Coupe", drivetrain: "RWD", transmission: "8-Speed Automatic", fuel: "Gasoline", exteriorColor: "Alpine White", mpg: "23 city / 34 hwy", luxury: true },
    { make: "Honda", model: "Civic", trim: "Si Coupe", bodyStyle: "Coupe", drivetrain: "FWD", transmission: "6-Speed Manual", fuel: "Gasoline", exteriorColor: "Rallye Red", mpg: "26 city / 36 hwy" },
  ],
  "used-hatchbacks-lodi-nj": [
    { make: "Honda", model: "Fit", trim: "EX", bodyStyle: "Hatchback", drivetrain: "FWD", transmission: "CVT", fuel: "Gasoline", exteriorColor: "Modern Steel", mpg: "33 city / 40 hwy" },
    { make: "Volkswagen", model: "Golf", trim: "SE", bodyStyle: "Hatchback", drivetrain: "FWD", transmission: "6-Speed Automatic", fuel: "Gasoline", exteriorColor: "Pure White", mpg: "29 city / 37 hwy" },
    { make: "Mazda", model: "Mazda3", trim: "Hatchback", bodyStyle: "Hatchback", drivetrain: "FWD", transmission: "6-Speed Automatic", fuel: "Gasoline", exteriorColor: "Soul Red Crystal", mpg: "26 city / 35 hwy" },
    { make: "Subaru", model: "Impreza", trim: "Sport Hatchback", bodyStyle: "Hatchback", drivetrain: "AWD", transmission: "CVT", fuel: "Gasoline", exteriorColor: "Crystal Black", mpg: "28 city / 36 hwy" },
  ],
  "used-convertibles-lodi-nj": [
    { make: "Ford", model: "Mustang", trim: "Convertible", bodyStyle: "Convertible", drivetrain: "RWD", transmission: "10-Speed Automatic", fuel: "Gasoline", exteriorColor: "Race Red", mpg: "21 city / 30 hwy" },
    { make: "BMW", model: "430i", trim: "Convertible", bodyStyle: "Convertible", drivetrain: "RWD", transmission: "8-Speed Automatic", fuel: "Gasoline", exteriorColor: "Black Sapphire", mpg: "24 city / 34 hwy", luxury: true },
    { make: "Chevrolet", model: "Camaro", trim: "LT Convertible", bodyStyle: "Convertible", drivetrain: "RWD", transmission: "8-Speed Automatic", fuel: "Gasoline", exteriorColor: "Riverside Blue", mpg: "21 city / 30 hwy" },
    { make: "MINI", model: "Cooper", trim: "Convertible", bodyStyle: "Convertible", drivetrain: "FWD", transmission: "6-Speed Automatic", fuel: "Gasoline", exteriorColor: "Chili Red", mpg: "28 city / 36 hwy" },
  ],
  "used-wagons-lodi-nj": [
    { make: "Subaru", model: "Outback", trim: "Premium", bodyStyle: "Wagon", drivetrain: "AWD", transmission: "CVT", fuel: "Gasoline", exteriorColor: "Ice Silver", mpg: "25 city / 32 hwy" },
    { make: "Volkswagen", model: "Golf SportWagen", trim: "SE", bodyStyle: "Wagon", drivetrain: "FWD", transmission: "6-Speed Automatic", fuel: "Gasoline", exteriorColor: "Silk Blue", mpg: "25 city / 33 hwy" },
    { make: "Volvo", model: "V60", trim: "Momentum", bodyStyle: "Wagon", drivetrain: "FWD", transmission: "8-Speed Automatic", fuel: "Gasoline", exteriorColor: "Crystal White", mpg: "23 city / 34 hwy", luxury: true },
    { make: "Audi", model: "allroad", trim: "Premium Plus", bodyStyle: "Wagon", drivetrain: "AWD", transmission: "8-Speed Automatic", fuel: "Gasoline", exteriorColor: "Daytona Gray", mpg: "22 city / 28 hwy", luxury: true },
  ],
  "used-luxury-cars-lodi-nj": [
    { make: "BMW", model: "330i", trim: "xDrive", bodyStyle: "Sedan", drivetrain: "AWD", transmission: "8-Speed Automatic", fuel: "Gasoline", exteriorColor: "Carbon Black", mpg: "25 city / 34 hwy", luxury: true },
    { make: "Mercedes-Benz", model: "C 300", trim: "4MATIC", bodyStyle: "Sedan", drivetrain: "AWD", transmission: "9-Speed Automatic", fuel: "Gasoline", exteriorColor: "Polar White", mpg: "23 city / 34 hwy", luxury: true },
    { make: "Audi", model: "A4", trim: "Premium Plus", bodyStyle: "Sedan", drivetrain: "AWD", transmission: "7-Speed S tronic", fuel: "Gasoline", exteriorColor: "Brilliant Black", mpg: "24 city / 31 hwy", luxury: true },
    { make: "Lexus", model: "RX 350", trim: "AWD", bodyStyle: "SUV", drivetrain: "AWD", transmission: "8-Speed Automatic", fuel: "Gasoline", exteriorColor: "Nebula Gray", mpg: "20 city / 27 hwy", luxury: true },
  ],
  "used-hybrid-vehicles-lodi-nj": [
    { make: "Toyota", model: "Prius", trim: "Two", bodyStyle: "Hatchback", drivetrain: "FWD", transmission: "CVT", fuel: "Hybrid", exteriorColor: "Classic Silver", mpg: "54 city / 50 hwy" },
    { make: "Toyota", model: "Camry", trim: "Hybrid LE", bodyStyle: "Sedan", drivetrain: "FWD", transmission: "CVT", fuel: "Hybrid", exteriorColor: "Celestial Silver", mpg: "44 city / 47 hwy" },
    { make: "Honda", model: "Accord", trim: "Hybrid EX", bodyStyle: "Sedan", drivetrain: "FWD", transmission: "CVT", fuel: "Hybrid", exteriorColor: "Modern Steel", mpg: "48 city / 48 hwy" },
    { make: "Toyota", model: "RAV4", trim: "Hybrid XLE", bodyStyle: "SUV", drivetrain: "AWD", transmission: "CVT", fuel: "Hybrid", exteriorColor: "Blueprint", mpg: "41 city / 38 hwy" },
    { make: "Hyundai", model: "Ioniq", trim: "Hybrid SEL", bodyStyle: "Hatchback", drivetrain: "FWD", transmission: "6-Speed DCT", fuel: "Hybrid", exteriorColor: "Liquid Silver", mpg: "55 city / 54 hwy" },
  ],
  "used-electric-vehicles-lodi-nj": [
    { make: "Tesla", model: "Model 3", trim: "Long Range", bodyStyle: "Sedan", drivetrain: "AWD", transmission: "Single-Speed", fuel: "Electric", exteriorColor: "Pearl White", mpg: "131 MPGe combined" },
    { make: "Tesla", model: "Model Y", trim: "Long Range", bodyStyle: "SUV", drivetrain: "AWD", transmission: "Single-Speed", fuel: "Electric", exteriorColor: "Midnight Silver", mpg: "125 MPGe combined" },
    { make: "Chevrolet", model: "Bolt EV", trim: "LT", bodyStyle: "Hatchback", drivetrain: "FWD", transmission: "Single-Speed", fuel: "Electric", exteriorColor: "Kinetic Blue", mpg: "118 MPGe combined" },
    { make: "Ford", model: "Mustang Mach-E", trim: "Select", bodyStyle: "SUV", drivetrain: "RWD", transmission: "Single-Speed", fuel: "Electric", exteriorColor: "Rapid Red", mpg: "100 MPGe combined" },
    { make: "Nissan", model: "Leaf", trim: "SV Plus", bodyStyle: "Hatchback", drivetrain: "FWD", transmission: "Single-Speed", fuel: "Electric", exteriorColor: "Gun Metallic", mpg: "109 MPGe combined" },
    { make: "Hyundai", model: "Kona Electric", trim: "SEL", bodyStyle: "SUV", drivetrain: "FWD", transmission: "Single-Speed", fuel: "Electric", exteriorColor: "Digital Teal", mpg: "120 MPGe combined" },
  ],
};

export function matchesCategory(v: Vehicle, filter: CategoryFilter): boolean {
  if (filter.kind === "bodyStyle") return v.bodyStyle === filter.value;
  if (filter.kind === "fuel") return v.fuel === filter.value;
  if (filter.kind === "flag") return v[filter.value] === true;
  return false;
}

function boostVehicle(
  slug: string,
  seed: Seed,
  index: number,
): Vehicle {
  const year = 2016 + (index % 8);
  const price = 12900 + ((index * 1371 + slug.length * 97) % 28000);
  const mileage = 18000 + ((index * 4219 + slug.length * 311) % 95000);
  const id = `bcc-boost-${slug}-${index}`;
  const tags: Vehicle["tag"][] = [
    "Certified",
    "New Arrival",
    "Low Miles",
    "Price Drop",
    undefined,
  ];

  return {
    id,
    year,
    make: seed.make,
    model: seed.model,
    trim: seed.trim,
    price: Math.round(price / 100) * 100,
    mileage: Math.round(mileage / 100) * 100,
    bodyStyle: seed.bodyStyle,
    drivetrain: seed.drivetrain,
    transmission: seed.transmission,
    fuel: seed.fuel,
    exteriorColor: seed.exteriorColor,
    mpg: seed.mpg,
    image: BOOST_PHOTOS[index % BOOST_PHOTOS.length],
    tag: tags[index % tags.length],
    commercial: seed.commercial,
    formerPolice: seed.formerPolice,
    luxury: seed.luxury,
    handicapAccessible: seed.handicapAccessible,
  };
}

/** Ensures every shop-by-category page has at least `min` matching vehicles. */
export function boostCategoryInventory(
  base: Vehicle[],
  min = MIN_PER_CATEGORY,
): Vehicle[] {
  const out = [...base];
  const ids = new Set(base.map((v) => v.id));

  for (const cat of VEHICLE_CATEGORIES) {
    const seeds = BOOST_SEEDS[cat.slug];
    if (!seeds?.length) continue;

    let count = out.filter((v) => matchesCategory(v, cat.filter)).length;
    let index = 0;

    while (count < min) {
      const seed = seeds[index % seeds.length];
      const vehicle = boostVehicle(cat.slug, seed, index);
      if (!ids.has(vehicle.id)) {
        out.push(vehicle);
        ids.add(vehicle.id);
        count++;
      }
      index++;
      if (index > min * seeds.length * 2) break;
    }
  }

  return out;
}
