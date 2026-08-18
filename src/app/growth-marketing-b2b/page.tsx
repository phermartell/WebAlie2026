import type { Metadata } from "next";
import PlaceholderPage from "@/components/PlaceholderPage";
import JsonLd from "@/components/JsonLd";
import { createServiceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Growth Marketing B2B y Leads de Valor | Alié Digital",
  description: "Servicios de growth marketing B2B enfocados en adquisición. Implementamos automatizaciones, paid media y optimización web para aumentar todos tus ingresos.",
  alternates: {
    canonical: "https://aliedigital.com/growth-marketing-b2b/",
    languages: {
      "es-MX": "https://aliedigital.com/growth-marketing-b2b/",
      "x-default": "https://aliedigital.com/growth-marketing-b2b/",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Alié Digital",
    title: "Growth Marketing B2B y Captación de Leads | Alié Digital",
    description: "Estrategias de growth marketing B2B enfocadas en adquisición y conversión. Implementamos automatizaciones, paid media y optimización web para aumentar tus ingresos.",
    url: "https://aliedigital.com/growth-marketing-b2b/",
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
    title: "Growth Marketing B2B y Captación de Leads | Alié Digital",
    description: "Estrategias de growth marketing B2B enfocadas en adquisición y conversión. Implementamos automatizaciones, paid media y optimización web para aumentar tus ingresos.",
    images: ["https://aliedigital.com/og-home.webp"],
  },
};;

export default function Page() {
  return <>
      <JsonLd data={createServiceSchema("/growth-marketing-b2b/", "Growth marketing B2B | Alié Digital", "Estrategias de growth marketing para empresas B2B.")} />
      <PlaceholderPage title="Growth marketing B2B" />
    </>;
}
