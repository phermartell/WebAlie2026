import type { Metadata } from "next";
import PlaceholderPage from "@/components/PlaceholderPage";
import JsonLd from "@/components/JsonLd";
import { createServiceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Growth marketing B2B | Alié Digital",
  description: "Estrategias de growth marketing para empresas B2B.",
  openGraph: {
    title: "Growth marketing B2B | Alié Digital",
    description: "Estrategias de growth marketing para empresas B2B.",
    url: "https://aliedigital.com/growth-marketing-b2b/",
    images: [{ url: "https://aliedigital.com/og-home.webp", width: 1200, height: 630, alt: "Growth marketing B2B | Alié Digital" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Growth marketing B2B | Alié Digital",
    description: "Estrategias de growth marketing para empresas B2B.",
    images: ["https://aliedigital.com/og-home.webp"],
  },
};

export default function Page() {
  return <>
      <JsonLd data={createServiceSchema("/growth-marketing-b2b/", "Growth marketing B2B | Alié Digital", "Estrategias de growth marketing para empresas B2B.")} />
      <PlaceholderPage title="Growth marketing B2B" />
    </>;
}
