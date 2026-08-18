import type { Metadata } from "next";
import IaPageClient from "@/components/servicios/IaPage";
import JsonLd from "@/components/JsonLd";
import { createServiceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "IA & Automatización de Pedidos y Procesos | Alié Digital",
  description: "Automatizamos la captura, validación e integración de órdenes de compra y facturas en tu ERP con Inteligencia Artificial. Di adiós al ingreso manual de datos.",
  openGraph: {
    title: "IA & Automatización de Pedidos y Procesos | Alié Digital",
    description: "Automatizamos la captura, validación e integración de órdenes de compra y facturas en tu ERP con Inteligencia Artificial. Di adiós al ingreso manual de datos.",
    url: "https://aliedigital.com/ia/",
    images: [{ url: "https://aliedigital.com/og-home.webp", width: 1200, height: 630, alt: "IA & Automatización de Pedidos y Procesos | Alié Digital" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "IA & Automatización de Pedidos y Procesos | Alié Digital",
    description: "Automatizamos la captura, validación e integración de órdenes de compra y facturas en tu ERP con Inteligencia Artificial. Di adiós al ingreso manual de datos.",
    images: ["https://aliedigital.com/og-home.webp"],
  },
};

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
