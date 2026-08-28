"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal, Stagger, StaggerItem } from "./motion";
import { IconWrench, IconGauge, IconShield, IconCog } from "./icons";

const SERVICES = [
  { icon: IconWrench, label: "Oil, brakes & tires" },
  { icon: IconGauge, label: "Check-engine diagnostics" },
  { icon: IconShield, label: "NJ state inspection prep" },
  { icon: IconCog, label: "Scheduled maintenance" },
];

export default function ServiceCenter() {
  return (
    <section id="service" className="scroll-mt-24 bg-white py-20 sm:py-24">
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-72px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative order-2 aspect-[4/3] overflow-hidden rounded-3xl ring-1 ring-line shadow-[var(--shadow-card)] lg:order-1"
        >
          <Image
            src="https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=1200&q=70"
            alt="ASE-certified technician servicing a vehicle at the Bergen Car Company service center"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>

        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="eyebrow text-red">Service center</p>
            <h2 className="display-2 mt-2 text-ink">
              We keep the car running after you buy it
            </h2>
            <p className="mt-4 max-w-lg text-lg leading-8 text-navy-600">
              Our on-site shop is open to everyone — whether the car came from
              our lot or not. Same technicians who inspect our inventory.
            </p>
          </Reveal>

          <Stagger className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {SERVICES.map(({ icon: Icon, label }) => (
              <StaggerItem
                key={label}
                className="flex items-center gap-3 rounded-2xl border border-line bg-mist/50 px-4 py-3.5"
              >
                <Icon className="h-5 w-5 shrink-0 text-red" />
                <span className="text-[15px] font-medium text-ink">{label}</span>
              </StaggerItem>
            ))}
          </Stagger>

          <a
            href="#contact"
            className="mt-8 inline-flex items-center rounded-full bg-navy px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-navy-700 active:scale-[0.98]"
          >
            Book a service appointment
          </a>
        </div>
      </div>
    </section>
  );
}
