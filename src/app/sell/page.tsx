"use client";

import Link from "next/link";
import { useState } from "react";
import AccuTradeWidget from "../components/AccuTradeWidget";
import Footer from "../components/Footer";
import Header from "../components/Header";

type ContactData = {
  fullName: string;
  phone: string;
  email: string;
  validationPreference: "FaceTime" | "In-person" | "";
  bestTime: string;
  zip: string;
};

const inputClass =
  "w-full rounded-lg border border-white/10 bg-surface-elevated px-4 py-3 text-white placeholder-zinc-500 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30";

export default function SellPage() {
  const [submitted, setSubmitted] = useState(false);
  const [contact, setContact] = useState<ContactData>({
    fullName: "",
    phone: "",
    email: "",
    validationPreference: "",
    bestTime: "",
    zip: "",
  });

  const handleContactChange = (field: keyof ContactData, value: string) => {
    setContact((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("LCB validation request:", contact);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="mx-auto max-w-4xl px-6 pb-20 pt-28">
        {/* Intro — Car Trackers style: offer form is the page */}
        <div className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Instant cash offer</p>
          <h1 className="font-display mt-2 text-4xl text-white md:text-5xl">
            Get your preliminary offer
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
            Start below — same flow as leading instant-offer sites. Complete your vehicle
            details, receive a preliminary number, then schedule private FaceTime or
            in-person validation. Jin Falk Lexus of Beverly Hills standards.
          </p>
        </div>

        {/* Step 1: AccuTrade — primary flow (always visible) */}
        <section className="mb-16">
          <AccuTradeWidget />
          <p className="mt-4 text-center text-xs text-zinc-500">
            Preliminary offer only · Final number after private validation · No obligation
          </p>
        </section>

        {/* Step 2: Contact — scroll down after offer (Car Trackers: video appraisal booking) */}
        <section
          id="schedule-validation"
          className="scroll-mt-28 rounded-2xl border border-white/5 bg-surface p-6 sm:p-8"
        >
          <div className="mb-6 text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-gold">Next step</p>
            <h2 className="font-display mt-2 text-3xl text-white">
              Schedule private validation
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              After reviewing your preliminary offer above, tell us how to reach you for
              FaceTime or in-person confirmation.
            </p>
          </div>

          {submitted ? (
            <div className="rounded-xl bg-surface-elevated p-8 text-center">
              <p className="font-display text-2xl text-white">Thank you.</p>
              <p className="mt-2 text-zinc-400">
                Your private offer path continues — we&apos;ll contact you to validate your
                preliminary offer.
              </p>
              <Link
                href="/"
                className="mt-6 inline-block text-gold-light hover:text-gold"
              >
                ← Back to home
              </Link>
            </div>
          ) : (
            <form className="mx-auto max-w-xl space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="mb-1 block text-sm text-zinc-400">Full name</label>
                <input
                  type="text"
                  required
                  className={inputClass}
                  value={contact.fullName}
                  onChange={(e) => handleContactChange("fullName", e.target.value)}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm text-zinc-400">Phone</label>
                  <input
                    type="tel"
                    required
                    className={inputClass}
                    value={contact.phone}
                    onChange={(e) => handleContactChange("phone", e.target.value)}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-zinc-400">Email</label>
                  <input
                    type="email"
                    required
                    className={inputClass}
                    value={contact.email}
                    onChange={(e) => handleContactChange("email", e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm text-zinc-400">Preferred validation</label>
                <div className="flex gap-6">
                  {(["FaceTime", "In-person"] as const).map((opt) => (
                    <label key={opt} className="flex items-center gap-2 text-sm text-zinc-300">
                      <input
                        type="radio"
                        name="validation"
                        required
                        checked={contact.validationPreference === opt}
                        onChange={() => handleContactChange("validationPreference", opt)}
                        className="accent-[#c9a962]"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm text-zinc-400">Best time</label>
                  <input
                    type="text"
                    className={inputClass}
                    value={contact.bestTime}
                    onChange={(e) => handleContactChange("bestTime", e.target.value)}
                    placeholder="Weekday mornings"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-zinc-400">ZIP code</label>
                  <input
                    type="text"
                    required
                    className={inputClass}
                    value={contact.zip}
                    onChange={(e) => handleContactChange("zip", e.target.value)}
                    placeholder="90210"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-gold py-3 font-semibold text-black hover:bg-gold-light"
              >
                Request validation call →
              </button>
            </form>
          )}
        </section>

        <p className="mt-8 text-center text-sm text-zinc-600">
          <Link href="/" className="hover:text-gold-light">
            ← Back to home
          </Link>
        </p>
      </div>

      <Footer />
    </div>
  );
}
