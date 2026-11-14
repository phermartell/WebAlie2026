import type { Metadata } from "next";
import MonterreyGrowthMarketingPage from "@/components/monterrey/MonterreyGrowthMarketingPage";
import JsonLd from "@/components/JsonLd";
import { createServiceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Growth Marketing B2B en Monterrey | Alié Digital",
  description: "Campañas, páginas de captación y medición para empresas B2B en Monterrey. Te ayudamos a registrar las consultas y organizar su seguimiento comercial.",
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
    title: "Growth Marketing B2B en Monterrey | Alié Digital",
    description: "Campañas, páginas de captación y medición para empresas B2B en Monterrey. Te ayudamos a registrar las consultas y organizar su seguimiento comercial.",
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
    title: "Growth Marketing B2B en Monterrey | Alié Digital",
    description: "Campañas, páginas de captación y medición para empresas B2B en Monterrey. Te ayudamos a registrar las consultas y organizar su seguimiento comercial.",
    images: ["https://aliedigital.com/og-home.webp"],
  },
};

export default function Page() {
  const serviceSchema = createServiceSchema(
    "/monterrey/growth-marketing-b2b/",
    "Growth Marketing B2B en Monterrey | Alié Digital",
    "Servicios de campañas digitales, páginas de captación, medición de consultas e integración con CRM para empresas B2B en Monterrey, según el alcance acordado."
  );

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Qué puede incluir la propuesta?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Según lo que ya tenga tu empresa, la propuesta puede incluir campañas en Google Ads o Meta Ads, una página de captación, medición de consultas y conexiones con tu CRM. Acordamos qué se implementa y qué herramientas necesita aportar tu equipo."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cómo atienden a empresas en Monterrey?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Atendemos a empresas en Monterrey por videollamada y WhatsApp. En la primera conversación revisamos qué quieres mejorar y qué herramientas ya usas."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cómo se define el presupuesto?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Revisamos el alcance y la inversión disponible. La propuesta detalla los honorarios del servicio y, si incluye campañas, distingue el presupuesto destinado a anuncios."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuándo podremos evaluar los primeros datos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Depende de la configuración inicial, el presupuesto y el volumen de consultas. Al definir el alcance acordamos cuándo revisar los datos disponibles y qué señales usaremos para decidir ajustes."
        }
      },
      {
        "@type": "Question",
        "name": "¿Quién da seguimiento a las consultas?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Podemos ayudarte a registrar y asignar las consultas y a definir criterios para calificarlas. Tu equipo comercial contacta a los prospectos, actualiza el estado de cada oportunidad y lleva la negociación."
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
