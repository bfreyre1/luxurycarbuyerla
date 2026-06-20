/** Editable acquisition targets — update prices from team market / auction data weekly */

export type AcquisitionTarget = {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  /** Display on badge — e.g. recent sale or market floor */
  priceLabel: string;
  price: number;
  image: string;
  imageAlt: string;
};

export const ACQUISITION_DISCLAIMER =
  "Values shown reflect recent LA market activity and comparable sales — not an offer for your vehicle. Your preliminary offer is calculated individually.";

export const ACQUISITION_TARGETS: AcquisitionTarget[] = [
  {
    id: "ferrari-12cilindri",
    category: "Ferrari",
    title: "12Cilindri & Purosangue",
    subtitle: "Low-mileage, allocation-ready examples. Confidential cash path.",
    priceLabel: "Recent market from",
    price: 729000,
    image:
      "https://images.unsplash.com/photo-1583121274602-3e2820f50fa2?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Ferrari exotic sports car",
  },
  {
    id: "porsche-911-turbo",
    category: "Porsche",
    title: "911 Turbo S",
    subtitle: "992-generation, clean history, private sellers welcome.",
    priceLabel: "Recent sale from",
    price: 325000,
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Porsche 911 Turbo",
  },
  {
    id: "range-rover-sv",
    category: "Range Rover",
    title: "Range Rover SV",
    subtitle: "Fully optioned, Southern California ownership preferred.",
    priceLabel: "Recent market from",
    price: 285000,
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Range Rover luxury SUV",
  },
  {
    id: "ferrari-roma",
    category: "Ferrari",
    title: "Roma",
    subtitle: "GT profiles with service records and minimal ownership.",
    priceLabel: "Recent sale from",
    price: 295000,
    image:
      "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Ferrari Roma",
  },
  {
    id: "mercedes-amg-gt",
    category: "Mercedes-AMG",
    title: "GT 63",
    subtitle: "High-spec AMG, one-owner and dealer-maintained preferred.",
    priceLabel: "Recent market from",
    price: 245000,
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Mercedes-AMG GT",
  },
  {
    id: "bmw-m8",
    category: "BMW",
    title: "M8 Competition",
    subtitle: "Competition packages, low miles, immediate validation available.",
    priceLabel: "Recent sale from",
    price: 165000,
    image:
      "https://images.unsplash.com/photo-1555215695-3004980adade?auto=format&fit=crop&w=800&q=80",
    imageAlt: "BMW M8",
  },
];

export function formatAcquisitionPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
