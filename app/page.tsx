import SiteHeader from "./components/site-header";
import Hero from "./components/hero";
import BudgetEntryBanner from "./components/budget-entry-banner";
import DealershipPhotos from "./components/dealership-photos";
import InventoryExplorer from "./components/inventory-explorer";
import SpecialtyFocus from "./components/specialty-focus";
import NationwideShipping from "./components/nationwide-shipping";
import BrandMarquee from "./components/brand-marquee";
import TrustBar from "./components/trust-bar";
import HowItWorks from "./components/how-it-works";
import WhyChooseUs from "./components/why-choose-us";
import BergenDifference from "./components/bergen-difference";
import TradeIn from "./components/trade-in";
import FinancingBanner from "./components/financing-banner";
import WarrantyBanner from "./components/warranty-banner";
import Reviews from "./components/reviews";
import Faq from "./components/faq";
import SeoAbout from "./components/seo-about";
import CtaBand from "./components/cta-band";
import LocationContact from "./components/location-contact";
import SiteFooter from "./components/site-footer";
import StructuredData from "./components/structured-data";
import { getDealerRating } from "./lib/dealer-rating";
import { getInventory } from "./lib/inventory";

export default async function Home() {
  const [vehicles, rating] = await Promise.all([
    getInventory(),
    getDealerRating(),
  ]);

  return (
    <>
      <StructuredData vehicles={vehicles} />
      <SiteHeader />
      <main className="flex-1">
        <Hero rating={rating} />
        <BudgetEntryBanner />
        <InventoryExplorer vehicles={vehicles}>
          <SpecialtyFocus vehicles={vehicles} />
        </InventoryExplorer>
        <NationwideShipping />
        <BrandMarquee />
        <FinancingBanner />
        <WarrantyBanner />
        <TradeIn />
        <HowItWorks />
        <Reviews rating={rating} />
        <WhyChooseUs />
        <BergenDifference />
        <TrustBar rating={rating} />
        <Faq />
        <SeoAbout />
        <DealershipPhotos />
        <CtaBand />
        <LocationContact />
      </main>
      <SiteFooter />
    </>
  );
}

