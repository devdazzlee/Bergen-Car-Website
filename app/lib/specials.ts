export type VehicleSpecial = {
  vehicleId: string;
  badge:
    | "Just reduced"
    | "Price drop"
    | "Low miles"
    | "Manager's pick"
    | "Under $12k";
  wasPrice?: number;
  headline: string;
  detail: string;
};

/* Real markdowns on cars actually on the lot. "wasPrice" is our own earlier
 * listed price on that specific vehicle — no phantom MSRP games. */
export const VEHICLE_SPECIALS: VehicleSpecial[] = [
  {
    vehicleId: "bcc-2018-toyota-corolla",
    badge: "Just reduced",
    wasPrice: 17195,
    headline: "Marked down $1,200 this month",
    detail:
      "Clean one-owner Corolla LE with new tires and 40 highway MPG. We'd rather move it than keep re-detailing it before the next batch comes in.",
  },
  {
    vehicleId: "bcc-2019-vw-jetta",
    badge: "Price drop",
    wasPrice: 16100,
    headline: "Now under $15,000",
    detail:
      "Dropped $1,200. 8-speed automatic, 40 highway MPG, fresh inspection. A straightforward commuter or first car.",
  },
  {
    vehicleId: "bcc-2017-ford-f150",
    badge: "Just reduced",
    wasPrice: 25500,
    headline: "$1,500 off — inspection and warranty still included",
    detail:
      "XLT SuperCrew 4x4 with the 5.0L V8. It's been on the lot a while, so the price came down. Everything else about how we sell it is the same.",
  },
  {
    vehicleId: "bcc-2017-nissan-juke",
    badge: "Under $12k",
    headline: "The lowest-priced car on our lot right now",
    detail:
      "$11,995 for a running, inspected, warrantied car with a clean title. Not a fixer-upper, not a project — just an honest cheap car.",
  },
  {
    vehicleId: "bcc-2021-toyota-4runner",
    badge: "Low miles",
    headline: "38,960 miles on a 2021 — genuinely hard to find",
    detail:
      "SR5 4x4, one owner, no accidents. 4Runners hold their value, so this isn't a bargain-basement price — but the mileage is the reason to look.",
  },
  {
    vehicleId: "bcc-2022-honda-civic",
    badge: "Manager's pick",
    headline: "A 2022 with 24k miles, priced closer to a 2020",
    detail:
      "Civic LX with the good gas mileage and the newer safety tech. Of everything on the lot this month, we think this one's the best value.",
  },
];
