import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviso de Privacidad de Datos y Cookies | Alié Digital",
  description: "Consulta nuestro aviso de privacidad de Alié Digital. Conoce las políticas de protección, tratamiento, uso y almacenamiento de tus datos personales aquí.",
  alternates: {
    canonical: "https://aliedigital.com/aviso-de-privacidad/",
    languages: {
      "es-MX": "https://aliedigital.com/aviso-de-privacidad/",
      "x-default": "https://aliedigital.com/aviso-de-privacidad/",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Alié Digital",
    title: "Aviso de Privacidad de Datos y Cookies Oficial | Alié Digital",
    description: "Consulta aquí nuestro aviso de privacidad de Alié Digital. Conoce las políticas de protección, tratamiento, uso y almacenamiento de tus datos personales en el sitio.",
    url: "https://aliedigital.com/aviso-de-privacidad/",
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
    title: "Aviso de Privacidad de Datos y Cookies Oficial | Alié Digital",
    description: "Consulta aquí nuestro aviso de privacidad de Alié Digital. Conoce las políticas de protección, tratamiento, uso y almacenamiento de tus datos personales en el sitio.",
    images: ["https://aliedigital.com/og-home.webp"],
  },
};;

export default function AvisoPrivacidadPage() {
  return (
    <section className="relative min-h-screen px-6 pt-32 pb-24">
      <div className="max-w-3xl mx-auto glass-liquid rounded-[40px] px-8 py-12 md:px-14 md:py-16">
        <span className="font-mono text-sm tracking-[0.3em] text-orangeleader uppercase">Legal</span>
        <h1 className="mt-3 text-3xl md:text-5xl font-black uppercase text-white mb-8">Aviso de privacidad</h1>
        <p className="text-sm text-starlight/40 mb-6">Documento de referencia — revisar y completar antes de publicar.</p>
        <div className="space-y-6 text-starlight/70 leading-relaxed text-base">
          <h2 className="text-xl font-black uppercase text-white mt-8">1. Responsable</h2>
          <p>Alié Digital, con presencia en Monterrey y Puebla, México, es responsable del tratamiento de los datos personales que recaba a través de este sitio.</p>
          <h2 className="text-xl font-black uppercase text-white mt-8">2. Datos que recabamos</h2>
          <p>Recabamos nombre, teléfono/WhatsApp, correo electrónico y empresa, así como el mensaje que nos envías a través de los formularios de contacto.</p>
          <h2 className="text-xl font-black uppercase text-white mt-8">3. Finalidades</h2>
          <p>Utilizamos tus datos para: (i) atender tus solicitudes y agendar llamadas de estrategia; (ii) dar seguimiento comercial; (iii) enviarte información sobre nuestros servicios.</p>
          <h2 className="text-xl font-black uppercase text-white mt-8">4. Derechos ARCO</h2>
          <p>Puedes acceder, rectificar, cancelar u oponerte al tratamiento de tus datos (derechos ARCO) escribiendo a hola@aliedigital.com.</p>
          <h2 className="text-xl font-black uppercase text-white mt-8">5. Transferencias</h2>
          <p>No vendemos tus datos. Solo se comparten con proveedores necesarios para la operación del servicio (CRM, correo) bajo las mismas medidas de protección.</p>
        </div>
      </div>
    </section>
  );
}
