import type { Metadata } from "next";
import IdentidadGraficaPageClient from "@/components/servicios/IdentidadGraficaPage";
import JsonLd from "@/components/JsonLd";
import { createServiceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Manuales de marca e identidad visual | Alié Digital",
  description: "Creamos manuales de marca para documentar el uso de tu logotipo, colores y tipografías, con ejemplos de aplicación según los materiales que utiliza tu empresa.",
  alternates: {
    canonical: "https://aliedigital.com/identidad-grafica/",
    languages: {
      "es-MX": "https://aliedigital.com/identidad-grafica/",
      "x-default": "https://aliedigital.com/identidad-grafica/",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Alié Digital",
    title: "Manuales de marca e identidad visual | Alié Digital",
    description: "Creamos manuales de marca para documentar el uso de tu logotipo, colores y tipografías, con ejemplos de aplicación según los materiales que utiliza tu empresa.",
    url: "https://aliedigital.com/identidad-grafica/",
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
    title: "Manuales de marca e identidad visual | Alié Digital",
    description: "Creamos manuales de marca para documentar el uso de tu logotipo, colores y tipografías, con ejemplos de aplicación según los materiales que utiliza tu empresa.",
    images: ["https://aliedigital.com/og-home.webp"],
  },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={createServiceSchema(
          "/identidad-grafica/",
          "Manuales de marca e identidad visual | Alié Digital",
          "Elaboración de guías y manuales a partir de la identidad visual de tu empresa, con reglas de uso del logotipo, referencias de color, pautas tipográficas y ejemplos según el alcance acordado."
        )}
      />
      <IdentidadGraficaPageClient />
    </>
  );
}
