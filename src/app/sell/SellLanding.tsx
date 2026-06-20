"use client";

import AccuTradeWidget from "../components/AccuTradeWidget";
import Footer from "../components/Footer";
import Header from "../components/Header";

type Step = {
  step: string;
  title: string;
  body: string;
};

type SellLandingProps = {
  trust: string[];
  steps: Step[];
};

export default function SellLanding({ trust, steps }: SellLandingProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header landing />

      {/* PPC hero — short, ad-aligned, no scroll required to start */}
      <section className="border-b border-white/5 bg-surface/50 pt-28 pb-10">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-gold">
            Los Angeles · Instant cash offer
          </p>
          <h1 className="font-display mt-3 text-4xl font-semibold leading-tight text-white md:text-5xl">
            Sell your luxury car.{" "}
            <span className="gold-gradient-text italic">Get paid fast.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-zinc-400 md:text-lg">
            From Porsche and Mercedes to Ferrari and Lamborghini — enter your vehicle
            below for a preliminary cash offer. Jin Falk Lexus of Beverly Hills standards.
          </p>
          <ul className="mt-6 flex flex-col items-center gap-2 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6">
            {trust.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-zinc-300">
                <span className="text-gold" aria-hidden>
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Primary conversion — AccuTrade handles vehicle + contact + CRM */}
      <section className="mx-auto max-w-3xl px-6 py-10 md:py-12">
        <AccuTradeWidget />
        <p className="mt-4 text-center text-xs text-zinc-500">
          Secure form · Preliminary offer only · Our team contacts you to schedule
          private validation
        </p>
      </section>

      {/* What happens next — reassurance without duplicate fields */}
      <section className="border-t border-white/5 bg-surface py-14">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-10 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-gold">What happens next</p>
            <h2 className="font-display mt-2 text-3xl text-white md:text-4xl">
              Simple, private, no runaround
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((item) => (
              <div
                key={item.step}
                className="rounded-xl border border-white/5 bg-surface-elevated p-6 text-center md:text-left"
              >
                <p className="font-display text-3xl text-gold/40">{item.step}</p>
                <h3 className="font-display mt-2 text-xl text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust close — PPC footer reassurance */}
      <section className="border-t border-white/5 py-12">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <p className="font-display text-2xl text-white">
            Beverly Hills standards for the extraordinary.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            Luxury Car Buyer LA is backed by Jin Falk Lexus of Beverly Hills. Your
            information is handled securely and routed to our acquisition team — no
            obligation until you accept your final offer.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
