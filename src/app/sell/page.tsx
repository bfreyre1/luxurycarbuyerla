import type { Metadata } from "next";
import { BRAND } from "../lib/brand";
import SellLanding from "./SellLanding";

export const metadata: Metadata = {
  title: "Sell My Luxury Car LA - Get Preliminary Cash Offer",
  description:
    "Get a preliminary cash offer for your luxury or exotic vehicle in Los Angeles. Jim Falk Lexus of Beverly Hills standards. FaceTime or in-person validation. No obligation.",
};

const TRUST = [
  "Your preliminary offer path starts in ~60 seconds — final number after private validation",
  "Private validation — FaceTime or in-person only",
  "Immediate payment upon acceptance",
  BRAND.trustLine,
];

const STEPS = [
  {
    step: "01",
    title: "Enter your vehicle",
    body: "VIN, plate, or year/make/model — exotic or daily luxury.",
  },
  {
    step: "02",
    title: "Get your preliminary offer",
    body: "See your number in minutes. Final amount after private validation.",
  },
  {
    step: "03",
    title: "Validate & get paid",
    body: `Our team at ${BRAND.dealerShortName} reaches out for FaceTime or in-person confirmation.`,
  },
];

const FAQ = [
  {
    q: "How fast do I get an offer?",
    a: "Preliminary cash offer in ~60 seconds after submitting vehicle details and photos.",
  },
  {
    q: "Is the offer final?",
    a: "No — final offer only after private FaceTime or in-person validation.",
  },
  {
    q: "Do I have to sell?",
    a: "No obligation. Review your offer and decide.",
  },
  {
    q: "What vehicles do you buy?",
    a: "Lexus, Porsche, Mercedes-Benz, BMW, Tesla, Audi, Range Rover plus exotics: Lamborghini, Ferrari, Rolls-Royce, McLaren, Aston Martin, Bentley.",
  },
  {
    q: "How do I get paid?",
    a: "Immediate payment via bank transfer or certified check upon acceptance and validation.",
  },
  {
    q: "Who am I selling to?",
    a: `Luxury Car Buyer LA — in association with ${BRAND.dealerName}.`,
  },
];

export default function SellPage() {
  return <SellLanding trust={TRUST} steps={STEPS} faq={FAQ} />;
}
