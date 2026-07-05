import { ACQUISITION_CATALOG } from "./acquisitionCatalog";
import generatedPrices from "./acquisitionPrices.generated.json";

export type AcquisitionTarget = {
  id: string;
  category: string;
  title: string;
  yearFrom: string;
  /** Model year used for the market comp (matches AccuTrade request) */
  pricingYear: number;
  /** Odometer used for the market comp (matches AccuTrade request) */
  pricingMileage: number;
  subtitle: string;
  priceLabel: string;
  price: number;
  image: string;
  imageAlt: string;
  imageSlug: string;
};

type GeneratedPriceEntry = {
  price: number;
  pricingYear?: number;
  pricingMileage?: number;
};

type GeneratedPricesFile = {
  updatedAt?: string;
  source?: string;
  prices: Record<string, GeneratedPriceEntry>;
};

const priceSnapshot = generatedPrices as GeneratedPricesFile;

export const ACQUISITION_PRICE_UPDATED_AT = priceSnapshot.updatedAt;
export const ACQUISITION_PRICE_SOURCE = priceSnapshot.source;

export const ACQUISITION_DISCLAIMER =
  "Values shown reflect recent LA market activity for the model year and mileage listed — not an offer for your vehicle. Your preliminary offer is calculated individually.";

export const ACQUISITION_TARGETS: AcquisitionTarget[] = ACQUISITION_CATALOG.map((entry) => {
  const generated = priceSnapshot.prices[entry.id];
  return {
    id: entry.id,
    category: entry.category,
    title: entry.title,
    yearFrom: entry.yearFrom,
    pricingYear: generated?.pricingYear ?? entry.pricingYear,
    pricingMileage: generated?.pricingMileage ?? entry.pricingMileage,
    subtitle: entry.subtitle,
    priceLabel: entry.priceLabel,
    price: generated?.price ?? entry.defaultPrice,
    image: entry.image,
    imageAlt: entry.imageAlt,
    imageSlug: entry.imageSlug,
  };
});

export function formatAcquisitionPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatCompMileage(miles: number): string {
  return `${new Intl.NumberFormat("en-US").format(miles)} mi`;
}

export function formatCompYear(year: number): string {
  return String(year);
}
