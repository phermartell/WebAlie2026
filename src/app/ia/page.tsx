import type { Metadata } from "next";
import IaPageClient from "@/components/servicios/IaPage";
import JsonLd from "@/components/JsonLd";
import { createServiceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "IA aplicada al ecommerce | Alié Digital",
  description: "Asistentes para atender a clientes y prospectos, y automatizaciones para gestionar pedidos y coordinar la producción, la preparación y los envíos de tu tienda.",
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
    title: "IA aplicada al ecommerce | Alié Digital",
    description: "Asistentes para atender a clientes y prospectos, y automatizaciones para gestionar pedidos y coordinar la producción, la preparación y los envíos de tu tienda.",
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
    title: "IA aplicada al ecommerce | Alié Digital",
    description: "Asistentes para atender a clientes y prospectos, y automatizaciones para gestionar pedidos y coordinar la producción, la preparación y los envíos de tu tienda.",
    images: ["https://aliedigital.com/og-home.webp"],
  },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={createServiceSchema(
          "/ia/",
          "IA aplicada al ecommerce | Alié Digital",
          "Diseño de asistentes y automatizaciones para tiendas en línea. El servicio puede incluir atención a clientes y prospectos, gestión de pedidos y coordinación de producción, preparación y envíos según las herramientas y el alcance acordados."
        )}
      />
      <IaPageClient />
    </>
  );
}
