"use client";

import Link from "next/link";
import type { ReactNode } from "react";

type OfferLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

export default function OfferLink({ href, className, children }: OfferLinkProps) {
  if (href.startsWith("#")) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
