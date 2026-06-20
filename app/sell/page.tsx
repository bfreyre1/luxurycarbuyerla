"use client";

import Link from "next/link";
import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

type StepKey = "step1" | "step2";

type FormData = {
  step1: {
    year: string;
    make: string;
    model: string;
    mileage: string;
    vin: string;
    condition: string;
    notes: string;
    photos: File[];
  };
  step2: {
    fullName: string;
    phone: string;
    email: string;
    validationPreference: "FaceTime" | "In-person" | "";
    bestTime: string;
    zip: string;
  };
};

const inputClass =
  "w-full rounded-lg border border-white/10 bg-surface-elevated px-4 py-3 text-white placeholder-zinc-500 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30";

export default function SellPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    step1: {
      year: "",
      make: "",
      model: "",
      mileage: "",
      vin: "",
      condition: "",
      notes: "",
      photos: [],
    },
    step2: {
      fullName: "",
      phone: "",
      email: "",
      validationPreference: "",
      bestTime: "",
      zip: "",
    },
  });

  const handleChange = (s: StepKey, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [s]: { ...prev[s], [field]: value },
    }));
  };

  const handlePhotoChange = (files: FileList | null) => {
    if (files) {
      setFormData((prev) => ({
        ...prev,
        step1: { ...prev.step1, photos: Array.from(files) },
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="mx-auto max-w-2xl px-6 pb-20 pt-28">
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Private offer path</p>
          <h1 className="font-display mt-2 text-4xl text-white">Get your offer</h1>
        </div>

        {/* Progress */}
        <div className="mb-10 flex items-center justify-center gap-2">
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
                <div
                  className={`h-px w-12 ${step > n ? "bg-gold" : "bg-white/10"}`}
                />
              )}
            </div>
          ))}
        </div>

        {step === 1 && (
          <form
            className="space-y-6 rounded-2xl border border-white/5 bg-surface p-8"
            onSubmit={(e) => {
              e.preventDefault();
              setStep(2);
            }}
          >
            <h2 className="font-display text-2xl text-white">Tell us about your vehicle</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm text-zinc-400">Year</label>
                <input
                  type="number"
                  min={1980}
                  max={2026}
                  className={inputClass}
                  value={formData.step1.year}
                  onChange={(e) => handleChange("step1", "year", e.target.value)}
                  placeholder="2022"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-zinc-400">Make</label>
                <input
                  type="text"
                  className={inputClass}
                  value={formData.step1.make}
                  onChange={(e) => handleChange("step1", "make", e.target.value)}
                  placeholder="Porsche"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-zinc-400">Model</label>
                <input
                  type="text"
                  className={inputClass}
                  value={formData.step1.model}
                  onChange={(e) => handleChange("step1", "model", e.target.value)}
                  placeholder="911 Turbo S"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-zinc-400">Mileage</label>
                <input
                  type="number"
                  min={0}
                  className={inputClass}
                  value={formData.step1.mileage}
                  onChange={(e) => handleChange("step1", "mileage", e.target.value)}
                  placeholder="12000"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-zinc-400">VIN (optional)</label>
                <input
                  type="text"
                  className={inputClass}
                  value={formData.step1.vin}
                  onChange={(e) => handleChange("step1", "vin", e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-zinc-400">Condition</label>
                <select
                  className={inputClass}
                  value={formData.step1.condition}
                  onChange={(e) => handleChange("step1", "condition", e.target.value)}
                >
                  <option value="">Select condition</option>
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                  <option value="Needs attention">Needs attention</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm text-zinc-400">Notes (optional)</label>
              <textarea
                rows={3}
                className={inputClass}
                value={formData.step1.notes}
                onChange={(e) => handleChange("step1", "notes", e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-zinc-400">Photos (3–5 recommended)</label>
              <input
                type="file"
                accept="image/*"
                multiple
                className="text-sm text-zinc-400"
                onChange={(e) => handlePhotoChange(e.target.files)}
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-gold py-3 font-semibold text-black hover:bg-gold-light"
            >
              Continue →
            </button>
            <p className="text-center text-xs text-zinc-500">Next: how we reach you</p>
          </form>
        )}

        {step === 2 && (
          <form
            className="space-y-6 rounded-2xl border border-white/5 bg-surface p-8"
            onSubmit={(e) => {
              e.preventDefault();
              setStep(3);
            }}
          >
            <h2 className="font-display text-2xl text-white">How to reach you</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm text-zinc-400">Full name</label>
                <input
                  type="text"
                  className={inputClass}
                  value={formData.step2.fullName}
                  onChange={(e) => handleChange("step2", "fullName", e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-zinc-400">Phone</label>
                <input
                  type="tel"
                  className={inputClass}
                  value={formData.step2.phone}
                  onChange={(e) => handleChange("step2", "phone", e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-zinc-400">Email</label>
                <input
                  type="email"
                  className={inputClass}
                  value={formData.step2.email}
                  onChange={(e) => handleChange("step2", "email", e.target.value)}
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
                        checked={formData.step2.validationPreference === opt}
                        onChange={() => handleChange("step2", "validationPreference", opt)}
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
                  value={formData.step2.bestTime}
                  onChange={(e) => handleChange("step2", "bestTime", e.target.value)}
                  placeholder="Weekday mornings"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-zinc-400">ZIP code</label>
                <input
                  type="text"
                  className={inputClass}
                  value={formData.step2.zip}
                  onChange={(e) => handleChange("step2", "zip", e.target.value)}
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
            <p className="text-center text-xs text-zinc-500">Next: review your offer path</p>
          </form>
        )}

        {step === 3 && (
          <form
            className="space-y-6 rounded-2xl border border-white/5 bg-surface p-8"
            onSubmit={handleSubmit}
          >
            <h2 className="font-display text-2xl text-white">Review and submit</h2>
            <div className="space-y-3 rounded-xl bg-surface-elevated p-6 text-sm text-zinc-300">
              <p>
                <span className="text-gold">Vehicle:</span> {formData.step1.year}{" "}
                {formData.step1.make} {formData.step1.model}
              </p>
              <p>
                <span className="text-gold">Mileage:</span> {formData.step1.mileage}
              </p>
              <p>
                <span className="text-gold">Condition:</span> {formData.step1.condition}
              </p>
              <p>
                <span className="text-gold">Contact:</span> {formData.step2.fullName} ·{" "}
                {formData.step2.phone}
              </p>
              <p>
                <span className="text-gold">Validation:</span>{" "}
                {formData.step2.validationPreference}
              </p>
            </div>
            <p className="text-center text-sm text-zinc-500">
              Your private offer path begins now.
            </p>
            <button
              type="submit"
              className="w-full rounded-full bg-gold py-4 text-base font-semibold text-black hover:bg-gold-light"
            >
              Get My Offer →
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
