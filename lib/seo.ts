import type { Metadata } from 'next';
import { company, servedTowns } from '@/content/company';
import { SITE_URL } from '@/content/navigation';

/**
 * Fabrique de métadonnées. Dossier §11.
 *
 * Chaque page passe par ici : c'est ce qui garantit qu'aucune n'oublie son
 * canonique, son Open Graph ou sa description.
 */

export function pageMetadata({
  title,
  description,
  path,
}: {
  /**
   * Titre complet et définitif, marque comprise si elle est utile.
   * Aucun gabarit ne s'y ajoute — viser 60 caractères au maximum.
   */
  title: string;
  description: string;
  /** Chemin absolu depuis la racine, ex. « /climatisation ». */
  path: string;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      siteName: company.legalName,
      title,
      description,
      url,
      /**
       * ─── L'IMAGE DE PARTAGE ────────────────────────────────────────────
       * Elle manquait sur les douze pages. Sans elle, un lien collé dans
       * WhatsApp, Facebook ou LinkedIn s'affiche en bloc de texte gris —
       * or le bouche-à-oreille numérique passe justement par là pour une
       * entreprise locale.
       *
       * 1200 × 630, le format que réclament les trois plateformes. C'est
       * un recadrage de la photographie du hero d'accueil : aucune image
       * n'a été ajoutée au projet, et elle est donc couverte par la même
       * licence (voir `public/photos/CREDITS.md`).
       *
       * Une seule image pour tout le site, volontairement : douze visuels
       * de partage différents seraient douze fichiers à remplacer le jour
       * des vraies photographies.
       */
      images: [
        {
          url: `${SITE_URL}/photos/og-partage.jpg`,
          width: 1200,
          height: 630,
          alt: `${company.legalName} — frigoriste et chauffagiste à ${company.city}`,
        },
      ],
    },
    /* `summary_large_image` et non `summary` : avec une image de 1200 px,
       la carte étroite la réduirait à une vignette carrée. */
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${SITE_URL}/photos/og-partage.jpg`],
    },
  };
}

/** Fil d'Ariane balisé. Absent de l'accueil (dossier §11). */
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { name: 'Accueil', path: '/' },
      ...trail,
    ].map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

/** Une prestation, rattachée au prestataire. Pages métiers uniquement. */
export function serviceSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    serviceType: name,
    url: `${SITE_URL}${path}`,
    provider: { '@type': 'HVACBusiness', name: company.legalName, '@id': `${SITE_URL}/#business` },
    areaServed: servedTowns.map((t) => ({ '@type': 'City', name: t })),
  };
}

/**
 * FAQ balisée. À n'émettre que si la FAQ est réellement visible sur la
 * page — Google pénalise le balisage masqué.
 */
export function faqSchema(items: readonly { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

/** L'établissement. Émis une seule fois, dans le layout racine. */
export function businessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HVACBusiness',
    '@id': `${SITE_URL}/#business`,
    name: company.legalName,
    url: SITE_URL,
  /* `image` : Google la réclame pour afficher une fiche d'établissement
     enrichie. C'est la même image que le partage social — aucune nouvelle
     ressource, et elle montre bien le métier. */
  image: `${SITE_URL}/photos/og-partage.jpg`,
    telephone: company.phone,
    email: company.email,
    foundingDate: company.foundedISO,
    /* Décision §11 : adresse légale Morsbach, Forbach en zone desservie.
       Le site et la fiche Google doivent dire exactement la même chose. */
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.street,
      postalCode: company.postalCode,
      addressLocality: company.city,
      addressRegion: company.region,
      addressCountry: company.country,
    },
    areaServed: servedTowns.map((t) => ({ '@type': 'City', name: t })),
    // `openingHours` retiré : les horaires ne figurent pas sur le site de
    // l'entreprise. Les déclarer en données structurées les rend lisibles
    // par Google et sa fiche établissement — à rétablir une fois confirmés.
    // `hasCredential` a été retiré : aucune qualification n'est confirmée.
    // Déclarer une certification en données structurées la rend lisible par
    // Google et par les comparateurs — c'est une affirmation publique, au
    // même titre qu'une mention visible. À rétablir avec les numéros réels.
    identifier: { '@type': 'PropertyValue', propertyID: 'SIREN', value: company.siren },
  };
}
