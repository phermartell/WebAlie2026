import type { Metadata } from "next";
import ContactoPage from "@/components/contacto/ContactoPage";
import JsonLd from "@/components/JsonLd";
import { CONTACTO_SCHEMA } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contacto | Alié Digital",
  description:
    "Inicia tu misión digital con Alié Digital. Cuéntanos sobre tu proyecto y agenda una llamada de estrategia. Tu dominio siempre será tuyo gracias a nuestra Garantía Anti-Secuestro.",
  robots: "index, follow",
  alternates: {
    canonical: "https://aliedigital.com/contacto/",
  },
  openGraph: {
    type: "website",
    siteName: "Alié Digital",
    title: "Contacto | Alié Digital",
    description:
      "Inicia tu misión digital con Alié Digital. Cuéntanos sobre tu proyecto y agenda una llamada de estrategia.",
    url: "https://aliedigital.com/contacto/",
    images: [
      {
        url: "https://aliedigital.com/og-home.webp",
        width: 1200,
        height: 630,
        alt: "Alié Digital — Contacto",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contacto | Alié Digital",
    description:
      "Inicia tu misión digital con Alié Digital. Cuéntanos sobre tu proyecto y agenda una llamada de estrategia.",
    images: ["https://aliedigital.com/og-home.webp"],
  },
};

export default function Page() {
  return (
    <>
      <JsonLd data={CONTACTO_SCHEMA} />
      <ContactoPage />
    </>
  );
}

