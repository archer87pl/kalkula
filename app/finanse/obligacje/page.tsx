import type { Metadata } from "next";
import CalculatorLayout from "@/components/CalculatorLayout";
import TreasuryBondsCalculator from "@/components/calculators/TreasuryBondsCalculator";
import { getCalculatorByHref } from "@/lib/calculators";
import { createCalculatorSchema } from "@/lib/seo-schema";

const calculator = getCalculatorByHref("/finanse/obligacje");

export const metadata: Metadata = {
  title: "Kalkulator obligacji skarbowych - ROR, EDO, TOS",
  description: calculator.seoDescription,
  keywords: calculator.keywords,
  alternates: {
    canonical: "/finanse/obligacje"
  },
  openGraph: {
    title: "Kalkulator obligacji skarbowych",
    description: calculator.seoDescription,
    url: "/finanse/obligacje",
    images: ["/og-image.svg"]
  }
};

export default function TreasuryBondsPage() {
  return (
    <CalculatorLayout
      title={calculator.title}
      helperText={calculator.helperText}
      seoText={calculator.seoDescription}
      icon={calculator.icon}
      currentHref={calculator.href}
      schemaData={createCalculatorSchema(calculator)}
    >
      <TreasuryBondsCalculator />
    </CalculatorLayout>
  );
}
