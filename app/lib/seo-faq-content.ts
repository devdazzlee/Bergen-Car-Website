import type { Faq } from "../components/seo-faq";
import type { ServiceArea } from "./service-areas";
import type { VehicleCategory } from "./vehicle-categories";

export type SeoBlock = {
  heading: string;
  kicker?: string;
  intro: string[];
  faqs: Faq[];
};

/** Bottom-of-page SEO + FAQ block for vehicle category landing pages. */
export function categorySeo(c: VehicleCategory): SeoBlock {
  const label = c.name.replace(/^Used /, "").toLowerCase();
  return {
    heading: `Buying ${label} at Bergen Car Company`,
    kicker: c.navLabel,
    intro: [
      ...c.body,
      "Every vehicle is inspected on our own lift, priced on the window, and sold with a [3-month / 3,000-mile warranty](/warranty). You can [get pre-qualified](/financing) online, value your [trade-in](/trade), and [schedule a test drive](/test-drive) before you visit our Lodi showroom.",
    ],
    faqs: categoryFaqs(c),
  };
}

function categoryFaqs(c: VehicleCategory): Faq[] {
  const label = c.name.replace(/^Used /, "");
  const short = c.navLabel.toLowerCase();

  const shared: Faq[] = [
    {
      q: `Do you have ${short} in stock right now?`,
      a: `Inventory changes weekly. The vehicles listed above are what we have on the lot today — filter by price, mileage, and year, or call (973) 555-0142 and we'll confirm availability on any ${label.toLowerCase()} you're interested in.`,
    },
    {
      q: "Are the online prices the real prices?",
      a: "Yes. The price shown is the selling price. New Jersey sales tax, title, registration, and one $499 documentary fee are added at signing — that's the entire list. No prep fee and no mandatory add-ons.",
    },
    {
      q: "Can I finance a purchase at Bergen Car Company?",
      a: "Yes. Our [pre-qualification form](/financing) uses a soft credit check that won't affect your score, and we work with about a dozen lenders for strong, rebuilding, and first-time credit.",
    },
    {
      q: "Can I trade in my current car?",
      a: "Yes. Use [Value your trade](/trade) for a written same-day offer — trade it toward your purchase or take the check with no obligation to buy from us.",
    },
    {
      q: "Can I test-drive before I buy?",
      a: "Absolutely. [Schedule a test drive](/test-drive) online and we'll have the car up front with plates on when you arrive at 412 Route 46 in Lodi.",
    },
  ];

  const byGroup: Record<VehicleCategory["group"], Faq> = {
    "Body type": {
      q: `What should I look for when buying a used ${short.slice(0, -1) || short}?`,
      a: `Compare mileage, service history, safety features, and total ownership cost — not just the monthly payment. Every car here gets a 150-point inspection and a vehicle history report. Ask for either on any ${label.toLowerCase()} you're considering.`,
    },
    "Vans & work": {
      q: `Can I use a ${label.toLowerCase()} for my business?`,
      a: "Many of our commercial and fleet vehicles are suited to contracting, delivery, and transportation work. Tell us your payload, seating, or towing needs and we'll help you compare what's on the lot.",
    },
    Fuel: {
      q: `What should I know about owning a used ${short.slice(0, -1) || short}?`,
      a: `Ask about battery health, estimated range, charging or fuel economy, and maintenance history. Our technicians inspect every unit on the lift and can walk you through what to expect for daily driving in North Jersey.`,
    },
    Premium: {
      q: `Are your ${label.toLowerCase()} inspected differently?`,
      a: "Every luxury vehicle gets the same 150-point mechanical and safety inspection as the rest of our inventory, plus a closer look at electronics, driver-assistance systems, and interior wear. History reports are available on request.",
    },
  };

  return [byGroup[c.group], ...shared];
}

/* Intros and answers may use inline [label](/href) links — rendered as anchors
 * in the page and stripped to plain text for the FAQ structured data. */

export const HOME_SEO: SeoBlock = {
  heading: "Used cars in Lodi, NJ — the short version",
  kicker: "About Bergen Car Company",
  intro: [
    "Bergen Car Company is a family-owned used car dealership at 412 Route 46 in Lodi, New Jersey, run by the Ferrante family since 2008. Every car in our [inventory](/inventory) is inspected on our own lift, priced on the window with no surprise add-ons, and sold with a 3-month / 3,000-mile [warranty](/warranty).",
    "We handle the whole purchase in one place: [financing](/financing) across about a dozen lenders for any credit situation, a fair written offer on your [trade-in](/trade) or an [outright purchase](/sell) of your car, and a [service shop](/service) that looks after any make afterward. You can [schedule a test drive](/test-drive), check this month's [specials](/specials), or read what customers say in our [reviews](/reviews).",
    "Most of our buyers come from Bergen, Passaic, Hudson, and Essex counties — see the town-by-town details on our [service areas](/service-areas) page, or browse every question we get on the [FAQ](/faq).",
  ],
  faqs: [
    {
      q: "Where is Bergen Car Company located?",
      a: "At 412 Route 46 in Lodi, New Jersey 07644, in Bergen County, on the eastbound side. Showroom hours are Monday–Friday 9 AM–8 PM, Saturday 9 AM–6 PM, and Sunday 11 AM–4 PM. Call or text (973) 555-0142.",
    },
    {
      q: "Are the online prices the real out-the-door prices?",
      a: "The price shown is the selling price. New Jersey sales tax, title, registration, and one $499 documentary fee are added at signing — that's the entire list. No prep fee, no mandatory add-ons. See [this month's specials](/specials) for current markdowns.",
    },
    {
      q: "Do you help with financing and bad credit?",
      a: "Yes. Our [pre-qualification form](/financing) uses a soft credit check that won't affect your score, and we work with lenders for strong, rebuilding, and first-time credit. No Social Security number is needed to get a payment range.",
    },
    {
      q: "Can I sell or trade my car without buying one?",
      a: "Yes. Use [Value your trade](/trade) if you're shopping with us, or [Sell your car](/sell) to sell it outright with no purchase required. Both get you a written same-day offer.",
    },
    {
      q: "Do you service cars you didn't sell?",
      a: "Yes. The [service shop](/service) is open to everyone, any make or model, with a written estimate before any work starts.",
    },
  ],
};

export const INVENTORY_SEO: SeoBlock = {
  heading: "Buying a used car at Bergen Car Company",
  intro: [
    "Every vehicle in our Lodi [inventory](/inventory) is a used car we've bought, inspected on our own lift, and priced against the current North Jersey market. The number you see online is the selling price — New Jersey sales tax, title, registration, and a $499 documentary fee are the only additions, and no dealer add-on is a condition of the sale.",
    "You can line up [financing](/financing) before you visit, get a written value on your [trade-in](/trade), and [book a test drive](/test-drive) so the car is up front with plates on. Every car also includes a [3-month / 3,000-mile warranty](/warranty).",
    "Stock changes constantly. If the car you want has sold, tell us what you were after and we'll watch the auctions for the next one — or check the [specials](/specials) page for current price drops.",
  ],
  faqs: [
    {
      q: "Are the prices on the website the real prices?",
      a: "Yes. The price shown is the selling price. New Jersey tax, title, registration, and one $499 documentary fee are added at signing — that's the entire list. There is no prep fee, no mandatory warranty, and no market adjustment.",
    },
    {
      q: "Can I see the inspection and history report before I come in?",
      a: "Yes. Every car gets a 150-point mechanical and safety inspection by our technicians, and a vehicle history report is pulled. Ask for either on any car you're considering and we'll send it over. Our [blog post on reading a history report](/blog/reading-a-used-car-history-report) explains what to look for.",
    },
    {
      q: "Do you negotiate on price?",
      a: "A little, not a lot. We price each car close to the market on the way in, so there isn't a big padded margin. If you have a genuine reason the number should be lower — a real repair we missed, a comparable listing — bring it and we'll look.",
    },
    {
      q: "Can you hold a car for me?",
      a: "Yes, with a refundable deposit we'll hold a vehicle for up to 48 hours while you arrange financing or a [test drive](/test-drive). If you decide against it, the deposit comes back — no questions.",
    },
    {
      q: "Can my mechanic inspect the car first?",
      a: "Absolutely, and we encourage it. Take the car to any shop you trust before you buy, and we'll give you our inspection report to compare notes.",
    },
  ],
};

export const SERVICE_SEO: SeoBlock = {
  heading: "Service and repair for any make in Lodi",
  intro: [
    "Bergen Car Company's [service shop](/service) is open to everyone, whether you bought your car from us or not, and works on any make or model. The technicians who inspect our [inventory](/inventory) are the same people who look after your car.",
    "You get a written estimate — parts, labor, and time — before any work begins, and nothing is done without your approval. Our guides on [oil-change intervals](/blog/how-often-oil-change) and [New Jersey inspection](/blog/new-jersey-inspection-without-overpaying) go deeper on the routine stuff.",
  ],
  faqs: [
    {
      q: "Can you service a car I didn't buy from you?",
      a: "Yes. The shop is open to everyone, any make or model. You do not need to have bought the car here.",
    },
    {
      q: "Will you push work I don't actually need?",
      a: "No. You get a written estimate before anything starts, we call before touching anything not on your list, and we keep the old parts so you can see what came off. \"That can wait another six months\" is a sentence our techs say often.",
    },
    {
      q: "Do you do New Jersey state inspection?",
      a: "We do inspection prep and any repairs needed to pass. We'll check the car over, tell you honestly whether it will pass as-is, and only recommend what's actually required.",
    },
    {
      q: "What are the service department hours?",
      a: "Monday to Friday 7:30 AM to 6:00 PM, Saturday 8:00 AM to 3:00 PM, closed Sunday. The service desk opens earlier than the showroom so you can drop a car before work.",
    },
    {
      q: "How much do common jobs cost?",
      a: "Typical ranges: oil and filter $45–$95, tire rotation $30–$45, front brakes $260–$420 per axle, battery installed $180–$320, check-engine diagnosis $95–$140 (credited toward the repair if you have us do it). Your car is quoted in writing before we start.",
    },
  ],
};

export const SPECIALS_SEO: SeoBlock = {
  heading: "How our specials work",
  intro: [
    "The [specials](/specials) page lists real price reductions on used cars currently on our Lodi lot, plus the financing rate and down-payment offers we can get right now. A crossed-out \"was\" price is our own earlier advertised price for that exact car — never a manufacturer MSRP or an invented figure.",
    "We refresh the page at the start of each month. There are no countdown timers and no \"only one left\" claims. When a special isn't the right fit, the full [inventory](/inventory) is always priced up front too, and you can [get pre-qualified](/financing) to see your real rate.",
  ],
  faqs: [
    {
      q: "Is the \"was\" price a real price?",
      a: "Yes. It's the price we had advertised on that specific vehicle earlier. It is not a manufacturer MSRP, a competitor's price, or a number inflated to make the discount look bigger.",
    },
    {
      q: "Why is a particular car marked down?",
      a: "Usually one of three reasons: it has been on the lot longer than we'd like, we bought it below market and are passing that along, or a newer arrival made it redundant. It is not because something is wrong with it — the inspection report is on every listing.",
    },
    {
      q: "Can I combine a price markdown with a financing special?",
      a: "Not always. When the two can't be combined, we calculate both and give you whichever comes out better for you.",
    },
    {
      q: "How often are specials updated?",
      a: "At the start of each month. A marked-down car keeps its price until it sells.",
    },
  ],
};

export const TESTDRIVE_SEO: SeoBlock = {
  heading: "Test drives at Bergen Car Company",
  intro: [
    "Booking a [test drive](/test-drive) takes about a minute: pick a car from the [inventory](/inventory), pick a time, and the keys and plates are ready when you arrive at 412 Route 46 in Lodi. Booking one is not a commitment to buy anything.",
    "A valid driver's license is the only thing you need to bring — our dealer policy covers the insurance. If you want a payment figure first, [get pre-qualified](/financing) with a soft credit check, and bring your current car if you'd like a [trade-in](/trade) value while you're here.",
  ],
  faqs: [
    {
      q: "Do I have to buy the car if I test drive it?",
      a: "No. A test drive is a test drive. Nobody here works on a commission-only plan, so \"I want to think about it\" is a normal thing for us to hear.",
    },
    {
      q: "What do I need to bring?",
      a: "A valid driver's license. That's the whole list — we make a copy, you drive, and the plates go on before you pull out.",
    },
    {
      q: "Can I drive more than one car?",
      a: "Please do. Back-to-back is the best way to feel the difference. Tell us what you're deciding between and we'll have both ready.",
    },
    {
      q: "Can I bring my family?",
      a: "Yes, and bring the car seats too — a test drive is the best way to check they fit across the back. There's seating out front if someone would rather wait.",
    },
  ],
};

export const CONTACT_SEO: SeoBlock = {
  heading: "Reaching Bergen Car Company",
  intro: [
    "Bergen Car Company is at 412 Route 46, Lodi, New Jersey 07644. You can call or text (973) 555-0142, email the department you need, or just stop by — no appointment is required. See the [service areas](/service-areas) page for directions from your town.",
    "During business hours a real person usually replies within about 15 minutes. Showroom hours are Monday to Friday 9 AM to 8 PM, Saturday 9 AM to 6 PM, and Sunday 11 AM to 4 PM. For quick answers, the [FAQ](/faq) covers most of what people ask.",
  ],
  faqs: [
    {
      q: "Do I need an appointment to visit?",
      a: "No. Walk-ins are welcome any time the showroom is open. Booking a [test drive](/test-drive) just means the specific car is up front with plates on when you arrive.",
    },
    {
      q: "How fast will someone get back to me?",
      a: "During business hours, usually within about 15 minutes by phone, text, or email. Messages left overnight are answered first thing the next day.",
    },
    {
      q: "Are sales and service the same phone number?",
      a: "The main line is (973) 555-0142. The contact page has direct lines for sales, financing, and service if you want a specific department.",
    },
    {
      q: "Where exactly are you on Route 46?",
      a: "412 Route 46 in Lodi, in Bergen County, on the eastbound side. There's a Get Directions link on the contact page that opens turn-by-turn navigation.",
    },
  ],
};

export const ABOUT_SEO: SeoBlock = {
  heading: "Common questions about Bergen Car Company",
  kicker: "Before you visit",
  intro: [
    "A few quick answers people ask before making the drive to Lodi. For the full picture, see the [inventory](/inventory), the [reviews](/reviews), or the [blog](/blog).",
  ],
  faqs: [
    {
      q: "How long has Bergen Car Company been in business?",
      a: "Since 2008, on the same stretch of Route 46 in Lodi the whole time.",
    },
    {
      q: "Is it really family-owned?",
      a: "Yes. Founder Sal Ferrante still comes in most mornings and does many of the trade appraisals himself; his daughter Gina is the general manager. The people at the counter own the place.",
    },
    {
      q: "What area do you serve?",
      a: "Most customers come from Bergen, Passaic, Hudson, and Essex counties in New Jersey, with a steady number from Morris County and across the line in Rockland County, New York. The [service areas](/service-areas) page has a page for each town.",
    },
  ],
};

export const FINANCING_SEO: SeoBlock = {
  heading: "Used car financing in Lodi, NJ",
  intro: [
    "Bergen Car Company arranges [financing](/financing) in-house by submitting one application to about a dozen lenders — local credit unions, banks, and programs for first-time and credit-rebuilding buyers. Getting [pre-qualified](/financing) uses a soft credit pull that doesn't affect your score, and no Social Security number is needed to see a payment range.",
    "Once you have a number, browse the [inventory](/inventory) knowing your budget, add a [trade-in](/trade) to lower the New Jersey sales tax you pay, and [book a test drive](/test-drive). Our guides on [soft vs. hard credit pulls](/blog/soft-pull-vs-hard-pull-car-loan) and [whether to put money down](/blog/should-you-put-money-down-used-car) go deeper.",
  ],
  faqs: [
    {
      q: "Will getting pre-qualified affect my credit score?",
      a: "No. Pre-qualification uses a soft credit pull that doesn't affect your score and isn't visible to other lenders. A hard inquiry only happens later, on one specific car, and only with your approval.",
    },
    {
      q: "Can I get financed with bad or no credit?",
      a: "Often, yes. Several of our lenders specialize in credit rebuilding and first-time buyers. A discharged bankruptcy or an older repossession doesn't automatically disqualify you.",
    },
    {
      q: "How long does an approval last?",
      a: "Most approvals hold for 30 days. If it lapses while you're deciding, we can usually refresh it with a quick update rather than starting over.",
    },
  ],
};

export const TRADE_SEO: SeoBlock = {
  heading: "Trading in or selling your car near Lodi",
  intro: [
    "Use [Value your trade](/trade) to get a same-day written estimate built from the wholesale auction value, local retail comparables, and our real reconditioning cost — we show all three. Applying a trade toward a car in the [inventory](/inventory) also reduces the New Jersey sales tax you pay on the purchase.",
    "If you just want to sell and aren't shopping with us, use [Sell your car](/sell) instead — same fair offer, no purchase required. Either way you can also [get pre-qualified](/financing) so you know the full picture before you visit.",
  ],
  faqs: [
    {
      q: "Do I have to buy a car to trade one in?",
      a: "No. We'll buy your car outright whether or not you're shopping with us. Buying here just adds the New Jersey trade-in sales-tax savings on top of the offer.",
    },
    {
      q: "How is my trade-in value calculated?",
      a: "From three real figures: today's wholesale value for your exact year, trim, mileage, and condition; what comparable cars sell for near Lodi; and our cost to recondition, inspect, and warranty it. We walk you through each.",
    },
    {
      q: "What if I owe more than the car is worth?",
      a: "That's common. We can usually roll the negative equity into your new financing, and we'll show you exactly how that changes the payment before you agree to anything.",
    },
  ],
};

export const SELL_SEO: SeoBlock = {
  heading: "Sell your car in Lodi with no purchase required",
  intro: [
    "[Sell your car](/sell) to Bergen Car Company outright — bring it in, get a quick inspection and a written offer, and get paid, whether or not you're buying a replacement. If you are shopping with us, [Value your trade](/trade) applies the offer to your next car and lowers the New Jersey sales tax.",
    "We buy most makes and model years, including cars with a loan still on them. Not sure what to expect? The [blog](/blog) and [FAQ](/faq) cover the process in detail.",
  ],
  faqs: [
    {
      q: "Will you buy my car if I'm not buying one from you?",
      a: "Yes. That's exactly what the Sell Your Car process is for — a fair, no-obligation offer with no purchase required.",
    },
    {
      q: "Can you buy a car I still owe money on?",
      a: "Yes. We deal directly with your lender to pay off the loan and settle any positive or negative equity with you.",
    },
    {
      q: "What do I need to bring?",
      a: "The title (or your lender's payoff details), both keys, the registration, and a valid ID. If you can't find the title, we can talk through options.",
    },
  ],
};

export const WARRANTY_SEO: SeoBlock = {
  heading: "The warranty on every car we sell",
  intro: [
    "Every vehicle in our [inventory](/inventory) includes a 3-month / 3,000-mile limited powertrain [warranty](/warranty) at no extra charge — Bergen Car Company pays 100% of the parts and 100% of the labor on a covered failure, with no deductible. Optional extended service contracts are available on most cars.",
    "The window Buyers Guide on each car spells out the coverage as required by the FTC. Our [service shop](/service) handles covered repairs in-house, and you can read real owner experiences in the [reviews](/reviews).",
  ],
  faqs: [
    {
      q: "What does the free warranty cover?",
      a: "The powertrain — engine internals, transmission, drive axle, and the seals and gaskets on those assemblies — for 3 months or 3,000 miles, whichever comes first, with no deductible.",
    },
    {
      q: "Is there a deductible?",
      a: "Not on the included warranty. The optional extended service contracts carry a $100 deductible per repair visit.",
    },
    {
      q: "Can I add longer coverage?",
      a: "Yes, on most cars. The best time is at purchase, because the cost can roll into your financing and it's cheaper on a car with fewer miles.",
    },
  ],
};

export const AREAS_SEO: SeoBlock = {
  heading: "Serving the North Jersey and NY metro",
  intro: [
    "Bergen Car Company is one lot at 412 Route 46 in Lodi, but customers drive in from about 54 towns across Bergen, Passaic, Hudson, Essex, and Morris counties in New Jersey, plus Rockland County, New York. Each [service area](/service-areas) has its own page with the real distance, the route, and current [inventory](/inventory).",
    "Wherever you're coming from, the window prices are the same and there's no out-of-town markup. You can [get pre-qualified](/financing) and [book a test drive](/test-drive) before you make the trip.",
  ],
  faqs: [
    {
      q: "Do you charge more for out-of-town buyers?",
      a: "No. One lot, one price on the window. New Jersey tax, title, registration, and a $499 documentary fee are the only additions, the same for everyone.",
    },
    {
      q: "How far do people typically drive to buy from you?",
      a: "Most customers are within about 20 minutes of Lodi, but plenty come from Wayne, Parsippany, the Hudson waterfront, and across the state line from Rockland County, NY.",
    },
    {
      q: "Can I handle most of the deal before I arrive?",
      a: "Yes. Pre-qualify online with a soft credit check, get a trade estimate, and book a specific car and time so it's ready when you get here.",
    },
  ],
};

export const REVIEWS_SEO: SeoBlock = {
  heading: "What customers say about Bergen Car Company",
  intro: [
    "Bergen Car Company holds a 4.9-star average across more than 600 reviews on Google and DealerRater, covering sales, [financing](/financing), and the [service shop](/service). We reply to all of them, including the four- and three-star ones.",
    "Reviews are the honest picture of a used-car lot. When you're ready, browse the [inventory](/inventory), check the [warranty](/warranty) that comes on every car, or [book a test drive](/test-drive).",
  ],
  faqs: [
    {
      q: "Are the reviews on this page real?",
      a: "Yes. Every review is real and unedited, left by a customer on Google or DealerRater. We don't filter out the critical ones.",
    },
    {
      q: "Does Bergen Car Company respond to negative reviews?",
      a: "Yes, to all of them. If something went wrong, we'd rather fix it than argue about it — the owner responses on the critical reviews show how.",
    },
    {
      q: "How can I leave a review?",
      a: "There are links on the reviews page to Google and DealerRater. No incentive, no follow-up nagging — only if you feel like it.",
    },
  ],
};

export const BLOG_SEO: SeoBlock = {
  heading: "Practical used-car advice from the Lodi lot",
  intro: [
    "The Bergen Car Company [blog](/blog) is written by the people who buy, finance, and fix cars every day — guides on [reading a vehicle history report](/blog/reading-a-used-car-history-report), [what gets added to the price in New Jersey](/blog/what-adds-to-used-car-price-new-jersey), [credit checks for a car loan](/blog/soft-pull-vs-hard-pull-car-loan), and [oil-change intervals](/blog/how-often-oil-change).",
    "When you're ready to act on any of it, the [inventory](/inventory), [financing](/financing), and [trade-in](/trade) pages are a click away.",
  ],
  faqs: [
    {
      q: "Is this blog just SEO filler?",
      a: "No. Each post is specific, checkable advice written by our staff — the history-report lines that actually matter, the real cost ranges for common service jobs, how the rate-shopping window works.",
    },
    {
      q: "How often is it updated?",
      a: "Roughly monthly. The once-a-month email rounds up new guides plus the week's price drops and seasonal maintenance reminders.",
    },
  ],
};

/** Per-city block for the service-area landing pages. */
export function citySeo(area: ServiceArea): SeoBlock {
  const city = area.city;
  const st = area.state;
  return {
    heading: `Buying from ${city} at Bergen Car Company`,
    kicker: `${city}, ${st}`,
    intro: [
      `Bergen Car Company is about ${area.miles} miles from ${city} — roughly a ${area.drive} drive to 412 Route 46 in Lodi. Buyers from ${city} get the same [inventory](/inventory), the same window prices, and the same 3-month / 3,000-mile [warranty](/warranty) as anyone walking in off Route 46; there is no out-of-town markup.`,
      `Every car is inspected by our own technicians and comes with the report and a vehicle history report. From ${city} you can [get pre-qualified](/financing) with a soft credit check, get a [trade-in](/trade) estimate, and [book a test drive](/test-drive) so the car is up front with plates on when you arrive. See the [full list of service areas](/service-areas) for other nearby towns.`,
    ],
    faqs: [
      {
        q: `How far is Bergen Car Company from ${city}?`,
        a: `About ${area.miles} miles — a ${area.drive} drive to 412 Route 46 in Lodi, ${area.approach}. Traffic on Route 46 and Route 17 is the usual variable.`,
      },
      {
        q: `Are prices different for buyers from ${city}?`,
        a: "No. One lot, one price on the window. New Jersey tax, title, registration, and a $499 documentary fee are the only additions, the same for everyone regardless of where you live.",
      },
      {
        q: `Can I get financing arranged before I drive over from ${city}?`,
        a: "Yes. The pre-qualification form uses a soft credit check that doesn't affect your score and takes about two minutes, so you can arrive knowing your payment range.",
      },
      {
        q: `Will you appraise my trade-in while I'm visiting from ${city}?`,
        a: "Yes. Bring the car, the title, and both keys, and we'll do a 20-minute appraisal and put the written value in front of you — trade it or take the check, no obligation to buy.",
      },
    ],
  };
}
