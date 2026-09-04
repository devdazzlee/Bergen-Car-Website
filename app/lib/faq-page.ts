export type FaqCategory =
  | "Buying"
  | "Financing"
  | "Trade-in"
  | "Warranty";

export type FaqItem = {
  id: string;
  category: FaqCategory;
  q: string;
  a: string;
};

export const FAQ_CATEGORIES: FaqCategory[] = [
  "Buying",
  "Financing",
  "Trade-in",
  "Warranty",
];

/** The make-or-break questions, surfaced above the full list. */
export const BLUNT: { q: string; a: string }[] = [
  {
    q: "Do you negotiate on price?",
    a: "A little, not a lot. We price each car close to the market on the way in, so there isn't a big padded margin to haggle out. If you've got a genuine reason the number should be lower — a real repair we missed, a comparable listing — bring it and we'll look. What we won't do is start high and \"come down\" as a tactic.",
  },
  {
    q: "Are the prices online the real prices?",
    a: "Yes. The number on the website is the selling price. New Jersey tax, title, registration, and one $499 documentary fee are added at signing — that's the whole list. No prep fee, no mandatory warranty, no \"market adjustment.\"",
  },
  {
    q: "What if I find a problem after I buy?",
    a: "If it's a covered powertrain failure within 3 months / 3,000 miles, call us — we'll help you get the covered work done at a licensed repair facility, with no deductible. If it's something outside that, tell us anyway. We'd rather keep you than win an argument.",
  },
  {
    q: "Can I return a car if I change my mind?",
    a: "Be straight with yourself before you sign — a used-car sale in New Jersey is generally final, and we don't advertise a return policy we can't guarantee. That said, if you call within a day or two with a real problem, we'll talk. It's happened, and we've worked it out. But treat the purchase as final and take the time you need first.",
  },
];

export const FAQS: FaqItem[] = [
  // Buying
  {
    id: "b1",
    category: "Buying",
    q: "Can I have the car inspected by my own mechanic?",
    a: "Absolutely, and we encourage it. We don't have an in-house shop, so that independent check is the one that actually belongs to you. We'll hold the car while you take it to any shop you trust. If they find something real, we want to know about it too.",
  },
  {
    id: "b2",
    category: "Buying",
    q: "How long does the buying process take?",
    a: "If your financing is sorted and the car's ready, you can be in and out in about an hour. First-time paperwork, a trade appraisal, or arranging a loan on the spot adds time — plan for two to three hours on a busy Saturday. We'll give you a realistic estimate when you arrive.",
  },
  {
    id: "b3",
    category: "Buying",
    q: "Can you hold a car for me?",
    a: "Yes, with a refundable deposit we'll hold a vehicle for up to 48 hours while you arrange financing or schedule a test drive. If you decide against it, you get the deposit back — no questions.",
  },
  {
    id: "b4",
    category: "Buying",
    q: "Do you sell cars \"as is\"?",
    a: "Almost never. Nearly every car on the lot is sold with the included 3-month / 3,000-mile powertrain warranty. On rare occasions a very old, very low-priced car is sold as is — its window Buyers Guide will say so in plain type, and we'll point it out before you buy.",
  },
  {
    id: "b5",
    category: "Buying",
    q: "Do you inspect cars before they're listed?",
    a: "We don't operate a repair shop, so there is no in-house mechanical inspection. We pull a vehicle history report on every car and we'll send it over if you ask. For a mechanical once-over, use a shop you trust — that's the check worth having.",
  },
  {
    id: "b6",
    category: "Buying",
    q: "Will you pressure me if I say I need to think about it?",
    a: "No. Nobody here is on a commission-only plan, so nobody's paycheck depends on closing you today. Take the sheet with the numbers, go home, sleep on it. The car will very likely still be here, and if it sells, another will come in.",
  },
  {
    id: "b7",
    category: "Buying",
    q: "Do you buy cars from out of state or with an out-of-state title?",
    a: "Yes on both. We buy and sell across state lines regularly and handle the title work here. Bring whatever title paperwork you have and we'll tell you if anything's missing before you make the trip.",
  },
  {
    id: "b8",
    category: "Buying",
    q: "Do you have a service department?",
    a: "No. Bergen Car Company sells used cars — we don't do oil changes, brakes, or New Jersey state inspections. For maintenance, use a shop you trust. If a covered warranty issue comes up after you buy, call us and we'll help you start a claim at a licensed repair facility.",
  },

  // Financing
  {
    id: "f1",
    category: "Financing",
    q: "Will checking my rate hurt my credit?",
    a: "No. Getting pre-qualified uses a soft credit pull — it doesn't affect your score and isn't visible to other lenders. A hard inquiry only happens later, and only if you decide to move forward on a specific car. We'll tell you before that happens.",
  },
  {
    id: "f2",
    category: "Financing",
    q: "Can I get approved with bad credit or no credit history?",
    a: "Often, yes. We submit one application to multiple lenders, including local credit unions and programs built for first-time buyers and credit rebuilding. A discharged bankruptcy or a repo a year or two back doesn't automatically disqualify you. We'll be honest about what's realistic for your situation.",
  },
  {
    id: "f3",
    category: "Financing",
    q: "What interest rate will I get?",
    a: "We can't promise a number sight unseen — it depends on your credit, the loan term, your down payment, and which lender bites. What we can promise is that we shop it across lenders and show you the actual offers, not just the one with the best kickback for us.",
  },
  {
    id: "f4",
    category: "Financing",
    q: "What documents do I need to finalize?",
    a: "A valid driver's license, proof of income (recent pay stubs, or bank statements if you're self-employed), and proof of residence (a utility bill or lease). If you're trading a car, bring the title and both keys. None of this is needed just to get pre-qualified.",
  },
  {
    id: "f5",
    category: "Financing",
    q: "How much do I need for a down payment?",
    a: "Whatever's comfortable. More down lowers your payment and can improve your rate, but we work with low-down and zero-down programs for buyers who qualify. We'll run a couple of scenarios so you can see the trade-off.",
  },
  {
    id: "f6",
    category: "Financing",
    q: "Does getting pre-qualified obligate me to anything?",
    a: "Not at all. It just gives you a payment range to shop with. No deposit, no commitment, and if the numbers don't work for you, that's a completely acceptable answer.",
  },

  // Trade-in
  {
    id: "t1",
    category: "Trade-in",
    q: "How do you decide what my trade is worth?",
    a: "Three inputs: the current wholesale (auction) value for your exact year, trim, mileage, and condition; what comparable cars are actually selling for near Lodi; and our realistic cost to recondition, inspect, and warranty it. We walk you through each piece so the number isn't a black box.",
  },
  {
    id: "t2",
    category: "Trade-in",
    q: "Do I have to buy a car to trade one in?",
    a: "No. We'll buy your car outright whether or not you're shopping with us — that's what the Sell Your Car page is for. If you do buy here, applying the trade value also reduces the sales tax you pay in New Jersey, which is often worth more than it sounds.",
  },
  {
    id: "t3",
    category: "Trade-in",
    q: "What if I owe more on my car than it's worth?",
    a: "That's common and it's not a dealbreaker. We can usually roll the negative equity into your new financing — and we'll show you exactly how that changes the monthly payment before you agree to anything. No surprises at the desk.",
  },
  {
    id: "t4",
    category: "Trade-in",
    q: "Will the in-person offer match the online estimate?",
    a: "It should, as long as the car matches what you described. The appraisal confirms mileage, condition, and that there's nothing major hiding — frame damage, a branded title. If something changes the number, we explain why. We don't quietly drop it at signing.",
  },
  {
    id: "t5",
    category: "Trade-in",
    q: "Would I get more selling it privately?",
    a: "Sometimes — a patient private sale can net a few hundred to a couple thousand more on the right car. It also means listing it, fielding calls, meeting strangers, and doing the title and payoff yourself. We'll tell you honestly if yours is a car that sells well privately.",
  },

  // Warranty
  {
    id: "w1",
    category: "Warranty",
    q: "What's covered by the free warranty that comes with the car?",
    a: "The included 3-month / 3,000-mile limited warranty covers the powertrain — engine internals, transmission, drive axle, and the seals and gaskets on those assemblies. Bergen pays 100% of the parts and 100% of the labor on a covered failure, with no deductible.",
  },
  {
    id: "w2",
    category: "Warranty",
    q: "Is there a deductible?",
    a: "Not on the included warranty. The optional extended service contracts (Powertrain Plus and Comprehensive) carry a $100 deductible per repair visit, no matter how many covered parts are fixed that visit.",
  },
  {
    id: "w3",
    category: "Warranty",
    q: "Can I buy extended coverage, and when?",
    a: "Yes. The best time is at purchase, because the cost can roll into your financing and it's cheaper on a car with fewer miles. You can usually still add a plan within the first 30 days — call us for pricing on your specific car.",
  },
  {
    id: "w4",
    category: "Warranty",
    q: "What voids the warranty?",
    a: "Skipping the maintenance in your owner's manual (keep your receipts), modifying the powertrain, using the car for racing or commercial hauling, or a repair done improperly by an unlicensed shop. Normal driving and normal upkeep keep it in force.",
  },
  {
    id: "w5",
    category: "Warranty",
    q: "Does the coverage transfer if I sell the car later?",
    a: "The included warranty stays with the original buyer. The extended service contracts are transferable to a private buyer for a small fee, which can make your car easier to sell down the road.",
  },
];
