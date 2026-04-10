import type { Metadata } from "next";
import CalculatorLayout from "@/components/CalculatorLayout";
import PccCalculator from "@/components/calculators/PccCalculator";
import { getCalculatorByHref } from "@/lib/calculators";
import { createCalculatorSchema } from "@/lib/seo-schema";
import { getCalculatorContent } from "@/lib/content";

const calculator = getCalculatorByHref("/prawo/pcc");

export const metadata: Metadata = {
  title: "Kalkulator PCC 2% - nieruchomość i samochód",
  description: calculator.seoDescription,
  keywords: calculator.keywords,
  alternates: {
    canonical: "/prawo/pcc"
  },
  openGraph: {
    title: "Kalkulator PCC 2%",
    description: calculator.seoDescription,
    url: "/prawo/pcc",
    images: ["/og-image.svg"]
  }
};

export default function PccPage() {
  const markdownContent = getCalculatorContent("prawo-pcc");
  
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
      <PccCalculator />
    </CalculatorLayout>
  );
}
