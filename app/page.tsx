import SiteHeader from "./components/site-header";
import Hero from "./components/hero";
import InventoryExplorer from "./components/inventory-explorer";
import BrandMarquee from "./components/brand-marquee";
import TrustBar from "./components/trust-bar";
import HowItWorks from "./components/how-it-works";
import WhyChooseUs from "./components/why-choose-us";
import BergenDifference from "./components/bergen-difference";
import TradeIn from "./components/trade-in";
import FinancingBanner from "./components/financing-banner";
import ServiceCenter from "./components/service-center";
import Reviews from "./components/reviews";
import Faq from "./components/faq";
import SeoAbout from "./components/seo-about";
import CtaBand from "./components/cta-band";
import LocationContact from "./components/location-contact";
import SiteFooter from "./components/site-footer";
import StructuredData from "./components/structured-data";

export default function Home() {
  return (
    <>
      <StructuredData />
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <InventoryExplorer />
        <BrandMarquee />
        <TrustBar />
        <HowItWorks />
        <WhyChooseUs />
        <BergenDifference />
        <TradeIn />
        <FinancingBanner />
        <ServiceCenter />
        <Reviews />
        <Faq />
        <SeoAbout />
        <CtaBand />
        <LocationContact />
      </main>
      <SiteFooter />
    </>
  );
}
