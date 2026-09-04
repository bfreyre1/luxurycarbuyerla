import Link from "next/link";
import { LexusEmblem } from "./DealerLogos";
import { BRAND } from "../lib/brand";

type HeaderProps = {
  landing?: boolean;
};

export default function Header({ landing = false }: HeaderProps) {
  const offerLink = landing ? "#offer" : BRAND.offerHref;

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="group flex min-w-0 items-center gap-3">
          <LexusEmblem size={36} className="h-8 w-auto shrink-0 sm:h-9" priority />
          <span className="min-w-0">
            <p className="font-display text-xl font-semibold tracking-wide text-white md:text-2xl">
              Luxury Car Buyer <span className="gold-gradient-text">LA</span>
            </p>
            <p className="truncate text-[10px] uppercase tracking-[0.15em] text-muted sm:tracking-[0.2em]">
              {BRAND.poweredByLine}
            </p>
          </span>
        </Link>

        {landing ? (
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <a
              href={offerLink}
              className="hidden rounded-full bg-gold px-4 py-2 text-sm font-semibold text-black transition hover:bg-gold-light sm:inline-flex"
            >
              Get offer
            </a>
            <a
              href={`tel:${BRAND.phoneTel}`}
              className="rounded-full border border-gold/30 px-3 py-2 text-xs font-semibold text-gold-light transition hover:border-gold/60 hover:bg-gold/10 sm:px-4 sm:text-sm"
            >
              {BRAND.phone}
            </a>
          </div>
        ) : (
          <nav className="flex shrink-0 items-center gap-6">
            <Link
              href="/#how-it-works"
              className="hidden text-sm text-zinc-400 transition hover:text-gold-light sm:inline"
            >
              How it works
            </Link>
            <Link
              href={BRAND.offerHref}
              className="rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-gold-light"
            >
              Get Your Offer →
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
