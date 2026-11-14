import type { Metadata } from "next";
import EmailMarketingPageClient from "@/components/servicios/EmailMarketingPage";
import JsonLd from "@/components/JsonLd";
import { createServiceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Email marketing y automatización de correos | Alié Digital",
  description: "Planeamos, redactamos y diseñamos campañas de correo para tu negocio. Consulta opciones de envíos, automatización y conexión con tus herramientas.",
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
    title: "Email marketing y automatización de correos | Alié Digital",
    description: "Planeamos, redactamos y diseñamos campañas de correo para tu negocio. Consulta opciones de envíos, automatización y conexión con tus herramientas.",
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
    title: "Email marketing y automatización de correos | Alié Digital",
    description: "Planeamos, redactamos y diseñamos campañas de correo para tu negocio. Consulta opciones de envíos, automatización y conexión con tus herramientas.",
    images: ["https://aliedigital.com/og-home.webp"],
  },
};;

export default function Page() {
  return (
    <>
      <JsonLd data={createServiceSchema("/email-marketing/", "Email marketing y automatización de correos | Alié Digital", "Planeación, redacción y diseño de campañas de correo, con configuración de envíos, automatizaciones e integraciones según el alcance acordado.")} />
      <EmailMarketingPageClient />
    </>
  );
}
