import type { Metadata } from "next";
import EcommercePageClient from "@/components/servicios/EcommercePage";
import JsonLd from "@/components/JsonLd";
import { createServiceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Diseño y Desarrollo de Tiendas en Línea | Alié Digital",
  description: "Diseño y desarrollo de tiendas online optimizadas. Expertos en e-commerce con Shopify, WooCommerce y Next.js para acelerar tus ventas y transacciones.",
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
    title: "Diseño y Desarrollo de Tiendas de E-commerce | Alié Digital",
    description: "Expertos en diseño y desarrollo de tiendas online optimizadas. Plataformas de e-commerce con Shopify, WooCommerce y Next.js para acelerar ventas y transacciones.",
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
    title: "Diseño y Desarrollo de Tiendas de E-commerce | Alié Digital",
    description: "Expertos en diseño y desarrollo de tiendas online optimizadas. Plataformas de e-commerce con Shopify, WooCommerce y Next.js para acelerar ventas y transacciones.",
    images: ["https://aliedigital.com/og-home.webp"],
  },
};;

export default function Page() {
  return (
    <>
      <JsonLd
        data={createServiceSchema(
          "/ecommerce/",
          "Agencia de Diseño y Desarrollo E-commerce | Alié Digital",
          "Diseñamos y desarrollamos tiendas en línea de alto rendimiento con Shopify, WooCommerce y Next.js. Sitios rápidos, optimizados para SEO y conversión."
        )}
      />
      <EcommercePageClient />
    </>
  );
}
