import type { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone } from 'lucide-react';
import { Breadcrumb, type Crumb } from '@/components/layout/Breadcrumb';
import { Reveal } from '@/components/ui/Reveal';
import { company } from '@/content/company';

/**
 * Hero des pages internes.
 *
 * ─── CE QUI A ÉTÉ RETIRÉ ─────────────────────────────────────────────────
 * Il portait un cadre photo à droite. Comme aucune photographie n'existe
 * encore, chaque page intérieure s'ouvrait sur un grand rectangle vide —
 * huit fois le même. C'était le défaut le plus visible du site.
 *
 * Le cadre est supprimé. Ce qui occupe la place à droite, quand il y a lieu,
 * est du contenu réel : une accroche courte, un rappel téléphonique, ou
 * rien du tout si la page n'a rien de juste à mettre là.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * QUATRE VARIANTES, pour que les pages ne se ressemblent pas :
 *
 *   `photo` — photographie en fond, voile depuis la gauche. Pages métier.
 *   `plain` — titre large, chapô dessous. Pages éditoriales.
 *   `split` — titre à gauche, aparté à droite.
 *   `dark`  — fond anthracite et rappel téléphonique. Urgence, contact.
 *
 * ─── LA VARIANTE `photo` ─────────────────────────────────────────────────
 * Le commentaire ci-dessus l'annonçait : « quand les photos arriveront, une
 * variante s'ajoutera ici sans toucher aux pages ». C'est fait, et c'est
 * exactement ce qui harmonise le site — une page passe `variant="photo"` et
 * une image, rien d'autre.
 *
 * Elle reprend le dispositif du hero d'accueil, à l'échelle d'une page
 * intérieure : photographie en fond plein cadre, voile sombre venant de la
 * gauche sur grand écran et du haut sur téléphone, texte posé sur la partie
 * opaque. Même grammaire, même palette, hauteur moindre — une page
 * intérieure ne rejoue pas l'ouverture du site.
 *
 * Les photographies sont provisoires et documentées dans
 * `public/photos/CREDITS.md`. Aucune n'est présentée comme un chantier de
 * l'entreprise.
 */

type Props = {
  overline: string;
  title: ReactNode;
  intro: ReactNode;
  trail: Crumb[];
  variant?: 'photo' | 'plain' | 'split' | 'dark';
  /** Variante `photo` : fond plein cadre. `position` cadre le sujet. */
  photo?: { src: string; alt: string; position?: string };
  /** Variante `photo` : bouton de devis et téléphone sous le chapô. */
  actions?: boolean;
  /**
   * Inverse l'ordre des actions : le téléphone devient le bouton, le devis
   * le lien secondaire. Réservé à la page Dépannage — sur une panne, on
   * appelle, on ne remplit pas un formulaire.
   */
  urgence?: boolean;
  /** Aparté de la variante `split` — une idée, pas un résumé. */
  aside?: ReactNode;
  /** Relevés courts. N'afficher que ce qui est vrai et vérifiable. */
  facts?: { k: string; v: string }[];
  /**
   * Resserre UNIQUEMENT le rythme vertical sous 640 px.
   *
   * Ce composant sert neuf pages. Modifier ses espacements en dur les
   * déplacerait toutes — or `/chambres-froides` et `/refrigeration` sont
   * figées. D'où une option : sans elle, le rendu est au caractère près
   * celui d'avant, et chaque valeur resserrée est écrite « mobile, puis
   * `sm:` d'origine », donc le bureau est intouché par construction.
   */
  serreMobile?: boolean;
  /**
   * Calque graphique posé entre la photographie et le voile — un motif
   * technique à l'échelle du hero. Volontairement optionnel et sans valeur
   * par défaut : une page qui n'en passe pas rend exactement le même HTML
   * qu'avant. Réservé à la variante `photo`, seule à avoir un fond.
   */
  decor?: ReactNode;
};

export function PageHero({
  overline,
  title,
  intro,
  trail,
  variant = 'plain',
  photo,
  actions = false,
  urgence = false,
  aside,
  facts,
  decor,
  serreMobile = false,
}: Props) {
  const enPhoto = variant === 'photo' && !!photo;
  /** Le texte se lit sur fond sombre dans les deux cas. */
  const dark = variant === 'dark' || enPhoto;

  return (
    <section
      className={
        enPhoto
          ? 'relative isolate overflow-hidden bg-[#0c141c] text-white'
          : dark
            ? 'bg-steel-900 text-white'
            : 'border-b border-line bg-stone'
      }
    >
      {enPhoto && (
        <>
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={photo.position ? { objectPosition: photo.position } : undefined}
          />
          {/* Le calque graphique s'intercale ICI : sur la photographie, sous
              le voile. Posé au-dessus du voile il écraserait le texte ;
              posé sous la photographie il serait invisible. */}
          {decor}

          {/* Voile. Latéral sur grand écran — le sujet garde sa moitié
              droite ; vertical sur téléphone, où le sujet passe sous le
              texte. Même bascule que le hero d'accueil. */}
          <span
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(10,17,24,0.94)_0%,rgba(10,17,24,0.86)_45%,rgba(10,17,24,0.55)_100%)] lg:bg-[linear-gradient(to_right,rgba(10,17,24,0.94)_0%,rgba(10,17,24,0.86)_38%,rgba(10,17,24,0.5)_68%,rgba(10,17,24,0.2)_100%)]"
          />
          {/* Voile de tête : l'en-tête est transparent au-dessus du hero
              d'accueil seulement, mais sur les pages intérieures il est
              opaque — ce dégradé sert ici à asseoir le fil d'Ariane. */}
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-32 bg-[linear-gradient(to_bottom,rgba(8,14,20,0.6)_0%,rgba(8,14,20,0)_100%)]"
          />
        </>
      )}

      <div
        className={`container-t pt-28 ${
          serreMobile ? 'pb-12 sm:pb-16' : 'pb-16'
        } lg:pb-20 ${enPhoto ? 'relative lg:pt-32' : 'lg:pt-36'}`}
      >
        <Reveal>
          <Breadcrumb trail={trail} dark={dark} />
        </Reveal>

        <div
          className={
            variant === 'split'
              ? `${serreMobile ? 'mt-8 sm:mt-10' : 'mt-10'} grid gap-10 lg:mt-12 lg:grid-cols-12 lg:gap-16`
              : `${serreMobile ? 'mt-8 sm:mt-10' : 'mt-10'} lg:mt-12`
          }
        >
          <div
            className={
              variant === 'split'
                ? 'lg:col-span-7'
                : enPhoto
                  ? 'max-w-2xl'
                  : 'max-w-3xl'
            }
          >
            <Reveal delay={0.05}>
              {/* Sur-titre marqué d'un filet d'accent, comme sur l'accueil :
                  c'est le même signe d'annonce d'un bout à l'autre du site. */}
              <p
                className={`flex items-center gap-3 text-[0.95rem] ${
                  dark ? 'text-white/70' : 'text-slate'
                }`}
              >
                <span aria-hidden className="h-px w-7 bg-brand" />
                {overline}
              </p>
              <h1
                className={`heading t-h1 ${serreMobile ? 'mt-3 sm:mt-4' : 'mt-4'} ${
                  variant === 'plain' ? 'max-w-[18ch]' : 'max-w-[14ch]'
                } ${dark ? 'text-white' : 'text-ink'}`}
              >
                {title}
              </h1>
              <p
                className={`${serreMobile ? 'mt-5 sm:mt-6' : 'mt-6'} max-w-2xl text-[1.05rem] leading-8 ${
                  dark ? 'text-steel-100' : 'text-slate'
                }`}
              >
                {intro}
              </p>
            </Reveal>

            {actions && (
              <Reveal delay={0.12}>
                <div
                  className={`${serreMobile ? 'mt-7 sm:mt-9' : 'mt-9'} flex flex-wrap items-center gap-x-8 gap-y-4`}
                >
                  {urgence ? (
                    <>
                      <a href={company.phoneHref} className="btn btn-primary">
                        <Phone aria-hidden strokeWidth={1.7} className="size-4" />
                        {company.phone}
                      </a>
                      <Link href="/contact" className="link-t text-[1.02rem] text-white">
                        Décrire la panne
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link href="/contact" className="btn btn-primary btn-arrow">
                        Demander un devis
                      </Link>
                      <a
                        href={company.phoneHref}
                        className="heading -my-2 inline-flex items-center py-2 text-[1.25rem] text-white underline-offset-[6px] hover:underline"
                        aria-label={`Appeler le ${company.phone}`}
                      >
                        {company.phone}
                      </a>
                    </>
                  )}
                </div>
              </Reveal>
            )}

            {variant === 'dark' && (
              <Reveal delay={0.12}>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <a href={company.phoneHref} className="btn btn-primary">
                    <Phone aria-hidden strokeWidth={1.7} className="size-4" />
                    {company.phone}
                  </a>
                  <Link href="/contact" className="btn btn-onDark btn-arrow">
                    Décrire la panne
                  </Link>
                </div>
              </Reveal>
            )}
          </div>

          {variant === 'split' && aside && (
            <div className="lg:col-span-5 lg:pt-14">
              <Reveal delay={0.12}>
                <div className="border-t border-line pt-6 text-[1.02rem] leading-8 text-slate">
                  {aside}
                </div>
              </Reveal>
            </div>
          )}
        </div>

        {facts && facts.length > 0 && (
          <Reveal delay={0.16}>
            <dl
              className={`${
                serreMobile ? 'mt-8 gap-y-5 pt-6 sm:mt-12 sm:gap-y-6 sm:pt-7' : 'mt-12 gap-y-6 pt-7'
              } flex flex-wrap gap-x-14 border-t ${dark ? 'border-white/20' : 'border-line'}`}
            >
              {facts.map((f) => (
                <div key={f.k}>
                  {/* Sur photographie, `steel-400` tombait à un contraste
                      illisible : le gris moyen prévu pour l'anthracite plat
                      n'a plus de fond stable sous lui. */}
                  <dt
                    className={`text-[0.9rem] ${
                      enPhoto ? 'text-white/65' : dark ? 'text-steel-400' : 'text-slate'
                    }`}
                  >
                    {f.k}
                  </dt>
                  <dd
                    className={`heading mt-1.5 text-[1.2rem] ${
                      dark ? 'text-white' : 'text-ink'
                    }`}
                  >
                    {f.v}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        )}
      </div>
    </section>
  );
}
