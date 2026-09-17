"""
Diagnostic non destructif d'un fichier SketchUp.

    blender --background --factory-startup --python scripts/blender/inspect_scene.py -- \
        --skp public/3d/originals/evaporator.skp \
        --out scripts/blender/reports/evaporator.json

Le script n'écrit JAMAIS dans le .skp d'origine et ne sauvegarde aucun .blend.
Il importe, mesure, puis rend la main.

Convention de sortie, imposée par le cahier des charges :

    [FOUND]    fait établi, mesuré sur la géométrie
    [WARNING]  anomalie qui gênera la suite
    [UNKNOWN]  la donnée n'a pas pu être déterminée — aucune supposition n'est faite

Rien n'est deviné. Si l'identification d'un organe est incertaine, le script
liste des candidats avec leur score, et c'est un humain qui tranche.
"""

import json
import math
import os
import sys
from collections import defaultdict

import bpy

# --------------------------------------------------------------------------
# Arguments (tout ce qui suit « -- » sur la ligne de commande)
# --------------------------------------------------------------------------

argv = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []


def arg(name, default=None):
    return argv[argv.index(name) + 1] if name in argv else default


SKP_PATH = arg('--skp')
OUT_PATH = arg('--out')

if not SKP_PATH:
    print('[WARNING] --skp manquant. Rien à analyser.')
    sys.exit(1)

SKP_PATH = os.path.abspath(SKP_PATH)
if not os.path.exists(SKP_PATH):
    print(f'[WARNING] Fichier introuvable : {SKP_PATH}')
    sys.exit(1)


def log(level, message):
    print(f'[{level}] {message}')


# --------------------------------------------------------------------------
# Import
# --------------------------------------------------------------------------

def enable_importer():
    """Active l'addon SketchUp. Retourne True si l'opérateur est disponible."""
    try:
        bpy.ops.preferences.addon_enable(module='sketchup_importer')
        log('FOUND', 'Addon sketchup_importer activé.')
    except Exception as exc:  # l'addon peut déjà être actif
        log('UNKNOWN', f'addon_enable a échoué ({exc}). On teste l\'opérateur.')

    return hasattr(bpy.ops.import_scene, 'skp')


def clear_scene():
    bpy.ops.wm.read_factory_settings(use_empty=True)


def import_skp(path):
    try:
        bpy.ops.import_scene.skp(filepath=path)
        return True
    except Exception as exc:
        log('WARNING', f'Import échoué : {exc}')
        return False


# --------------------------------------------------------------------------
# Mesures
# --------------------------------------------------------------------------

def triangles(obj):
    """Nombre de triangles après triangulation implicite des n-gones."""
    if obj.type != 'MESH':
        return 0
    return sum(max(len(p.vertices) - 2, 0) for p in obj.data.polygons)


def world_bbox(obj):
    """Boîte englobante en coordonnées monde."""
    corners = [obj.matrix_world @ v.co for v in obj.data.vertices] if (
        obj.type == 'MESH' and obj.data.vertices
    ) else []
    if not corners:
        return None
    xs = [c.x for c in corners]
    ys = [c.y for c in corners]
    zs = [c.z for c in corners]
    return {
        'min': [round(min(xs), 4), round(min(ys), 4), round(min(zs), 4)],
        'max': [round(max(xs), 4), round(max(ys), 4), round(max(zs), 4)],
        'size': [
            round(max(xs) - min(xs), 4),
            round(max(ys) - min(ys), 4),
            round(max(zs) - min(zs), 4),
        ],
    }


def describe(obj):
    mesh = obj.type == 'MESH'
    return {
        'name': obj.name,
        'type': obj.type,
        'parent': obj.parent.name if obj.parent else None,
        'children': [c.name for c in obj.children],
        'collections': [c.name for c in obj.users_collection],
        'location': [round(v, 4) for v in obj.location],
        'rotation_euler': [round(math.degrees(v), 2) for v in obj.rotation_euler],
        'scale': [round(v, 4) for v in obj.scale],
        'dimensions': [round(v, 4) for v in obj.dimensions],
        'vertices': len(obj.data.vertices) if mesh else 0,
        'polygons': len(obj.data.polygons) if mesh else 0,
        'triangles': triangles(obj),
        'materials': [m.name for m in obj.data.materials if m] if mesh else [],
        'bbox_world': world_bbox(obj) if mesh else None,
    }


# --------------------------------------------------------------------------
# Heuristiques — elles PROPOSENT, elles ne concluent pas
# --------------------------------------------------------------------------

def geometry_clusters(objects):
    """
    Regroupe les objets de géométrie identique.

    Les trois ventilateurs d'un évaporateur sont des copies du même bloc :
    même nombre de sommets, mêmes dimensions. Un groupe de 3 objets
    identiques est donc le signal le plus fiable dont on dispose — bien plus
    que le nom, que SketchUp ne conserve pas toujours.
    """
    buckets = defaultdict(list)
    for o in objects:
        if o['type'] != 'MESH' or o['vertices'] == 0:
            continue
        key = (o['vertices'], o['polygons'], tuple(round(d, 2) for d in o['dimensions']))
        buckets[key].append(o['name'])

    clusters = []
    for (verts, polys, dims), names in buckets.items():
        if len(names) > 1:
            clusters.append({
                'count': len(names),
                'vertices_each': verts,
                'polygons_each': polys,
                'dimensions': list(dims),
                'members': sorted(names),
            })
    return sorted(clusters, key=lambda c: -c['count'])


def fan_candidates(objects, clusters):
    """
    Candidats rotor, avec un score et le détail de ce qui l'a produit.

    Un rotor de ventilateur est : à peu près aussi large que haut (section
    circulaire), nettement moins épais que large, et présent en plusieurs
    exemplaires identiques.
    """
    triples = {n for c in clusters if c['count'] in (2, 3, 4) for n in c['members']}
    out = []

    for o in objects:
        if o['type'] != 'MESH' or o['vertices'] == 0:
            continue

        dx, dy, dz = o['dimensions']
        if min(dx, dy, dz) <= 0:
            continue

        dims = sorted([dx, dy, dz], reverse=True)
        largest, middle, smallest = dims

        reasons = []
        score = 0

        # Section carrée dans le plan des deux plus grandes dimensions
        if largest > 0 and abs(largest - middle) / largest < 0.15:
            score += 2
            reasons.append('section quasi circulaire')

        # Nettement aplati sur le troisième axe
        if smallest < largest * 0.6:
            score += 1
            reasons.append('profil aplati')

        # Présent en plusieurs exemplaires identiques
        if o['name'] in triples:
            score += 3
            reasons.append('exemplaires identiques multiples')

        # Le nom parle, quand SketchUp l'a conservé
        low = o['name'].lower()
        if any(k in low for k in ('fan', 'ventil', 'rotor', 'blade', 'pale', 'helice', 'hélice')):
            score += 4
            reasons.append('nom explicite')

        if score >= 3:
            out.append({
                'name': o['name'],
                'score': score,
                'reasons': reasons,
                'dimensions': o['dimensions'],
                'location': o['location'],
                'triangles': o['triangles'],
            })

    return sorted(out, key=lambda c: -c['score'])


# --------------------------------------------------------------------------
# Exécution
# --------------------------------------------------------------------------

def main():
    log('FOUND', f'Fichier : {SKP_PATH} ({os.path.getsize(SKP_PATH) / 1e6:.2f} Mo)')

    clear_scene()

    if not enable_importer():
        log('WARNING', "L'opérateur import_scene.skp est indisponible. "
                       'Vérifier que sketchup_importer est bien installé pour cette version de Blender.')
        sys.exit(2)

    if not import_skp(SKP_PATH):
        sys.exit(3)

    objects = [describe(o) for o in bpy.data.objects]
    meshes = [o for o in objects if o['type'] == 'MESH']

    if not objects:
        log('WARNING', 'Import terminé mais la scène est vide.')
        sys.exit(4)

    total_tris = sum(o['triangles'] for o in meshes)
    total_verts = sum(o['vertices'] for o in meshes)

    log('FOUND', f'{len(objects)} objets, dont {len(meshes)} maillages.')
    log('FOUND', f'{total_verts} sommets, {total_tris} triangles.')

    # Étendue globale
    boxes = [o['bbox_world'] for o in meshes if o['bbox_world']]
    if boxes:
        mn = [min(b['min'][i] for b in boxes) for i in range(3)]
        mx = [max(b['max'][i] for b in boxes) for i in range(3)]
        extent = [round(mx[i] - mn[i], 3) for i in range(3)]
        log('FOUND', f'Encombrement (X, Y, Z) en mètres : {extent}')
    else:
        extent = None
        log('UNKNOWN', 'Aucune boîte englobante calculable.')

    clusters = geometry_clusters(objects)
    if clusters:
        log('FOUND', f'{len(clusters)} groupes de géométrie répétée.')
        for c in clusters[:6]:
            log('FOUND', f'  ×{c["count"]} — {c["vertices_each"]} sommets — {c["dimensions"]}')
    else:
        log('UNKNOWN', 'Aucune géométrie répétée : les ventilateurs ne sont pas des copies.')

    fans = fan_candidates(objects, clusters)
    if fans:
        log('FOUND', f'{len(fans)} candidats rotor.')
        for f in fans[:8]:
            log('FOUND', f'  {f["name"]} — score {f["score"]} — {", ".join(f["reasons"])}')
        if len([f for f in fans if f['score'] >= 5]) != 3:
            log('WARNING', 'Le compte de candidats forts est différent de 3. '
                           "L'attribution des rotors devra être confirmée à l'œil.")
    else:
        log('UNKNOWN', "Aucun candidat rotor. L'évaporateur devra être découpé manuellement "
                       'ou ses ventilateurs recréés.')

    # Matériaux
    materials = sorted({m for o in meshes for m in o['materials']})
    log('FOUND', f'{len(materials)} matériaux : {", ".join(materials[:12]) or "aucun"}')
    if not materials:
        log('WARNING', 'Aucun matériau. Tout devra être réattribué avant export.')

    # Alerte budget web
    if total_tris > 150_000:
        log('WARNING', f'{total_tris} triangles — au-delà du budget web. '
                       'Décimation nécessaire avant export GLB.')

    report = {
        'source': SKP_PATH,
        'source_size_bytes': os.path.getsize(SKP_PATH),
        'blender': bpy.app.version_string,
        'totals': {
            'objects': len(objects),
            'meshes': len(meshes),
            'vertices': total_verts,
            'triangles': total_tris,
            'materials': len(materials),
        },
        'extent_meters': extent,
        'materials': materials,
        'collections': [
            {'name': c.name, 'objects': [o.name for o in c.objects]}
            for c in bpy.data.collections
        ],
        'geometry_clusters': clusters,
        'fan_candidates': fans,
        'objects': objects,
    }

    if OUT_PATH:
        out = os.path.abspath(OUT_PATH)
        os.makedirs(os.path.dirname(out), exist_ok=True)
        with open(out, 'w', encoding='utf-8') as fh:
            json.dump(report, fh, indent=1, ensure_ascii=False)
        log('FOUND', f'Rapport écrit : {out}')


main()
