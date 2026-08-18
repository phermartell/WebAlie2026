import type { Metadata } from "next";
import ServiciosPage from "@/components/servicios/ServiciosPage";
import JsonLd from "@/components/JsonLd";
import { createServiceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Servicios B2B | Alié Digital",
  description: "Construimos la infraestructura digital que escala las ventas de tu empresa. Un ecosistema impulsado por Inteligencia Artificial y código Headless.",
  openGraph: {
    title: "Servicios B2B | Alié Digital",
    description: "Construimos la infraestructura digital que escala las ventas de tu empresa. Un ecosistema impulsado por Inteligencia Artificial y código Headless.",
    url: "https://aliedigital.com/servicios/",
    images: [{ url: "https://aliedigital.com/og-home.webp", width: 1200, height: 630, alt: "Servicios B2B | Alié Digital" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Servicios B2B | Alié Digital",
    description: "Construimos la infraestructura digital que escala las ventas de tu empresa. Un ecosistema impulsado por Inteligencia Artificial y código Headless.",
    images: ["https://aliedigital.com/og-home.webp"],
  },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={createServiceSchema(
          "/servicios/",
          "Servicios B2B | Alié Digital",
          "Construimos la infraestructura digital que escala las ventas de tu empresa. Un ecosistema impulsado por Inteligencia Artificial y código Headless."
        )}
      />
      <ServiciosPage />
    </>
  );
}

