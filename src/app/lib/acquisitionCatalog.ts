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
    id: "lamborghini-urus",
    category: "Lamborghini",
    title: "Urus",
    yearFrom: "2022+",
    pricingYear: 2023,
    pricingMileage: 12000,
    maxMileage: 25000,
    subtitle: "S or Performante. Clean history, Southern California examples welcome.",
    priceLabel: "Recent market from",
    defaultPrice: 221000,
    image: "/images/acquisitions/lamborghini-urus.jpg",
    imageAlt: "2023 Lamborghini Urus",
    imageSlug: "lcb-acq-lamborghini-urus",
  },
  {
    id: "ferrari-roma",
    category: "Ferrari",
    title: "Roma",
    yearFrom: "2021+",
    pricingYear: 2022,
    pricingMileage: 8000,
    maxMileage: 20000,
    subtitle: "Coupe, documented service, low-mile private sellers welcome.",
    priceLabel: "Recent market from",
    defaultPrice: 162000,
    image: "/images/acquisitions/ferrari-roma.jpg",
    imageAlt: "2022 Ferrari Roma",
    imageSlug: "lcb-acq-ferrari-roma",
  },
  {
    id: "rolls-royce-cullinan",
    category: "Rolls-Royce",
    title: "Cullinan",
    yearFrom: "2022+",
    pricingYear: 2023,
    pricingMileage: 12000,
    maxMileage: 25000,
    subtitle: "Standard or Black Badge. Full history preferred.",
    priceLabel: "Recent market from",
    defaultPrice: 283000,
    image: "/images/acquisitions/rolls-royce-cullinan.jpg",
    imageAlt: "2023 Rolls-Royce Cullinan",
    imageSlug: "lcb-acq-rolls-royce-cullinan",
  },
];
