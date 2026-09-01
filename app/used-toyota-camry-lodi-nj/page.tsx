import type { Metadata } from "next";
import ModelLanding from "../components/model-landing";

const MAKE = "Toyota";
const MODEL = "Camry";
const SLUG = "used-toyota-camry-lodi-nj";
const H1 = `Used ${MAKE} ${MODEL} in Lodi, NJ`;

export const metadata: Metadata = {
  title: { absolute: `${H1} | Bergen Car Company` },
  description: `Browse the used ${MAKE} ${MODEL} listings at Bergen Car Company in Lodi, NJ. Trims, mileage, and pricing are pulled straight from current inventory and update as stock changes.`,
  alternates: { canonical: `/${SLUG}` },
  openGraph: {
    title: `${H1} | Bergen Car Company`,
    description: `Used ${MAKE} ${MODEL} for sale in Lodi, NJ. Current stock with a real, data-driven spec summary and up-front pricing.`,
    url: `https://bergencarcompany.com/${SLUG}`,
    type: "website",
  },
};

export default function Page() {
  return <ModelLanding make={MAKE} model={MODEL} slug={SLUG} />;
}
