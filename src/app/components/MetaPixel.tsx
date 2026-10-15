"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import {
  META_PIXEL_ID,
  metaPagePath,
  metaPixelIdIsSafe,
  metaPixelInitScript,
  trackMetaPageView,
} from "../lib/metaPixel";

function MetaRouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();

  useEffect(() => {
    trackMetaPageView(metaPagePath(pathname, search, window.location.hash));
  }, [pathname, search]);

  return null;
}

export default function MetaPixel() {
  if (!metaPixelIdIsSafe(META_PIXEL_ID)) return null;

  return (
    <>
      <Suspense fallback={null}>
        <MetaRouteTracker />
      </Suspense>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          ${metaPixelInitScript(META_PIXEL_ID)}
        `}
      </Script>
      <noscript>
        {/* Meta's noscript pixel is a 1x1 image. next/image does not run without JavaScript. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
