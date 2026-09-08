import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "../../components/site-header";
import SiteFooter from "../../components/site-footer";
import { currency, getInventory } from "../../lib/inventory";
import {
  buildVehicleSlug,
  findVehicleBySegment,
  vehiclePath,
} from "../../lib/vehicle-slug";
import LegacyUrlRedirect from "./legacy-url-redirect";
import VehicleDetail from "./vehicle-detail";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const vehicles = await getInventory();
  // Two pages per vehicle: the descriptive slug we link to now, plus the bare
  // database id we linked to before. A static export has no server to issue a
  // 301, so the old URL has to exist as a page that redirects itself.
  return vehicles.flatMap((v) => {
    const slug = buildVehicleSlug(v);
    return slug === v.id ? [{ slug }] : [{ slug }, { slug: v.id }];
  });
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
    // Always the slugged URL, so the legacy id pages consolidate onto it.
    alternates: { canonical: vehiclePath(v) },
  };
}

export default async function VehiclePage({ params }: Params) {
  const { slug } = await params;
  const vehicles = await getInventory();
  const vehicle = findVehicleBySegment(vehicles, slug);
  if (!vehicle) notFound();

  if (slug !== buildVehicleSlug(vehicle)) {
    return (
      <LegacyUrlRedirect
        to={`${vehiclePath(vehicle)}/`}
        name={`${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.trim}`}
      />
    );
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
