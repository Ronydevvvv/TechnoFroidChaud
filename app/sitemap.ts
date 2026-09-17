import type { MetadataRoute } from 'next';
import { SITE_URL, navigation } from '@/content/navigation';

/**
 * Sitemap. Généré depuis la même source que la navigation : une page ajoutée
 * au menu ne peut pas être oubliée ici.
 *
 * Les pages légales sont volontairement en priorité basse — elles doivent
 * être indexables, pas mises en avant.
 */

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    ...navigation.map((item) => ({
      url: `${SITE_URL}${item.href}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    {
      url: `${SITE_URL}/mentions-legales`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/confidentialite`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ];
}
