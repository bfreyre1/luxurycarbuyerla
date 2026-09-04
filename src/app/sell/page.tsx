import type { Metadata } from "next";
import JsonLd from "../components/JsonLd";
import { BRAND } from "../lib/brand";
import SellLanding from "./SellLanding";

const sellTitle = "Sell My Luxury Car LA - Get Preliminary Cash Offer";
const sellDescription =
  "Get a preliminary cash offer for your luxury or exotic vehicle in Los Angeles. Jim Falk Lexus of Beverly Hills standards. FaceTime or in-person validation. No obligation.";

export const metadata: Metadata = {
  title: { absolute: sellTitle },
  description: sellDescription,
  alternates: { canonical: "/sell" },
  openGraph: {
    title: sellTitle,
    description: sellDescription,
    url: "/sell",
  },
};

const TRUST = [
  "Your preliminary offer path starts in ~60 seconds — final number after private validation",
  "Private validation — FaceTime or in-person only",
  "Immediate certified check upon acceptance",
  BRAND.trustLine,
];

const STEPS = [
  {
    step: "01",
    title: "Enter your vehicle",
    body: "VIN or year/make/model — exotic or daily luxury.",
  },
  {
    step: "02",
    title: "Get your preliminary offer",
    body: "See your number in minutes. Final amount after private validation.",
  },
  {
    step: "03",
    title: "Validate & get paid",
    body: `Our team at ${BRAND.dealerShortName} confirms by FaceTime or in-person — then certified check upon acceptance.`,
  },
];

const FAQ = [
  {
    q: "How fast do I get an offer?",
    a: "You’ll see a preliminary cash offer in about 60 seconds after submitting your vehicle details and photos.",
  },
  {
    q: "Is the preliminary offer guaranteed?",
    a: "No. The preliminary offer is based on the information you provide. A final offer is made only after a private validation (FaceTime or in-person) to confirm the vehicle’s condition.",
  },
  {
    q: "What happens during validation?",
    a: "We’ll schedule a quick FaceTime call or arrange an in-person inspection to verify the car matches the details you submitted. This usually takes 15–20 minutes.",
  },
  {
    q: "Do I have to sell if I get an offer?",
    a: "Absolutely not. There’s no obligation to accept our offer. You’re free to compare and decide.",
  },
  {
    q: "How do I get paid?",
    a: "Once you accept the final offer and validation is complete, we pay you by certified check.",
  },
  {
    q: "What kinds of cars do you buy?",
    a: "We buy luxury and exotic vehicles in Los Angeles and Southern California, including Lexus, Porsche, Mercedes-Benz, BMW, Tesla, Audi, Range Rover, Genesis, Cadillac Escalade, and exotics like Lamborghini, Ferrari, Rolls-Royce, McLaren, Aston Martin, Bentley, and Maserati.",
  },
  {
    q: "Who am I selling to?",
    a: `Luxury Car Buyer LA — in association with ${BRAND.dealerName}.`,
  },
];

export default function SellPage() {
  return (
    <>
      <JsonLd pathname="/sell" faq={FAQ} />
      <SellLanding trust={TRUST} steps={STEPS} faq={FAQ} />
    </>
  );
}
