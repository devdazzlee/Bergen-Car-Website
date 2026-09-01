"use client";

import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "../../components/motion";
import { SectionHeading } from "../../components/section-heading";
import PageBanner, { BannerPills } from "../../components/page-banner";
import WhyChooseUs from "../../components/why-choose-us";
import VehicleCardLink from "../../components/vehicle-card-link";
import SeoFaq from "../../components/seo-faq";
import { citySeo } from "../../lib/seo-faq-content";
import { VEHICLE_CATEGORIES } from "../../lib/vehicle-categories";
import { Button } from "../../components/ui/button";
import type { Vehicle } from "../../lib/inventory";
import {
  directionsUrl,
  LOT_ADDRESS,
  type ServiceArea,
} from "../../lib/service-areas";
import { IconArrowRight, IconClock, IconPin, IconRoad } from "../../components/icons";

export default function CityClient({
  area,
  vehicles,
}: {
  area: ServiceArea;
  vehicles: Vehicle[];
}) {
  const dir = directionsUrl(area);

  return (
    <div className="bg-mist">
      <PageBanner
        eyebrow={`${area.county}${area.state === "NY" ? ", NY" : ""}`}
        title={`Used Cars Near ${area.city}, ${area.state}`}
        description={
          <p>
            {area.city} is about{" "}
            <span className="text-white">{area.miles} miles</span> from Bergen
            Car Company on Route 46 in Lodi — roughly a {area.drive} drive,{" "}
            {area.approach}.
          </p>
        }
        image="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=2400&q=70"
        imageAlt={`Driving toward Bergen Car Company in Lodi from ${area.city}, ${area.state}`}
      >
        <BannerPills
          items={[
            `${area.miles} mi from Lodi`,
            `${area.drive} drive`,
            area.county,
          ]}
        />
      </PageBanner>

      {/* local intro */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-red">Coming from {area.city}</p>
            <h2 className="display-3 mt-3 text-ink">
              A short drive, and worth it
            </h2>
            <p className="mt-5 text-[16px] leading-8 text-navy-700">
              {area.intro}
            </p>
            <p className="mt-4 text-[15px] leading-7 text-navy-600">
              Everything on the lot is inspected by our own technicians, priced
              on the window with no surprise add-ons, and backed by a
              3-month / 3,000-mile warranty. The number you see from {area.city}{" "}
              is the same number a neighbor down the street would see.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              <Button asChild variant="navy">
                <a href={dir} target="_blank" rel="noopener noreferrer">
                  Directions from {area.city}
                  <IconArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline">
                <Link href="/inventory">Browse all inventory</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* featured inventory */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            kicker="In stock now"
            title={`Available near ${area.city}`}
          >
            A sample of what&apos;s on the lot today. The full inventory updates
            as cars sell and arrive — tap any car for photos, the inspection
            notes, and history.
          </SectionHeading>

          <Stagger
            className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            stagger={0.06}
          >
            {vehicles.map((v) => (
              <StaggerItem key={v.id}>
                <VehicleCardLink vehicle={v} />
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.1} className="mt-10">
            <Link
              href="/inventory"
              className="group inline-flex items-center gap-2 rounded-full border border-line-strong bg-white px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-navy hover:bg-navy hover:text-white"
            >
              See the full inventory
              <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* shop by category */}
      <section className="bg-mist py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            kicker="Shop by category"
            title="Find your kind of vehicle"
          >
            Fifteen dedicated pages, each with a live feed of what&apos;s on the
            lot. Whatever you drive up from {area.city} for, start here.
          </SectionHeading>

          <Stagger
            className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.04}
          >
            {VEHICLE_CATEGORIES.map((c) => (
              <StaggerItem key={c.slug}>
                <Link
                  href={c.permalink}
                  className="group flex items-center justify-between gap-3 rounded-2xl border border-line bg-white px-5 py-4 shadow-[var(--shadow-card)] transition-all duration-200 hover:-translate-y-0.5 hover:border-navy hover:shadow-[var(--shadow-lift)]"
                >
                  <span className="font-heading text-[15px] font-semibold text-ink">
                    {c.name}
                  </span>
                  <IconArrowRight className="h-4 w-4 shrink-0 text-navy-400 transition-all group-hover:translate-x-0.5 group-hover:text-red" />
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* why buyers from this city choose us — reuses the homepage content */}
      <WhyChooseUs
        eyebrow={`Why ${area.city} buyers choose us`}
        heading={`What ${area.city} customers come here for`}
        intro={`Plenty of our regulars were sent by a friend or relative in ${area.city} or a town next to it. Here's what keeps them making the drive to Lodi.`}
        background="bg-mist"
      />

      {/* directions / distance */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading kicker="Getting here" title={`${area.city} to our lot`} />

          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-stretch">
            <Reveal className="flex flex-col gap-5 rounded-3xl bg-navy p-6 text-white sm:p-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white/5 p-4">
                  <div className="flex items-center gap-2 text-gold">
                    <IconRoad className="h-4 w-4" />
                    <span className="text-[11px] font-bold uppercase tracking-wide">
                      Distance
                    </span>
                  </div>
                  <p className="mt-1.5 font-heading text-2xl font-bold">
                    {area.miles} mi
                  </p>
                </div>
                <div className="rounded-2xl bg-white/5 p-4">
                  <div className="flex items-center gap-2 text-gold">
                    <IconClock className="h-4 w-4" />
                    <span className="text-[11px] font-bold uppercase tracking-wide">
                      Drive time
                    </span>
                  </div>
                  <p className="mt-1.5 font-heading text-2xl font-bold">
                    {area.drive}
                  </p>
                </div>
              </div>
              <p className="text-[14px] leading-7 text-white/70">
                From {area.city}, the simplest route is {area.approach}. Traffic
                on Route 46 and Route 17 is the usual variable — mornings and
                Friday afternoons run heavier.
              </p>
              <div className="mt-auto flex items-start gap-2 border-t border-white/10 pt-4 text-[14px] text-white/80">
                <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                {LOT_ADDRESS}
              </div>
              <Button
                asChild
                variant="gold"
                className="w-full sm:w-auto"
              >
                <a href={dir} target="_blank" rel="noopener noreferrer">
                  Get directions
                  <IconArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </Reveal>

            <Reveal
              delay={0.05}
              className="overflow-hidden rounded-3xl ring-1 ring-line shadow-[var(--shadow-card)]"
            >
              <iframe
                title={`Map from ${area.city} to Bergen Car Company in Lodi, NJ`}
                src="https://www.google.com/maps?q=412+Route+46,+Lodi,+NJ&z=12&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full min-h-[320px] w-full border-0"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* local SEO + FAQ */}
      <SeoFaq {...citySeo(area)} />

      {/* bottom CTA */}
      <section className="bg-mist py-16 sm:py-20">
        <div className="container-page">
          <Reveal className="overflow-hidden rounded-3xl bg-navy p-8 sm:p-12">
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-xl">
                <p className="eyebrow text-gold">{area.city}, {area.state}</p>
                <h2 className="display-3 mt-3 text-white">
                  Make the short trip to Lodi
                </h2>
                <p className="mt-3 text-[15px] leading-7 text-white/70">
                  Browse what&apos;s in stock, or book a test drive so the keys
                  are waiting when you arrive.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-2.5 sm:flex-row">
                <Button asChild variant="gold" size="lg">
                  <Link href="/inventory">
                    Browse inventory
                    <IconArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/30 bg-transparent text-white hover:border-white hover:bg-white hover:text-navy"
                >
                  <Link href="/test-drive">Schedule a test drive</Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
