import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://kalkula.pl"),
  title: {
    default: "Kalkula - Kalkulatory online",
    template: "%s | Kalkula"
  },
  description: "Zestaw praktycznych kalkulatorów: PCC, taksa notarialna, kredyt, pożyczka i BMI.",
  applicationName: "Kalkula",
  alternates: {
    canonical: "/"
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Kalkula - Kalkulatory online",
    description: "Praktyczne kalkulatory finansowe, prawne i zdrowotne w jednym miejscu.",
    url: "https://kalkula.pl",
    siteName: "Kalkula",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Kalkula - kalkulatory online"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Kalkula - Kalkulatory online",
    description: "PCC, taksa notarialna, kredyt, pożyczka i BMI.",
    images: ["/og-image.svg"]
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" }
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body>
        <div className="page-shell">{children}</div>
      </body>
    </html>
  );
}
