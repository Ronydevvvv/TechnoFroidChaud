import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

/**
 * Vérification visuelle et fonctionnelle.
 *
 * Le panneau navigateur de l'IDE ne composite pas les images : ni
 * requestAnimationFrame, ni IntersectionObserver ne s'y déclenchent. Toute la
 * mise au point passe donc par ce script — c'est le seul moyen de VOIR le
 * site, et le seul endroit où la scène 3D peut réellement être testée.
 *
 *   node scripts/shots.mjs <dossier-de-sortie> [port]
 *
 * ── CORRECTION IMPORTANTE ────────────────────────────────────────────────
 * La version précédente capturait `fullPage` sans avoir fait défiler la page.
 * Or les apparitions au défilement partent de `opacity: 0` et n'arrivent à 1
 * que lorsque l'IntersectionObserver se déclenche. Les captures montraient
 * donc de grands blocs vides, et donnaient à croire que le site était cassé
 * alors qu'il ne l'était pas. `settle()` parcourt maintenant toute la page
 * avant chaque capture.
 */

const OUT = process.argv[2] ?? '.shots';
const PORT = process.argv[3] ?? '3000';
const BASE = `http://localhost:${PORT}`;

fs.mkdirSync(OUT, { recursive: true });
const shot = (n) => path.join(OUT, n);

const browser = await chromium.launch({
  // WebGL logiciel : sans cela, la scène ne s'initialise pas en headless.
  args: ['--enable-unsafe-swiftshader', '--use-gl=angle'],
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const errors = [];
page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message.slice(0, 160)));
page.on('console', (m) => {
  if (m.type() === 'error') errors.push('CONSOLE: ' + m.text().slice(0, 160));
});
page.on('requestfailed', (r) =>
  errors.push('REQUETE: ' + r.url().replace(BASE, '') + ' — ' + (r.failure()?.errorText ?? '')),
);
const notFound = [];
page.on('response', (r) => {
  if (r.status() === 404) notFound.push(r.url().replace(BASE, ''));
});

/**
 * Parcourt toute la page pour déclencher les apparitions, puis remonte.
 * Sans cela, toute capture pleine page est mensongère.
 */
const settle = async () => {
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.6);
    const height = document.documentElement.scrollHeight;
    for (let y = 0; y < height; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 90));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 400));
  });
  await page.waitForTimeout(700);
};

const go = async (url, wait = 1500) => {
  await page.goto(BASE + url, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(wait);
  await settle();
};

/** Amène une section en haut de l'écran par son texte. */
const toSection = async (needle, offset = 0) => {
  await page.evaluate(
    ([t, o]) => {
      const s = [...document.querySelectorAll('section')].find((x) =>
        x.textContent.includes(t),
      );
      if (s) window.scrollTo(0, s.getBoundingClientRect().top + window.scrollY - o);
    },
    [needle, offset],
  );
  await page.waitForTimeout(1100);
};

// ————————————————————————————————— Accueil —————————————————————————————————
await go('/', 2200);
await page.screenshot({ path: shot('01-hero.png') });
await page.screenshot({ path: shot('02-accueil-complet.png'), fullPage: true });

for (const [file, needle] of [
  ['03-metiers.png', 'Trois domaines'],
  ['04-realisations.png', 'Des chantiers'],
  ['05-methode.png', 'Six étapes'],
  ['06-final.png', 'Parlons de'],
]) {
  await toSection(needle);
  await page.screenshot({ path: shot(file) });
}

// ———————————————————————————— La scène 3D ————————————————————————————
const scene = { monte: false };

await page.evaluate(() => {
  const s = document.getElementById('installation');
  if (s) window.scrollTo(0, s.getBoundingClientRect().top + window.scrollY - 60);
});

// Le chunk three.js, le GLB puis le décodeur Draco doivent arriver.
await page
  .waitForSelector('#installation canvas', { timeout: 25000 })
  .then(() => (scene.monte = true))
  .catch(() => (scene.monte = false));

if (scene.monte) {
  await page.waitForTimeout(3500);

  Object.assign(
    scene,
    await page.evaluate(() => {
      const c = document.querySelector('#installation canvas');
      const gl = c.getContext('webgl2') || c.getContext('webgl');
      return {
        tailleAffichee: [Math.round(c.getBoundingClientRect().width), Math.round(c.getBoundingClientRect().height)],
        tampon: [c.width, c.height],
        rendu: gl ? gl.getParameter(gl.VERSION) : 'aucun contexte',
      };
    }),
  );

  await page.screenshot({ path: shot('15-scene-ensemble.png') });

  // Un cliché par point de vue : c'est le seul moyen de vérifier que la
  // caméra arrive vraiment où on le lui demande.
  const onglets = await page.$$('#installation [role="tab"]');
  for (let i = 1; i < onglets.length; i++) {
    const nom = (await onglets[i].textContent()).trim();
    await onglets[i].click();
    await page.waitForTimeout(2600);
    await page.screenshot({ path: shot(`1${5 + i}-scene-${i}.png`) });
    scene[`vue_${i}`] = nom;
  }
}

// ————————————————————————————— Pages internes —————————————————————————————
for (const [file, url] of [
  ['20-pac.png', '/pompes-a-chaleur'],
  ['21-refrigeration.png', '/refrigeration'],
  ['22-depannage.png', '/entretien-depannage'],
  ['23-contact.png', '/contact'],
  ['24-realisations.png', '/realisations'],
  ['25-entreprise.png', '/entreprise'],
]) {
  await go(url);
  await page.screenshot({ path: shot(file) });
}

// ————————————————————————————————— Mobile —————————————————————————————————
await page.setViewportSize({ width: 390, height: 844 });
await go('/', 2000);
await page.screenshot({ path: shot('26-mobile.png') });
await page.screenshot({ path: shot('27-mobile-complet.png'), fullPage: true });

const mobile = await page.evaluate(() => ({
  debordementHorizontal: document.documentElement.scrollWidth - window.innerWidth,
  // La 3D ne doit JAMAIS se monter sur téléphone.
  canvasPresent: !!document.querySelector('#installation canvas'),
  cibles: [...document.querySelectorAll('a, button')].filter((el) => {
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0 && r.height < 32;
  }).length,
}));

console.log(
  JSON.stringify(
    {
      scene,
      mobile,
      pages404: [...new Set(notFound)],
      erreurs: [...new Set(errors)].slice(0, 10),
    },
    null,
    2,
  ),
);

await browser.close();
