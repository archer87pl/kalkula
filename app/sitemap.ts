import { MetadataRoute } from 'next';
import { CALCULATORS } from '@/lib/calculators';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://kalkula.pl';
  
  // Strona główna
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ];

  // Kalkulatory
  CALCULATORS.forEach((calculator) => {
    routes.push({
      url: `${baseUrl}${calculator.href}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    });
  });

  return routes;
}
