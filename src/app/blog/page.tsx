import type { Metadata } from "next";
import PlaceholderPage from "@/components/PlaceholderPage";

export const metadata: Metadata = {
  title: "Blog | Alié Digital",
  description: "Blog y recursos de marketing digital B2B.",
};

export default function Page() {
  return <PlaceholderPage title="Blog" />;
}
