"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { META_EVENTS, META_PIXEL_ID, metaPixelIdIsSafe, trackMeta } from "../lib/metaPixel";

export default function MetaPixel() {
  const pathname = usePathname();
  const skipFirstPage = useRef(true);

  useEffect(() => {
    if (skipFirstPage.current) {
      skipFirstPage.current = false;
      return;
    }
    trackMeta(META_EVENTS.pageView);
  }, [pathname]);

  if (!metaPixelIdIsSafe(META_PIXEL_ID)) return null;

  return (
    <>
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
          fbq('init', '${META_PIXEL_ID}');
          fbq('track', 'PageView');
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
