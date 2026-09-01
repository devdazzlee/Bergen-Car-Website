/**
 * Vehicle category landing pages. Titles, meta, permalinks, H1s and body copy
 * are taken verbatim from the client brief ("Bergen Car web Revisions.docx").
 *
 * `filter` decides how the reused inventory listing is scoped:
 *   - { kind: "bodyStyle" }  filters by Vehicle.bodyStyle
 *   - { kind: "fuel" }       filters by Vehicle.fuel
 *   - { kind: "flag" }       filters by an additive Vehicle flag
 *                            (commercial / formerPolice / luxury)
 *   - { kind: "none" }       no matching field yet, renders an empty state
 */

export type CategoryFilter =
  | {
      kind: "bodyStyle";
      value:
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
    }
  | { kind: "fuel"; value: "Hybrid" | "Electric" }
  | { kind: "flag"; value: "commercial" | "formerPolice" | "luxury" }
  | { kind: "none" };

export type CategoryGroup = "Body type" | "Vans & work" | "Fuel" | "Premium";

export type VehicleCategory = {
  slug: string;
  name: string;
  navLabel: string;
  seoTitle: string;
  metaDescription: string;
  permalink: string;
  h1: string;
  body: string[];
  /** Noun used to fill the documented image alt text pattern. */
  altNoun: string;
  filter: CategoryFilter;
  group: CategoryGroup;
};

export const VEHICLE_CATEGORIES: VehicleCategory[] = [
  {
    slug: "used-suvs-lodi-nj",
    name: "Used SUVs",
    navLabel: "SUVs",
    seoTitle: "Used SUVs in Lodi, NJ | Bergen Car Company",
    metaDescription:
      "Shop quality used SUVs in Lodi, NJ at Bergen Car Company. Explore compact, midsize, full-size, and luxury SUVs available today.",
    permalink: "/used-suvs-lodi-nj",
    h1: "Used SUVs in Lodi, NJ",
    body: [
      "Looking for reliable used SUVs in Lodi, NJ? Bergen Car Company offers a selection of pre-owned SUVs for families, commuters, professionals, and drivers who need additional passenger and cargo space. Explore compact SUVs for daily travel, midsize models for greater versatility, and full-size SUVs for larger families and demanding journeys.",
      "Our used SUVs may include features such as all-wheel drive, third-row seating, advanced safety technology, smartphone connectivity, and flexible cargo areas. Review the available vehicles below, compare mileage, features, and pricing, and choose an SUV that fits your lifestyle and budget.",
      "Browse our used SUVs and contact Bergen Car Company to schedule a test drive in Lodi, NJ.",
    ],
    altNoun: "SUV",
    filter: { kind: "bodyStyle", value: "SUV" },
    group: "Body type",
  },
  {
    slug: "used-sedans-lodi-nj",
    name: "Used Sedans",
    navLabel: "Sedans",
    seoTitle: "Used Sedans in Lodi, NJ | Bergen Car Company",
    metaDescription:
      "Find affordable used sedans in Lodi, NJ at Bergen Car Company. Browse reliable and fuel-efficient cars for commuting and daily driving.",
    permalink: "/used-sedans-lodi-nj",
    h1: "Used Sedans in Lodi, NJ",
    body: [
      "Explore dependable used sedans in Lodi, NJ at Bergen Car Company. Sedans remain a practical choice for commuting, family transportation, and everyday travel because they offer comfortable seating, manageable handling, and competitive fuel economy. Our selection may include compact, midsize, full-size, and premium sedans from popular manufacturers.",
      "Whether you prioritize affordability, interior comfort, safety features, technology, or performance, our team can help you compare available options. Browse the inventory below to review vehicle photos, mileage, features, and pricing before arranging your visit to our Lodi dealership.",
      "Find your next used sedan and schedule a test drive with Bergen Car Company.",
    ],
    altNoun: "sedan",
    filter: { kind: "bodyStyle", value: "Sedan" },
    group: "Body type",
  },
  {
    slug: "used-pickup-trucks-lodi-nj",
    name: "Used Pickup Trucks",
    navLabel: "Pickup Trucks",
    seoTitle: "Used Pickup Trucks in Lodi, NJ | Bergen Car Company",
    metaDescription:
      "Shop dependable used pickup trucks in Lodi, NJ. Browse capable trucks for work, towing, hauling, and everyday driving.",
    permalink: "/used-pickup-trucks-lodi-nj",
    h1: "Used Pickup Trucks in Lodi, NJ",
    body: [
      "Find capable used pickup trucks in Lodi, NJ at Bergen Car Company. A pickup truck can provide the strength and flexibility needed for contracting, towing, hauling equipment, business operations, and personal transportation. Our inventory may include light-duty, full-size, extended-cab, and crew-cab trucks with different bed lengths and powertrain options.",
      "Browse available trucks below and compare towing capacity, payload capability, mileage, drivetrain, cabin configuration, and included features. Whether you need a dependable work vehicle or a comfortable truck for everyday driving, our team can help you find an option suited to your needs.",
      "Contact Bergen Car Company for availability, specifications, and a test drive.",
    ],
    altNoun: "pickup truck",
    filter: { kind: "bodyStyle", value: "Truck" },
    group: "Body type",
  },
  {
    slug: "used-minivans-lodi-nj",
    name: "Used Minivans",
    navLabel: "Minivans",
    seoTitle: "Used Minivans in Lodi, NJ | Bergen Car Company",
    metaDescription:
      "Browse spacious used minivans in Lodi, NJ at Bergen Car Company. Find comfortable and practical transportation for your family.",
    permalink: "/used-minivans-lodi-nj",
    h1: "Used Minivans in Lodi, NJ",
    body: [
      "Shop comfortable used minivans in Lodi, NJ at Bergen Car Company. Minivans are designed for families and drivers who need flexible passenger seating, easy entry, and generous storage capacity. Many models offer three rows of seating, sliding doors, configurable interiors, and convenient features for daily errands and longer trips.",
      "Our used minivan inventory may include vehicles equipped with rear climate controls, driver-assistance technology, entertainment systems, smartphone connectivity, and foldable seating. Explore the vehicles below to compare their condition, mileage, features, and pricing.",
      "Browse our used minivans and schedule your test drive in Lodi, NJ.",
    ],
    altNoun: "minivan",
    filter: { kind: "bodyStyle", value: "Minivan" },
    group: "Vans & work",
  },
  {
    slug: "used-cargo-vans-lodi-nj",
    name: "Used Cargo Vans",
    navLabel: "Cargo Vans",
    seoTitle: "Used Cargo Vans in Lodi, NJ | Bergen Car Company",
    metaDescription:
      "Find used cargo vans in Lodi, NJ for contracting, deliveries, and commercial use. Browse available work vans today.",
    permalink: "/used-cargo-vans-lodi-nj",
    h1: "Used Cargo Vans in Lodi, NJ",
    body: [
      "Explore dependable used cargo vans in Lodi, NJ at Bergen Car Company. Cargo vans provide enclosed storage and flexible working space for contractors, electricians, plumbers, delivery companies, mobile service providers, and other local businesses. Different roof heights and cargo lengths can accommodate a variety of commercial needs.",
      "Review our available cargo vans below and compare payload capacity, cargo dimensions, mileage, condition, and included equipment. Whether you need a van for tools, supplies, packages, or customized business use, Bergen Car Company can help you find a practical commercial vehicle.",
      "Contact us to find a used cargo van that supports your business.",
    ],
    altNoun: "cargo van",
    filter: { kind: "bodyStyle", value: "Cargo Van" },
    group: "Vans & work",
  },
  {
    slug: "used-passenger-vans-lodi-nj",
    name: "Used Passenger Vans",
    navLabel: "Passenger Vans",
    seoTitle: "Used Passenger Vans in Lodi, NJ | Bergen Car Company",
    metaDescription:
      "Shop used passenger vans in Lodi, NJ. Explore spacious vans for families, businesses, organizations, and group transportation.",
    permalink: "/used-passenger-vans-lodi-nj",
    h1: "Used Passenger Vans in Lodi, NJ",
    body: [
      "Find spacious used passenger vans in Lodi, NJ at Bergen Car Company. Passenger vans provide additional seating for large families, businesses, schools, community organizations, hospitality providers, and transportation services. Their roomy cabins make it easier to transport multiple passengers comfortably.",
      "Available features may include configurable seating, rear climate controls, multiple entry points, driver-assistance technology, and additional storage capacity. Browse our current passenger van inventory below to compare seating arrangements, mileage, condition, features, and pricing.",
      "Contact Bergen Car Company for vehicle details and test-drive availability.",
    ],
    altNoun: "passenger van",
    filter: { kind: "bodyStyle", value: "Passenger Van" },
    group: "Vans & work",
  },
  {
    slug: "used-commercial-vehicles-lodi-nj",
    name: "Used Commercial Vehicles",
    navLabel: "Commercial Vehicles",
    seoTitle: "Used Commercial Vehicles in Lodi, NJ | Bergen Car Company",
    metaDescription:
      "Browse dependable used commercial vehicles in Lodi, NJ for contracting, deliveries, transportation, and business operations.",
    permalink: "/used-commercial-vehicles-lodi-nj",
    h1: "Used Commercial Vehicles in Lodi, NJ",
    body: [
      "Shop used commercial vehicles in Lodi, NJ at Bergen Car Company. Our inventory may include cargo vans, passenger vans, pickup trucks, fleet vehicles, and other practical options for contractors, delivery companies, transportation providers, and local businesses.",
      "Choosing the right commercial vehicle depends on your required cargo capacity, passenger seating, towing capability, operating costs, and daily workload. Browse the available inventory below to compare specifications, mileage, condition, and pricing before selecting a vehicle for your business.",
      "Contact our team to discuss your commercial transportation requirements.",
    ],
    altNoun: "commercial vehicle",
    filter: { kind: "flag", value: "commercial" },
    group: "Vans & work",
  },
  {
    slug: "used-police-cars-lodi-nj",
    name: "Used Police Cars",
    navLabel: "Police Cars",
    seoTitle: "Used Police Cars in Lodi, NJ | Bergen Car Company",
    metaDescription:
      "Find used police cars in Lodi, NJ at Bergen Car Company. Browse durable former police and fleet vehicles available for sale.",
    permalink: "/used-police-cars-lodi-nj",
    h1: "Used Police Cars in Lodi, NJ",
    body: [
      "Browse used police cars in Lodi, NJ at Bergen Car Company. Former police and fleet vehicles are often selected for their durable construction, performance, and ability to handle demanding operating conditions. They may appeal to individuals, security organizations, fleet operators, and commercial buyers seeking practical value.",
      "Each former police vehicle can differ in mileage, equipment, service history, condition, and previous use. Review the available inventory below and contact our team for specific details, vehicle history information, included equipment, and current availability.",
      "Contact Bergen Car Company to learn more about our available police vehicles.",
    ],
    altNoun: "police car",
    filter: { kind: "flag", value: "formerPolice" },
    group: "Vans & work",
  },
  {
    slug: "used-coupes-lodi-nj",
    name: "Used Coupes",
    navLabel: "Coupes",
    seoTitle: "Used Coupes in Lodi, NJ | Bergen Car Company",
    metaDescription:
      "Shop stylish used coupes in Lodi, NJ at Bergen Car Company. Explore sporty two-door vehicles available near you.",
    permalink: "/used-coupes-lodi-nj",
    h1: "Used Coupes in Lodi, NJ",
    body: [
      "Discover stylish used coupes in Lodi, NJ at Bergen Car Company. Coupes are an appealing choice for drivers who value sporty styling, responsive handling, and a more personal driving experience. Our inventory may include efficient daily drivers, premium coupes, and performance-oriented vehicles.",
      "Browse the available coupes below and compare engine options, mileage, interior features, technology, condition, and pricing. Whether you want an enjoyable commuter car or something with stronger performance, our team can help you evaluate the available choices.",
      "Explore our used coupes and schedule a test drive today.",
    ],
    altNoun: "coupe",
    filter: { kind: "bodyStyle", value: "Coupe" },
    group: "Body type",
  },
  {
    slug: "used-hatchbacks-lodi-nj",
    name: "Used Hatchbacks",
    navLabel: "Hatchbacks",
    seoTitle: "Used Hatchbacks in Lodi, NJ | Bergen Car Company",
    metaDescription:
      "Browse practical used hatchbacks in Lodi, NJ. Find efficient vehicles with flexible cargo space at Bergen Car Company.",
    permalink: "/used-hatchbacks-lodi-nj",
    h1: "Used Hatchbacks in Lodi, NJ",
    body: [
      "Shop practical used hatchbacks in Lodi, NJ at Bergen Car Company. Hatchbacks combine the manageable size and fuel efficiency of a compact car with a rear cargo area that is easier to access. They are well suited to commuting, city driving, shopping, and everyday transportation.",
      "Many hatchbacks offer folding rear seats, flexible storage, modern safety features, and smartphone connectivity. Browse our available vehicles below to compare cargo capacity, mileage, fuel economy, condition, features, and pricing.",
      "Find a used hatchback that fits your lifestyle and schedule a test drive.",
    ],
    altNoun: "hatchback",
    filter: { kind: "bodyStyle", value: "Hatchback" },
    group: "Body type",
  },
  {
    slug: "used-convertibles-lodi-nj",
    name: "Used Convertibles",
    navLabel: "Convertibles",
    seoTitle: "Used Convertibles in Lodi, NJ | Bergen Car Company",
    metaDescription:
      "Find stylish used convertibles in Lodi, NJ at Bergen Car Company. Browse available open-top vehicles and schedule a test drive.",
    permalink: "/used-convertibles-lodi-nj",
    h1: "Used Convertibles in Lodi, NJ",
    body: [
      "Explore stylish used convertibles in Lodi, NJ at Bergen Car Company. Convertibles provide an enjoyable open-air driving experience while offering the performance, technology, and comfort expected from a modern vehicle. Available options may include soft-top and retractable hardtop designs.",
      "Review our convertible inventory below and compare roof operation, mileage, interior condition, technology, safety features, and performance. Vehicle availability can change, so contact our team if you find a convertible you would like to inspect or test-drive.",
      "Browse our used convertibles and plan your visit to Bergen Car Company.",
    ],
    altNoun: "convertible",
    filter: { kind: "bodyStyle", value: "Convertible" },
    group: "Body type",
  },
  {
    slug: "used-wagons-lodi-nj",
    name: "Used Wagons",
    navLabel: "Wagons",
    seoTitle: "Used Wagons in Lodi, NJ | Bergen Car Company",
    metaDescription:
      "Shop versatile used wagons in Lodi, NJ. Browse comfortable vehicles offering passenger room and additional cargo space.",
    permalink: "/used-wagons-lodi-nj",
    h1: "Used Wagons in Lodi, NJ",
    body: [
      "Find versatile used wagons in Lodi, NJ at Bergen Car Company. Wagons offer sedan-like comfort and handling while providing additional cargo room for luggage, shopping, equipment, and family travel. They can be a practical alternative for drivers who need space without moving to a larger SUV.",
      "Available wagons may include folding rear seats, all-wheel drive, roof rails, advanced safety features, and modern infotainment systems. Browse our inventory below to compare space, mileage, drivetrain, condition, features, and pricing.",
      "Contact Bergen Car Company to schedule a test drive in Lodi, NJ.",
    ],
    altNoun: "wagon",
    filter: { kind: "bodyStyle", value: "Wagon" },
    group: "Body type",
  },
  {
    slug: "used-luxury-cars-lodi-nj",
    name: "Used Luxury Cars",
    navLabel: "Luxury Cars",
    seoTitle: "Used Luxury Cars in Lodi, NJ | Bergen Car Company",
    metaDescription:
      "Browse premium used luxury cars in Lodi, NJ. Explore refined vehicles with advanced features at Bergen Car Company.",
    permalink: "/used-luxury-cars-lodi-nj",
    h1: "Used Luxury Cars in Lodi, NJ",
    body: [
      "Shop premium used luxury cars in Lodi, NJ at Bergen Car Company. Luxury vehicles can provide refined interiors, advanced technology, enhanced comfort, distinctive styling, and responsive performance. Our inventory may include luxury sedans, SUVs, coupes, and other premium vehicles.",
      "Browse the available luxury vehicles below and compare mileage, condition, interior materials, driver-assistance technology, infotainment features, and performance specifications. Our team can provide more information and help you arrange a closer inspection or test drive.",
      "Find your next luxury vehicle at Bergen Car Company in Lodi, NJ.",
    ],
    altNoun: "luxury vehicle",
    filter: { kind: "flag", value: "luxury" },
    group: "Premium",
  },
  {
    slug: "used-hybrid-vehicles-lodi-nj",
    name: "Used Hybrid Vehicles",
    navLabel: "Hybrid Vehicles",
    seoTitle: "Used Hybrid Vehicles in Lodi, NJ | Bergen Car Company",
    metaDescription:
      "Find fuel-efficient used hybrid vehicles in Lodi, NJ. Browse available hybrid cars and SUVs at Bergen Car Company.",
    permalink: "/used-hybrid-vehicles-lodi-nj",
    h1: "Used Hybrid Vehicles in Lodi, NJ",
    body: [
      "Explore fuel-efficient used hybrid vehicles in Lodi, NJ at Bergen Car Company. Hybrid vehicles combine a gasoline engine with electric assistance to improve efficiency while maintaining the convenience of traditional refueling. Available options may include hybrid sedans, SUVs, and family vehicles.",
      "When comparing hybrids, consider fuel economy, mileage, battery condition, interior space, safety technology, and maintenance history. Browse our available inventory below and review the features and specifications of each vehicle before scheduling a test drive.",
      "Contact Bergen Car Company to learn more about our used hybrid vehicles.",
    ],
    altNoun: "hybrid vehicle",
    filter: { kind: "fuel", value: "Hybrid" },
    group: "Fuel",
  },
  {
    slug: "used-electric-vehicles-lodi-nj",
    name: "Used Electric Vehicles",
    navLabel: "Electric Vehicles",
    seoTitle: "Used Electric Vehicles in Lodi, NJ | Bergen Car Company",
    metaDescription:
      "Shop used electric vehicles in Lodi, NJ. Explore efficient electric cars and SUVs available at Bergen Car Company.",
    permalink: "/used-electric-vehicles-lodi-nj",
    h1: "Used Electric Vehicles in Lodi, NJ",
    body: [
      "Discover used electric vehicles in Lodi, NJ at Bergen Car Company. Electric vehicles offer quiet operation, responsive acceleration, modern technology, and freedom from traditional gasoline refueling. Our inventory may include electric cars, crossovers, and SUVs with different driving ranges and charging capabilities.",
      "Compare the available electric vehicles below by estimated range, mileage, charging speed, battery information, interior space, features, and pricing. Contact our team with questions about a specific vehicle or to arrange a test drive at our Lodi location.",
      "Explore our electric vehicle inventory and find an option suited to your driving needs.",
    ],
    altNoun: "electric vehicle",
    filter: { kind: "fuel", value: "Electric" },
    group: "Fuel",
  },
];

export function getCategory(slug: string): VehicleCategory | undefined {
  return VEHICLE_CATEGORIES.find((c) => c.slug === slug);
}

const GROUP_ORDER: CategoryGroup[] = [
  "Body type",
  "Vans & work",
  "Fuel",
  "Premium",
];

/** Grouped for the header Shop mega menu and the footer. */
export const CATEGORY_GROUPS: { group: CategoryGroup; items: VehicleCategory[] }[] =
  GROUP_ORDER.map((group) => ({
    group,
    items: VEHICLE_CATEGORIES.filter((c) => c.group === group),
  }));

/** Builds the documented image alt text, e.g.
 *  "Used 2019 Honda CR-V SUV for sale in Lodi NJ" */
export function categoryAlt(
  altNoun: string,
  year: number,
  make: string,
  model: string,
): string {
  return `Used ${year} ${make} ${model} ${altNoun} for sale in Lodi NJ`;
}
