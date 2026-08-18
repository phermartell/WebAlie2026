import type { Metadata } from "next";
import EmailMarketingPageClient from "@/components/servicios/EmailMarketingPage";
import JsonLd from "@/components/JsonLd";
import { createServiceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Email Marketing y Automatización de CRM | Alié Digital",
  description: "Estrategias de email marketing B2B e integración de CRM a la medida. Crea campañas automatizadas de nutrición y conversión de leads con un alto impacto.",
  alternates: {
    canonical: "https://aliedigital.com/email-marketing/",
    languages: {
      "es-MX": "https://aliedigital.com/email-marketing/",
      "x-default": "https://aliedigital.com/email-marketing/",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Alié Digital",
    title: "Email Marketing y Automatización de CRM B2B | Alié Digital",
    description: "Servicios de email marketing B2B e integración de CRM a la medida de tu empresa. Crea campañas automatizadas de nutrición y conversión de leads de alto impacto.",
    url: "https://aliedigital.com/email-marketing/",
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
    title: "Email Marketing y Automatización de CRM B2B | Alié Digital",
    description: "Servicios de email marketing B2B e integración de CRM a la medida de tu empresa. Crea campañas automatizadas de nutrición y conversión de leads de alto impacto.",
    images: ["https://aliedigital.com/og-home.webp"],
  },
};;

export default function Page() {
  return (
    <>
      <JsonLd data={createServiceSchema("/email-marketing/", "Email Marketing & CRM B2B | Alié Digital", "Campañas de email marketing B2B e integraciones de CRM que convierten.")} />
      <EmailMarketingPageClient />
    </>
  );
}
