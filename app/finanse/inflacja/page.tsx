import type { Metadata } from "next";
import CalculatorLayout from "@/components/CalculatorLayout";
import InflationCalculator from "@/components/calculators/InflationCalculator";
import { getCalculatorByHref } from "@/lib/calculators";
import { createCalculatorSchema } from "@/lib/seo-schema";
import { getCalculatorContent } from "@/lib/content";

const calculator = getCalculatorByHref("/finanse/inflacja");

export const metadata: Metadata = {
  title: "Kalkulator inflacji - wartość pieniądza 1990-2026",
  description: calculator.seoDescription,
  keywords: calculator.keywords,
  alternates: {
    canonical: "/finanse/inflacja"
  },
  openGraph: {
    title: "Kalkulator inflacji",
    description: calculator.seoDescription,
    url: "/finanse/inflacja",
    images: ["/og-image.png"]
  }
};

export default function InflationPage() {
  const markdownContent = getCalculatorContent("finanse-inflacja");
  
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
      <InflationCalculator />
    </CalculatorLayout>
  );
}
