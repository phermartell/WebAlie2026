import type { Metadata } from "next";
import MonterreyGrowthMarketingPage from "@/components/monterrey/MonterreyGrowthMarketingPage";
import JsonLd from "@/components/JsonLd";
import { createServiceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Agencia de Growth Marketing en Monterrey | Alié Digital",
  description: "Agencia de growth marketing en Monterrey para empresas B2B. Estrategias de paid media, captación de prospectos y automatización de tu marketing digital.",
  alternates: {
    canonical: "https://aliedigital.com/monterrey/growth-marketing-b2b/",
    languages: {
      "es-MX": "https://aliedigital.com/monterrey/growth-marketing-b2b/",
      "x-default": "https://aliedigital.com/monterrey/growth-marketing-b2b/",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Alié Digital",
    title: "Agencia de Growth Marketing B2B en Monterrey | Alié Digital",
    description: "Agencia especializada en growth marketing en Monterrey para empresas B2B. Estrategias efectivas de paid media, captación de prospectos y automatización de marketing.",
    url: "https://aliedigital.com/monterrey/growth-marketing-b2b/",
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
    title: "Agencia de Growth Marketing B2B en Monterrey | Alié Digital",
    description: "Agencia especializada en growth marketing en Monterrey para empresas B2B. Estrategias efectivas de paid media, captación de prospectos y automatización de marketing.",
    images: ["https://aliedigital.com/og-home.webp"],
  },
};;

export default function Page() {
  const serviceSchema = createServiceSchema(
    "/monterrey/growth-marketing-b2b/",
    "Agencia de Growth Marketing en Monterrey | Alié Digital",
    "Growth Marketing en Monterrey todo en uno: paid media, data, AI, automatización, lifecycle y desarrollo web a la medida alineado a tu presupuesto."
  );

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Por qué venden paquetes todo en uno y no servicios por separado?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Porque comprar solo una campaña de Ads sin una landing rápida o sin analítica es como querer volar al espacio en una combi a medio gas. Al empaquetarlo todo a la medida de tu presupuesto, eliminamos la fricción y aseguramos resultados reales."
        }
      },
      {
        "@type": "Question",
        "name": "¿Tienen oficina física en Monterrey o San Pedro?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Operamos como un equipo senior distribuido y remoto. No gastamos en rentas lujosas en San Pedro Garza García para no inflar tus costos."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cómo se conectan los formularios a mi CRM?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Toda la telemetría del sitio (formularios y clics) se conecta de forma directa a tu CRM mediante integraciones limpias de API, con protección de reCAPTCHA v3 y honeypot."
        }
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": "https://aliedigital.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Monterrey",
        "item": "https://aliedigital.com/monterrey/"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Growth Marketing B2B",
        "item": "https://aliedigital.com/monterrey/growth-marketing-b2b/"
      }
    ]
  };

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <MonterreyGrowthMarketingPage />
    </>
  );
}
