import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "../../components/site-header";
import SiteFooter from "../../components/site-footer";
import { currency, getInventory } from "../../lib/inventory";
import VehicleDetail from "./vehicle-detail";

type Params = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  const vehicles = await getInventory();
  return vehicles.map((v) => ({ id: v.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const vehicles = await getInventory();
  const v = vehicles.find((x) => x.id === id);
  if (!v) return { title: "Vehicle not found" };
  const name = `${v.year} ${v.make} ${v.model} ${v.trim}`;
  return {
    title: `${name} — ${currency(v.price)}`,
    description: `${name} for sale at Bergen Car Company in Lodi, NJ. ${v.mileage.toLocaleString(
      "en-US",
    )} miles, ${v.drivetrain}, with a limited warranty.`,
    alternates: { canonical: `/inventory/${v.id}` },
  };
}

export default async function VehiclePage({ params }: Params) {
  const { id } = await params;
  const vehicles = await getInventory();
  const vehicle = vehicles.find((v) => v.id === id);
  if (!vehicle) notFound();

  const similar = vehicles
    .filter((v) => v.id !== vehicle.id)
    .map((v) => ({
      v,
      score:
        (v.bodyStyle === vehicle.bodyStyle ? 0 : 100_000) +
        Math.abs(v.price - vehicle.price),
    }))
    .sort((a, b) => a.score - b.score)
    .slice(0, 4)
    .map((x) => x.v);

  return (
    <>
      <SiteHeader solid />
      <main className="flex-1">
        <VehicleDetail vehicle={vehicle} similar={similar} />
      </main>
      <SiteFooter />
    </>
  );
}
