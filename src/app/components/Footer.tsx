import Link from "next/link";
import { BRAND } from "../lib/brand";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-surface py-12">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <p className="font-display text-2xl text-white">{BRAND.siteName}</p>
        <p className="mt-2 text-sm text-muted">
          Discreet acquisition backed by{" "}
          <Link
            href={BRAND.dealerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold-light transition hover:text-gold"
          >
            {BRAND.dealerName}
          </Link>{" "}
          standards
        </p>
        <p className="mt-3 text-sm text-zinc-500">
          <a
            href={`tel:${BRAND.phoneTel}`}
            className="transition hover:text-gold-light"
          >
            {BRAND.phone}
          </a>
          {" · "}
          {BRAND.serviceArea}
        </p>
        <p className="mt-6 text-xs text-zinc-600">
          © {new Date().getFullYear()} {BRAND.siteName} · {BRAND.serviceArea}
        </p>
      </div>
    </footer>
  );
}
