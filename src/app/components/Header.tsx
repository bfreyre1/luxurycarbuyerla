import Link from "next/link";

type HeaderProps = {
  landing?: boolean;
};

export default function Header({ landing = false }: HeaderProps) {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="group">
          <p className="font-display text-xl font-semibold tracking-wide text-white md:text-2xl">
            Luxury Car Buyer <span className="gold-gradient-text">LA</span>
          </p>
          <p className="text-[10px] uppercase tracking-[0.25em] text-muted">
            Beverly Hills standards
          </p>
        </Link>
        {!landing && (
          <nav className="flex items-center gap-6">
            <Link
              href="/#how-it-works"
              className="hidden text-sm text-zinc-400 transition hover:text-gold-light sm:inline"
            >
              How it works
            </Link>
            <Link
              href="/sell"
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
