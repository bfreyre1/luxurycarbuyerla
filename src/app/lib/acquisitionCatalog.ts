/** Static acquisition card catalog — prices merged from acquisitionPrices.generated.json */

export type AcquisitionCatalogEntry = {
  id: string;
  category: string;
  title: string;
  /** Buy range shown to sellers — e.g. "2023+" */
  yearFrom: string;
  /** Exact model year sent to AccuTrade for the market comp */
  pricingYear: number;
  /** Exact odometer sent to AccuTrade — price badge is tied to this mileage */
  pricingMileage: number;
  /** Optional cap mentioned in subtitle — we still buy above comp miles up to this */
  maxMileage?: number;
  subtitle: string;
  priceLabel: string;
  defaultPrice: number;
  image: string;
  imageAlt: string;
  imageSlug: string;
};

export const ACQUISITION_CATALOG: AcquisitionCatalogEntry[] = [
  {
    id: "lexus-ls-500",
    category: "Lexus",
    title: "LS 500",
    yearFrom: "2023+",
    pricingYear: 2024,
    pricingMileage: 15000,
    maxMileage: 30000,
    subtitle: "One-owner, full Lexus service history preferred.",
    priceLabel: "Recent market from",
    defaultPrice: 85000,
    image: "/images/acquisitions/lexus-ls-500.jpg",
    imageAlt: "2023 Lexus LS 500 sedan",
    imageSlug: "lcb-acq-lexus-ls-500",
  },
  {
    id: "porsche-911-carrera-s",
    category: "Porsche",
    title: "911 Carrera S",
    yearFrom: "2022+",
    pricingYear: 2023,
    pricingMileage: 12000,
    maxMileage: 25000,
    subtitle: "992 generation, clean history, private sellers welcome.",
    priceLabel: "Recent market from",
    defaultPrice: 115000,
    image: "/images/acquisitions/porsche-911-carrera-s.jpg",
    imageAlt: "2022 Porsche 911 Carrera S",
    imageSlug: "lcb-acq-porsche-911-carrera-s",
  },
  {
    id: "mercedes-s-class",
    category: "Mercedes-Benz",
    title: "S-Class",
    yearFrom: "2023+",
    pricingYear: 2024,
    pricingMileage: 15000,
    maxMileage: 30000,
    subtitle: "Fully optioned, Southern California ownership preferred.",
    priceLabel: "Recent market from",
    defaultPrice: 105000,
    image: "/images/acquisitions/mercedes-s-class.jpg",
    imageAlt: "2023 Mercedes-Benz S-Class",
    imageSlug: "lcb-acq-mercedes-s-class",
  },
  {
    id: "bmw-7-series",
    category: "BMW",
    title: "7 Series",
    yearFrom: "2023+",
    pricingYear: 2024,
    pricingMileage: 15000,
    maxMileage: 30000,
    subtitle: "High-spec, dealer-maintained, immediate validation available.",
    priceLabel: "Recent market from",
    defaultPrice: 95000,
    image: "/images/acquisitions/bmw-7-series.jpg",
    imageAlt: "2023 BMW 7 Series",
    imageSlug: "lcb-acq-bmw-7-series",
  },
  {
    id: "tesla-model-s-plaid",
    category: "Tesla",
    title: "Model S Plaid",
    yearFrom: "2023+",
    pricingYear: 2024,
    pricingMileage: 12000,
    maxMileage: 25000,
    subtitle: "Clean title, original owner preferred.",
    priceLabel: "Recent market from",
    defaultPrice: 110000,
    image: "/images/acquisitions/tesla-model-s-plaid.jpg",
    imageAlt: "2023 Tesla Model S Plaid",
    imageSlug: "lcb-acq-tesla-model-s-plaid",
  },
  {
    id: "audi-rs7",
    category: "Audi",
    title: "RS 7",
    yearFrom: "2022+",
    pricingYear: 2023,
    pricingMileage: 12000,
    maxMileage: 25000,
    subtitle: "Performance spec, service records, LA market comps.",
    priceLabel: "Recent market from",
    defaultPrice: 98000,
    image: "/images/acquisitions/audi-rs7.jpg",
    imageAlt: "2022 Audi RS 7",
    imageSlug: "lcb-acq-audi-rs7",
  },
];
