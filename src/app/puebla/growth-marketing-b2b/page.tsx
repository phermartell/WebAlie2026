import type { Metadata } from "next";
import PueblaGrowthMarketingPage from "@/components/puebla/PueblaGrowthMarketingPage";
import JsonLd from "@/components/JsonLd";
import { createServiceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Agencia de Growth Marketing en Puebla | Alié Digital",
  description: "Growth Marketing en Puebla todo en uno: paid media, data, AI, automatización, lifecycle y desarrollo web a la medida alineado a tu presupuesto.",
  robots: "index, follow",
  alternates: {
    canonical: "https://aliedigital.com/puebla/growth-marketing-b2b/",
  },
  openGraph: {
    type: "website",
    siteName: "Alié Digital",
    title: "Agencia de Growth Marketing en Puebla | Alié Digital",
    description: "Growth Marketing en Puebla todo en uno: paid media, data, AI, automatización, lifecycle y desarrollo web a la medida alineado a tu presupuesto.",
    url: "https://aliedigital.com/puebla/growth-marketing-b2b/",
    images: [
      {
        url: "https://aliedigital.com/og-home.webp",
        width: 1200,
        height: 630,
        alt: "Alié Digital — Growth Marketing en Puebla",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agencia de Growth Marketing en Puebla | Alié Digital",
    description: "Growth Marketing en Puebla todo en uno: paid media, data, AI, automatización, lifecycle y desarrollo web a la medida alineado a tu presupuesto.",
    images: ["https://aliedigital.com/og-home.webp"],
  },
};

export default function Page() {
  const serviceSchema = createServiceSchema(
    "/puebla/growth-marketing-b2b/",
    "Agencia de Growth Marketing en Puebla | Alié Digital",
    "Growth Marketing en Puebla todo en uno: paid media, data, AI, automatización, lifecycle y desarrollo web a la medida alineado a tu presupuesto."
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
        "name": "¿Tienen oficina física en Puebla o Cholula?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Operamos como un equipo senior distribuido y remoto entre Puebla y Cholula. No gastamos en rentas lujosas frente a Angelópolis para no inflar tus costos."
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
        "name": "Puebla",
        "item": "https://aliedigital.com/puebla/"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Growth Marketing B2B",
        "item": "https://aliedigital.com/puebla/growth-marketing-b2b/"
      }
    ]
  };

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <PueblaGrowthMarketingPage />
    </>
  );
}

