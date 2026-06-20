import Image from "next/image";
import Link from "next/link";
import Footer from "./components/Footer";
import Header from "./components/Header";
import JimFalkAffiliation from "./components/JimFalkAffiliation";
import { BRAND } from "./lib/brand";

const EXOTICS = [
  "Lamborghini",
  "Ferrari",
  "Rolls-Royce",
  "McLaren",
  "Aston Martin",
  "Bentley",
];

const DAILY_LUXURY = [
  "Lexus",
  "Porsche",
  "Mercedes-Benz",
  "BMW",
  "Tesla",
  "Audi",
  "Range Rover",
];

const TRUST = [
  "Your preliminary offer path starts in ~60 seconds — final number after private validation",
  "Private validation — FaceTime or in-person only",
  "Immediate payment upon acceptance",
  BRAND.trustLine,
];

const STEPS = [
  {
    title: "Share your vehicle",
    body: "Make, model, year, mileage, condition, and photos — exotic or daily luxury.",
  },
  {
    title: "Receive your offer path",
    body: "Preliminary cash offer in minutes, grounded in LA market data.",
  },
  {
    title: "Validate & get paid",
    body: "Private FaceTime or in-person inspection, then accept for immediate payment.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative min-h-[90vh] overflow-hidden pt-24">
        <Image
          src="https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=2400&q=80"
          alt="Luxury exotic vehicle"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative mx-auto flex min-h-[calc(90vh-6rem)] max-w-7xl flex-col justify-center px-6 py-20">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            Los Angeles · Southern California
          </p>
          <h1 className="font-display max-w-4xl text-5xl font-semibold leading-tight text-white md:text-7xl">
            Beverly Hills standards for the{" "}
            <span className="gold-gradient-text italic">extraordinary.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-300 md:text-xl">
            From the Porsche, Mercedes, BMW, Lexus, and Tesla you drive every day to the
            Ferrari, Lamborghini, Rolls-Royce, McLaren, and Aston Martin that define
            moments — a preliminary cash offer in minutes, finalized privately. No
            obligation.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/sell"
              className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-4 text-base font-semibold text-black transition hover:bg-gold-light"
            >
              Get Your Offer →
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-4 text-base font-medium text-white transition hover:border-gold/50 hover:text-gold-light"
            >
              See how it works
            </Link>
          </div>
        </div>
      </section>

      {/* Brand strips */}
      <section className="border-y border-white/5 bg-surface py-10">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-4 text-center text-xs uppercase tracking-[0.3em] text-gold">
            Exotics & collector
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-zinc-400 md:text-base">
            {EXOTICS.map((brand) => (
              <span key={brand} className="text-zinc-300">
                {brand}
              </span>
            ))}
          </div>
          <div className="mx-auto my-8 h-px w-24 bg-gold/30" />
          <p className="mb-4 text-center text-xs uppercase tracking-[0.3em] text-muted">
            Daily luxury we buy every week
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-zinc-500 md:text-base">
            {DAILY_LUXURY.map((brand) => (
              <span key={brand}>{brand}</span>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-zinc-500">
            Same desk. Same standards. Every vehicle.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-display text-center text-4xl text-white md:text-5xl">
            How it works
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-muted">
            A private path from first details to payment — inspired by the best instant-offer
            flows, executed with Beverly Hills discretion.
          </p>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <div
                key={step.title}
                className="rounded-2xl border border-white/5 bg-surface-elevated p-8 transition hover:border-gold/20"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-lg font-semibold text-gold">
                  {i + 1}
                </div>
                <h3 className="font-display text-2xl text-white">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust + image */}
      <section className="border-t border-white/5 bg-surface py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <JimFalkAffiliation />
          </div>
          <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
              alt="Luxury Porsche"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
          <div>
            <h2 className="font-display text-4xl text-white md:text-5xl">
              Trust & transparency
            </h2>
            <p className="mt-4 text-muted">
              Quiet credibility — the kind that comes from established Beverly Hills luxury
              retail, not loud promises.
            </p>
            <ul className="mt-8 space-y-4">
              {TRUST.map((item) => (
                <li key={item} className="flex gap-3 text-zinc-300">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display text-4xl text-white md:text-5xl">
            Ready when you are.
          </h2>
          <p className="mt-4 text-lg text-muted">
            Start with your vehicle details. Your private offer path begins in minutes.
          </p>
          <Link
            href="/sell"
            className="mt-8 inline-flex rounded-full bg-gold px-10 py-4 text-base font-semibold text-black transition hover:bg-gold-light"
          >
            Get Started →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
