import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Inter, Inter_Tight } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { JsonLd } from '@/components/ui/JsonLd';
import { businessSchema } from '@/lib/seo';
import { company } from '@/content/company';
import { SITE_URL } from '@/content/navigation';
import './globals.css';

/**
 * Deux graisses d'une même famille élargie : Inter Tight pour les titres,
 * Inter pour la lecture. C'est le couple retenu sur TERRALEC, et il tient
 * la même promesse ici — un dessin neutre, une hauteur d'x généreuse, et
 * une version resserrée qui donne aux titres la densité corporate.
 *
 * `next/font` les auto-héberge à la compilation : aucun appel réseau vers
 * Google au chargement, donc aucun blocage du premier rendu et aucune
 * donnée transmise à un tiers.
 */
const interTight = Inter_Tight({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter-tight',
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});


const description =
  'Frigoriste-chauffagiste à Forbach : climatisation, chauffage, pompes à ' +
  'chaleur, réfrigération et chambres froides. Installation, entretien et dépannage.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${company.legalName} — climatisation et froid à ${company.primaryArea}`,
  description,
  applicationName: company.legalName,
  authors: [{ name: company.legalName }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: company.legalName,
    url: SITE_URL,
    title: `${company.legalName} — climatisation et froid à ${company.primaryArea}`,
    description,
    /* Même image de partage que les pages intérieures, définie ici parce que
       l'accueil ne passe pas par `pageMetadata` : il porte les métadonnées
       racine, dont hérite tout le site. */
    images: [
      {
        url: `${SITE_URL}/photos/og-partage.jpg`,
        width: 1200,
        height: 630,
        alt: `${company.legalName} — frigoriste et chauffagiste à ${company.city}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${company.legalName} — climatisation et froid à ${company.primaryArea}`,
    description,
    images: [`${SITE_URL}/photos/og-partage.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  formatDetection: { telephone: true, address: true, email: true },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={`${interTight.variable} ${inter.variable}`}>
      <body>
        <a
          href="#contenu"
          className="sr-only rounded-md focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:bg-ink focus:px-4 focus:py-2.5 focus:text-sm focus:text-white"
        >
          Aller au contenu
        </a>

        <SmoothScroll />
        <Header />
        <main id="contenu">{children}</main>
        <Footer />

        <JsonLd data={businessSchema()} />
      </body>
    </html>
  );
}
