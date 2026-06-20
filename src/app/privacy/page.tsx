import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { BRAND } from "../lib/brand";

export const metadata: Metadata = {
  title: `Privacy Policy | ${BRAND.siteName}`,
  description: `Privacy policy for ${BRAND.siteName}, affiliated with ${BRAND.dealerName}.`,
};

const SECTIONS = [
  {
    title: "Overview",
    body: [
      `${BRAND.siteName} ("we," "us," or "our") takes your privacy seriously and is committed to safeguarding your privacy online. This site is the private vehicle acquisition program affiliated with ${BRAND.dealerName}.`,
      "Because we gather certain types of information from visitors to our site — including through our instant cash offer form — we have developed this privacy statement to help you understand how that information is collected, used, and protected.",
      "This statement discloses the types of information we gather, how it is used, and how you can contact us regarding your data.",
    ],
  },
  {
    title: "Guiding principles",
    body: [
      "We respect the privacy of individuals who visit our website, submit vehicle or contact information, or participate in features and services we offer online.",
      "We maintain a strict no-spam policy. You will not receive unsolicited email messages from us beyond communications related to services you request.",
      "We collect information primarily to provide a relevant experience and to respond to your vehicle acquisition inquiries.",
      "We take reasonable physical, electronic, and managerial measures to safeguard information you provide (e.g., data stored in protected databases on secured servers with restricted access).",
      "We do not sell or rent your information to third parties for their marketing purposes without your consent, except as described below to provide services you request.",
    ],
  },
  {
    title: "Information you provide",
    body: [
      "When you use our instant offer form, request information, or contact us, you may provide personal information such as your name, email address, phone number, ZIP code, and vehicle details (VIN, license plate, year, make, model, mileage, and condition).",
      "This information is used to generate a preliminary offer, route your inquiry to our acquisition team, and communicate with you about private validation (FaceTime or in-person) and next steps.",
      "You may opt out of future marketing communications at any time by contacting us using the information below.",
    ],
  },
  {
    title: "Instant offer technology (AccuTrade)",
    body: [
      "Our instant preliminary offer experience is powered by AccuTrade, a third-party automotive technology provider. When you complete the offer form embedded on our site, information you enter may be processed by AccuTrade and transmitted to our dealer customer relationship management (CRM) systems.",
      "AccuTrade may perform phone or SMS verification as part of the offer process. Their handling of data is subject to their own privacy practices in addition to this policy.",
      "We use AccuTrade solely to provide the offer and lead services you request.",
    ],
  },
  {
    title: "Non-personally identifiable data",
    body: [
      "When you visit our website, we may collect non-personally identifiable information such as browser type, device type, IP address, referring URL, and pages viewed.",
      "We use this information to diagnose technical issues, administer the site, understand aggregate traffic patterns, and improve our content and user experience.",
    ],
  },
  {
    title: "Cookies and similar technologies",
    body: [
      'We and our service providers may use cookies and similar technologies to improve site functionality, remember preferences, and understand how visitors use our site.',
      'You can configure your browser to decline cookies; some features of the site may not function correctly if cookies are disabled.',
      "Third-party services embedded on our site (including AccuTrade and, if enabled, analytics or advertising tools) may set their own cookies subject to their respective policies.",
    ],
  },
  {
    title: "How we share information",
    body: [
      `${BRAND.dealerName} and its affiliated entities may share information among related dealership operations to fulfill your request.`,
      "Service providers: We may share information with companies that perform services on our behalf (e.g., CRM platforms, offer technology, hosting, and communications). These parties may only use information as needed to perform those services.",
      "Business partners: Where we partner with select providers to deliver expanded services, information submitted through interactive features may be available to both our dealership and necessary partners.",
      "Legal compliance: We may disclose information when required by law, court order, or when we believe disclosure is necessary to protect our rights, users, or the public.",
      "Business transfers: If dealership assets are sold or transferred, customer information may be transferred as part of that transaction.",
    ],
  },
  {
    title: "Third-party links",
    body: [
      `Our site contains links to third-party websites, including ${BRAND.dealerName}'s main website. We are not responsible for the privacy practices or content of external sites. We encourage you to review the privacy policy of any site you visit.`,
      `The main dealership privacy policy may also be available at: ${BRAND.dealerUrl}privacy-policy/`,
    ],
  },
  {
    title: "Do Not Track",
    body: [
      'Some browsers offer a "Do Not Track" (DNT) signal. Because there is not yet a uniform industry standard for responding to DNT signals, we do not currently respond to DNT signals on this website.',
    ],
  },
  {
    title: "California residents",
    body: [
      "If you are a California resident, you may have additional rights under the California Consumer Privacy Act (CCPA/CPRA), including the right to know what personal information we collect, request deletion, and opt out of certain sharing. To exercise these rights, contact us using the information below.",
    ],
  },
  {
    title: "Contact us",
    body: [
      `Questions about this Privacy Policy or our data practices may be directed to:`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <article className="mx-auto max-w-3xl px-6 pb-20 pt-28">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">Legal</p>
        <h1 className="font-display mt-2 text-4xl text-white md:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-zinc-500">
          Last updated: June 2026 · Applies to {BRAND.siteName} (
          luxurycarbuyerla.com and related pages)
        </p>

        <div className="prose prose-invert mt-10 max-w-none space-y-10">
          {SECTIONS.map((section) => (
            <section key={section.title}>
              <h2 className="font-display text-2xl text-white">{section.title}</h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-zinc-400">
                {section.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}

          <section className="rounded-xl border border-white/10 bg-surface-elevated p-6">
            <p className="font-semibold text-white">{BRAND.dealerName}</p>
            <p className="mt-2 text-sm text-zinc-400">
              9230 Wilshire Blvd
              <br />
              Beverly Hills, CA 90212
            </p>
            <p className="mt-3 text-sm">
              <a
                href={`tel:${BRAND.phoneTel}`}
                className="text-gold-light hover:text-gold"
              >
                {BRAND.phone}
              </a>
            </p>
            <p className="mt-3 text-sm">
              <Link
                href={BRAND.dealerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-light hover:text-gold"
              >
                {BRAND.dealerUrl}
              </Link>
            </p>
          </section>

          <p className="text-xs text-zinc-600">
            Portions of this policy are adapted from the Jim Falk Automotive Group
            dealer privacy standards, customized for {BRAND.siteName} and our
            instant offer program.
          </p>
        </div>

        <p className="mt-10 text-center text-sm">
          <Link href="/sell" className="text-gold-light hover:text-gold">
            ← Back to get your offer
          </Link>
        </p>
      </article>

      <Footer />
    </div>
  );
}
