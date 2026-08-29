/**
 * Blog content for Bergen Car Company. Written to actually help someone buying
 * or keeping a used car in North Jersey — not keyword filler. Structure is
 * templated; the words are specific.
 *
 * Paragraph / list / callout text may contain inline [label](/href) links,
 * parsed by the post renderer.
 */

export type BlogCategory =
  | "Buying Tips"
  | "Financing"
  | "Maintenance"
  | "Local";

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "callout"; title: string; text: string };

export type BlogAuthor = { name: string; role: string; initials: string };

export type BlogPost = {
  slug: string;
  title: string;
  category: BlogCategory;
  excerpt: string;
  /** ISO date */
  date: string;
  readMinutes: number;
  author: BlogAuthor;
  image: string;
  featured?: boolean;
  body: BlogBlock[];
};

export const BLOG_CATEGORIES: BlogCategory[] = [
  "Buying Tips",
  "Financing",
  "Maintenance",
  "Local",
];

const GINA: BlogAuthor = {
  name: "Gina Ferrante",
  role: "General Manager",
  initials: "GF",
};
const DENISE: BlogAuthor = {
  name: "Denise Alvarez",
  role: "Financing",
  initials: "DA",
};
const RICH: BlogAuthor = {
  name: "Rich Okafor",
  role: "Shop Foreman",
  initials: "RO",
};
const MARCUS: BlogAuthor = {
  name: "Marcus Bell",
  role: "Sales",
  initials: "MB",
};

const IMG = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=2000&q=70`;

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "reading-a-used-car-history-report",
    title: "How to read a used car's history report — the 6 lines that actually matter",
    category: "Buying Tips",
    excerpt:
      "A vehicle history report is three pages of small print, but only a handful of lines change whether you should buy. Here's what to read first and what to ignore.",
    date: "2026-08-18",
    readMinutes: 8,
    author: GINA,
    image: IMG("photo-1519641471654-76ce0107ad1b"),
    featured: true,
    body: [
      {
        type: "p",
        text: "Every car we sell comes with a free history report, and we hand it to you before you ask. But we've watched plenty of buyers skim the summary box, see a green checkmark, and stop reading. The useful information is further down. Here's the order we read one in.",
      },
      { type: "h2", text: "1. Title brands" },
      {
        type: "p",
        text: "This is the single most important line. A \"clean\" title means the car has never been declared a total loss. A branded title — salvage, rebuilt, flood, lemon-law buyback, junk — means an insurer once decided the car wasn't worth repairing. Branded-title cars can be safe and are much cheaper, but they're hard to finance, hard to insure, and hard to resell. We don't stock them. If a report shows a brand, that's not a negotiation point, it's a different category of purchase.",
      },
      { type: "h2", text: "2. Total-loss and structural-damage records" },
      {
        type: "p",
        text: "Separate from the title brand, look for any mention of \"structural damage,\" \"frame damage,\" or an airbag deployment. A car can have a clean title and still have been in a serious wreck if the owner paid out of pocket. Airbag deployment is a strong signal the impact was significant. Minor cosmetic accidents — a bumper, a fender — are common and usually fine.",
      },
      { type: "h2", text: "3. Odometer readings over time" },
      {
        type: "p",
        text: "The report lists the mileage recorded at each service visit, inspection, and title transfer. Those numbers should only ever go up, and at a believable rate — roughly 10,000 to 15,000 miles a year. A reading that drops, or a five-year gap with almost no miles added, is a rollback flag. This is rare on late-model cars with digital odometers but still worth thirty seconds.",
      },
      { type: "h2", text: "4. Number of owners and length of ownership" },
      {
        type: "p",
        text: "One or two owners over eight years is ideal. Five owners in three years is a car that people kept getting rid of quickly — sometimes bad luck, often not. It's not automatically a dealbreaker, but it's a reason to be thorough on the test drive and the inspection.",
      },
      { type: "h2", text: "5. Service and maintenance history" },
      {
        type: "p",
        text: "A well-documented history of oil changes and scheduled maintenance is genuinely reassuring — it means someone cared. A blank service history doesn't mean the car was neglected; plenty of people use independent shops that don't report. It just means the inspection matters more.",
      },
      { type: "h2", text: "6. Registration location history" },
      {
        type: "p",
        text: "A car registered its whole life in New Jersey or New York has seen road salt but not much else. A car that spent years in the Gulf states after a major hurricane season is worth a closer look for flood evidence — musty smell, corrosion on connectors under the dash, silt in the spare-tire well.",
      },
      {
        type: "callout",
        title: "What we do with all this",
        text: "For every car on our lot, we pull the report, do a 150-point mechanical inspection, and put both in the folder you get with the car. If something on the report needs explaining, we'd rather explain it up front than have you find it later.",
      },
      {
        type: "p",
        text: "If you're shopping elsewhere and a seller won't show you a history report, that's your answer. Walk. And if you want a second set of eyes on one, bring it to us at the [Lodi lot](/service-areas) — we'll read it with you, no obligation.",
      },
    ],
  },
  {
    slug: "what-adds-to-used-car-price-new-jersey",
    title: "What actually gets added to a used car's price at signing in New Jersey",
    category: "Buying Tips",
    excerpt:
      "The number on the window isn't the number you drive away paying. Here's every legitimate line item in a New Jersey used-car deal — and the ones that shouldn't be there.",
    date: "2026-08-04",
    readMinutes: 6,
    author: MARCUS,
    image: IMG("photo-1621007947382-bb3c3994e3fb"),
    body: [
      {
        type: "p",
        text: "\"Plus tax and fees\" is doing a lot of work in most car ads. In New Jersey, the legitimate additions are short and predictable. Anything beyond this list is worth a hard question.",
      },
      { type: "h2", text: "The four things that are always there" },
      {
        type: "ul",
        items: [
          "Sales tax — 6.625% of the sale price statewide (a few Urban Enterprise Zones are half that, but not Lodi). If you trade a car in, you only pay tax on the difference, which is often the biggest reason a trade beats a private sale.",
          "Title fee — a flat state charge, currently $60 for a standard title, $85 if there's a lien from your lender.",
          "Registration — based on the vehicle's weight and model year; typically $60 to $85 for a used passenger car, for the first term.",
          "Documentary (\"doc\") fee — the dealer's charge for preparing and filing the paperwork. New Jersey does not cap this, so it varies a lot between dealers. Ours is $499 and it's printed on every listing.",
        ],
      },
      { type: "h2", text: "The things that shouldn't be there" },
      {
        type: "p",
        text: "A \"prep fee,\" \"reconditioning fee,\" \"dealer prep,\" or \"lot fee\" on a used car is the dealer charging you to get the car ready to sell — which is their cost of doing business, not yours. A mandatory paint sealant, nitrogen in the tires, or an alarm you didn't ask for are add-on profit. You can decline all of it, and if a dealer says you can't, that tells you something about the dealer.",
      },
      {
        type: "callout",
        title: "One car, one price",
        text: "Our rule is that the price you see online is the selling price. Tax, title, registration, and the $499 doc fee get added — nothing else, and no add-on is a condition of the sale.",
      },
      { type: "h2", text: "How to check the math before you sign" },
      {
        type: "p",
        text: "Ask for the buyer's order (the itemized breakdown) and read every line. Selling price plus 6.625% tax on the taxable amount, plus title, plus registration, plus the doc fee, should equal the total. If there's a line you don't recognize, ask what it is and whether you can remove it. A straight answer is a good sign. For a rough monthly figure before you're in the chair, the [financing page](/financing) has a payment estimator.",
      },
    ],
  },
  {
    slug: "soft-pull-vs-hard-pull-car-loan",
    title: "Soft pull vs. hard pull: what a credit check for a car loan really does",
    category: "Financing",
    excerpt:
      "Getting pre-qualified and getting approved touch your credit differently. Knowing which is which lets you shop rates without a pile of inquiries.",
    date: "2026-07-21",
    readMinutes: 6,
    author: DENISE,
    image: IMG("photo-1638618164682-12b986ec2a75"),
    body: [
      {
        type: "p",
        text: "The fear that \"checking my rate will hurt my credit\" keeps people from shopping around, which is exactly backwards — shopping around is how you get a better rate. Here's what's actually happening to your credit at each step.",
      },
      { type: "h2", text: "A soft pull: pre-qualification" },
      {
        type: "p",
        text: "When you get pre-qualified — including through our form — the lender does a soft inquiry. It shows them enough to estimate a rate and payment. It does not affect your score, and no other lender or creditor can see it. You can do this as many times, at as many dealers, as you want, with zero cost to your credit.",
      },
      { type: "h2", text: "A hard pull: the actual application" },
      {
        type: "p",
        text: "When you decide to move forward on a specific car and submit a real credit application, that's a hard inquiry. It can knock a few points off your score temporarily — usually less than five — and it stays on your report for two years, though it only factors into your score for one.",
      },
      { type: "h2", text: "The rate-shopping window" },
      {
        type: "p",
        text: "This is the part people don't know: the credit bureaus expect you to shop for one car loan at several lenders. Multiple auto-loan hard inquiries within a short window — 14 days on older scoring models, up to 45 on newer ones — are counted as a single inquiry for scoring purposes. So applying to a dozen lenders through one dealer on one day costs you the same as applying to one.",
      },
      {
        type: "callout",
        title: "How we handle it",
        text: "We run a soft pull to pre-qualify you and show you a payment range. Only when you pick a car and say go do we submit one application to our lender network — all at once, inside that shopping window, so it lands as one inquiry.",
      },
      { type: "h2", text: "What actually moves your score" },
      {
        type: "p",
        text: "Payment history and how much of your available credit you're using matter far more than an inquiry or two. If your score is on a bubble between rate tiers, paying down a credit card before you apply will do more for your rate than avoiding a single hard pull. When you're ready, the [pre-qualification form](/financing) is the soft-pull version.",
      },
    ],
  },
  {
    slug: "should-you-put-money-down-used-car",
    title: "Should you put money down on a used car? The actual numbers",
    category: "Financing",
    excerpt:
      "More down means a lower payment — everyone knows that. What's less obvious is how a down payment protects you from being stuck if life changes.",
    date: "2026-07-07",
    readMinutes: 7,
    author: DENISE,
    image: IMG("photo-1560958089-b8a1929cea89"),
    body: [
      {
        type: "p",
        text: "\"Zero down\" is a real option for a lot of buyers, and sometimes it's the right one. But before you take it, it's worth understanding what a down payment is actually buying you beyond a smaller monthly number.",
      },
      { type: "h2", text: "The payment math" },
      {
        type: "p",
        text: "On a $20,000 car financed for 72 months at 8%, every $1,000 you put down cuts the payment by about $17. So $3,000 down is roughly $50 a month. That's real, but it's not dramatic — and you've handed over $3,000 you might have wanted for something else.",
      },
      { type: "h2", text: "The part that matters more: being upside down" },
      {
        type: "p",
        text: "A used car depreciates fastest in the first year or two of your ownership, and a long loan pays down principal slowly at the start. With nothing down on a 72-month loan, you can owe more than the car is worth for the first two to three years. If the car gets totaled or you need to sell during that window, you're writing a check to your lender for a car you no longer have.",
      },
      {
        type: "ul",
        items: [
          "A down payment of 10–15% usually keeps you close to even from day one.",
          "If you go zero-down on a long term, gap insurance (which covers the difference if the car is totaled) is worth the small monthly cost.",
          "A shorter loan — 48 or 60 months instead of 72 — builds equity faster and costs less in total interest, at the price of a higher payment.",
        ],
      },
      { type: "h2", text: "When zero down makes sense" },
      {
        type: "p",
        text: "If you have stable income, an emergency fund you don't want to touch, and you plan to keep the car well past the loan payoff, financing the whole thing and keeping your cash can be a reasonable call — especially if your rate is low. The risk is real only if you might need to get out of the car early.",
      },
      {
        type: "callout",
        title: "Run your own scenario",
        text: "The [financing page](/financing) has a slider that shows the payment at different prices, down payments, and terms. Move it around before you talk to anyone — it takes the mystery out of the conversation.",
      },
    ],
  },
  {
    slug: "pre-test-drive-checklist-used-car",
    title: "The 10-minute checklist before you even start a used car",
    category: "Buying Tips",
    excerpt:
      "Most of what a used car is hiding, you can spot in the parking lot before the test drive. Here's the walk-around we do on every car that comes through our door.",
    date: "2026-06-23",
    readMinutes: 7,
    author: RICH,
    image: IMG("photo-1517524008697-84bbe3c3fd98"),
    body: [
      {
        type: "p",
        text: "A test drive tells you how a car feels. A careful walk-around before you turn the key tells you how it's been treated. Do this in daylight, and don't let anyone rush you.",
      },
      { type: "h2", text: "Start with it cold" },
      {
        type: "p",
        text: "Ask that the car not be warmed up before you get there. A cold start is when problems show themselves — rough idle, blue or white smoke that doesn't clear, a check-engine light that a warm restart would have hidden, a battery that struggles. If the hood is warm when you arrive, come back another day.",
      },
      { type: "h2", text: "Tires tell you a lot" },
      {
        type: "ul",
        items: [
          "All four should match — same brand, same model, similar tread depth. Four different tires means corners were cut.",
          "Uneven wear across a single tire (worn on one edge) points to alignment or worn suspension.",
          "Check the date code — the last four digits of the DOT number on the sidewall are the week and year. Tires over six years old are due regardless of tread.",
        ],
      },
      { type: "h2", text: "Panel gaps and paint" },
      {
        type: "p",
        text: "Sight down each side of the car. The gaps between the hood, doors, and fenders should be even. A gap that's tight on one side and wide on the other, or paint that doesn't quite match between panels, means bodywork — not always serious, but a reason to check the history report and look underneath for a repainted or replaced structural piece.",
      },
      { type: "h2", text: "Under the hood, without tools" },
      {
        type: "ul",
        items: [
          "Pull the oil dipstick: the oil should be light-to-amber and not gritty. Milky or foamy oil is a serious flag.",
          "Look at the coolant reservoir — the fluid should be clean orange, green, or pink, not brown or oily.",
          "Scan for obvious leaks, corrosion on the battery terminals, and any hose that's cracked or bulging.",
        ],
      },
      { type: "h2", text: "Sit inside and run everything" },
      {
        type: "p",
        text: "Every window, the AC on max cold, the heat, every seat adjustment, the infotainment screen, the backup camera, both key fobs. Electrical gremlins are expensive and hard to diagnose. It's much better to find them now.",
      },
      {
        type: "callout",
        title: "You can borrow our lift",
        text: "Anything you buy from us has already been through this and a full mechanical inspection. If you're buying elsewhere, you're welcome to bring the car to our [Lodi shop](/service) for a pre-purchase inspection before you commit.",
      },
    ],
  },
  {
    slug: "how-often-oil-change",
    title: "How often does your car actually need an oil change?",
    category: "Maintenance",
    excerpt:
      "The \"every 3,000 miles\" rule is decades out of date for most cars. Here's how to find your real interval — and why North Jersey driving pushes it shorter.",
    date: "2026-06-09",
    readMinutes: 6,
    author: RICH,
    image: IMG("photo-1486262715619-67b85e0b08d3"),
    body: [
      {
        type: "p",
        text: "The 3,000-mile oil change was good advice in 1985. Modern engines and modern synthetic oil have moved the number way out — but not as far as some dealers' \"just follow the dashboard light\" would have you believe, especially given how most people around here actually drive.",
      },
      { type: "h2", text: "Start with the manual, not the shop" },
      {
        type: "p",
        text: "Your owner's manual lists a normal interval and a severe-service interval. For most cars built in the last fifteen years, normal is 7,500 to 10,000 miles on full synthetic. Severe service is usually 3,000 to 5,000. The manual, not a sticker on your windshield, is the authority.",
      },
      { type: "h2", text: "Why most Bergen County driving is \"severe\"" },
      {
        type: "p",
        text: "\"Severe service\" sounds like off-roading, but the manufacturer's definition is mostly about short trips and stop-and-go. If your typical drive is under ten miles, in traffic, with the engine never fully warming up — the commute down Route 46 or into the city — you're in the severe category. Short trips let moisture and fuel dilute the oil, and it breaks down faster.",
      },
      {
        type: "ul",
        items: [
          "Mostly short, cold, stop-and-go trips: change synthetic every 5,000 miles.",
          "Mix of highway and local, trips usually over 20 minutes: 7,500 miles is fine.",
          "Mostly highway miles: you can run to the manual's full normal interval.",
        ],
      },
      { type: "h2", text: "Don't skip the other stuff on the ticket" },
      {
        type: "p",
        text: "An oil change is also when someone should be checking your tire tread and pressure, topping off washer fluid, eyeballing the brakes, and looking for leaks. That's legitimate and useful. What's not legitimate is a $400 \"engine flush\" or \"fuel system service\" pushed on a car that doesn't need it.",
      },
      {
        type: "callout",
        title: "We keep the old filter",
        text: "When our shop does your oil, we'll show you the old filter and tell you honestly how the rest of the car looks. \"Everything's fine, see you in 5,000\" is a sentence we say most days.",
      },
    ],
  },
  {
    slug: "new-jersey-inspection-without-overpaying",
    title: "Getting your car through New Jersey inspection without overpaying",
    category: "Maintenance",
    excerpt:
      "NJ inspection is free at a state station and mostly about emissions. Knowing what it checks — and what makes cars fail — saves you money and a second trip.",
    date: "2026-05-19",
    readMinutes: 6,
    author: RICH,
    image: IMG("photo-1605893477799-b99e3b8b93fe"),
    body: [
      {
        type: "p",
        text: "New Jersey stopped doing the full safety inspection years ago. For most passenger cars, inspection now is an emissions test plus a check that your lights, horn, and windows work and your VIN matches. Newer cars are tested through the onboard computer (OBD-II); there's no tailpipe probe.",
      },
      { type: "h2", text: "The number-one reason cars fail: the check-engine light" },
      {
        type: "p",
        text: "If your check-engine light is on, the car fails, full stop — the inspector can't clear it. Get the code read (many parts stores do it free, or we will), fix the underlying issue, and drive it long enough for the computer to re-run its self-tests before you go back.",
      },
      { type: "h2", text: "The trap: not-ready monitors" },
      {
        type: "p",
        text: "If you've recently had the battery disconnected or the codes cleared, the car's emissions \"readiness monitors\" reset and need a mix of city and highway driving over several days to complete. Show up before they're done and the car isn't failed exactly, but it's rejected as \"not ready\" and you make another trip. If you're planning to replace a battery, do it a week before inspection, not the day before.",
      },
      {
        type: "ul",
        items: [
          "Free at any state inspection station; private licensed shops may charge a fee for the same test.",
          "A failed car gets a free re-test within a set window — you don't pay again to come back after a repair.",
          "You do not need to buy a \"pre-inspection\" service. If you want peace of mind, a quick code scan is enough.",
        ],
      },
      {
        type: "callout",
        title: "Inspection prep, honestly",
        text: "Our shop will scan your car and tell you plainly whether it'll pass and what, if anything, actually needs doing first. We're not going to invent work to get you through a test the state runs for free.",
      },
    ],
  },
  {
    slug: "winter-car-prep-north-jersey",
    title: "Winter prep for your car in North Jersey",
    category: "Maintenance",
    excerpt:
      "A cold snap finds every weak spot in a car. Twenty minutes in November saves you a no-start in a parking lot in January.",
    date: "2026-05-05",
    readMinutes: 6,
    author: RICH,
    image: IMG("photo-1533473359331-0135ef1b58bf"),
    body: [
      {
        type: "p",
        text: "Our winters here aren't Minnesota, but we get enough single-digit mornings, road salt, and hilly side streets to make a little preparation worth it. None of this requires a shop.",
      },
      { type: "h2", text: "Test the battery, don't guess" },
      {
        type: "p",
        text: "Car batteries last three to five years, and cold is what kills a marginal one. If yours is over three years old, have it load-tested — most shops, including ours, do it free in a few minutes. A battery that's fine in October can leave you stranded at 15°F.",
      },
      { type: "h2", text: "Tires: tread and pressure" },
      {
        type: "p",
        text: "Tire pressure drops about 1 PSI for every 10°F the temperature falls, so a tire that was fine in September can be noticeably low by December. Check it on a cold morning and set it to the number on the doorjamb sticker, not the number on the tire. For tread, the quarter test: insert a quarter into the groove with Washington's head down — if you can see the top of his head, you're near the wear limit and won't have much grip on snow.",
      },
      { type: "h2", text: "Winter tires vs. all-seasons" },
      {
        type: "p",
        text: "For most people commuting on plowed main roads, a good all-season is fine. If you're on the hills — parts of Montclair, North Arlington, or across the line toward Nyack — and you drive in weather, a set of dedicated winter tires is a genuine safety upgrade, not a luxury. They're worth it more for stopping and steering on cold pavement than for deep snow.",
      },
      {
        type: "ul",
        items: [
          "Top off washer fluid with a formula rated to at least 0°F, and carry a spare jug.",
          "Replace wiper blades that streak — they're cheap and you'll want them.",
          "Keep a scraper, gloves, a flashlight, and a small bag of sand or kitty litter in the trunk.",
          "If you park outside, a squirt of silicone spray on the door gaskets keeps them from freezing shut.",
        ],
      },
      {
        type: "callout",
        title: "Free battery and tire check",
        text: "Bring the car by the [Lodi shop](/service) before the first freeze. We'll test the battery, check your tread and pressures, and tell you what — if anything — is worth doing. No appointment needed for that.",
      },
    ],
  },
  {
    slug: "first-car-for-a-teenager",
    title: "Buying a first car for a teenager: what we tell our own families",
    category: "Buying Tips",
    excerpt:
      "The instinct is to buy the cheapest thing that runs. A little more thought about size, safety tech, and insurance cost pays off fast.",
    date: "2026-04-21",
    readMinutes: 7,
    author: GINA,
    image: IMG("photo-1619767886558-efdc259cde1a"),
    body: [
      {
        type: "p",
        text: "We sell a lot of first cars, and parents ask us what we'd put our own kids in. The honest answer isn't a specific model — it's a set of priorities, in this order.",
      },
      { type: "h2", text: "Reliability over everything" },
      {
        type: "p",
        text: "A new driver does not need a project. A boring, well-maintained Corolla, Civic, CR-V, or Mazda3 that starts every morning is worth more than a flashier car that spends weekends at a shop. Check that the maintenance is current and the history is clean; a slightly higher price for a car that's been looked after is money well spent.",
      },
      { type: "h2", text: "Size and visibility" },
      {
        type: "p",
        text: "Very small cars protect their occupants less in a crash; very large SUVs and trucks are harder for an inexperienced driver to place, park, and stop. A compact sedan or a small crossover is the sweet spot — big enough to be safe, small enough to be manageable, with good outward visibility and a not-overwhelming amount of power.",
      },
      { type: "h2", text: "The safety features that matter" },
      {
        type: "ul",
        items: [
          "Electronic stability control — standard on everything from the 2012 model year on, and a genuine life-saver for a new driver.",
          "Side curtain airbags — check that the specific car has them; on older cars they were sometimes optional.",
          "A backup camera — standard on 2018-and-newer, and it prevents the most common low-speed parking-lot incidents.",
          "Automatic emergency braking, if you can find it in budget — increasingly common on 2019-and-newer and worth seeking out.",
        ],
      },
      { type: "h2", text: "Check the insurance quote before you buy" },
      {
        type: "p",
        text: "Adding a teen driver is expensive no matter what, but the car changes the number a lot. A sporty trim, a turbo, or a two-door can cost meaningfully more to insure than a base sedan. Get a real quote on the specific car — VIN and all — before you commit, not after.",
      },
      {
        type: "callout",
        title: "We'll help you narrow it down",
        text: "Tell us the budget and we'll pull the cars on the lot that fit these priorities, run the history on each, and let your new driver take a few around the block. No pressure, and no upselling a nervous parent.",
      },
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function sortedPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date));
}

export function featuredPost(): BlogPost {
  return BLOG_POSTS.find((p) => p.featured) ?? sortedPosts()[0];
}

export function relatedPosts(post: BlogPost, count = 3): BlogPost[] {
  const sameCat = sortedPosts().filter(
    (p) => p.slug !== post.slug && p.category === post.category,
  );
  const rest = sortedPosts().filter(
    (p) => p.slug !== post.slug && p.category !== post.category,
  );
  return [...sameCat, ...rest].slice(0, count);
}

/** Kebab-case anchor id for an h2, for the table of contents. */
export function headingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
