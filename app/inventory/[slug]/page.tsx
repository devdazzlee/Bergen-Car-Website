import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import SiteHeader from "../../components/site-header";
import SiteFooter from "../../components/site-footer";
import { currency, getInventory } from "../../lib/inventory";
import {
  buildVehicleSlug,
  findVehicleBySegment,
  vehiclePath,
} from "../../lib/vehicle-slug";
import VehicleDetail from "./vehicle-detail";

type Params = { params: Promise<{ slug: string }> };

/** Prebuild current listings; new cars still resolve at request time. */
export const dynamicParams = true;

export async function generateStaticParams() {
  const vehicles = await getInventory();
  return vehicles.map((v) => ({ slug: buildVehicleSlug(v) }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const vehicles = await getInventory();
  const v = findVehicleBySegment(vehicles, slug);
  if (!v) return { title: "Vehicle not found" };

  const name = `${v.year} ${v.make} ${v.model} ${v.trim}`;
  return {
    title: `${name} — ${currency(v.price)}`,
    description: `${name} for sale at Bergen Car Company in Lodi, NJ. ${v.mileage.toLocaleString(
      "en-US",
    )} miles, ${v.drivetrain}, with a limited warranty.`,
    alternates: { canonical: vehiclePath(v) },
  };
}

export default async function VehiclePage({ params }: Params) {
  const { slug } = await params;
  const vehicles = await getInventory();
  const vehicle = findVehicleBySegment(vehicles, slug);
  if (!vehicle) notFound();

  const canonical = buildVehicleSlug(vehicle);
  if (slug !== canonical) {
    redirect(`${vehiclePath(vehicle)}/`);
  }

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
