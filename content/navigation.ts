/**
 * Arborescence. Dossier §04.
 *
 * ─── CE FICHIER N'EST PLUS LA BARRE DESKTOP ─────────────────────────────
 * Il alimente le PIED DE PAGE, le FIL D'ARIANE et le MENU MOBILE, qui
 * restent à plat. La barre desktop, elle, regroupe depuis peu les cinq
 * métiers sous « Services » : sa structure vit dans
 * `components/layout/Header.tsx`.
 *
 * La règle d'origine — « jamais sous un menu déroulant, un déroulant enterre
 * les pages les plus rentables du site » — n'était pas fausse. Elle est
 * compensée : les cinq métiers restent atteignables en un clic depuis la
 * section « Nos métiers » de l'accueil, depuis le pied de page présent sur
 * toutes les pages, et depuis le menu mobile. Aucune des cinq URL n'a
 * changé, et aucune n'a perdu de lien entrant interne.
 *
 * `navLabel` existe parce qu'une barre de navigation n'est pas un sommaire :
 * six entrées longues se cassent sur deux lignes autour de 1280 px, et une
 * navigation qui se replie est le premier signe d'un site non fini. Le
 * libellé complet reste celui du fil d'Ariane, du pied de page et du titre.
 */

export type NavItem = {
  /** Libellé complet — pied de page, fil d'Ariane. */
  label: string;
  /** Libellé court — barre de navigation. */
  navLabel?: string;
  href: string;
};

export const navigation: NavItem[] = [
  { label: 'L’entreprise', navLabel: 'Entreprise', href: '/entreprise' },
  { label: 'Climatisation', href: '/climatisation' },
  { label: 'Chauffage et chaudières', navLabel: 'Chauffage', href: '/chauffage' },
  { label: 'Pompes à chaleur', navLabel: 'Pompes à chaleur', href: '/pompes-a-chaleur' },
  { label: 'Réfrigération', href: '/refrigeration' },
  { label: 'Chambres froides', navLabel: 'Chambres froides', href: '/chambres-froides' },
  { label: 'Réalisations', href: '/realisations' },
  { label: 'Entretien & Dépannage', navLabel: 'Dépannage', href: '/entretien-depannage' },
];

export const SITE_URL = 'https://www.techno-froid-chaud.fr';
