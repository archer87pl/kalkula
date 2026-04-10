import type { Metadata } from "next";
import CalculatorLayout from "@/components/CalculatorLayout";
import LoanCalculator from "@/components/calculators/LoanCalculator";
import { getCalculatorByHref } from "@/lib/calculators";
import { createCalculatorSchema } from "@/lib/seo-schema";
import { getCalculatorContent } from "@/lib/content";

const calculator = getCalculatorByHref("/finanse/pozyczka");

export const metadata: Metadata = {
  title: "Kalkulator pożyczki - rata miesięczna",
  description: calculator.seoDescription,
  keywords: calculator.keywords,
  alternates: {
    canonical: "/finanse/pozyczka"
  },
  openGraph: {
    title: "Kalkulator pożyczki",
    description: calculator.seoDescription,
    url: "/finanse/pozyczka",
    images: ["/og-image.svg"]
  }
};

export default function LoanAlternativePage() {
  const markdownContent = getCalculatorContent("finanse-pozyczka");
  
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
      <LoanCalculator label="pożyczki" />
    </CalculatorLayout>
  );
}
