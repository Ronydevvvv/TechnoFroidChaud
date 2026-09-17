/**
 * Les six temps d'un projet.
 *
 * ─── POURQUOI CE FICHIER EXISTE ──────────────────────────────────────────
 * Ces étapes étaient écrites en dur dans `components/home/Methode.tsx`. Les
 * pages métier doivent les rappeler, et recopier six textes dans six
 * fichiers est le plus sûr moyen de les voir diverger : on corrige un mot
 * sur l'accueil, il reste faux ailleurs.
 *
 * L'accueil les déroule en entier ; les pages métier n'en affichent que le
 * nom, en bande compacte. Même source, deux densités.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Rien n'est promis ici : aucun délai, aucune gratuité, aucune garantie qui
 * ne figure pas déjà dans `content/company.ts`.
 */
export const etapes = [
  {
    nom: 'Échange',
    texte:
      'Vous décrivez la situation. Nous qualifions tout de suite s’il s’agit d’une panne ou d’un projet.',
  },
  {
    nom: 'Visite',
    texte:
      'Relevé sur place : volumes, exposition, alimentation électrique et passage des liaisons.',
  },
  {
    nom: 'Étude',
    texte:
      'Calcul des déperditions ou de la charge à refroidir, choix du matériel, puis devis détaillé.',
  },
  {
    nom: 'Installation',
    texte:
      'Pose des équipements, raccordements, percements repérés avant et repris après.',
  },
  {
    nom: 'Mise en service',
    texte:
      'Tirage au vide, contrôle d’étanchéité, charge de fluide et relevé des pressions.',
  },
  {
    nom: 'Suivi',
    texte: 'Entretien ou dépannage, avec la personne qui a posé l’installation.',
  },
] as const;
