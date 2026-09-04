import Link from "next/link";
import { LexusLockup } from "./DealerLogos";
import { BRAND } from "../lib/brand";

type JimFalkAffiliationProps = {
  compact?: boolean;
};

function DealerLockup({ large = false }: { large?: boolean }) {
  return (
    <div className={`flex flex-col ${large ? "items-start gap-3" : "items-start gap-2"}`}>
      <LexusLockup className={large ? "h-12 w-auto md:h-14" : "h-8 w-auto sm:h-9"} />
      <div className="text-left">
        <p
          className={`font-display font-semibold leading-tight text-white ${
            large ? "text-2xl md:text-3xl" : "text-lg"
          }`}
        >
          {BRAND.dealerName}
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
