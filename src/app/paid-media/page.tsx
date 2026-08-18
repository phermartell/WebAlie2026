import type { Metadata } from "next";
import PaidMediaPageClient from "@/components/servicios/PaidMediaPage";
import JsonLd from "@/components/JsonLd";
import { createServiceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Publicidad Digital & Paid Ads | Alié Digital",
  description: "Campañas de Meta Ads, Google Ads y LinkedIn Ads con enfoque B2B y temática de alto impacto para adquisición y conversión digital.",
  openGraph: {
    title: "Publicidad Digital & Paid Ads | Alié Digital",
    description: "Campañas de Meta Ads, Google Ads y LinkedIn Ads con enfoque B2B y temática de alto impacto para adquisición y conversión digital.",
    url: "https://aliedigital.com/paid-media/",
    images: [{ url: "https://aliedigital.com/og-home.webp", width: 1200, height: 630, alt: "Publicidad Digital & Paid Ads | Alié Digital" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Publicidad Digital & Paid Ads | Alié Digital",
    description: "Campañas de Meta Ads, Google Ads y LinkedIn Ads con enfoque B2B y temática de alto impacto para adquisición y conversión digital.",
    images: ["https://aliedigital.com/og-home.webp"],
  },
};

export default function Page() {
  return <>
      <JsonLd data={createServiceSchema("/paid-media/", "Publicidad Digital & Paid Ads | Alié Digital", "Campañas de Meta Ads, Google Ads y LinkedIn Ads con enfoque B2B y temática de alto impacto.")} />
      <PaidMediaPageClient />
    </>;
}

