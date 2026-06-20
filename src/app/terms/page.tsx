import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { BRAND } from "../lib/brand";

export const metadata: Metadata = {
  title: `Terms of Use | ${BRAND.siteName}`,
  description: `Terms of use for ${BRAND.siteName}, affiliated with ${BRAND.dealerName}.`,
};

const SECTIONS = [
  {
    title: "Acceptance of terms",
    body: [
      `Welcome to ${BRAND.siteName}. By accessing or using this website (including our instant cash offer form), you agree to these Terms of Use. If you do not agree, please do not use this site.`,
      `This website is operated as the private vehicle acquisition program affiliated with ${BRAND.dealerName} ("Dealership"). References to "we," "us," or "our" include ${BRAND.siteName} and the Dealership, unless the context requires otherwise.`,
    ],
  },
  {
    title: "About our service",
    body: [
      `${BRAND.siteName} provides a convenient way to submit vehicle information and receive a preliminary cash offer for luxury, exotic, and premium vehicles in the Los Angeles area and surrounding Southern California markets.`,
      "Our service is designed to help sellers begin a private, no-obligation acquisition conversation. Submitting information does not create a binding contract to sell your vehicle.",
      "Final purchase terms, if any, are determined only after private validation of your vehicle — including FaceTime or in-person inspection — and mutual agreement on price and conditions.",
    ],
  },
  {
    title: "Preliminary offers — important disclaimer",
    body: [
      "Any dollar amount displayed through our instant offer tool is a preliminary estimate only. It is not a guaranteed purchase price, binding offer, or commitment to buy.",
      "Preliminary offers are based on information you provide and market data available at the time of submission. Actual value may differ after inspection of your vehicle's condition, history, mileage, equipment, modifications, market demand, and other factors.",
      "We reserve the right to revise or withdraw any preliminary offer at any time prior to a signed agreement.",
      "You are under no obligation to accept any offer or proceed with a sale.",
    ],
  },
  {
    title: "Your responsibilities",
    body: [
      "You agree to provide accurate, complete, and truthful information about yourself and your vehicle. Inaccurate information may result in offer adjustment, cancellation, or refusal to proceed.",
      "You represent that you have the legal authority to offer the vehicle for sale and that the vehicle is free of undisclosed liens or encumbrances, except as disclosed to us in writing.",
      "You agree to cooperate with reasonable requests for documentation, photos, validation appointments, and verification needed to complete the acquisition process.",
    ],
  },
  {
    title: "Instant offer technology (AccuTrade)",
    body: [
      "Our preliminary offer experience is powered by AccuTrade, an independent third-party technology provider. By using the embedded offer form, you acknowledge that your submissions may be processed by AccuTrade and transmitted to our Dealership systems.",
      "AccuTrade may use phone, SMS, or email verification as part of its process. Standard message and data rates may apply. AccuTrade's own terms and policies may apply to its technology and services.",
      "We are not responsible for temporary unavailability, errors, or interruptions in third-party offer technology, though we work to maintain a reliable experience.",
    ],
  },
  {
    title: "Communications",
    body: [
      "By submitting your contact information, you consent to being contacted by the Dealership — including by phone, text message, or email — regarding your inquiry, preliminary offer, and scheduling of private validation.",
      "You may opt out of marketing communications at any time by contacting us using the information below. Transactional communications related to an active inquiry may still be sent as reasonably necessary.",
    ],
  },
  {
    title: "Website use and conduct",
    body: [
      "You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of others or restrict their use of the site.",
      "You may not attempt to gain unauthorized access to our systems, scrape or harvest data from the site, interfere with site operation, or use automated tools in a way that imposes an unreasonable load on our infrastructure.",
      "We reserve the right to refuse service, cancel submissions, or restrict access to the site at our discretion, including for suspected fraud, abuse, or violation of these terms.",
    ],
  },
  {
    title: "Intellectual property",
    body: [
      `All content on this website — including text, graphics, logos, design, and layout — is owned by or licensed to ${BRAND.siteName}, the Dealership, or their respective licensors and is protected by applicable intellectual property laws.`,
      "You may not copy, reproduce, distribute, or create derivative works from site content without prior written permission, except for personal, non-commercial use necessary to use the site as intended.",
      "Lexus and other manufacturer names and logos are trademarks of their respective owners. Use on this site is for identification purposes only and does not imply endorsement beyond our authorized dealership relationship where applicable.",
    ],
  },
  {
    title: "Disclaimer of warranties",
    body: [
      'This website and all content, tools, and preliminary offer information are provided on an "as is" and "as available" basis without warranties of any kind, whether express or implied, including implied warranties of merchantability, fitness for a particular purpose, or non-infringement.',
      "We do not warrant that the site will be uninterrupted, error-free, or free of viruses or other harmful components.",
    ],
  },
  {
    title: "Limitation of liability",
    body: [
      "To the fullest extent permitted by law, neither the Dealership nor its affiliates, officers, employees, or agents shall be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of this website or reliance on any preliminary offer or site content.",
      "Our total liability for any claim arising from your use of the site shall not exceed the amount you paid to use the site (typically zero) or one hundred U.S. dollars ($100), whichever is greater, except where such limitation is prohibited by law.",
    ],
  },
  {
    title: "Indemnification",
    body: [
      "You agree to indemnify and hold harmless the Dealership and its affiliates from any claims, damages, losses, or expenses (including reasonable attorneys' fees) arising from your use of the site, your submitted information, your vehicle representations, or your violation of these Terms of Use.",
    ],
  },
  {
    title: "Third-party links",
    body: [
      `This site may link to third-party websites, including ${BRAND.dealerUrl}. We are not responsible for the content, policies, or practices of external sites. Your use of third-party sites is at your own risk and subject to their terms.`,
    ],
  },
  {
    title: "Governing law",
    body: [
      "These Terms of Use are governed by the laws of the State of California, without regard to conflict-of-law principles.",
      "Any dispute arising from these terms or your use of the site shall be brought in the state or federal courts located in Los Angeles County, California, and you consent to the jurisdiction of such courts.",
    ],
  },
  {
    title: "Changes to these terms",
    body: [
      "We may update these Terms of Use from time to time. Changes will be posted on this page with an updated date. Continued use of the site after changes constitutes acceptance of the revised terms.",
    ],
  },
  {
    title: "Contact us",
    body: [
      "Questions about these Terms of Use may be directed to:",
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <article className="mx-auto max-w-3xl px-6 pb-20 pt-28">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">Legal</p>
        <h1 className="font-display mt-2 text-4xl text-white md:text-5xl">
          Terms of Use
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
            These terms are adapted from standard Jim Falk dealer website practices
            and customized for {BRAND.siteName}, our preliminary offer program, and
            applicable California consumer requirements. Please review with dealership
            counsel before paid advertising launch.
          </p>
        </div>

        <p className="mt-10 flex flex-wrap justify-center gap-4 text-sm">
          <Link href="/privacy" className="text-gold-light hover:text-gold">
            Privacy Policy
          </Link>
          <Link href="/sell" className="text-gold-light hover:text-gold">
            ← Back to get your offer
          </Link>
        </p>
      </article>

      <Footer />
    </div>
  );
}
