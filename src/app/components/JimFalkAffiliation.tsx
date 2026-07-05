import Image from "next/image";
import Link from "next/link";
import { BRAND } from "../lib/brand";

type JimFalkAffiliationProps = {
  compact?: boolean;
};

function DealerLockup({ large = false }: { large?: boolean }) {
  const emblemSize = large ? 56 : 40;
  return (
    <div className="flex items-center gap-4">
      <Image
        src="/images/lexus-L-emblem.svg"
        alt=""
        width={emblemSize}
        height={emblemSize}
        className="shrink-0"
        aria-hidden
      />
      <div className={large ? "text-left" : "text-left"}>
        <p
          className={`font-display font-semibold leading-tight text-white ${
            large ? "text-2xl md:text-3xl" : "text-lg"
          }`}
        >
          {BRAND.dealerShortName}
        </p>
        <p className={`text-gold-light ${large ? "text-base" : "text-sm"}`}>
          of Beverly Hills
        </p>
        {large && (
          <p className="mt-2 text-sm text-zinc-400">{BRAND.dealerAddress}</p>
        )}
      </div>
    </div>
  );
}

export default function JimFalkAffiliation({ compact = false }: JimFalkAffiliationProps) {
  if (compact) {
    return (
      <div className="rounded-xl border border-white/10 bg-surface-elevated px-5 py-4">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href={BRAND.dealerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 transition opacity-90 hover:opacity-100"
            aria-label={`${BRAND.dealerName} — visit website`}
          >
            <DealerLockup />
          </Link>
          <p className="max-w-xl text-center text-sm leading-relaxed text-zinc-300 sm:text-left">
            {BRAND.poweredByLine}. Preliminary offers only — final after private
            validation.
          </p>
          <div className="flex shrink-0 flex-col items-center gap-1 sm:items-end">
            <a
              href={`tel:${BRAND.phoneTel}`}
              className="text-base font-semibold text-white transition hover:text-gold-light"
            >
              {BRAND.phone}
            </a>
            <Link
              href={BRAND.dealerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-zinc-500 transition hover:text-gold-light"
            >
              Visit dealer website →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-surface-elevated px-8 py-8">
      <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:justify-between">
        <Link
          href={BRAND.dealerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="transition opacity-95 hover:opacity-100"
          aria-label={`${BRAND.dealerName} — visit website`}
        >
          <DealerLockup large />
        </Link>

        <div className="max-w-xl text-center md:text-left">
          <p className="text-sm leading-relaxed text-zinc-300">{BRAND.affiliationLine}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-gold">
            {BRAND.poweredByLine}
          </p>
        </div>

        <div className="flex shrink-0 flex-col items-center gap-2 md:items-end">
          <Image
            src="/images/lexus-logo.svg"
            alt="Lexus"
            width={100}
            height={28}
            className="h-6 w-auto opacity-90"
          />
          <a
            href={`tel:${BRAND.phoneTel}`}
            className="text-lg font-semibold text-white transition hover:text-gold-light"
          >
            {BRAND.phone}
          </a>
          <Link
            href={BRAND.dealerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-zinc-500 transition hover:text-gold-light"
          >
            jimfalkbeverlyhillslexus.com →
          </Link>
        </div>
      </div>
    </div>
  );
}
