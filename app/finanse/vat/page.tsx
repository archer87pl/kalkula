import type { Metadata } from "next";
import CalculatorLayout from "@/components/CalculatorLayout";
import BruttoNettoCalculator from "@/components/calculators/BruttoNettoCalculator";
import { getCalculatorByHref } from "@/lib/calculators";
import { createCalculatorSchema } from "@/lib/seo-schema";
import { getCalculatorContent } from "@/lib/content";

const calculator = getCalculatorByHref("/finanse/vat");

export const metadata: Metadata = {
  title: "Kalkulator VAT 23% - netto brutto",
  description: calculator.seoDescription,
  keywords: calculator.keywords,
  alternates: {
    canonical: "/finanse/vat"
  },
  openGraph: {
    title: "Kalkulator VAT 23%",
    description: calculator.seoDescription,
    url: "/finanse/vat",
    images: ["/og-image.svg"]
  }
};

export default function VatPage() {
  const markdownContent = getCalculatorContent("finanse-vat");
  
  return (
    <CalculatorLayout
      title={calculator.title}
      helperText={calculator.helperText}
      seoText={calculator.seoDescription}
      icon={calculator.icon}
      currentHref={calculator.href}
      schemaData={createCalculatorSchema(calculator)}
      markdownContent={markdownContent}
    >
      <BruttoNettoCalculator />
    </CalculatorLayout>
  );
}
