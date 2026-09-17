import Link from 'next/link';
import { navigation } from '@/content/navigation';

/**
 * Page 404.
 *
 * Elle propose la navigation complète plutôt qu'un simple retour à
 * l'accueil : quelqu'un qui atterrit sur une adresse morte cherchait
 * quelque chose de précis, et le renvoyer au point de départ lui fait
 * recommencer son parcours.
 */

export default function NotFound() {
  return (
    <section className="border-b border-line bg-white pt-32 pb-24 lg:pt-40 lg:pb-28">
      <div className="container-t">
        <p className="flex items-center gap-3 text-[0.95rem] text-slate"><span aria-hidden className="h-px w-7 shrink-0 bg-brand" />Erreur 404</p>
        <h1 className="heading t-h1 mt-4 max-w-[16ch] text-ink">Cette page n’existe pas</h1>
        <p className="lede mt-6 text-[1.05rem] leading-8 text-slate">
          L’adresse est peut-être erronée, ou la page a été déplacée. Voici où
          aller.
        </p>

        <ul className="mt-12 max-w-3xl border-t border-line">
          {navigation.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group flex items-center justify-between gap-6 border-b border-line py-5"
              >
                <span className="heading text-[1.15rem] text-ink transition-colors group-hover:text-brand">
                  {item.label}
                </span>
                <span aria-hidden className="text-slate transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link href="/" className="btn btn-primary btn-arrow">
            Retour à l’accueil
          </Link>
          <Link href="/contact" className="btn btn-secondary">
            Nous contacter
          </Link>
        </div>
      </div>
    </section>
  );
}
