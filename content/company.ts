/**
 * Données de l'entreprise.
 *
 * Sources : site actuel, Pappers (SIREN 897970083), fiche Pages Jaunes.
 *
 * Décision du dossier §11 : l'adresse légale est Morsbach — c'est le siège
 * immatriculé — et Forbach figure en zone desservie. Le site et la fiche
 * Google doivent dire exactement la même chose, sous peine de pénalité.
 */

export const company = {
  legalName: 'Techno Froid Chaud',
  siren: '897970083',
  legalForm: 'SAS',
  director: 'Eyup Mermer',
  /** Immatriculation au RCS. Aucune ancienneté ne sera antidatée. */
  foundedISO: '2021-04-01',
  foundedYear: 2021,

  phone: '06 13 96 67 75',
  phoneHref: 'tel:+33613966775',
  /**
   * À REMPLACER — adresse personnelle du dirigeant, telle qu'affichée
   * aujourd'hui. Une adresse au nom de domaine (contact@techno-froid-chaud.fr)
   * est le premier geste de crédibilité à poser ; le formulaire de contact
   * fonctionne indépendamment.
   */
  email: 'eyup.mermer@gmail.com',

  street: '12 impasse du Lavoir',
  postalCode: '57600',
  city: 'Morsbach',
  region: 'Moselle',
  country: 'FR',

  /** Ville de rayonnement commercial, distincte du siège. */
  primaryArea: 'Forbach',

  /** À CONFIRMER — absents du site officiel de l'entreprise. */
  hours: 'Du lundi au vendredi, 8 h – 18 h',
  openingHoursSchema: 'Mo-Fr 08:00-18:00',

  /** Engagement affiché par l'entreprise sur son site actuel. */
  warrantyYears: 3,
} as const;

/**
 * Engagements de l'entreprise.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * AUCUNE CERTIFICATION N'EST AFFICHÉE SUR CE SITE.
 *
 * Les mentions RGE QualiPAC, FEEBAT et CAPEB ont été retirées : elles
 * n'étaient pas confirmées par l'entreprise. Une qualification RGE affichée
 * à tort engage le client bien au-delà du site — elle conditionne le
 * versement de MaPrimeRénov' et des CEE, et son affichage abusif est
 * sanctionné.
 *
 * POUR LES RÉTABLIR : fournir les numéros et dates de validité des
 * qualifications, puis les remettre ici ET dans `hasCredential`
 * (`lib/seo.ts`). Tant que ce n'est pas fait, on ne promet aucune aide
 * d'État nulle part sur le site.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Ce qui les remplace tient sans aucun label : trois engagements que
 * l'entreprise prend elle-même, et que le client peut vérifier au premier
 * rendez-vous. C'est moins décoratif qu'un logo, mais c'est opposable.
 */
export const commitments = [
  {
    id: 'devis',
    name: 'Devis après visite',
    body: "Aucun chiffrage au téléphone. Le devis part d’un relevé sur place — volumes, alimentation électrique, passage des liaisons, contraintes de façade. C’est ce qui évite l’avenant en fin de chantier.",
  },
  {
    id: 'garantie',
    name: 'Garantie 3 ans',
    body: "Trois ans sur nos installations. L’engagement est écrit sur le devis, pas seulement affiché sur un site : c’est là qu’il vous est opposable.",
  },
  {
    id: 'interlocuteur',
    name: 'Un seul interlocuteur',
    body: "La personne qui dimensionne est celle qui met en service, et celle que vous rappelez ensuite. Au second appel, vous n’avez pas à tout redécrire.",
  },
] as const;

/**
 * Communes réellement desservies, ordonnées par proximité du siège.
 * Elles vivent dans le contenu et dans areaServed — jamais en pages
 * satellites par commune (dossier §11).
 */
export const servedTowns = [
  'Morsbach',
  'Forbach',
  'Stiring-Wendel',
  'Petite-Rosselle',
  'Behren-lès-Forbach',
  'Œting',
  'Spicheren',
  'Schœneck',
  'Cocheren',
  'Freyming-Merlebach',
  'Farébersviller',
  'Hombourg-Haut',
  'Saint-Avold',
  'Creutzwald',
  'Sarreguemines',
] as const;
