"""
Construction de la scène web à partir des SketchUp d'origine.

    blender --background --factory-startup --python scripts/blender/setup_tfc_scene.py -- \
        --preset coldroom \
        --out public/3d/models/tfc-cold-room.glb

Presets disponibles : `coldroom`, `unit`.

Le script est idempotent et non destructif : il lit un `.skp`, construit une
scène propre en mémoire, exporte un `.glb`, puis rend la main. Aucun `.skp`
n'est modifié, aucun `.blend` n'est écrit.

────────────────────────────────────────────────────────────────────────────
CE QUE FAIT LE SCRIPT, ET POURQUOI
────────────────────────────────────────────────────────────────────────────

1. RECENTRAGE. SketchUp place volontiers un modèle à des dizaines de mètres
   de l'origine. On ramène le centre en X/Y sur zéro et le sol sur Z = 0,
   sinon la caméra web vise le vide et la précision des flottants se dégrade.

2. SUPPRESSION DE LA VISSERIE. Le modèle de chambre froide compte 1 820
   maillages dont 781 sous 100 triangles : boulons, rondelles, fils de
   rayonnage. Invisibles au-delà d'un mètre, ils coûtent un appel de rendu
   chacun. Tout objet dont la plus grande dimension passe sous le seuil est
   supprimé — le critère est la taille réelle, jamais le nom.

3. ISOLEMENT DES ROTORS AVANT FUSION. C'est l'ordre qui compte : une fois
   les maillages fusionnés, plus rien n'est animable. Les rotors sortent
   donc en premier.

4. FUSION PAR MATÉRIAU. Le problème de ce modèle n'est pas le nombre de
   triangles, c'est le nombre d'appels de rendu. En fusionnant, on passe de
   ~1 800 objets à autant d'objets que de matériaux.

5. PIVOTS. Chaque rotor reçoit un parent vide placé exactement en son
   centre. Sans cela, une rotation s'applique autour de l'origine du monde
   et le ventilateur part en orbite.

6. EXPORT GLB + Draco.
"""

import json
import math
import os
import sys

import bpy
from mathutils import Matrix, Vector

# --------------------------------------------------------------------------
# Presets
# --------------------------------------------------------------------------

PRESETS = {
    # Chambre froide + son évaporateur trois ventilateurs.
    # Les rotors mesurés au diagnostic : 0,305 × 0,296 × 0,074 m, alignés en
    # X à 1,24 / 1,55 / 1,86 m, même Y (3,97) et même Z (2,19).
    'coldroom': {
        'skp': 'public/3d/originals/walk-in-freezer.skp',
        'root': 'TFC_COLD_ROOM',
        'min_size': 0.06,          # sous 6 cm : visserie, on jette
        'expect_rotors': 3,
        'rotor': {
            'diameter': (0.24, 0.38),   # fourchette du diamètre attendu
            'thickness_max': 0.12,      # au-delà, ce n'est pas un rotor
            'roundness': 0.12,          # écart toléré entre les deux grands axes
        },
        'triangle_budget': 60_000,
    },
    # Groupe de condensation extérieur. Déjà propre : 41 maillages,
    # 10 215 triangles, 1,11 × 0,99 × 0,75 m. On ne décime pas, on ne jette
    # presque rien — le seuil est abaissé car les pièces y sont fines.
    'unit': {
        'skp': 'public/3d/originals/refrig.skp',
        'root': 'TFC_REFRIGERATION_UNIT',
        'min_size': 0.015,
        'expect_rotors': 0,
        'rotor': None,
        'triangle_budget': 25_000,
    },
}

# --------------------------------------------------------------------------
# Arguments
# --------------------------------------------------------------------------

argv = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []


def arg(name, default=None):
    return argv[argv.index(name) + 1] if name in argv else default


PRESET_NAME = arg('--preset')
OUT_PATH = arg('--out')

if PRESET_NAME not in PRESETS:
    print(f'[WARNING] --preset doit valoir : {", ".join(PRESETS)}')
    sys.exit(1)
if not OUT_PATH:
    print('[WARNING] --out manquant.')
    sys.exit(1)

P = PRESETS[PRESET_NAME]
SKP = os.path.abspath(P['skp'])
OUT = os.path.abspath(OUT_PATH)


def log(level, msg):
    print(f'[{level}] {msg}')


# --------------------------------------------------------------------------
# Utilitaires
# --------------------------------------------------------------------------

def meshes():
    """
    Maillages réellement manipulables.

    On interroge le view layer et non `bpy.data` : l'importeur SketchUp crée
    des objets rattachés à aucune collection de la scène. Ils existent en
    mémoire mais ne peuvent être ni sélectionnés, ni fusionnés, ni exportés —
    `adopt_orphans()` les rattache d'abord, cette fonction ne voit ensuite
    que ce qui est utilisable.
    """
    return [o for o in bpy.context.view_layer.objects
            if o is not None and o.type == 'MESH' and o.data is not None]


def adopt_orphans():
    """Rattache à la scène les objets laissés hors du view layer, et démasque."""
    visible = {o.name for o in bpy.context.view_layer.objects}
    adopted = 0

    for o in bpy.data.objects:
        if o.name not in visible:
            try:
                bpy.context.scene.collection.objects.link(o)
                adopted += 1
            except RuntimeError:
                pass

    bpy.context.view_layer.update()

    for o in bpy.context.view_layer.objects:
        o.hide_set(False)
        o.hide_viewport = False
        o.hide_select = False

    if adopted:
        log('FOUND', f'{adopted} objets orphelins rattachés à la scène.')


def triangles(obj):
    return sum(max(len(p.vertices) - 2, 0) for p in obj.data.polygons)


def total_triangles():
    return sum(triangles(o) for o in meshes())


def world_center(obj):
    """Centre de la boîte englobante, en coordonnées monde."""
    corners = [obj.matrix_world @ Vector(c) for c in obj.bound_box]
    return sum(corners, Vector()) / 8.0


def select_only(objs):
    bpy.ops.object.select_all(action='DESELECT')
    for o in objs:
        o.select_set(True)
    if objs:
        bpy.context.view_layer.objects.active = objs[0]


# --------------------------------------------------------------------------
# Étapes
# --------------------------------------------------------------------------

def import_source():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    try:
        bpy.ops.preferences.addon_enable(module='sketchup_importer')
    except Exception:
        pass
    if not hasattr(bpy.ops.import_scene, 'skp'):
        log('WARNING', 'Importeur SketchUp indisponible.')
        sys.exit(2)
    bpy.ops.import_scene.skp(filepath=SKP)
    adopt_orphans()
    log('FOUND', f'{len(meshes())} maillages exploitables depuis {os.path.basename(SKP)}.')


def drop_outliers():
    """
    Supprime les îlots isolés très loin de la masse principale.

    On garde l'îlot qui porte le plus de triangles ; le reste est de la
    géométrie orpheline laissée par SketchUp.
    """
    ms = meshes()
    if not ms:
        return
    centers = {o.name: world_center(o) for o in ms}
    median_x = sorted(c.x for c in centers.values())[len(centers) // 2]
    median_y = sorted(c.y for c in centers.values())[len(centers) // 2]

    far = [o for o in ms
           if (centers[o.name] - Vector((median_x, median_y, centers[o.name].z))).length > 25.0]
    for o in far:
        bpy.data.objects.remove(o, do_unlink=True)
    bpy.context.view_layer.update()
    if far:
        log('FOUND', f'{len(far)} objets orphelins écartés (à plus de 25 m de la masse).')


def drop_detached_panels():
    """
    Supprime la géométrie posée hors de l'enveloppe.

    ── CE QUE ÇA CORRIGE ───────────────────────────────────────────────────
    Le modèle de chambre froide contient un panneau isolé de 3,05 × 3,05 m
    dressé 1,6 m DEVANT la chambre — une pièce de catalogue, pas un élément
    du local. Il masquait entièrement la porte sur les rendus, et c'est lui
    qui gonflait la profondeur annoncée de 4,47 m à 6,10 m.
    ────────────────────────────────────────────────────────────────────────

    Méthode : l'objet de plus grand volume est l'enveloppe. Tout maillage
    dont la boîte englobante ne recoupe en rien celle de l'enveloppe est
    détaché, donc écarté. La porte, qui déborde légèrement en façade, recoupe
    l'enveloppe et est conservée.
    """
    ms = meshes()
    if not ms:
        return

    def box(o):
        pts = [o.matrix_world @ Vector(c) for c in o.bound_box]
        return (Vector((min(p.x for p in pts), min(p.y for p in pts), min(p.z for p in pts))),
                Vector((max(p.x for p in pts), max(p.y for p in pts), max(p.z for p in pts))))

    volume = lambda o: max(o.dimensions.x, 0.01) * max(o.dimensions.y, 0.01) * max(o.dimensions.z, 0.01)
    shell = max(ms, key=volume)
    smin, smax = box(shell)
    log('FOUND', f'Enveloppe : {shell.name} — '
                 f'{shell.dimensions.x:.2f} × {shell.dimensions.y:.2f} × {shell.dimensions.z:.2f} m.')

    tol = 0.05
    detached = []
    for o in ms:
        if o is shell:
            continue
        omin, omax = box(o)
        overlaps = all(omax[i] >= smin[i] - tol and omin[i] <= smax[i] + tol for i in range(3))
        if not overlaps:
            detached.append(o)

    # Les noms sont relevés AVANT suppression : `bpy.data.objects.remove()`
    # invalide la référence Python, et toute lecture ultérieure lève.
    names = [o.name for o in detached[:3]]

    for o in detached:
        bpy.data.objects.remove(o, do_unlink=True)
    bpy.context.view_layer.update()

    if detached:
        log('FOUND', f'{len(detached)} éléments détachés de l\'enveloppe supprimés '
                     f'({", ".join(names)}…).')


def recenter():
    ms = meshes()
    if not ms:
        return
    corners = [o.matrix_world @ Vector(c) for o in ms for c in o.bound_box]
    mn = Vector((min(p.x for p in corners), min(p.y for p in corners), min(p.z for p in corners)))
    mx = Vector((max(p.x for p in corners), max(p.y for p in corners), max(p.z for p in corners)))
    offset = Vector(((mn.x + mx.x) / 2, (mn.y + mx.y) / 2, mn.z))

    for o in bpy.data.objects:
        if not o.parent:
            o.location -= offset

    size = mx - mn
    log('FOUND', f'Recentré. Encombrement : '
                 f'{size.x:.2f} × {size.y:.2f} × {size.z:.2f} m.')
    return size


def drop_hardware(min_size):
    """Supprime la visserie, sur critère de taille réelle uniquement."""
    doomed = [o for o in meshes() if max(o.dimensions) < min_size]
    saved = sum(triangles(o) for o in doomed)
    for o in doomed:
        bpy.data.objects.remove(o, do_unlink=True)
    bpy.context.view_layer.update()
    if doomed:
        log('FOUND', f'{len(doomed)} pièces sous {min_size * 100:.0f} cm supprimées '
                     f'({saved} triangles, {len(doomed)} appels de rendu).')


def find_rotors(spec, expected):
    """
    Repère les rotors sur signature géométrique.

    Un rotor est : circulaire dans son plan (deux grandes dimensions égales),
    mince sur le troisième axe, d'un diamètre dans la fourchette attendue, et
    présent en plusieurs exemplaires strictement identiques.

    Le nom n'entre jamais en jeu : SketchUp ne le conserve pas de façon
    fiable, alors que la géométrie, elle, ne ment pas.
    """
    if not spec or expected == 0:
        return []

    dmin, dmax = spec['diameter']
    candidates = []

    for o in meshes():
        dims = sorted(o.dimensions, reverse=True)
        large, mid, thin = dims
        if thin > spec['thickness_max'] or large <= 0:
            continue
        if not (dmin <= large <= dmax):
            continue
        if abs(large - mid) / large > spec['roundness']:
            continue
        candidates.append(o)

    # Ne garder que le groupe le plus nombreux de géométries identiques :
    # les trois rotors d'un même évaporateur sont des copies conformes.
    groups = {}
    for o in candidates:
        key = (len(o.data.vertices), tuple(round(d, 3) for d in sorted(o.dimensions)))
        groups.setdefault(key, []).append(o)

    if not groups:
        log('UNKNOWN', 'Aucun rotor ne correspond à la signature attendue.')
        return []

    best = max(groups.values(), key=len)

    if len(best) != expected:
        log('WARNING', f'{len(best)} rotors trouvés, {expected} attendus. '
                       'Vérification humaine nécessaire avant animation.')
        return []

    # Trier par position pour que FAN_01/02/03 suivent l'ordre physique.
    best.sort(key=lambda o: (world_center(o).x, world_center(o).y))
    log('FOUND', f'{len(best)} rotors confirmés — '
                 f'{best[0].dimensions[0]:.3f} × {best[0].dimensions[1]:.3f} × '
                 f'{best[0].dimensions[2]:.3f} m.')
    return best


def build_blades(pivot, diameter, material):
    """
    Construit une véritable turbine à la place du disque d'origine.

    ── POURQUOI ────────────────────────────────────────────────────────────
    Les rotors du modèle SketchUp font 70 triangles : ce sont des disques
    plats, sans pales. Les faire tourner ne produit strictement aucun
    mouvement perceptible — un cercle en rotation autour de son axe est
    immobile à l'œil. L'animation aurait été un mensonge silencieux, du
    genre que personne ne remarque avant la mise en ligne.
    ────────────────────────────────────────────────────────────────────────

    On génère donc moyeu, pales vrillées et jonc de bord, aux dimensions
    exactes relevées sur le modèle : rien n'est inventé, la turbine occupe
    précisément le volume du disque qu'elle remplace.

    L'axe de construction est Z, celui mesuré sur les trois rotors. Les
    pales sont vrillées de 28°, valeur qui donne une hélice lisible en
    rotation sans ressembler à un ventilateur de plafond.
    """
    radius = diameter / 2.0
    parts = []

    # Moyeu
    bpy.ops.mesh.primitive_cylinder_add(radius=radius * 0.28, depth=0.05, vertices=16)
    hub = bpy.context.active_object
    parts.append(hub)

    # Pales
    blade_count = 5
    for i in range(blade_count):
        angle = (2 * math.pi / blade_count) * i
        bpy.ops.mesh.primitive_cube_add(size=1.0)
        blade = bpy.context.active_object
        blade.scale = (radius * 0.62, radius * 0.30, 0.006)
        blade.rotation_euler = (math.radians(28), 0, 0)   # vrillage
        blade.location = (0, 0, 0)

        # Placer la pale à mi-rayon, puis la faire tourner autour du moyeu.
        bpy.ops.object.transform_apply(location=False, rotation=True, scale=True)
        blade.location = (math.cos(angle) * radius * 0.58,
                          math.sin(angle) * radius * 0.58, 0)
        blade.rotation_euler = (0, 0, angle)
        parts.append(blade)

    # Jonc de bord : donne au ventilateur sa silhouette circulaire.
    bpy.ops.mesh.primitive_torus_add(
        major_radius=radius * 0.97, minor_radius=0.008,
        major_segments=28, minor_segments=6,
    )
    parts.append(bpy.context.active_object)

    select_only(parts)
    bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
    bpy.ops.object.join()
    turbine = bpy.context.view_layer.objects.active
    turbine.name = f'{pivot.name}_ROTOR'

    if material:
        turbine.data.materials.clear()
        turbine.data.materials.append(material)

    # ── PARENTAGE ────────────────────────────────────────────────────────
    # Après `transform_apply` + `join`, la géométrie est en coordonnées
    # monde et l'origine de l'objet reste à (0, 0, 0). La turbine s'affiche
    # donc au bon endroit, mais toute rotation se ferait autour du centre de
    # la pièce — les pales décriraient une orbite de deux mètres.
    #
    # `matrix_parent_inverse` ne règle rien ici : l'exportateur glTF l'ignore.
    # On déplace donc les sommets pour centrer le maillage sur le pivot, ce
    # qui rend l'origine correcte dans Blender comme à l'export.
    turbine.data.transform(Matrix.Translation(-pivot.location))
    turbine.parent = pivot
    turbine.matrix_parent_inverse.identity()
    turbine.location = (0.0, 0.0, 0.0)
    turbine.rotation_euler = (0.0, 0.0, 0.0)
    return turbine


def rig_rotors(rotors):
    """
    Donne à chaque rotor un pivot placé en son centre.

    L'axe de rotation est celui de la plus petite dimension : c'est vrai quelle
    que soit l'orientation du modèle, alors que supposer « Z » ne l'est pas.
    L'axe est écrit dans un `custom property` pour que le code web n'ait pas
    à le redeviner.
    """
    rigged = []
    for i, rotor in enumerate(rotors, start=1):
        center = world_center(rotor)
        dims = list(rotor.dimensions)
        axis = 'XYZ'[dims.index(min(dims))]
        diameter = max(dims)
        material = next((m for m in rotor.data.materials if m), None)

        pivot = bpy.data.objects.new(f'TFC_FAN_{i:02d}', None)
        pivot.empty_display_type = 'PLAIN_AXES'
        pivot.empty_display_size = 0.12
        pivot.location = center
        bpy.context.collection.objects.link(pivot)

        # Le disque d'origine est remplacé, pas conservé : le garder
        # laisserait une surface pleine devant les pales.
        bpy.data.objects.remove(rotor, do_unlink=True)
        bpy.context.view_layer.update()

        build_blades(pivot, diameter, material)

        pivot['rotation_axis'] = axis
        pivot['diameter'] = round(diameter, 4)

        rigged.append(pivot)
        log('FOUND', f'TFC_FAN_{i:02d} — turbine générée, Ø {diameter:.3f} m, '
                     f'centre ({center.x:.2f}, {center.y:.2f}, {center.z:.2f}), axe {axis}.')
    return rigged


def merge_static(rotors, root_name):
    """
    Fusionne toute la géométrie fixe, matériau par matériau.

    C'est l'étape qui fait la performance : chaque matériau devient une
    primitive glTF, donc un appel de rendu. Le reste du modèle peut bien
    compter deux mille objets, il n'en restera qu'une poignée.
    """
    animated = {r.name for r in rotors} | {c.name for r in rotors for c in r.children}
    statics = [o for o in meshes() if o.name not in animated]
    if not statics:
        return []

    by_material = {}
    for o in statics:
        mats = [m.name for m in o.data.materials if m]
        key = mats[0] if mats else '__sans_materiau__'
        by_material.setdefault(key, []).append(o)

    merged = []
    for material, group in sorted(by_material.items()):
        select_only(group)
        if len(group) > 1:
            bpy.ops.object.join()
        obj = bpy.context.view_layer.objects.active
        safe = ''.join(ch if ch.isalnum() else '_' for ch in material)[:28]
        obj.name = f'{root_name}_{safe}'
        merged.append(obj)

    log('FOUND', f'{len(statics)} maillages fusionnés en {len(merged)} objets '
                 f'({len(merged)} appels de rendu).')
    return merged


def decimate_if_needed(objs, budget):
    """
    Décime uniquement si le budget est dépassé, et jamais les rotors.

    On décime après fusion : le modificateur travaille alors sur de grandes
    surfaces continues, où l'effondrement d'arêtes se voit beaucoup moins que
    sur de petites pièces isolées.
    """
    total = total_triangles()
    if total <= budget:
        log('FOUND', f'{total} triangles — sous le budget de {budget}. Pas de décimation.')
        return

    ratio = budget / total
    log('WARNING', f'{total} triangles pour un budget de {budget}. '
                   f'Décimation à {ratio:.2f}.')

    for o in objs:
        if triangles(o) < 2000:      # trop petit : décimer l'abîmerait
            continue
        mod = o.modifiers.new(name='TFC_Decimate', type='DECIMATE')
        mod.ratio = ratio
        mod.use_collapse_triangulate = True

    bpy.context.view_layer.update()
    log('FOUND', f'Après décimation : environ {total_triangles()} triangles.')


def organise(root_name, statics, rotors):
    """
    Range la scène dans des collections nommées TFC_*.

    ORDRE CRITIQUE : on crée les nouvelles collections et on y déplace les
    objets AVANT de supprimer les anciennes. La version initiale purgeait les
    collections d'abord — les objets dont c'était l'unique rattachement se
    retrouvaient sans utilisateur et disparaissaient au ramassage suivant.
    Le GLB sortait alors à 623 triangles au lieu de 43 675, sans la moindre
    erreur à l'écran.
    """
    scene_col = bpy.context.scene.collection

    root = bpy.data.collections.new(root_name)
    scene_col.children.link(root)

    structure = bpy.data.collections.new(f'{root_name}_STRUCTURE')
    root.children.link(structure)

    created = {root, structure}

    def move(obj, dest):
        for c in list(obj.users_collection):
            c.objects.unlink(obj)
        dest.objects.link(obj)

    for o in statics:
        move(o, structure)

    if rotors:
        fans = bpy.data.collections.new('TFC_EVAPORATOR_FANS')
        root.children.link(fans)
        created.add(fans)
        for pivot in rotors:
            for o in [pivot, *pivot.children]:
                move(o, fans)

    # Les vides laissés par la hiérarchie SketchUp n'ont plus d'utilité :
    # ils ressortaient comme autant de nœuds parasites dans le glTF.
    keep = {o.name for o in statics}
    keep |= {o.name for p in rotors for o in [p, *p.children]}
    strays = [o for o in list(bpy.context.view_layer.objects) if o.name not in keep]
    for o in strays:
        bpy.data.objects.remove(o, do_unlink=True)
    if strays:
        log('FOUND', f'{len(strays)} nœuds vides hérités de SketchUp supprimés.')

    # Purge des collections devenues vides, une fois les objets déplacés.
    for c in list(bpy.data.collections):
        if c not in created and not c.objects and not c.children:
            bpy.data.collections.remove(c)

    bpy.context.view_layer.update()


def export(out_path):
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.export_scene.gltf(
        filepath=out_path,
        export_format='GLB',
        use_selection=False,
        export_apply=True,                       # applique les modificateurs
        export_yup=True,                         # convention three.js
        export_draco_mesh_compression_enable=True,
        export_draco_mesh_compression_level=6,
        export_extras=True,                      # conserve rotation_axis
        export_cameras=False,
        export_lights=False,
    )
    size = os.path.getsize(out_path)
    log('FOUND', f'Export : {out_path} ({size / 1e6:.2f} Mo)')
    return size


# --------------------------------------------------------------------------

def main():
    import_source()
    drop_outliers()
    drop_detached_panels()
    recenter()
    drop_hardware(P['min_size'])

    rotors_raw = find_rotors(P['rotor'], P['expect_rotors'])
    pivots = rig_rotors(rotors_raw)

    statics = merge_static(pivots, P['root'])
    decimate_if_needed(statics, P['triangle_budget'])
    organise(P['root'], statics, pivots)

    size = export(OUT)

    summary = {
        'preset': PRESET_NAME,
        'source': SKP,
        'output': OUT,
        'output_bytes': size,
        'triangles': total_triangles(),
        'draw_calls': len(statics) + len(pivots),
        'fans': [
            {'name': p.name, 'axis': p['rotation_axis'], 'diameter': p['diameter'],
             'location': [round(v, 4) for v in p.location]}
            for p in pivots
        ],
    }
    report = os.path.splitext(OUT)[0] + '.build.json'
    with open(report, 'w', encoding='utf-8') as fh:
        json.dump(summary, fh, indent=1, ensure_ascii=False)

    log('FOUND', f'{summary["triangles"]} triangles, {summary["draw_calls"]} appels de rendu.')
    if size > 2_000_000:
        log('WARNING', f'{size / 1e6:.2f} Mo — au-dessus des 2 Mo visés.')


main()
