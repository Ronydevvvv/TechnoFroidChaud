import { Hero } from '@/components/home/Hero';
import { Reperes } from '@/components/home/Reperes';
import { Systeme } from '@/components/home/Systeme';
import { Metiers } from '@/components/home/Metiers';
import { Publics } from '@/components/home/Publics';
import { Chantier } from '@/components/home/Chantier';
import { Methode } from '@/components/home/Methode';
import { Engagements } from '@/components/home/Engagements';
import { Zone } from '@/components/home/Zone';
import { CallToAction } from '@/components/sections/CallToAction';

/**
 * Accueil.
 *
 * ─── CE QUE CHAQUE SECTION DOIT FAIRE ────────────────────────────────────
 * Une section qui ne répond à aucune question du visiteur n'a rien à faire
 * sur une page d'accueil. Chacune répond ici à une question, une seule, et
 * dans l'ordre où elle se pose :
 *
 *   Hero          que faites-vous, et comment vous joindre ?
 *   Repères       qui êtes-vous, depuis quand, où ?
 *   Système       de quoi parle-t-on, au juste ?               ← la planche
 *   Métiers       que savez-vous faire, exactement ?          ← le cœur
 *   Publics       est-ce que ça me concerne, moi ?
 *   Installations qu'est-ce que je reçois, concrètement ?
 *   Méthode       comment ça se passe si je vous appelle ?
 *   Engagements   pourquoi vous plutôt qu'un autre ?
 *   Zone          intervenez-vous chez moi ?
 *   Appel final   bon, comment je vous contacte ?
 *
 * ─── LE MODÈLE 3D A QUITTÉ L'ACCUEIL ─────────────────────────────────────
 * « Nos installations » portait la scène three.js. Elle est remplacée par
 * une photographie : c'est la seule section dont le rôle est de montrer du
 * travail réel, et un modèle prouve qu'on sait modéliser, pas qu'on sait
 * poser. Plus aucun canvas WebGL n'est monté sur l'accueil, à aucune
 * largeur. La scène interactive reste sur `/chambres-froides` et
 * `/refrigeration`, qui n'ont pas été touchées.
 *
 * ─── RYTHME DES SURFACES ─────────────────────────────────────────────────
 * C'est lui qui structure la page, pas des filets ni des cartes :
 *
 *   photo sombre → blanc → ACIER → pierre → blanc → pierre → blanc →
 *   pierre → anthracite
 *
 * L'acier des « Métiers » est le seul grand aplat sombre du corps de page :
 * il fait de la section la plus importante la plus visible, sans qu'aucun
 * effet n'ait à le signaler.
 *
 * ─── L'APPEL À L'ACTION REVIENT TROIS FOIS ───────────────────────────────
 * Dans le hero, au bas de « Nos installations » — au moment où le visiteur
 * vient de comprendre ce qu'il reçoit — et en clôture. Jamais entre deux
 * sections sans rapport : un bouton posé au hasard se lit comme une
 * bannière.
 */
export default function Page() {
  return (
    <>
      <Hero />
      <Reperes />
      <Systeme />
      <Metiers />
      <Publics />
      <Chantier />
      <Methode />
      <Engagements />
      <Zone />
      <CallToAction
        title="Un projet de climatisation, de froid ou de pompe à chaleur ?"
        body="Décrivez-nous la situation en quelques lignes. Nous vous rappelons pour convenir d’une visite — ou pour évaluer l’urgence s’il s’agit d’une panne."
      />
    </>
  );
}
