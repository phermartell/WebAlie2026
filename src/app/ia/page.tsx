import type { Metadata } from "next";
import IaPageClient from "@/components/servicios/IaPage";
import JsonLd from "@/components/JsonLd";
import { createServiceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Inteligencia Artificial y Automatización | Alié Digital",
  description: "Integramos Inteligencia Artificial y automatizaciones en tu negocio. Optimiza el procesamiento de datos, flujos de trabajo e integraciones ERP con IA.",
  alternates: {
    canonical: "https://aliedigital.com/ia/",
    languages: {
      "es-MX": "https://aliedigital.com/ia/",
      "x-default": "https://aliedigital.com/ia/",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Alié Digital",
    title: "Inteligencia Artificial y Automatización B2B | Alié Digital",
    description: "Desarrollamos e integramos Inteligencia Artificial y automatización en tu negocio. Optimiza procesamiento de datos, flujos de trabajo e integraciones ERP con IA.",
    url: "https://aliedigital.com/ia/",
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
    title: "Inteligencia Artificial y Automatización B2B | Alié Digital",
    description: "Desarrollamos e integramos Inteligencia Artificial y automatización en tu negocio. Optimiza procesamiento de datos, flujos de trabajo e integraciones ERP con IA.",
    images: ["https://aliedigital.com/og-home.webp"],
  },
};;

export default function Page() {
  return (
    <>
      <JsonLd
        data={createServiceSchema(
          "/ia/",
          "IA & Automatización de Pedidos y Procesos | Alié Digital",
          "Automatización autónoma de captura, validación e integración de órdenes de compra y facturas en sistemas ERP utilizando Inteligencia Artificial."
        )}
      />
      <IaPageClient />
    </>
  );
}
