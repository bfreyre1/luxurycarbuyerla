import { BRAND } from "../lib/brand";
import { SITE_URL } from "../lib/site";

type FaqItem = {
  q: string;
  a: string;
};

type JsonLdProps = {
  pathname?: string;
  faq?: FaqItem[];
};

export default function JsonLd({ pathname = "/", faq }: JsonLdProps) {
  const pageUrl = `${SITE_URL}${pathname === "/" ? "" : pathname}`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AutoDealer",
        "@id": `${SITE_URL}/#dealer`,
        name: BRAND.siteName,
        description: BRAND.metaDescription,
        url: SITE_URL,
        telephone: BRAND.phone,
        image: `${SITE_URL}/images/hero-lcb.jpg`,
        parentOrganization: {
          "@type": "AutoDealer",
          name: BRAND.dealerName,
          url: BRAND.dealerUrl,
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "9230 Wilshire Blvd",
          addressLocality: "Beverly Hills",
          addressRegion: "CA",
          postalCode: "90212",
          addressCountry: "US",
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: BRAND.serviceArea,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: BRAND.siteName,
        url: SITE_URL,
        description: BRAND.metaDescription,
        publisher: { "@id": `${SITE_URL}/#dealer` },
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name:
          pathname === "/sell"
            ? "Sell My Luxury Car LA - Get Preliminary Cash Offer"
            : `${BRAND.siteName} - Beverly Hills Standard Cash Offers`,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#dealer` },
      },
      ...(faq?.length
        ? [
            {
              "@type": "FAQPage",
              "@id": `${pageUrl}#faq`,
              mainEntity: faq.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.a,
                },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
