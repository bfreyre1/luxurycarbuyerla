/** Canonical public origin — override with NEXT_PUBLIC_SITE_URL when luxurycarbuyerla.com is live */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://luxurycarbuyerla.vercel.app"
).replace(/\/$/, "");
