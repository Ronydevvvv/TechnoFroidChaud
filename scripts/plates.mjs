import { chromium } from 'playwright';
import fs from 'fs';

/**
 * Banc de comparaison des cadrages de la planche technique.
 *
 *   node scripts/plates.mjs            → compare les cadrages candidats
 *   node scripts/plates.mjs final      → produit l'image retenue
 *
 * Le canvas est capturé SEUL, sur fond transparent : c'est ainsi qu'il sera
 * servi, et c'est le seul moyen de juger si le modèle tient sans rectangle.
 * Le damier gris des captures de comparaison est celui de l'outil, pas du
 * site — il rend la transparence visible.
 */

const OUT = process.argv[2] === 'final' ? 'public/visuels' : '.plates';
fs.mkdirSync(OUT, { recursive: true });

const cadrages = {
  /**
   * CADRAGE RETENU, après comparaison de quinze essais (a → s).
   *
   * Trois-quarts avant droit, légèrement en contre-plongée. C'est le seul
   * angle où les quatre organes se lisent d'un coup : le COMPRESSEUR (le
   * cylindre, éclairé par l'appoint chaud), le CARTER, la VIROLE du
   * ventilateur de condenseur, et le CHÂSSIS sur sa roulette — donc
   * l'échelle.
   *
   * Les vues d'ensemble de la chambre froide ont toutes été écartées : ce
   * modèle-là est un décor SketchUp encombré de panneaux détachés et de
   * grilles isolées, et aucun cadrage large ne les évite tous.
   */
  'groupe-de-condensation': {
    subject: 'groupe',
    px: 1.7, py: 0.6, pz: 1.85,
    tx: 0, ty: 0.4, tz: 0,
    fov: 32,
  },
};

const final = process.argv[2] === 'final';

const browser = await chromium.launch({
  args: ['--enable-unsafe-swiftshader', '--use-gl=angle'],
});
const jeu = final
  ? { 'groupe-de-condensation': cadrages['groupe-de-condensation'] }
  : cadrages;

// UNE PAGE PAR CADRAGE. En réutilisant le même onglet, le second rendu ne
// montait jamais : le contexte WebGL logiciel du premier n'est pas rendu à
// la navigation, et le suivant n'en obtient plus.
for (const [nom, c] of Object.entries(jeu)) {
  const page = await browser.newPage({
    viewport: { width: 1280, height: 900 },
    deviceScaleFactor: final ? 2 : 1,
  });
  const qs = new URLSearchParams(Object.entries(c).map(([k, v]) => [k, String(v)]));
  await page.goto(`http://localhost:3000/plate-dev?${qs}`, { waitUntil: 'networkidle' });
  await page.waitForSelector('#plate canvas', { timeout: 45000 });
  await page.waitForTimeout(5500);
  const el = await page.$('#plate');
  await el.screenshot({ path: `${OUT}/${nom}.png`, omitBackground: true });
  console.log('rendu', nom);
  await page.close();
}

await browser.close();
