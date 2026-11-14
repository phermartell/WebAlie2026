import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "https://aliedigital.com/puebla/diseno-de-paginas-web/",
  },
};

export default function Page() {
  permanentRedirect("/puebla/diseno-de-paginas-web/");
}
