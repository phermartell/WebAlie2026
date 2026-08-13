import type { Metadata } from "next";
import PlaceholderPage from "@/components/PlaceholderPage";

export const metadata: Metadata = {
  title: "Agencia de marketing digital en Monterrey | Alié Digital",
  description: "Alié Digital en Monterrey: web, growth marketing y ecommerce B2B.",
};

export default function Page() {
  return <PlaceholderPage title="Agencia de marketing digital en Monterrey" />;
}
