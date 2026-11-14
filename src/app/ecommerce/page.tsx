import type { Metadata } from "next";
import EcommercePageClient from "@/components/servicios/EcommercePage";
import JsonLd from "@/components/JsonLd";
import { createServiceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Diseño y desarrollo de tiendas en línea | Alié Digital",
  description: "Creamos tiendas en línea con catálogo, pagos y gestión de pedidos según tu negocio. Consulta opciones en WooCommerce, Shopify o desarrollo a medida.",
  alternates: {
    canonical: "https://aliedigital.com/ecommerce/",
    languages: {
      "es-MX": "https://aliedigital.com/ecommerce/",
      "x-default": "https://aliedigital.com/ecommerce/",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Alié Digital",
    title: "Diseño y desarrollo de tiendas en línea | Alié Digital",
    description: "Creamos tiendas en línea con catálogo, pagos y gestión de pedidos según tu negocio. Consulta opciones en WooCommerce, Shopify o desarrollo a medida.",
    url: "https://aliedigital.com/ecommerce/",
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
    title: "Diseño y desarrollo de tiendas en línea | Alié Digital",
    description: "Creamos tiendas en línea con catálogo, pagos y gestión de pedidos según tu negocio. Consulta opciones en WooCommerce, Shopify o desarrollo a medida.",
    images: ["https://aliedigital.com/og-home.webp"],
  },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={createServiceSchema(
          "/ecommerce/",
          "Diseño y desarrollo de tiendas en línea | Alié Digital",
          "Diseño y desarrollo de tiendas en línea con catálogo, proceso de compra y herramientas de gestión, con plataforma e integraciones definidas según las necesidades de cada proyecto."
        )}
      />
      <EcommercePageClient />
    </>
  );
}
