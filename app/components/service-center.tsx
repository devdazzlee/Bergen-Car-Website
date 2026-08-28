"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Reveal, Stagger, StaggerItem } from "./motion";
import { IconWrench, IconGauge, IconShield, IconCog, IconPhone } from "./icons";

const SERVICES = [
  { icon: IconWrench, label: "Oil, brakes & tires", sub: "Routine upkeep" },
  { icon: IconGauge, label: "Check-engine diagnostics", sub: "We'll track it down" },
  { icon: IconShield, label: "NJ state inspection prep", sub: "Pass the first time" },
  { icon: IconCog, label: "Scheduled maintenance", sub: "By the mile" },
];

export default function ServiceCenter() {
  return (
    <section id="service" className="scroll-mt-24 bg-white py-20 sm:py-24">
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-72px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative order-2 lg:order-1"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl ring-1 ring-line shadow-[var(--shadow-lift)]">
            <Image
              src="https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=1200&q=70"
              alt="A technician servicing a vehicle at the Bergen Car Company service shop"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/55 via-transparent to-transparent" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-72px" }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -bottom-6 left-5 right-5 rounded-2xl border border-line bg-white p-4 shadow-[var(--shadow-card)] sm:left-8 sm:right-auto sm:max-w-xs"
          >
            <p className="font-heading text-sm font-bold text-ink">
              Open to everyone
            </p>
            <p className="mt-1 text-[13px] leading-5 text-navy-600">
              Bring in any make or model — you don&apos;t have to have bought it
              from us.
            </p>
          </motion.div>
        </motion.div>

        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="eyebrow text-red">Service shop</p>
            <h2 className="display-2 mt-2 text-ink">
              Our service shop is here after the sale
            </h2>
            <p className="mt-4 max-w-lg text-lg leading-8 text-navy-600">
              The same technicians who inspect our cars can look after yours —
              oil changes, brakes, tires, and New Jersey inspections, for any
              make or model.
            </p>
          </Reveal>

          <Stagger
            className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2"
            stagger={0.07}
          >
            {SERVICES.map(({ icon: Icon, label, sub }) => (
              <StaggerItem
                key={label}
                className="group flex items-start gap-3 rounded-2xl border border-line bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-[var(--shadow-card)]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red/10 text-red transition-colors duration-300 group-hover:bg-red group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-[14px] font-semibold text-ink">
                    {label}
                  </span>
                  <span className="block text-[12px] text-navy-500">{sub}</span>
                </span>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.1} className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
            <Link
              href="/service"
              className="inline-flex items-center rounded-full bg-navy px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-navy-700 active:scale-[0.98]"
            >
              Book a service appointment
            </Link>
            <a
              href="tel:+19735550142"
              className="inline-flex items-center gap-2 text-sm font-semibold text-navy-700 transition-colors hover:text-red"
            >
              <IconPhone className="h-4 w-4 text-red" />
              (973) 555-0142
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
