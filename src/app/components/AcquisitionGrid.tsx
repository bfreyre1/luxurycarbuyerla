"use client";

import Image from "next/image";
import {
  ACQUISITION_DISCLAIMER,
  ACQUISITION_TARGETS,
  formatAcquisitionPrice,
} from "../lib/acquisitionTargets";

function scrollToOffer() {
  document.getElementById("offer")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function AcquisitionGrid() {
  return (
    <section className="border-b border-white/5 bg-surface py-14 md:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-gold">
              We are actively buying
            </p>
            <h2 className="font-display mt-2 text-3xl text-white md:text-4xl">
              Luxury &amp; exotic cars we want now
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-zinc-400">
            Discreet, competitive preliminary offers for pristine examples — recent market
            activity below.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ACQUISITION_TARGETS.map((vehicle) => (
            <article
              key={vehicle.id}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-surface-elevated transition hover:border-gold/25"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={vehicle.image}
                  alt={vehicle.imageAlt}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute right-3 top-3 rounded-lg border border-gold/30 bg-black/85 px-3 py-2 text-right backdrop-blur-sm">
                  <p className="text-[10px] uppercase tracking-wider text-zinc-400">
                    {vehicle.priceLabel}
                  </p>
                  <p className="font-display text-xl font-semibold text-gold-light md:text-2xl">
                    {formatAcquisitionPrice(vehicle.price)}
                  </p>
                </div>
              </div>

              <div className="p-5">
                <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-gold">
                  {vehicle.category}
                </p>
                <h3 className="font-display mt-1 text-xl text-white">{vehicle.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {vehicle.subtitle}
                </p>
                <button
                  type="button"
                  onClick={scrollToOffer}
                  className="mt-4 w-full rounded-full border border-white/15 py-2.5 text-sm font-semibold text-white transition hover:border-gold/40 hover:bg-gold/10 hover:text-gold-light"
                >
                  I have one of these →
                </button>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 text-center text-xs leading-relaxed text-zinc-500">
          {ACQUISITION_DISCLAIMER}
        </p>
      </div>
    </section>
  );
}
