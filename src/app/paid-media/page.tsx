import type { Metadata } from "next";
import PaidMediaPageClient from "@/components/servicios/PaidMediaPage";
import JsonLd from "@/components/JsonLd";
import { createServiceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Paid Media y Publicidad Digital en Redes | Alié Digital",
  description: "Campañas de Google Ads, Meta Ads y LinkedIn Ads B2B. Maximizamos el retorno de tu inversión publicitaria y la captación de leads comerciales de valor.",
  alternates: {
    canonical: "https://aliedigital.com/paid-media/",
    languages: {
      "es-MX": "https://aliedigital.com/paid-media/",
      "x-default": "https://aliedigital.com/paid-media/",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Alié Digital",
    title: "Paid Media y Publicidad Digital B2B en Redes | Alié Digital",
    description: "Creamos campañas de Google Ads, Meta Ads y LinkedIn Ads B2B. Maximizamos el retorno de tu inversión publicitaria y la captación de leads comerciales de valor.",
    url: "https://aliedigital.com/paid-media/",
    images: [
      {
        url: "https://aliedigital.com/og-home.webp",
        width: 1200,
        height: 630,
        alt: "Alié Digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@AlieDigital",
    title: "Paid Media y Publicidad Digital B2B en Redes | Alié Digital",
    description: "Creamos campañas de Google Ads, Meta Ads y LinkedIn Ads B2B. Maximizamos el retorno de tu inversión publicitaria y la captación de leads comerciales de valor.",
    images: ["https://aliedigital.com/og-home.webp"],
  },
};;

export default function Page() {
  return <>
      <JsonLd data={createServiceSchema("/paid-media/", "Publicidad Digital & Paid Ads | Alié Digital", "Campañas de Meta Ads, Google Ads y LinkedIn Ads con enfoque B2B y temática de alto impacto.")} />
      <PaidMediaPageClient />
    </>;
}

