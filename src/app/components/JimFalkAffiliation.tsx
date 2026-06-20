import Image from "next/image";
import Link from "next/link";
import { BRAND } from "../lib/brand";

type JimFalkAffiliationProps = {
  compact?: boolean;
};

export default function JimFalkAffiliation({ compact = false }: JimFalkAffiliationProps) {
  return (
    <div
      className={`rounded-xl border border-white/10 bg-surface-elevated ${
        compact ? "px-5 py-4" : "px-6 py-5"
      }`}
    >
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href={BRAND.dealerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 transition opacity-90 hover:opacity-100"
          aria-label={`${BRAND.dealerName} — visit website`}
        >
          <Image
            src="/images/lexus-logo.svg"
            alt="Lexus"
            width={120}
            height={32}
            className="h-7 w-auto md:h-8"
          />
        </Link>

        <div className={`text-center sm:text-left ${compact ? "max-w-xl" : "max-w-2xl"}`}>
          <p className="text-sm leading-relaxed text-zinc-300">
            {compact ? (
              <>
                Affiliated with{" "}
                <span className="text-gold-light">{BRAND.dealerName}</span>
              </>
            ) : (
              BRAND.affiliationLine
            )}
          </p>
        </div>

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
