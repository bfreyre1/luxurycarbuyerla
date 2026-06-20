import type { Metadata } from "next";
import { BRAND } from "../lib/brand";
import SellLanding from "./SellLanding";

export const metadata: Metadata = {
  title: `Get Your Cash Offer | ${BRAND.siteName}`,
  description: `Instant preliminary cash offer for luxury and exotic vehicles in Los Angeles. ${BRAND.dealerName}. Private validation. No obligation.`,
};

const TRUST = [
  "Preliminary offer in ~60 seconds",
  "Private FaceTime or in-person validation",
  `Backed by ${BRAND.dealerShortName}`,
  "No obligation · Discreet process",
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

export default function SellPage() {
  return <SellLanding trust={TRUST} steps={STEPS} />;
}
