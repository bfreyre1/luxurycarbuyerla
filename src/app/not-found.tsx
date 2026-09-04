import Link from "next/link";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { BRAND } from "./lib/brand";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto flex max-w-2xl flex-col items-center px-6 pb-24 pt-36 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-gold">404</p>
        <h1 className="font-display mt-3 text-4xl text-white md:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 text-muted">
          That link does not exist. Start your preliminary offer path instead.
        </p>
        <Link
          href={BRAND.offerHref}
          className="mt-8 inline-flex rounded-full bg-gold px-8 py-3.5 text-base font-semibold text-black transition hover:bg-gold-light"
        >
          Get Your Offer →
        </Link>
      </main>
      <Footer />
    </div>
  );
}
