"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BRAND } from "../lib/brand";
import {
  ACQUISITION_DISCLAIMER,
  ACQUISITION_TARGETS,
  formatAcquisitionPrice,
  formatCompMileage,
  formatCompYear,
  type AcquisitionTarget,
} from "../lib/acquisitionTargets";

type AcquisitionGridProps = {
  /** When set, card + section CTAs link here (e.g. /sell#offer). Otherwise scroll to #offer on page. */
  offerHref?: string;
  /** Show prominent section-level Get offer button */
  showSectionCta?: boolean;
};

function scrollToOffer() {
  document.getElementById("offer")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function OfferCta({
  href,
  className,
  children,
}: {
  href?: string;
  className: string;
  children: ReactNode;
}) {
  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" onClick={scrollToOffer} className={className}>
      {children}
    </button>
  );
}

function AcquisitionCard({
  vehicle,
  offerHref,
}: {
  vehicle: AcquisitionTarget;
  offerHref?: string;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-surface-elevated transition hover:border-gold/25">
      <div className="relative aspect-[16/10] overflow-hidden">
        {imgError ? (
          <div className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-800 px-4 text-center">
            <p className="text-[10px] uppercase tracking-[0.25em] text-gold">{vehicle.category}</p>
            <p className="font-display mt-2 text-lg text-white">{vehicle.title}</p>
            <p className="mt-1 text-xs text-zinc-500">Photo updating</p>
          </div>
        ) : (
          <Image
            src={vehicle.image}
            alt={vehicle.imageAlt}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
            onError={() => setImgError(true)}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute right-3 top-3 rounded-lg border border-gold/30 bg-black/85 px-3 py-2 text-right backdrop-blur-sm">
          <p className="text-[10px] uppercase tracking-wider text-zinc-400">{vehicle.priceLabel}</p>
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
        <dl className="mt-3 grid grid-cols-2 gap-3 rounded-lg border border-white/5 bg-black/20 px-3 py-2.5">
          <div>
            <dt className="text-[10px] uppercase tracking-wider text-zinc-500">Model year</dt>
            <dd className="mt-0.5 text-sm font-medium text-white">
              {formatCompYear(vehicle.pricingYear)}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-wider text-zinc-500">Mileage</dt>
            <dd className="mt-0.5 text-sm font-medium text-white">
              {formatCompMileage(vehicle.pricingMileage)}
            </dd>
          </div>
        </dl>
        <p className="mt-1.5 text-[10px] uppercase tracking-wider text-zinc-600">
          Market comp · {vehicle.yearFrom} examples welcome
        </p>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">{vehicle.subtitle}</p>
        <OfferCta
          href={offerHref}
          className="mt-4 block w-full rounded-full border border-white/15 py-2.5 text-center text-sm font-semibold text-white transition hover:border-gold/40 hover:bg-gold/10 hover:text-gold-light"
        >
          I have one of these →
        </OfferCta>
      </div>
    </article>
  );
}

export default function AcquisitionGrid({
  offerHref,
  showSectionCta = false,
}: AcquisitionGridProps) {
  const cardOfferHref = offerHref ?? undefined;

  return (
    <section id="actively-buying" className="border-b border-white/5 bg-surface py-14 md:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-gold">
              We are actively buying
            </p>
            <h2 className="font-display mt-2 text-3xl text-white md:text-4xl">
              Luxury &amp; Exotic cars we want now
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-zinc-400">
            Discreet, competitive preliminary offers for pristine examples — recent market
            activity below.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ACQUISITION_TARGETS.map((vehicle) => (
            <AcquisitionCard key={vehicle.id} vehicle={vehicle} offerHref={cardOfferHref} />
          ))}
        </div>

        {showSectionCta && (
          <div className="mt-10 text-center">
            <OfferCta
              href={offerHref ?? BRAND.offerHref}
              className="inline-flex rounded-full bg-gold px-10 py-4 text-base font-semibold text-black transition hover:bg-gold-light"
            >
              Get your cash offer →
            </OfferCta>
            <p className="mt-3 text-xs text-zinc-500">
              Enter your VIN — preliminary offer in ~60 seconds
            </p>
          </div>
        )}

        <p className="mt-8 text-center text-xs leading-relaxed text-zinc-500">
          {ACQUISITION_DISCLAIMER}
        </p>
      </div>
    </section>
  );
}
