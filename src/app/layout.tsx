import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SpaceLayoutWrapper from "@/components/SpaceLayoutWrapper";
import SiteNav from "@/components/SiteNav";
import Footer from "@/components/Footer";
import GlobalChat from "@/components/GlobalChat";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aliedigital.com"),
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
  title: "Marketing Digital B2B y Desarrollo Web | Alié Digital",
  description: "Somos Alié Digital, agencia de marketing digital B2B. Creamos páginas web headless, growth marketing y ecommerce para generar leads y acelerar ventas.",
  alternates: {
    canonical: "https://aliedigital.com/",
    languages: {
      "es-MX": "https://aliedigital.com/",
      "x-default": "https://aliedigital.com/",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Alié Digital",
    title: "Agencia de Marketing Digital B2B y Desarrollo Web | Alié Digital",
    description: "Somos Alié Digital, una agencia de marketing digital B2B en Monterrey y Puebla. Desarrollamos páginas web headless, growth marketing y ecommerce para escalar tus ventas.",
    url: "https://aliedigital.com/",
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
    title: "Agencia de Marketing Digital B2B y Desarrollo Web | Alié Digital",
    description: "Somos Alié Digital, una agencia de marketing digital B2B en Monterrey y Puebla. Desarrollamos páginas web headless, growth marketing y ecommerce para escalar tus ventas.",
    images: ["https://aliedigital.com/og-home.webp"],
  },
};;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B0F1A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang="es" className={`${spaceGrotesk.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col bg-oled text-starlight selection:bg-orangeleader selection:text-white">
        {gtmId && (
          <>
            <Script id="gtm-head" strategy="beforeInteractive">
              {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
            </Script>
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
              />
            </noscript>
          </>
        )}
        <SpaceLayoutWrapper>
          <GlobalChat>
            <SiteNav />
            {children}
            <Footer />
          </GlobalChat>
        </SpaceLayoutWrapper>
      </body>
    </html>
  );
}
