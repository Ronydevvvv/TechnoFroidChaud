import Link from 'next/link';

/**
 * Fil d'Ariane. Absent de l'accueil.
 *
 * Le dernier segment n'est pas un lien — c'est la page courante.
 */

export type Crumb = { name: string; path: string };

export function Breadcrumb({
  trail,
  dark = false,
}: {
  trail: Crumb[];
  /** Sur hero anthracite : le gris ardoise y devient illisible. */
  dark?: boolean;
}) {
  const muted = dark ? 'text-steel-200 hover:text-white' : 'text-slate hover:text-ink';
  const current = dark ? 'text-white' : 'text-ink';
  const sep = dark ? 'text-white/25' : 'text-line';

  return (
    <nav aria-label="Fil d’Ariane">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.82rem]">
        <li>
          <Link href="/" className={`link-t ${muted}`}>
            Accueil
          </Link>
        </li>
        {trail.map((crumb, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-2">
              <span aria-hidden className={sep}>
                /
              </span>
              {last ? (
                <span className={`font-medium ${current}`} aria-current="page">
                  {crumb.name}
                </span>
              ) : (
                <Link href={crumb.path} className={`link-t ${muted}`}>
                  {crumb.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
