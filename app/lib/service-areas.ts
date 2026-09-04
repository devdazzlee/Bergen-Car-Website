import type { Vehicle } from "./inventory";

/**
 * Towns Bergen Car Company regularly sells to, for the /service-areas hub and
 * the per-city landing pages. Each intro is written by hand — the structure is
 * templated, the words are not.
 */
export type ServiceArea = {
  slug: string;
  city: string;
  state: "NJ" | "NY";
  county: string;
  /** Approx. driving miles to 22 US 46 East, Lodi. */
  miles: number;
  /** Human drive-time phrase, e.g. "10–15 minute". */
  drive: string;
  /** How you'd actually get here, slotted after an em dash. */
  approach: string;
  /** Two sentences, specific to the town. */
  intro: string;
};

export const LOT_ADDRESS = "22 US 46 East, Lodi, NJ 07644";
export const LOT_MAPS_QUERY = "22 US 46 East, Lodi, NJ 07644";

export const SERVICE_AREAS: ServiceArea[] = [
  // ---------------- Bergen County ----------------
  {
    slug: "hackensack",
    city: "Hackensack",
    state: "NJ",
    county: "Bergen County",
    miles: 3,
    drive: "10 minute",
    approach: "straight up Main Street or Essex Street",
    intro:
      "Hackensack is the county seat and our closest big neighbor, close enough that plenty of our customers walk in on their lunch break from the courthouse or the medical center. If you're near Main Street or the Riverside Square area, our Lodi lot is a quick run down Essex Street with no highway involved.",
  },
  {
    slug: "garfield",
    city: "Garfield",
    state: "NJ",
    county: "Bergen County",
    miles: 2,
    drive: "5–10 minute",
    approach: "over the Passaic River on Outwater Lane",
    intro:
      "Garfield sits right across the Passaic River from us, so this is about as local as it gets — a lot of Garfield families have bought two or three cars here over the years. Cross at Outwater Lane or Market Street and you're on Route 46 in a few minutes.",
  },
  {
    slug: "saddle-brook",
    city: "Saddle Brook",
    state: "NJ",
    county: "Bergen County",
    miles: 2,
    drive: "5–10 minute",
    approach: "south on Route 46 or Midland Avenue",
    intro:
      "Saddle Brook shares the Route 46 corridor with us, so you've probably driven past the lot a hundred times on the way to the Garden State Parkway. It's the shortest trip of any town on this list — barely enough time to finish a coffee.",
  },
  {
    slug: "south-hackensack",
    city: "South Hackensack",
    state: "NJ",
    county: "Bergen County",
    miles: 2,
    drive: "5–10 minute",
    approach: "up Route 46 past the Hackensack River",
    intro:
      "South Hackensack is a small township wedged between the river and Teterboro, and it's practically next door to us. If you work in one of the warehouses off Wesley Street, you could drop a car for service before your shift and pick it up after.",
  },
  {
    slug: "maywood",
    city: "Maywood",
    state: "NJ",
    county: "Bergen County",
    miles: 3,
    drive: "10 minute",
    approach: "down Maywood Avenue to Route 17",
    intro:
      "Maywood is a quiet grid of streets just north of us, the kind of town where people keep a car for ten years and then come in looking for one just like it. The drive down through Rochelle Park to our lot takes about as long as finding a parking spot at the mall.",
  },
  {
    slug: "rochelle-park",
    city: "Rochelle Park",
    state: "NJ",
    county: "Bergen County",
    miles: 2,
    drive: "5–10 minute",
    approach: "straight down Route 17 to Route 46",
    intro:
      "Rochelle Park is the township directly between us and the Route 17 shopping strip, so odds are our lot is on your regular route already. It's a five-minute hop with one light if you catch it right.",
  },
  {
    slug: "elmwood-park",
    city: "Elmwood Park",
    state: "NJ",
    county: "Bergen County",
    miles: 3,
    drive: "10 minute",
    approach: "east on Route 46 across the river",
    intro:
      "Elmwood Park is right on the other side of Route 46 from us, past the Broadway bridge over the Passaic. A lot of our weekend test drives are people from the Gilbert Avenue side who walked over on a whim.",
  },
  {
    slug: "wallington",
    city: "Wallington",
    state: "NJ",
    county: "Bergen County",
    miles: 3,
    drive: "10 minute",
    approach: "over the Union Boulevard bridge",
    intro:
      "Wallington is a tight, walkable borough along the Passaic, and it's close enough that we see the same faces at the diner on Paterson Avenue. Come across the Union Boulevard bridge and you're at the lot before the radio finishes a song.",
  },
  {
    slug: "hasbrouck-heights",
    city: "Hasbrouck Heights",
    state: "NJ",
    county: "Bergen County",
    miles: 3,
    drive: "10 minute",
    approach: "down the Boulevard to Route 46",
    intro:
      "Hasbrouck Heights sits up on the ridge by Teterboro, with that classic Boulevard main street. Roll down the hill toward Route 46 and our lot is a few minutes past the airport fence.",
  },
  {
    slug: "wood-ridge",
    city: "Wood-Ridge",
    state: "NJ",
    county: "Bergen County",
    miles: 4,
    drive: "10–15 minute",
    approach: "up Valley Boulevard to Route 17",
    intro:
      "Wood-Ridge has changed a lot since the Wesmont development went in, and a good number of the newer residents there are first-time buyers we've helped get financed. The drive over through Hasbrouck Heights is short and all surface streets.",
  },
  {
    slug: "carlstadt",
    city: "Carlstadt",
    state: "NJ",
    county: "Bergen County",
    miles: 5,
    drive: "12–15 minute",
    approach: "up Route 17 north from the Meadowlands",
    intro:
      "Carlstadt is mostly industrial down by the Meadowlands, so we get a lot of business owners looking for a reliable work vehicle or a second car for a family member. From the Washington Avenue side it's a straight shot up Route 17 to us.",
  },
  {
    slug: "moonachie",
    city: "Moonachie",
    state: "NJ",
    county: "Bergen County",
    miles: 5,
    drive: "12–15 minute",
    approach: "up Moonachie Road to Route 46",
    intro:
      "Moonachie is a small town best known for the warehouses and the old amusement park, and it's an easy trip north to our lot on Route 46. If you're near Route 17 already, you're most of the way here.",
  },
  {
    slug: "teterboro",
    city: "Teterboro",
    state: "NJ",
    county: "Bergen County",
    miles: 4,
    drive: "10–15 minute",
    approach: "around the airport on Route 46",
    intro:
      "Teterboro is almost all airport and offices, with only a handful of residents, but plenty of people who work at the airfield or the aviation companies stop in on their way home. The lot is a couple of minutes west along Route 46.",
  },
  {
    slug: "fair-lawn",
    city: "Fair Lawn",
    state: "NJ",
    county: "Bergen County",
    miles: 4,
    drive: "12–15 minute",
    approach: "south on Route 208 to Route 4 to Route 46",
    intro:
      "Fair Lawn is a big, settled suburb with the Radburn section and the shops along River Road, and we've sold a lot of dependable commuter sedans to people heading into the city from there. Come down Route 208 and Saddle River Road and you'll be at the lot in about a quarter hour.",
  },
  {
    slug: "paramus",
    city: "Paramus",
    state: "NJ",
    county: "Bergen County",
    miles: 4,
    drive: "12–15 minute",
    approach: "south on Route 17 from the malls",
    intro:
      "Paramus is retail central, so if you've spent a Saturday at the Garden State Plaza or the Route 17 stores, our lot is a short run south on the same road. People often stop by here after comparison-shopping the big new-car dealers up the highway.",
  },
  {
    slug: "little-ferry",
    city: "Little Ferry",
    state: "NJ",
    county: "Bergen County",
    miles: 5,
    drive: "12–15 minute",
    approach: "up Route 46 from the Hackensack River",
    intro:
      "Little Ferry runs along the river between the Meadowlands and Ridgefield Park, a compact town where a lot of households are down to one car and looking for a second. Take Route 46 west over the river and we're a few lights up.",
  },
  {
    slug: "ridgefield-park",
    city: "Ridgefield Park",
    state: "NJ",
    county: "Bergen County",
    miles: 6,
    drive: "15 minute",
    approach: "west on Route 46 past the Bergen Turnpike",
    intro:
      "Ridgefield Park is a village with its own school district and a real Main Street feel, tucked against Overpeck Park. Head west on Route 46 and you'll pass a few of the big-box dealers before you reach our smaller lot in Lodi.",
  },
  {
    slug: "bogota",
    city: "Bogota",
    state: "NJ",
    county: "Bergen County",
    miles: 5,
    drive: "12–15 minute",
    approach: "across the river and west on Route 46",
    intro:
      "Bogota is one of the smallest boroughs in the county, a few walkable blocks between Teaneck and the river. It's a quick trip over to Lodi, and we've had a steady trickle of Bogota families in for first cars and trade-ins.",
  },
  {
    slug: "teaneck",
    city: "Teaneck",
    state: "NJ",
    county: "Bergen County",
    miles: 6,
    drive: "15 minute",
    approach: "west on Route 4 to Route 46",
    intro:
      "Teaneck is a large, diverse township with the Cedar Lane shopping district and an easy shot to the George Washington Bridge. Coming from the Teaneck Road side, our lot is about fifteen minutes west via Route 4 and Route 46.",
  },
  {
    slug: "rutherford",
    city: "Rutherford",
    state: "NJ",
    county: "Bergen County",
    miles: 4,
    drive: "12–15 minute",
    approach: "north on Route 17 from the Meadowlands",
    intro:
      "Rutherford has one of the prettiest downtowns in the area, all Victorian houses and Park Avenue storefronts near Felician University. The drive up Route 17 to our lot is short, and we see a lot of students and young families from there.",
  },
  {
    slug: "east-rutherford",
    city: "East Rutherford",
    state: "NJ",
    county: "Bergen County",
    miles: 5,
    drive: "12–15 minute",
    approach: "north on Route 17 past MetLife Stadium",
    intro:
      "East Rutherford means the stadium and the arena to most people, but it's also a small borough of tidy streets on the hill above the Meadowlands. Head north on Route 17 and our Lodi lot is a few minutes past the Route 3 split.",
  },
  {
    slug: "lyndhurst",
    city: "Lyndhurst",
    state: "NJ",
    county: "Bergen County",
    miles: 5,
    drive: "12–15 minute",
    approach: "up Route 17 from Ridge Road",
    intro:
      "Lyndhurst stretches from Ridge Road down to the Meadowlands trails, a solid working town where people tend to buy practical and keep it. We're a straight run up Route 17, and plenty of Lyndhurst customers have sent their neighbors our way.",
  },
  {
    slug: "north-arlington",
    city: "North Arlington",
    state: "NJ",
    county: "Bergen County",
    miles: 6,
    drive: "15 minute",
    approach: "north on Ridge Road to Route 17",
    intro:
      "North Arlington sits on the hill above the Passaic at the southern tip of Bergen County, closer to Kearny than to most of its own county. Come up Ridge Road to Route 17 and our lot is about fifteen minutes north.",
  },
  {
    slug: "bergenfield",
    city: "Bergenfield",
    state: "NJ",
    county: "Bergen County",
    miles: 7,
    drive: "18–20 minute",
    approach: "south on Washington Avenue to Route 4",
    intro:
      "Bergenfield is a dense, family-heavy town in the county's eastern flats, with a busy Washington Avenue business strip. It's a slightly longer trip for us — about twenty minutes down through Teaneck — but we still see a lot of repeat Bergenfield buyers.",
  },
  {
    slug: "new-milford",
    city: "New Milford",
    state: "NJ",
    county: "Bergen County",
    miles: 7,
    drive: "18–20 minute",
    approach: "south along River Road to Route 4",
    intro:
      "New Milford is a quiet residential borough along the Hackensack River near Oradell Reservoir. Take River Road south and pick up Route 4 west, and our Lodi lot is under twenty minutes — an easy Saturday errand.",
  },
  {
    slug: "fairview",
    city: "Fairview",
    state: "NJ",
    county: "Bergen County",
    miles: 9,
    drive: "20–25 minute",
    approach: "Broad Avenue north to Route 46, or Route 3 west",
    intro:
      "Fairview is a compact borough up on the Palisades ridge, closer in feel to Cliffside Park and Fort Lee than to the rest of Bergen County. The Anderson Avenue business strip runs its whole length, and from there it's about nine miles and a little over twenty minutes to Lodi — Broad Avenue north to Route 46, or Route 3 west when the local streets are backed up. It's one of the longer trips we list, but it's a straight one once you're out of the borough.",
  },

  // ---------------- Passaic County ----------------
  {
    slug: "passaic",
    city: "Passaic",
    state: "NJ",
    county: "Passaic County",
    miles: 3,
    drive: "10 minute",
    approach: "across the river on Gregory Avenue or Monroe Street",
    intro:
      "Passaic is right across the river from Lodi, a dense, energetic city with the Main Avenue shopping district and some of the best food in the county. Cross at Monroe Street and you're at our lot in about ten minutes with no highway.",
  },
  {
    slug: "clifton",
    city: "Clifton",
    state: "NJ",
    county: "Passaic County",
    miles: 4,
    drive: "12–15 minute",
    approach: "east on Route 46 from the Botany or Allwood sections",
    intro:
      "Clifton is spread out across a dozen distinct neighborhoods, and Route 46 runs right through it before it reaches us in Lodi. Whether you're near Styertowne, Botany Village, or Allwood, the lot is a straight drive east down 46.",
  },
  {
    slug: "paterson",
    city: "Paterson",
    state: "NJ",
    county: "Passaic County",
    miles: 7,
    drive: "18–20 minute",
    approach: "south on Route 20 to Route 46",
    intro:
      "Paterson is the third-largest city in the state, built around the Great Falls and the old silk mills, with more people than any town near us. Route 20 along the river drops you right onto Route 46 for the last stretch to our lot.",
  },
  {
    slug: "hawthorne",
    city: "Hawthorne",
    state: "NJ",
    county: "Passaic County",
    miles: 8,
    drive: "18–22 minute",
    approach: "south on Route 208 to Route 4 to Route 46",
    intro:
      "Hawthorne is a small, tight-knit borough just above Paterson where Goffle Road meets Lafayette Avenue. It's about twenty minutes down via Route 208, and we've built up a steady group of Hawthorne regulars over the years.",
  },
  {
    slug: "prospect-park",
    city: "Prospect Park",
    state: "NJ",
    county: "Passaic County",
    miles: 7,
    drive: "18–20 minute",
    approach: "south through Paterson to Route 46",
    intro:
      "Prospect Park is a half-square-mile borough surrounded by Paterson, densely built and mostly residential. The trip down to our Lodi lot runs through Paterson and onto Route 46, about eighteen minutes in normal traffic.",
  },
  {
    slug: "haledon",
    city: "Haledon",
    state: "NJ",
    county: "Passaic County",
    miles: 8,
    drive: "20–22 minute",
    approach: "down Belmont Avenue through Paterson",
    intro:
      "Haledon climbs the hill northwest of Paterson, known for the old Botto House and its labor-history museum. It's one of the longer local trips at around twenty minutes, mostly down Belmont Avenue and Route 46.",
  },
  {
    slug: "totowa",
    city: "Totowa",
    state: "NJ",
    county: "Passaic County",
    miles: 7,
    drive: "18–20 minute",
    approach: "east on Route 46 from Union Boulevard",
    intro:
      "Totowa is split between the shopping plazas along Route 46 and the quiet hillside neighborhoods above them. Since our lot is also on Route 46, the drive from Totowa is genuinely just one road the whole way.",
  },
  {
    slug: "little-falls",
    city: "Little Falls",
    state: "NJ",
    county: "Passaic County",
    miles: 8,
    drive: "18–22 minute",
    approach: "east on Route 46 past Montclair State",
    intro:
      "Little Falls sits along the Passaic where it drops over the rocks the town is named for, near the Montclair State campus. Route 46 connects it straight to us, so it's an easy twenty-minute drive with no turns to remember.",
  },
  {
    slug: "wayne",
    city: "Wayne",
    state: "NJ",
    county: "Passaic County",
    miles: 11,
    drive: "22–28 minute",
    approach: "east on Route 46 from the Willowbrook area",
    intro:
      "Wayne is a large township of lakes, corporate campuses, and the Willowbrook Mall, and Route 46 runs right through the south end of it. It's a longer haul than our closer towns — around 25 minutes — but it's a simple one, straight down 46 the whole way.",
  },

  // ---------------- Hudson County ----------------
  {
    slug: "secaucus",
    city: "Secaucus",
    state: "NJ",
    county: "Hudson County",
    miles: 7,
    drive: "15–20 minute",
    approach: "up Route 3 to Route 17 north",
    intro:
      "Secaucus has gone from warehouses and outlets to a full-on transit hub with the Frank Lauriello station and a wall of new apartments. From there it's a quick run up Route 3 and Route 17 to our lot — about fifteen minutes when the Turnpike isn't backed up.",
  },
  {
    slug: "north-bergen",
    city: "North Bergen",
    state: "NJ",
    county: "Hudson County",
    miles: 9,
    drive: "20–25 minute",
    approach: "west on Route 3 to Route 17 north",
    intro:
      "North Bergen runs along the Palisades with some of the steepest streets and best skyline views in the state. Head west on Route 3 toward the Meadowlands and pick up Route 17 north, and our lot is about twenty minutes out.",
  },
  {
    slug: "union-city",
    city: "Union City",
    state: "NJ",
    county: "Hudson County",
    miles: 10,
    drive: "22–28 minute",
    approach: "west on Route 495 to Route 3 to Route 17",
    intro:
      "Union City is one of the most densely populated cities in the country, a walk-everywhere place where a lot of households genuinely don't need a car until they suddenly do. When that day comes, it's a 25-minute drive out to us via Route 495 and Route 3.",
  },
  {
    slug: "west-new-york",
    city: "West New York",
    state: "NJ",
    county: "Hudson County",
    miles: 10,
    drive: "22–28 minute",
    approach: "west on Route 495 to Route 3 north",
    intro:
      "West New York sits on the Palisades right across from Midtown, with Bergenline Avenue running its whole length. Getting to our Lodi lot means dropping down to Route 495 and out through the Meadowlands — roughly 25 minutes.",
  },
  {
    slug: "weehawken",
    city: "Weehawken",
    state: "NJ",
    county: "Hudson County",
    miles: 11,
    drive: "25–30 minute",
    approach: "up Route 495 to Route 3 west",
    intro:
      "Weehawken is the town at the mouth of the Lincoln Tunnel, with the ferry terminal and that famous view down the Hudson. Head up the Route 495 helix and west on Route 3, and our lot is under half an hour away.",
  },
  {
    slug: "hoboken",
    city: "Hoboken",
    state: "NJ",
    county: "Hudson County",
    miles: 12,
    drive: "25–35 minute",
    approach: "out via Route 495 and Route 3 west",
    intro:
      "Hoboken is a mile square of brownstones, bars, and the old Erie-Lackawanna terminal, and street parking there is famously brutal — which is exactly why plenty of Hoboken buyers keep their car garaged and buy from a lot a little further out. We're about half an hour away through the Meadowlands.",
  },
  {
    slug: "jersey-city",
    city: "Jersey City",
    state: "NJ",
    county: "Hudson County",
    miles: 12,
    drive: "25–35 minute",
    approach: "north on Route 1/9 and the Turnpike to Route 3",
    intro:
      "Jersey City is the second-biggest city in the state now, from the high-rises at Exchange Place to the row houses of the Heights and Bergen-Lafayette. Depending on your neighborhood it's a 25 to 35 minute trip up to our Lodi lot, mostly via Route 1/9 and Route 3.",
  },
  {
    slug: "kearny",
    city: "Kearny",
    state: "NJ",
    county: "Hudson County",
    miles: 8,
    drive: "18–22 minute",
    approach: "north on the Belleville Turnpike to Route 21",
    intro:
      "Kearny sits on the peninsula between the Passaic and Hackensack rivers, a proud old town with deep Scottish roots and a real soccer tradition. Come up the Belleville Turnpike and Route 21, and our lot is about twenty minutes north.",
  },

  // ---------------- Essex County ----------------
  {
    slug: "nutley",
    city: "Nutley",
    state: "NJ",
    county: "Essex County",
    miles: 7,
    drive: "15–20 minute",
    approach: "north on Route 21 to Route 3 to Route 46",
    intro:
      "Nutley is a leafy township on the Passaic between Clifton and Belleville, with the Yanticaw Park pond and a real small-town Franklin Avenue. Route 21 north along the river gets you to Route 46 and our lot in under twenty minutes.",
  },
  {
    slug: "belleville",
    city: "Belleville",
    state: "NJ",
    county: "Essex County",
    miles: 9,
    drive: "20–25 minute",
    approach: "north on Route 21 along the river",
    intro:
      "Belleville runs along the Passaic just above Newark, an old industrial town with one of the oldest Chinese-American communities in the region. Route 21 follows the river straight north to us — about twenty minutes with lights.",
  },
  {
    slug: "bloomfield",
    city: "Bloomfield",
    state: "NJ",
    county: "Essex County",
    miles: 10,
    drive: "22–28 minute",
    approach: "north on the Parkway or Route 21 to Route 3",
    intro:
      "Bloomfield is built around its green and the Watsessing train station, a commuter town that's a straight ride into Newark or the city. Heading the other way to our lot takes about 25 minutes via the Garden State Parkway or Route 21.",
  },
  {
    slug: "montclair",
    city: "Montclair",
    state: "NJ",
    county: "Essex County",
    miles: 11,
    drive: "25–30 minute",
    approach: "east on Bloomfield Avenue to Route 3",
    intro:
      "Montclair is the art-house-cinema, farmers-market, six-train-stations kind of suburb, up on the first ridge with a view back toward the city. It's one of our longer local runs at around half an hour, out Bloomfield Avenue and Route 3.",
  },
  {
    slug: "newark",
    city: "Newark",
    state: "NJ",
    county: "Essex County",
    miles: 12,
    drive: "25–35 minute",
    approach: "north on Route 21 (McCarter Highway)",
    intro:
      "Newark is the biggest city in New Jersey, from the Ironbound's restaurants to the university district and the arts center downtown. Route 21 — McCarter Highway — runs straight up the Passaic River to Lodi, a 25 to 35 minute drive depending on the hour.",
  },

  // ---------------- Morris County ----------------
  {
    slug: "lincoln-park",
    city: "Lincoln Park",
    state: "NJ",
    county: "Morris County",
    miles: 13,
    drive: "22–28 minute",
    approach: "east on Route 46 from the Boonton line",
    intro:
      "Lincoln Park sits where the Pompton and Passaic rivers meet, a borough of ballfields and a small airport at the edge of the Morris County line. Route 46 runs right to it, so the drive to our lot is basically one straight road east for about 25 minutes.",
  },
  {
    slug: "pequannock",
    city: "Pequannock",
    state: "NJ",
    county: "Morris County",
    miles: 14,
    drive: "25–30 minute",
    approach: "east on Route 23 to Route 46",
    intro:
      "Pequannock Township, up around Pompton Plains, is a settled suburban stretch of Newark-Pompton Turnpike shops and river-bordered neighborhoods. Take Route 23 down to Route 46 and it's a straightforward half-hour east to our Lodi lot.",
  },
  {
    slug: "parsippany",
    city: "Parsippany",
    state: "NJ",
    county: "Morris County",
    miles: 18,
    drive: "30–40 minute",
    approach: "east on Route 46 or I-80",
    intro:
      "Parsippany-Troy Hills is a sprawling township of office parks, hotels, and lake communities where Routes 46, 80, and 287 all cross. It's the farthest Morris County town we list — about 35 minutes east on Route 46 or I-80 — but a lot of people who work near us live out there.",
  },

  // ---------------- Rockland County, NY ----------------
  {
    slug: "suffern",
    city: "Suffern",
    state: "NY",
    county: "Rockland County",
    miles: 18,
    drive: "28–35 minute",
    approach: "south on Route 17 / the Thruway",
    intro:
      "Suffern sits right at the New York line where the Thruway meets Route 17, a walkable village with a working downtown at the foot of the mountains. Route 17 runs south straight to our part of Bergen County — about half an hour, and worth it for a car that's priced honestly.",
  },
  {
    slug: "pearl-river",
    city: "Pearl River",
    state: "NY",
    county: "Rockland County",
    miles: 15,
    drive: "25–32 minute",
    approach: "south on Middletown Road to Route 304 and the Parkway",
    intro:
      "Pearl River is a hamlet just over the border with a strong Irish-American streak and a lively Main Street. It's a short cross-border trip down through Montvale and Park Ridge, roughly 25 to 30 minutes to our Lodi lot.",
  },
  {
    slug: "nyack",
    city: "Nyack",
    state: "NY",
    county: "Rockland County",
    miles: 16,
    drive: "28–35 minute",
    approach: "south on Route 9W and the Palisades Parkway",
    intro:
      "Nyack is the artsy river town at the western foot of the Tappan Zee, all galleries, antique shops, and Hudson views. The drive down the Palisades Parkway and into Bergen County takes about half an hour, and we get a handful of Rockland buyers who'd rather deal with a small lot than a big-box dealer.",
  },
  {
    slug: "spring-valley",
    city: "Spring Valley",
    state: "NY",
    county: "Rockland County",
    miles: 17,
    drive: "28–35 minute",
    approach: "south on Route 59 to Route 17",
    intro:
      "Spring Valley is a dense, diverse village in the middle of Rockland County, a transit and shopping hub for the towns around it. Route 59 to Route 17 brings you south across the state line to Lodi in a little over half an hour.",
  },
];

export const REGIONS = [
  "Bergen County",
  "Passaic County",
  "Hudson County",
  "Essex County",
  "Morris County",
  "Rockland County",
] as const;

export function areasByRegion(): { region: string; areas: ServiceArea[] }[] {
  return REGIONS.map((region) => ({
    region: region === "Rockland County" ? "Rockland County, NY" : region,
    areas: SERVICE_AREAS.filter((a) => a.county === region).sort((x, y) =>
      x.city.localeCompare(y.city),
    ),
  })).filter((g) => g.areas.length > 0);
}

export function getArea(slug: string): ServiceArea | undefined {
  return SERVICE_AREAS.find((a) => a.slug === slug);
}

/** Deterministic per-city slice of inventory so no two pages are identical. */
export function vehiclesForCity(
  slug: string,
  vehicles: Vehicle[],
  count = 8,
): Vehicle[] {
  if (vehicles.length === 0) return [];
  let h = 2166136261;
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const start = (h >>> 0) % vehicles.length;
  return Array.from(
    { length: Math.min(count, vehicles.length) },
    (_, i) => vehicles[(start + i) % vehicles.length],
  );
}

export const directionsUrl = (area: ServiceArea) =>
  `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
    `${area.city}, ${area.state}`,
  )}&destination=${encodeURIComponent(LOT_MAPS_QUERY)}`;
