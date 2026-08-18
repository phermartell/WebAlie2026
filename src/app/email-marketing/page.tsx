import type { Metadata } from "next";
import EmailMarketingPageClient from "@/components/servicios/EmailMarketingPage";
import JsonLd from "@/components/JsonLd";
import { createServiceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Email Marketing & Automatización de CRM B2B | Alié Digital",
  description: "Campañas de email marketing B2B e integraciones de CRM con temática espacial y alto impacto para adquisición, retención y conversión digital.",
  openGraph: {
    title: "Email Marketing & Automatización de CRM B2B | Alié Digital",
    description: "Campañas de email marketing B2B e integraciones de CRM con temática espacial y alto impacto para adquisición, retención y conversión digital.",
    url: "https://aliedigital.com/email-marketing/",
    images: [{ url: "https://aliedigital.com/og-home.webp", width: 1200, height: 630, alt: "Email Marketing & CRM B2B | Alié Digital" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Email Marketing & Automatización de CRM B2B | Alié Digital",
    description: "Campañas de email marketing B2B e integraciones de CRM con temática espacial y alto impacto para adquisición, retención y conversión digital.",
    images: ["https://aliedigital.com/og-home.webp"],
  },
};

export default function Page() {
  return (
    <>
      <JsonLd data={createServiceSchema("/email-marketing/", "Email Marketing & CRM B2B | Alié Digital", "Campañas de email marketing B2B e integraciones de CRM que convierten.")} />
      <EmailMarketingPageClient />
    </>
  );
}
