import type { Metadata } from "next";
import CalculatorLayout from "@/components/CalculatorLayout";
import NotarialFeeCalculator from "@/components/calculators/NotarialFeeCalculator";
import { getCalculatorByHref } from "@/lib/calculators";
import { createCalculatorSchema } from "@/lib/seo-schema";

const calculator = getCalculatorByHref("/prawo/taksa-notarialna");

export const metadata: Metadata = {
  title: "Taksa notarialna - kalkulator kosztów notarialnych",
  description: calculator.seoDescription,
  keywords: calculator.keywords,
  alternates: {
    canonical: "/prawo/taksa-notarialna"
  },
  openGraph: {
    title: "Taksa notarialna",
    description: calculator.seoDescription,
    url: "/prawo/taksa-notarialna",
    images: ["/og-image.svg"]
  }
};

export default function NotarialFeePage() {
  return (
    <CalculatorLayout
      title={calculator.title}
      helperText={calculator.helperText}
      seoText={calculator.seoDescription}
      icon={calculator.icon}
      currentHref={calculator.href}
      schemaData={createCalculatorSchema(calculator)}
    >
      <NotarialFeeCalculator />
    </CalculatorLayout>
  );
}
