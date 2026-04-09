import type { Metadata } from "next";
import CalculatorLayout from "@/components/CalculatorLayout";
import BmiCalculator from "@/components/calculators/BmiCalculator";
import { getCalculatorByHref } from "@/lib/calculators";
import { createCalculatorSchema } from "@/lib/seo-schema";

const calculator = getCalculatorByHref("/zdrowie/bmi");

export const metadata: Metadata = {
  title: "Kalkulator BMI - wskaźnik masy ciała",
  description: calculator.seoDescription,
  keywords: calculator.keywords,
  alternates: {
    canonical: "/zdrowie/bmi"
  },
  openGraph: {
    title: "Kalkulator BMI",
    description: calculator.seoDescription,
    url: "/zdrowie/bmi",
    images: ["/og-image.svg"]
  }
};

export default function BmiPage() {
  return (
    <CalculatorLayout
      title={calculator.title}
      helperText={calculator.helperText}
      seoText={calculator.seoDescription}
      icon={calculator.icon}
      currentHref={calculator.href}
      schemaData={createCalculatorSchema(calculator)}
    >
      <BmiCalculator />
    </CalculatorLayout>
  );
}
