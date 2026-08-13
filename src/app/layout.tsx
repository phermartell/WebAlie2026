import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SpaceLayoutWrapper from "@/components/SpaceLayoutWrapper";
import { getGtmConfig } from "@/lib/gtm";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aliedigital.com"),
  title: "Agencia de Marketing Digital B2B en Monterrey y Puebla | Alié Digital",
  description:
    "Alié Digital es una agencia de marketing digital B2B en Monterrey y Puebla. Creamos páginas web, growth marketing, ecommerce y soluciones digitales para generar demanda y ventas.",
  keywords: [
    "diseño web b2b",
    "agencia de marketing digital",
    "next.js react",
    "desarrollo headless wordpress",
    "landing pages b2b",
    "tiendas en linea ecommerce",
    "publicidad google ads",
    "marketing redes sociales",
    "puebla",
    "monterrey",
  ],
  authors: [{ name: "Alié Digital" }],
  robots: "index, follow",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "Alié Digital",
    title: "Agencia de Marketing Digital B2B en Monterrey y Puebla | Alié Digital",
    description:
      "Creamos páginas web, growth marketing, ecommerce y soluciones digitales para generar demanda y ventas en empresas B2B.",
    url: "https://aliedigital.com/",
    images: [{ url: "https://aliedigital.com/logo.svg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agencia de Marketing Digital B2B en Monterrey y Puebla | Alié Digital",
    description:
      "Páginas web, growth marketing, ecommerce y soluciones digitales para empresas B2B.",
    images: ["https://aliedigital.com/logo.svg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B0F1A",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gtm = await getGtmConfig();

  return (
    <html lang="es" className={`${spaceGrotesk.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col bg-oled text-starlight selection:bg-orangeleader selection:text-white">
        {gtm.enabled && (
          <>
            <Script id="gtm-head" strategy="beforeInteractive">
              {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtm.id}');`}
            </Script>
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${gtm.id}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
              />
            </noscript>
          </>
        )}
        <SpaceLayoutWrapper>{children}</SpaceLayoutWrapper>
      </body>
    </html>
  );
}
