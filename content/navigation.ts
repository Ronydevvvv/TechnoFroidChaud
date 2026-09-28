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

/**
 * L'URL canonique du site. Source unique.
 *
 * Elle alimente `metadataBase`, les canoniques de chaque page, l'Open
 * Graph, la carte Twitter, le sitemap, le robots.txt et toutes les données
 * structurées. Une seule ligne à changer le jour d'une bascule.
 *
 * ─── POURQUOI L'APEX, ET PAS `www.` ──────────────────────────────────────
 * Elle valait `https://www.techno-froid-chaud.fr`. Or ce nom N'EXISTE PAS :
 * la résolution DNS renvoie NXDOMAIN, sans enregistrement A, AAAA ni CNAME.
 * Le site déclarait donc à Google, sur chacune de ses douze pages et dans
 * son sitemap, que la version faisant autorité se trouvait à une adresse
 * injoignable.
 *
 * L'apex, lui, résout — vers 83.229.19.73, qui n'est pas Vercel et sert
 * encore l'ancien site. C'est aussi le domaine officiel retenu. Le pointer
 * ici est donc à la fois la correction d'un défaut et l'alignement sur la
 * cible : il ne restera plus qu'à faire pointer le DNS vers Vercel pour que
 * déclaration et réalité coïncident.
 *
 * ─── CE QUI RESTE À FAIRE, ET QUI N'EST PAS DU CODE ──────────────────────
 * Le domaine n'est attaché à AUCUN projet Vercel à ce jour (`vercel domains
 * ls` en renvoie zéro). Voir le pas-à-pas dans `.env.example`.
 */
export const SITE_URL = 'https://techno-froid-chaud.fr';
