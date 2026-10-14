"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { trackMetaLead } from "../lib/metaPixel";

type OfferLinkProps = {
  href: string;
  className?: string;
  placement: string;
  children: ReactNode;
};

export default function OfferLink({ href, className, placement, children }: OfferLinkProps) {
  const onClick = () => trackMetaLead(placement);

  if (href.startsWith("#")) {
    return (
      <a href={href} className={className} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
