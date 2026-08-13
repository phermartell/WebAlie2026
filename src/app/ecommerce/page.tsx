import type { Metadata } from "next";
import PlaceholderPage from "@/components/PlaceholderPage";

export const metadata: Metadata = {
  title: "Ecommerce | Alié Digital",
  description: "Tiendas en línea B2B y ecommerce de alto rendimiento.",
};

export default function Page() {
  return <PlaceholderPage title="Ecommerce" />;
}
