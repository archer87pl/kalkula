import type { Metadata } from "next";
import CalculatorLayout from "@/components/CalculatorLayout";
import CapacitorCodeCalculator from "@/components/calculators/CapacitorCodeCalculator";
import { getCalculatorByHref } from "@/lib/calculators";
import { createCalculatorSchema } from "@/lib/seo-schema";

const calculator = getCalculatorByHref("/elektronika/kondensator");

export const metadata: Metadata = {
  title: "Dekoder kodów kondensatorów - 104, 223, 0R5",
  description: calculator.seoDescription,
  keywords: calculator.keywords,
  alternates: {
    canonical: "/elektronika/kondensator"
  },
  openGraph: {
    title: "Dekoder kodów kondensatorów",
    description: calculator.seoDescription,
    url: "/elektronika/kondensator",
    images: ["/og-image.png"]
  }
};

export default function CapacitorPage() {
  return (
    <CalculatorLayout
      title={calculator.title}
      helperText={calculator.helperText}
      seoText={calculator.seoDescription}
      icon={calculator.icon}
      currentHref={calculator.href}
      schemaData={createCalculatorSchema(calculator)}
    >
      <CapacitorCodeCalculator />
    </CalculatorLayout>
  );
}
