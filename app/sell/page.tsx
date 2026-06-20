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

const STEP_LABELS = ["Instant offer", "Your details", "Confirmation"];

const inputClass =
  "w-full rounded-lg border border-white/10 bg-surface-elevated px-4 py-3 text-white placeholder-zinc-500 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30";

export default function SellPage() {
  const [step, setStep] = useState(1);
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
    console.log("LCB lead submitted:", contact);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div
        className={`mx-auto px-6 pb-20 pt-28 ${step === 1 ? "max-w-4xl" : "max-w-2xl"}`}
      >
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Private offer path</p>
          <h1 className="font-display mt-2 text-4xl text-white">Get your offer</h1>
          <p className="mt-3 text-sm text-zinc-400">
            Preliminary offer below · Final number after private FaceTime or in-person
            validation
          </p>
        </div>

        {/* Progress */}
        <div className="mb-4 flex items-center justify-center gap-2">
          {[1, 2, 3].map((n) => (
            <div key={n} className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                  step >= n ? "bg-gold text-black" : "bg-surface-elevated text-zinc-500"
                }`}
              >
                {n}
              </div>
              {n < 3 && (
                <div className={`h-px w-10 sm:w-12 ${step > n ? "bg-gold" : "bg-white/10"}`} />
              )}
            </div>
          ))}
        </div>
        <p className="mb-10 text-center text-xs text-zinc-500">
          Step {step}: {STEP_LABELS[step - 1]}
        </p>

        {/* Step 1 — AccuTrade widget */}
        {step === 1 && (
          <div className="space-y-6 rounded-2xl border border-white/5 bg-surface p-6 sm:p-8">
            <div>
              <h2 className="font-display text-2xl text-white">Your preliminary offer</h2>
              <p className="mt-2 text-sm text-zinc-400">
                Complete the form below for your instant preliminary cash offer. Lexus to
                Lamborghini — same Beverly Hills standards.
              </p>
            </div>

            <AccuTradeWidget />

            <p className="text-center text-xs text-zinc-500">
              Preliminary offer only · Final offer after private validation · No obligation
            </p>

            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full rounded-full bg-gold py-3 font-semibold text-black hover:bg-gold-light"
            >
              Continue — schedule validation →
            </button>
            <p className="text-center text-xs text-zinc-500">
              Next: how we reach you for FaceTime or in-person confirmation
            </p>
          </div>
        )}

        {/* Step 2 — Contact */}
        {step === 2 && (
          <form
            className="space-y-6 rounded-2xl border border-white/5 bg-surface p-8"
            onSubmit={(e) => {
              e.preventDefault();
              setStep(3);
            }}
          >
            <h2 className="font-display text-2xl text-white">How to reach you</h2>
            <p className="text-sm text-zinc-400">
              We&apos;ll confirm your preliminary offer privately — FaceTime or in-person, your
              choice.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm text-zinc-400">Full name</label>
                <input
                  type="text"
                  required
                  className={inputClass}
                  value={contact.fullName}
                  onChange={(e) => handleContactChange("fullName", e.target.value)}
                />
              </div>
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
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm text-zinc-400">Preferred validation</label>
                <div className="flex gap-6">
                  {(["FaceTime", "In-person"] as const).map((opt) => (
                    <label key={opt} className="flex items-center gap-2 text-sm text-zinc-300">
                      <input
                        type="radio"
                        name="validation"
                        value={opt}
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
              <div>
                <label className="mb-1 block text-sm text-zinc-400">Best time to connect</label>
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

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="rounded-full border border-white/10 px-6 py-3 text-zinc-400 hover:text-white"
              >
                ← Back
              </button>
              <button
                type="submit"
                className="flex-1 rounded-full bg-gold py-3 font-semibold text-black hover:bg-gold-light"
              >
                Continue →
              </button>
            </div>
          </form>
        )}

        {/* Step 3 — Confirmation */}
        {step === 3 && (
          <form
            className="space-y-6 rounded-2xl border border-white/5 bg-surface p-8"
            onSubmit={handleSubmit}
          >
            <h2 className="font-display text-2xl text-white">You&apos;re all set</h2>

            <div className="space-y-3 rounded-xl bg-surface-elevated p-6 text-sm text-zinc-300">
              <p>
                <span className="text-gold">Contact:</span> {contact.fullName}
              </p>
              <p>
                <span className="text-gold">Phone:</span> {contact.phone}
              </p>
              <p>
                <span className="text-gold">Email:</span> {contact.email}
              </p>
              <p>
                <span className="text-gold">Validation:</span> {contact.validationPreference}
              </p>
              {contact.bestTime && (
                <p>
                  <span className="text-gold">Best time:</span> {contact.bestTime}
                </p>
              )}
              <p>
                <span className="text-gold">ZIP:</span> {contact.zip}
              </p>
            </div>

            <div className="space-y-2 text-center text-sm text-zinc-400">
              <p>Your private offer path begins now.</p>
              <p className="text-xs text-zinc-500">
                Jin Falk Lexus of Beverly Hills standards · Preliminary offer is not final until
                private validation
              </p>
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-gold py-4 text-base font-semibold text-black hover:bg-gold-light"
            >
              Submit →
            </button>

            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full text-sm text-zinc-500 hover:text-zinc-300"
            >
              ← Back
            </button>
          </form>
        )}

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
