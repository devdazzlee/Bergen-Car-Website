export type Vehicle = {
  id: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  price: number;
  mileage: number;
  bodyStyle: "SUV" | "Sedan" | "Truck" | "Coupe" | "Hatchback";
  drivetrain: "AWD" | "FWD" | "RWD" | "4WD";
  transmission: string;
  fuel: "Gasoline" | "Hybrid" | "Electric";
  exteriorColor: string;
  mpg: string;
  image: string;
  tag?: "Certified" | "New Arrival" | "Price Drop" | "Low Miles";
};

/**
 * Photography: Unsplash source URLs. Next.js optimizes these (resize + WebP)
 * per the `remotePatterns` allow-list in next.config.ts.
 */
const IMG = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=70`;

export const VEHICLES: Vehicle[] = [
  {
    id: "bcc-2021-porsche-911",
    year: 2021,
    make: "Porsche",
    model: "911",
    trim: "Carrera S",
    price: 118500,
    mileage: 12980,
    bodyStyle: "Coupe",
    drivetrain: "RWD",
    transmission: "8-Speed PDK",
    fuel: "Gasoline",
    exteriorColor: "Jet Black Metallic",
    mpg: "18 city / 24 hwy",
    image: IMG("photo-1471479917193-f00955256257"),
    tag: "Low Miles",
  },
  {
    id: "bcc-2022-bmw-m5",
    year: 2022,
    make: "BMW",
    model: "M5",
    trim: "Competition xDrive",
    price: 84990,
    mileage: 21440,
    bodyStyle: "Sedan",
    drivetrain: "AWD",
    transmission: "8-Speed Automatic",
    fuel: "Gasoline",
    exteriorColor: "Brooklyn Grey Metallic",
    mpg: "15 city / 21 hwy",
    image: IMG("photo-1555215695-3004980ad54e"),
    tag: "Certified",
  },
  {
    id: "bcc-2023-tesla-model-3",
    year: 2023,
    make: "Tesla",
    model: "Model 3",
    trim: "Long Range AWD",
    price: 33900,
    mileage: 18740,
    bodyStyle: "Sedan",
    drivetrain: "AWD",
    transmission: "Single-Speed",
    fuel: "Electric",
    exteriorColor: "Pearl White Multi-Coat",
    mpg: "134 MPGe combined",
    image: IMG("photo-1560958089-b8a1929cea89"),
    tag: "New Arrival",
  },
  {
    id: "bcc-2023-ford-f150",
    year: 2023,
    make: "Ford",
    model: "F-150",
    trim: "Lariat SuperCrew 4x4",
    price: 52750,
    mileage: 15420,
    bodyStyle: "Truck",
    drivetrain: "4WD",
    transmission: "10-Speed Automatic",
    fuel: "Gasoline",
    exteriorColor: "Carbonized Gray",
    mpg: "19 city / 24 hwy",
    image: IMG("photo-1605893477799-b99e3b8b93fe"),
    tag: "Certified",
  },
  {
    id: "bcc-2022-mercedes-gle-coupe",
    year: 2022,
    make: "Mercedes-Benz",
    model: "GLE 450 Coupe",
    trim: "4MATIC Premium",
    price: 61900,
    mileage: 19870,
    bodyStyle: "SUV",
    drivetrain: "AWD",
    transmission: "9-Speed Automatic",
    fuel: "Gasoline",
    exteriorColor: "Polar White",
    mpg: "19 city / 23 hwy",
    image: IMG("photo-1590362891991-f776e747a588"),
    tag: "Price Drop",
  },
  {
    id: "bcc-2021-honda-crv",
    year: 2021,
    make: "Honda",
    model: "CR-V",
    trim: "EX-L AWD",
    price: 28480,
    mileage: 31560,
    bodyStyle: "SUV",
    drivetrain: "AWD",
    transmission: "CVT",
    fuel: "Gasoline",
    exteriorColor: "Platinum White Pearl",
    mpg: "27 city / 32 hwy",
    image: IMG("photo-1519641471654-76ce0107ad1b"),
  },
  {
    id: "bcc-2021-ford-expedition",
    year: 2021,
    make: "Ford",
    model: "Expedition",
    trim: "Limited Max 4x4",
    price: 44990,
    mileage: 38220,
    bodyStyle: "SUV",
    drivetrain: "4WD",
    transmission: "10-Speed Automatic",
    fuel: "Gasoline",
    exteriorColor: "Star White",
    mpg: "17 city / 23 hwy",
    image: IMG("photo-1533473359331-0135ef1b58bf"),
  },
  {
    id: "bcc-2020-vw-golf-gti",
    year: 2020,
    make: "Volkswagen",
    model: "Golf GTI",
    trim: "S 2.0T",
    price: 22480,
    mileage: 34870,
    bodyStyle: "Hatchback",
    drivetrain: "FWD",
    transmission: "6-Speed Manual",
    fuel: "Gasoline",
    exteriorColor: "Cornflower Blue",
    mpg: "24 city / 32 hwy",
    image: IMG("photo-1541899481282-d53bffe3c35d"),
    tag: "Price Drop",
  },
  {
    id: "bcc-2022-nissan-gtr",
    year: 2022,
    make: "Nissan",
    model: "GT-R",
    trim: "Premium AWD",
    price: 112900,
    mileage: 8990,
    bodyStyle: "Coupe",
    drivetrain: "AWD",
    transmission: "6-Speed DCT",
    fuel: "Gasoline",
    exteriorColor: "Pearl White",
    mpg: "16 city / 22 hwy",
    image: IMG("photo-1568605117036-5fe5e7bab0b7"),
    tag: "Low Miles",
  },
  {
    id: "bcc-2020-amg-gt",
    year: 2020,
    make: "Mercedes-Benz",
    model: "AMG GT",
    trim: "GT R Coupe",
    price: 129500,
    mileage: 11240,
    bodyStyle: "Coupe",
    drivetrain: "RWD",
    transmission: "7-Speed DCT",
    fuel: "Gasoline",
    exteriorColor: "AMG Hero Red",
    mpg: "15 city / 20 hwy",
    image: IMG("photo-1553440569-bcc63803a83d"),
    tag: "Low Miles",
  },
  {
    id: "bcc-2022-toyota-camry",
    year: 2022,
    make: "Toyota",
    model: "Camry",
    trim: "XSE V6",
    price: 29450,
    mileage: 26540,
    bodyStyle: "Sedan",
    drivetrain: "FWD",
    transmission: "8-Speed Automatic",
    fuel: "Gasoline",
    exteriorColor: "Predawn Gray Mica",
    mpg: "22 city / 33 hwy",
    image: IMG("photo-1621007947382-bb3c3994e3fb"),
    tag: "New Arrival",
  },
  {
    id: "bcc-2020-chevrolet-camaro",
    year: 2020,
    make: "Chevrolet",
    model: "Camaro",
    trim: "2SS Coupe",
    price: 34900,
    mileage: 22880,
    bodyStyle: "Coupe",
    drivetrain: "RWD",
    transmission: "6-Speed Manual",
    fuel: "Gasoline",
    exteriorColor: "Riverside Blue Metallic",
    mpg: "16 city / 26 hwy",
    image: IMG("photo-1552519507-da3b142c6e3d"),
  },
];

export const PRICE_RANGES = [
  { label: "Any price", min: 0, max: Infinity },
  { label: "Under $20,000", min: 0, max: 20000 },
  { label: "$20,000 – $30,000", min: 20000, max: 30000 },
  { label: "$30,000 – $40,000", min: 30000, max: 40000 },
  { label: "$40,000 – $60,000", min: 40000, max: 60000 },
  { label: "$60,000+", min: 60000, max: Infinity },
] as const;

export const SORTS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "year-desc", label: "Year: Newest" },
  { value: "mileage-asc", label: "Mileage: Lowest" },
] as const;

export type SortValue = (typeof SORTS)[number]["value"];

export const MAKES = Array.from(new Set(VEHICLES.map((v) => v.make))).sort();

export const YEARS = Array.from(new Set(VEHICLES.map((v) => v.year))).sort(
  (a, b) => b - a,
);

export const BODY_STYLES = Array.from(
  new Set(VEHICLES.map((v) => v.bodyStyle)),
).sort();

export function modelsForMake(make: string): string[] {
  const list = VEHICLES.filter((v) => make === "" || v.make === make).map(
    (v) => v.model,
  );
  return Array.from(new Set(list)).sort();
}

export const currency = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

export const miles = (n: number) => `${n.toLocaleString("en-US")} mi`;

/** Rough monthly estimate — 72 mo, 7.5% APR, 10% down. Illustration only. */
export function estMonthly(price: number): number {
  const principal = price * 0.9;
  const r = 0.075 / 12;
  const n = 72;
  const m = (principal * r) / (1 - Math.pow(1 + r, -n));
  return Math.round(m / 5) * 5;
}
