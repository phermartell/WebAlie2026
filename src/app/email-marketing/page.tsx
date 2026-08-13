import type { Metadata } from "next";
import PlaceholderPage from "@/components/PlaceholderPage";

export const metadata: Metadata = {
  title: "Email marketing | Alié Digital",
  description: "Campañas de email marketing B2B que convierten.",
};

export default function Page() {
  return <PlaceholderPage title="Email marketing" />;
}
