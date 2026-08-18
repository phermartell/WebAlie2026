import type { Metadata } from "next";
import ContactoPage from "@/components/contacto/ContactoPage";
import JsonLd from "@/components/JsonLd";
import { CONTACTO_SCHEMA } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contacto: Agenda tu Asesoría de Growth | Alié Digital",
  description: "Inicia tu proyecto digital con Alié Digital. Agenda una llamada de estrategia y conoce nuestra garantía anti-secuestro para proteger tu sitio web hoy.",
  alternates: {
    canonical: "https://aliedigital.com/contacto/",
    languages: {
      "es-MX": "https://aliedigital.com/contacto/",
      "x-default": "https://aliedigital.com/contacto/",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Alié Digital",
    title: "Contacto: Agenda tu Asesoría de Growth B2B | Alié Digital",
    description: "Inicia tu proyecto hoy con Alié Digital. Agenda una llamada de estrategia de marketing B2B y conoce la garantía anti-secuestro para proteger tu sitio web corporativo.",
    url: "https://aliedigital.com/contacto/",
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
    title: "Contacto: Agenda tu Asesoría de Growth B2B | Alié Digital",
    description: "Inicia tu proyecto hoy con Alié Digital. Agenda una llamada de estrategia de marketing B2B y conoce la garantía anti-secuestro para proteger tu sitio web corporativo.",
    images: ["https://aliedigital.com/og-home.webp"],
  },
};;

export default function Page() {
  return (
    <>
      <JsonLd data={CONTACTO_SCHEMA} />
      <ContactoPage />
    </>
  );
}

