"use client";

import { useEffect } from "react";
import { loadVisitAdSource } from "../lib/adSource";

/** Keep the landing ad ids for the rest of this visit, including the move to /sell. */
export default function AdSourceCapture() {
  useEffect(() => {
    loadVisitAdSource();
  }, []);
  return null;
}
