"use client";

import { motion } from "framer-motion";

const BRANDS = [
  "BMW",
  "Porsche",
  "Tesla",
  "Mercedes-Benz",
  "Toyota",
  "Honda",
  "Ford",
  "Audi",
  "Nissan",
  "Chevrolet",
  "Volkswagen",
  "Jeep",
  "Subaru",
  "Hyundai",
  "Lexus",
  "Mazda",
];

export default function BrandMarquee() {
  const row = [...BRANDS, ...BRANDS];
  return (
    <section
      aria-label="Brands we carry"
      className="border-y border-line bg-white py-8"
    >
      <div className="container-page">
        <p className="text-center text-[12px] font-semibold uppercase tracking-[0.2em] text-navy-400">
          Recent arrivals from the brands you know
        </p>
      </div>
      <div className="relative mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <motion.div
          className="flex w-max gap-12 pr-12"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 28 }}
        >
          {row.map((b, i) => (
            <span
              key={`${b}-${i}`}
              className="shrink-0 font-heading text-xl font-bold tracking-tight text-navy-600/70 sm:text-2xl"
            >
              {b}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
