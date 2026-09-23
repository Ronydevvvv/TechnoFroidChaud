import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Partenaire local.
 *
 * ─── POURQUOI CETTE SECTION NE S'AFFICHE PAS ENCORE ──────────────────────
 * L'entreprise soutient un club de lutte à Stiring-Wendel. Le NOM du club,
 * son logo et la nature du lien n'ont pas été communiqués — et rien de tout
 * cela ne s'invente : un partenariat sportif se vérifie en un appel, et
 * afficher son nom engage aussi le club.
 *
 * La section est donc ÉCRITE mais NEUTRALISÉE. `PARTENAIRE` vaut `null`,
 * le composant renvoie `null`, et la page d'entreprise ne montre rien.
 *
 * ─── POURQUOI PAS UN CADRE VIDE EN PRODUCTION ────────────────────────────
 * C'est le vrai piège d'un emplacement réservé : un visiteur ne sait pas
 * que c'en est un. « PARTENAIRE LOCAL » suivi d'un rectangle vide ne se lit
 * pas comme « en préparation » — ça se lit comme un site inachevé, sur la
 * page même qui doit inspirer confiance. Une réservation est utile dans un
 * dossier de conception ; elle est contre-productive en ligne.
 *
 * ─── COMMENT L'ACTIVER ───────────────────────────────────────────────────
 * Une seule chose à faire : remplir l'objet ci-dessous. Aucun autre fichier
 * à toucher, aucune classe à ajouter.
 *
 *   nom      le nom exact du club, tel qu'il l'écrit lui-même
 *   texte    deux à trois phrases, fournies ou validées par l'entreprise
 *   logo     déposé dans `public/photos/`, fond transparent de préférence
 *   depuis   l'année, UNIQUEMENT si elle est certaine — sinon on l'omet,
 *            le champ est facultatif et la ligne disparaît d'elle-même
 *
 * ─── LA COMPOSITION, QUAND ELLE S'AFFICHERA ──────────────────────────────
 * Deux colonnes. À gauche le logo, posé dans un cadre au trait — pas une
 * carte, pas d'ombre : le même filet d'encre que les cartouches des
 * planches. À droite le nom et le texte, avec la mention de la commune en
 * surtitre.
 *
 * Le cadre du logo est en rapport 4/3 et l'image en `object-contain` : un
 * logo de club est de proportion imprévisible, et le recadrer serait le
 * déformer. Il flotte dans son cadre, comme sur une planche de marque.
 */

type Partenaire = {
  nom: string;
  texte: string;
  logo?: string;
  depuis?: string;
};

/**
 * ─── À REMPLIR ───────────────────────────────────────────────────────────
 * Laisser `null` tant que le nom exact du club n'est pas confirmé.
 * Voir `A-FOURNIR.md` §2.6 pour la liste complète de ce qui manque.
 */
const PARTENAIRE: Partenaire | null = null;

/** La commune, reprise de la liste réellement desservie. */
const COMMUNE = 'Stiring-Wendel';

export function PartenaireLocal() {
  if (!PARTENAIRE) return null;
  const p: Partenaire = PARTENAIRE;

  return (
    <section
      aria-labelledby="partenaire"
      className="border-t border-line bg-stone py-16 lg:py-24"
    >
      <div className="container-t">
        <Reveal>
          <p className="flex items-center gap-3 text-[0.9rem] text-slate">
            <span aria-hidden className="h-px w-7 bg-brand" />
            Partenaire local
          </p>
        </Reveal>

        <div className="mt-9 lg:mt-12 lg:grid lg:grid-cols-12 lg:gap-x-16">
          {/* ─── LE LOGO ───
              Cadre au trait, fond blanc, `object-contain`. Un logo de club
              a des proportions qu'on ne connaît pas à l'avance : le
              recadrer le déformerait. Il respire dans son cadre. */}
          {p.logo ? (
            <Reveal className="lg:col-span-4" delay={0.05}>
              <div className="flex aspect-[4/3] items-center justify-center border border-line bg-white p-8">
                <Image
                  src={p.logo}
                  alt={`Logo — ${p.nom}`}
                  width={320}
                  height={240}
                  className="h-full w-full object-contain"
                />
              </div>
            </Reveal>
          ) : null}

          <Reveal
            className={p.logo ? 'mt-8 lg:col-span-7 lg:col-start-6 lg:mt-0' : 'lg:col-span-8'}
            delay={0.1}
          >
            <p className="text-[0.86rem] tracking-[0.08em] text-slate uppercase">
              {COMMUNE}
            </p>
            <h2
              id="partenaire"
              className="heading mt-3 max-w-[20ch] text-[clamp(1.7rem,3.2vw,2.5rem)] leading-[1.08] text-ink"
            >
              {p.nom}
            </h2>
            <p className="mt-5 max-w-[54ch] text-[1.02rem] leading-8 text-slate">
              {p.texte}
            </p>
            {/* L'année ne s'affiche que si elle est fournie. Une date
                approximative sur un partenariat est exactement le genre de
                détail qu'on ne peut pas rattraper. */}
            {p.depuis ? (
              <p className="mt-6 border-t border-line pt-5 text-[0.95rem] text-slate">
                Partenaire depuis {p.depuis}.
              </p>
            ) : null}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
