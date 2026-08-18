import type { Metadata } from "next";
import EcommercePageClient from "@/components/servicios/EcommercePage";
import JsonLd from "@/components/JsonLd";
import { createServiceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Agencia de Diseño y Desarrollo E-commerce | Alié Digital",
  description: "Diseñamos y desarrollamos tiendas en línea de alto rendimiento con Shopify, WooCommerce y Next.js. Sitios rápidos, optimizados para SEO y conversión.",
  alternates: {
    canonical: "https://aliedigital.com/ecommerce/",
  },
  openGraph: {
    type: "website",
    siteName: "Alié Digital",
    title: "Agencia de Diseño y Desarrollo E-commerce | Alié Digital",
    description: "Diseñamos y desarrollamos tiendas en línea de alto rendimiento con Shopify, WooCommerce y Next.js. Sitios rápidos, optimizados para SEO y conversión.",
    url: "https://aliedigital.com/ecommerce/",
    images: [
      {
        url: "https://aliedigital.com/og-home.webp",
        width: 1200,
        height: 630,
        alt: "Diseño y Desarrollo E-commerce | Alié Digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agencia de Diseño y Desarrollo E-commerce | Alié Digital",
    description: "Diseñamos y desarrollamos tiendas en línea de alto rendimiento con Shopify, WooCommerce y Next.js. Sitios rápidos, optimizados para SEO y conversión.",
    images: ["https://aliedigital.com/og-home.webp"],
  },
};

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
