'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, Phone, X } from 'lucide-react';
import { company } from '@/content/company';
import { navigation } from '@/content/navigation';
import { Logo } from '@/components/ui/Logo';

/**
 * En-tête.
 *
 * Deux états, un seul déclencheur : le défilement.
 *
 * En haut de l'accueil, l'en-tête est transparent et posé sur le hero
 * anthracite — l'image occupe alors toute la hauteur de l'écran, sans
 * bandeau blanc qui la coupe. Dès huit pixels de défilement, il devient
 * opaque et sombre.
 *
 * Sur les pages intérieures, dont le haut est clair, il est opaque
 * d'emblée : pas de texte blanc sur fond blanc au premier rendu.
 *
 * ─── LA NAVIGATION DESKTOP EST REGROUPÉE ─────────────────────────────────
 * Huit entrées à plat tenaient la largeur, mais elles la SATURAIENT : la
 * barre se lisait comme un sommaire, et le bouton de devis — la seule action
 * de l'en-tête — se noyait au milieu de huit libellés de même poids.
 *
 * Quatre entrées la remplacent : Entreprise, Services, Réalisations,
 * Dépannage. Les cinq métiers passent sous « Services ».
 *
 * ─── CE QUE CE REGROUPEMENT COÛTE, ET COMMENT C'EST COMPENSÉ ─────────────
 * La version précédente les tenait à plat pour une raison écrite dans
 * `content/navigation.ts` : un déroulant enterre les pages les plus
 * rentables du site. C'est vrai, et ce n'est pas annulé — c'est compensé.
 * Les cinq métiers restent atteignables en un clic depuis trois endroits
 * que le regroupement ne touche pas :
 *
 *   la section « Nos métiers » de l'accueil — six liens illustrés
 *   le pied de page — la liste complète, sur toutes les pages
 *   le menu mobile — inchangé, toujours à plat
 *
 * `content/navigation.ts` n'est pas modifié : il continue d'alimenter le
 * pied de page, le fil d'Ariane et le menu mobile. Seule la barre desktop
 * lit la structure ci-dessous.
 *
 * ─── LE DÉROULANT ────────────────────────────────────────────────────────
 * Ouvert au survol ET au clic — le survol seul exclut le clavier et le
 * tactile. Fermé par Échap, par un clic au-dehors, et à chaque changement
 * de page. Un panneau de 15 rem, un filet, aucun ombrage porté, aucune
 * icône : il emprunte les couleurs de l'en-tête au lieu d'en introduire.
 */

/**
 * Barre desktop. Quatre entrées, dont une qui en contient cinq.
 * Les libellés et les URL sont ceux de `content/navigation.ts` — rien n'est
 * renommé ici, seule la hiérarchie change.
 */
const barre = [
  { label: 'Entreprise', href: '/entreprise' },
  {
    label: 'Services',
    enfants: [
      { label: 'Climatisation', href: '/climatisation' },
      { label: 'Chauffage et chaudières', href: '/chauffage' },
      { label: 'Pompes à chaleur', href: '/pompes-a-chaleur' },
      { label: 'Réfrigération', href: '/refrigeration' },
      { label: 'Chambres froides', href: '/chambres-froides' },
    ],
  },
  { label: 'Réalisations', href: '/realisations' },
  { label: 'Dépannage', href: '/entretien-depannage' },
] as const;

const hrefsServices = barre
  .flatMap((e) => ('enfants' in e ? e.enfants.map((c) => c.href) : []));

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  /** Seul l'accueil ouvre sur une bande sombre pleine hauteur. */
  const overHero = pathname === '/';
  /** Vrai quand l'en-tête se lit sur fond sombre. */
  const onDark = overHero;
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const services = useRef<HTMLLIElement>(null);

  /** Échap et clic au-dehors referment le déroulant. */
  useEffect(() => {
    if (!servicesOpen) return;
    const auClavier = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setServicesOpen(false);
    };
    const auDehors = (e: PointerEvent) => {
      if (!services.current?.contains(e.target as Node)) setServicesOpen(false);
    };
    document.addEventListener('keydown', auClavier);
    document.addEventListener('pointerdown', auDehors);
    return () => {
      document.removeEventListener('keydown', auClavier);
      document.removeEventListener('pointerdown', auDehors);
    };
  }, [servicesOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  return (
    <header
      data-dark={overHero && !scrolled && !menuOpen ? '' : undefined}
      className={`group/header fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] ${
        overHero && !scrolled && !menuOpen
          ? 'border-transparent bg-transparent text-white'
          : overHero
            ? 'border-white/10 bg-steel-900/95 text-white backdrop-blur-md'
            : 'border-line bg-white text-ink shadow-[0_1px_16px_-8px_rgba(20,22,26,0.25)]'
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-[110rem] items-center justify-between gap-6 px-[clamp(1.25rem,4.5vw,3.5rem)] lg:h-[4.5rem]">
        <Link href="/" aria-label={`${company.legalName}, accueil`} className="shrink-0">
          <Logo className="h-8 lg:h-9" />
        </Link>

        {/* Affichée dès 1024 px, contre 1280 px auparavant : quatre
            entrées tiennent là où huit se cassaient. Le menu burger recule
            d'autant. */}
        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-6 text-[0.88rem] xl:gap-7">
            {barre.map((entree) => {
              if (!('enfants' in entree)) {
                const actif =
                  pathname === entree.href || pathname.startsWith(`${entree.href}/`);
                return (
                  <li key={entree.href}>
                    <Link
                      href={entree.href}
                      aria-current={actif ? 'page' : undefined}
                      className={`link-t whitespace-nowrap ${
                        onDark
                          ? actif
                            ? 'font-semibold text-white'
                            : 'text-steel-100 hover:text-white'
                          : actif
                            ? 'font-semibold text-ink'
                            : 'text-slate hover:text-ink'
                      }`}
                    >
                      {entree.label}
                    </Link>
                  </li>
                );
              }

              /* « Services » est actif dès qu'on est sur l'une des cinq
                 pages métier : sans cela, le visiteur perd sa position dès
                 qu'il entre dans le groupe. */
              const actif = hrefsServices.some(
                (h) => pathname === h || pathname.startsWith(`${h}/`),
              );

              return (
                /* ─── TROIS ENTRÉES, TROIS COMPORTEMENTS ───
                   Un seul gestionnaire pour les trois se contredisait : le
                   survol ouvrait le panneau, puis le clic le refermait
                   aussitôt — à la souris, « Services » était donc
                   inutilisable au clic.

                     souris   survol seul. Le clic ne fait rien : le panneau
                              est déjà ouvert, et le refermer sous le doigt
                              qui vient de le viser n'a aucun sens.
                     tactile  bascule au `pointerdown`. Il n'y a pas de
                              survol sur un écran tactile.
                     clavier  le focus ouvre, Tab hors du groupe referme,
                              Échap referme. `e.detail === 0` distingue une
                              activation clavier d'un clic. */
                <li
                  key={entree.label}
                  ref={services}
                  className="relative"
                  onPointerEnter={(e) => {
                    if (e.pointerType === 'mouse') setServicesOpen(true);
                  }}
                  onPointerLeave={(e) => {
                    if (e.pointerType === 'mouse') setServicesOpen(false);
                  }}
                  onFocusCapture={() => setServicesOpen(true)}
                  onBlurCapture={(e) => {
                    if (!services.current?.contains(e.relatedTarget as Node)) {
                      setServicesOpen(false);
                    }
                  }}
                >
                  <button
                    type="button"
                    onPointerDown={(e) => {
                      if (e.pointerType !== 'mouse') setServicesOpen((v) => !v);
                    }}
                    onClick={(e) => {
                      if (e.detail === 0) setServicesOpen((v) => !v);
                    }}
                    aria-expanded={servicesOpen}
                    aria-controls="menu-services"
                    className={`link-t flex cursor-pointer items-center gap-1.5 whitespace-nowrap ${
                      onDark
                        ? actif
                          ? 'font-semibold text-white'
                          : 'text-steel-100 hover:text-white'
                        : actif
                          ? 'font-semibold text-ink'
                          : 'text-slate hover:text-ink'
                    }`}
                  >
                    {entree.label}
                    <ChevronDown
                      aria-hidden
                      strokeWidth={1.8}
                      className={`h-3.5 w-3.5 transition-transform duration-300 ${
                        servicesOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* ─── LE PANNEAU ───
                      `invisible` plutôt que l'attribut `hidden`. Les deux
                      retirent l'élément du parcours de tabulation et le
                      cachent aux lecteurs d'écran, mais `hidden` ne se
                      transitionne pas : le panneau apparaissait d'un coup.
                      La visibilité, l'opacité et le décalage s'animent
                      ensemble sur 180 ms — une apparition, pas un
                      surgissement.

                      Le `pt-3` est porté par le conteneur et non par une
                      marge : c'est un pont de survol entre le bouton et le
                      panneau. Un écart réel romprait le survol au passage
                      et le menu se fermerait sous le curseur. */}
                  <div
                    id="menu-services"
                    aria-hidden={!servicesOpen}
                    className={`absolute top-full left-0 z-10 pt-3 transition-[opacity,transform,visibility] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      servicesOpen
                        ? 'visible translate-y-0 opacity-100'
                        : 'invisible -translate-y-1 opacity-0'
                    }`}
                  >
                    {/* Ombre portée très courte et très diffuse : elle
                        décolle le panneau de la photographie du hero sans
                        jamais se voir comme une ombre. Le filet fait le
                        reste du travail. */}
                    <ul
                      className={`min-w-[15.5rem] rounded-md border p-1 shadow-[0_10px_30px_-22px_rgba(8,14,20,0.55)] ${
                        onDark
                          ? 'border-white/[0.14] bg-steel-900/95 backdrop-blur-md'
                          : 'border-line bg-white'
                      }`}
                    >
                      {entree.enfants.map((enfant) => {
                        const ici =
                          pathname === enfant.href ||
                          pathname.startsWith(`${enfant.href}/`);
                        return (
                          <li key={enfant.href}>
                            {/* Le fond de survol est INSET — il ne touche
                                jamais le filet du panneau. C'est ce détail
                                qui sépare un menu d'entreprise d'un menu
                                système, où la surbrillance file d'un bord à
                                l'autre.

                                La flèche n'apparaît qu'au survol, et de
                                deux pixels : elle indique le départ, elle
                                ne décore pas la ligne au repos. */}
                            <Link
                              href={enfant.href}
                              aria-current={ici ? 'page' : undefined}
                              className={`group/svc flex items-center justify-between gap-4 rounded-[5px] px-3.5 py-2.5 text-[0.9rem] transition-colors duration-200 ${
                                onDark
                                  ? ici
                                    ? 'bg-white/[0.07] font-semibold text-white'
                                    : 'text-steel-100 hover:bg-white/[0.06] hover:text-white'
                                  : ici
                                    ? 'bg-ink/[0.045] font-semibold text-ink'
                                    : 'text-slate hover:bg-ink/[0.035] hover:text-ink'
                              }`}
                            >
                              <span className="whitespace-nowrap">{enfant.label}</span>
                              <span
                                aria-hidden
                                className="-translate-x-0.5 text-[0.85rem] text-brand opacity-0 transition-[opacity,transform] duration-200 group-hover/svc:translate-x-0 group-hover/svc:opacity-100"
                              >
                                →
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          {/* Le combiné sonne au survol — trois oscillations amorties sur
              0,55 s, et rien d'autre : ni changement de taille, ni couleur
              qui change sur le numéro. L'animation est portée par l'icône
              seule, jamais par le lien entier, sinon c'est la ligne de
              texte qui tremble.

              `group-hover` et non `hover` sur l'icône : la sonnerie part
              dès que le curseur entre dans la cible de 44 px du lien, pas
              seulement quand il touche le pictogramme de 16 px. */}
          <a
            href={company.phoneHref}
            className={`group hidden items-center gap-2 py-3 text-[0.9rem] font-semibold whitespace-nowrap xl:flex ${
              onDark ? 'text-white' : 'text-ink'
            }`}
            aria-label={`Appeler le ${company.phone}`}
          >
            <Phone
              aria-hidden
              strokeWidth={1.6}
              className="h-4 w-4 origin-center text-brand transition-colors duration-300 group-hover:text-brand group-hover:[animation:tfc-sonne_0.55s_ease-in-out]"
            />
            {company.phone}
          </a>

          <Link href="/contact" className="btn btn-primary btn-sm hidden whitespace-nowrap lg:inline-flex">
            Demander un devis
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            className="-mr-2 cursor-pointer p-2 lg:hidden"
          >
            <span className="sr-only">{menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}</span>
            {menuOpen ? (
              <X aria-hidden strokeWidth={1.6} className="h-5 w-5" />
            ) : (
              <Menu aria-hidden strokeWidth={1.6} className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <div
        id="menu-mobile"
        hidden={!menuOpen}
        className={`h-[calc(100dvh-4rem)] overflow-y-auto border-t lg:hidden ${
          onDark ? 'border-white/10 bg-steel-900' : 'border-line bg-white'
        }`}
      >
        <nav aria-label="Navigation mobile" className="container-t py-2">
          {/* La page courante est marquée ici aussi. Le menu déroulé occupe
              tout l'écran : sans repère, le visiteur perd de vue où il se
              trouve dès qu'il l'ouvre. La marque est portée par l'accent
              bleu et par un contraste plus soutenu — jamais par un fond
              coloré, qui transformerait la ligne en onglet. */}
          {navigation.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`heading flex items-center justify-between border-b py-5 text-[1.2rem] ${
                  onDark ? 'border-white/10' : 'border-line'
                } ${
                  active
                    ? onDark
                      ? 'text-white'
                      : 'text-ink'
                    : onDark
                      ? 'text-steel-100'
                      : 'text-slate'
                }`}
              >
                {item.label}
                <span
                  aria-hidden
                  className={
                    active ? 'text-brand' : onDark ? 'text-steel-400' : 'text-slate'
                  }
                >
                  →
                </span>
              </Link>
            );
          })}

          <div className="flex flex-col gap-3 py-8">
            <a href={company.phoneHref} className={`btn w-full ${onDark ? "btn-onDark" : "btn-secondary"}`}>
              <Phone aria-hidden strokeWidth={1.6} className="h-4 w-4 text-brand" />
              {company.phone}
            </a>
            <Link href="/contact" className="btn btn-primary w-full">
              Demander un devis
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
