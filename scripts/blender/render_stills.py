"""
Rendu d'images fixes à partir des modèles réels de l'entreprise.

    blender --background --factory-startup --python scripts/blender/render_stills.py -- \
        --shot coldroom-hero --out public/img/coldroom-hero.jpg

────────────────────────────────────────────────────────────────────────────
POURQUOI CE SCRIPT EXISTE
────────────────────────────────────────────────────────────────────────────

Le site doit montrer du matériel, pas des rectangles gris. Les photographies
de chantier n'existent pas encore, et il est hors de question d'employer une
banque d'images ou une image générée.

Reste une troisième voie : l'entreprise possède la géométrie réelle de ses
équipements. On la rend, proprement éclairée, et on obtient des visuels qui
montrent exactement le matériel dont le site parle.

Ce ne sont PAS des photographies et le site ne les présente jamais comme
telles. Ce sont des vues techniques. Le jour où les photos arrivent, elles
prennent le même emplacement, au même ratio.

────────────────────────────────────────────────────────────────────────────
CHOIX TECHNIQUES
────────────────────────────────────────────────────────────────────────────

Cycles en CPU : EEVEE réclame un contexte graphique et échoue en headless
sur une machine sans session ouverte. Cycles est plus lent mais rend partout,
et comme il s'agit d'une étape de fabrication exécutée une fois, la durée
n'a aucune incidence sur le site.

Les matériaux SketchUp sont plats. On les requalifie avant rendu — acier
laqué, aluminium, sol béton — sinon le rendu trahit son origine.
"""

import math
import os
import sys

import bpy
from mathutils import Vector

# --------------------------------------------------------------------------

argv = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []


def arg(name, default=None):
    return argv[argv.index(name) + 1] if name in argv else default


SHOT = arg('--shot')
OUT = arg('--out')
SAMPLES = int(arg('--samples', '96'))
WIDTH = int(arg('--width', '2000'))

MODELS = os.path.abspath('public/3d/models')


def log(level, msg):
    print(f'[{level}] {msg}')


# --------------------------------------------------------------------------
# Cadrages. Coordonnées en repère Blender (Z vers le haut), en mètres.
# --------------------------------------------------------------------------

SHOTS = {
    # Ouverture : la chambre et son groupe, trois quarts, lumière rasante.
    'coldroom-hero': {
        'models': ['tfc-cold-room.glb', 'tfc-refrigeration-unit.glb'],
        'unit_at': (2.9, 1.9, 0),
        'azimuth': -57, 'elevation': 9, 'margin': 1.02, 'bias': 0.10,
        'lens': 45, 'ratio': 16 / 9, 'mood': 'atelier',
    },
    # Le groupe seul, en gros plan : c'est la pièce qui « fait technique ».
    'unit-detail': {
        'models': ['tfc-refrigeration-unit.glb'],
        'unit_at': (0, 0, 0),
        'azimuth': -52, 'elevation': 18, 'margin': 1.02, 'bias': 0.0,
        'lens': 60, 'ratio': 4 / 5, 'mood': 'atelier',
    },
    # Vue large et basse, pour une bande pleine largeur.
    'coldroom-wide': {
        'models': ['tfc-cold-room.glb', 'tfc-refrigeration-unit.glb'],
        'unit_at': (2.9, 1.9, 0),
        'azimuth': -42, 'elevation': 6, 'margin': 1.04, 'bias': 0.14,
        'lens': 55, 'ratio': 21 / 9, 'mood': 'atelier',
    },
    # Intérieur : cadrage fixe, le calcul n'a pas de sens dans un volume clos.
    'coldroom-inside': {
        'models': ['tfc-cold-room.glb'],
        'unit_at': None,
        'fixed': ((0.0, -1.55, 1.52), (0.03, 2.10, 1.90)),
        'lens': 24, 'ratio': 3 / 2, 'mood': 'froid',
    },
    # Gros plan sur la turbine centrale de l'évaporateur.
    'evaporator': {
        'models': ['tfc-cold-room.glb'],
        'unit_at': None,
        'focus': ('TFC_FAN_02', 1.15, -78, -6),
        'lens': 50, 'ratio': 4 / 5, 'mood': 'froid',
    },
    # Les trois turbines vues de biais : c'est la vue qui « fait métier ».
    'evaporator-wide': {
        'models': ['tfc-cold-room.glb'],
        'unit_at': None,
        'focus': ('TFC_FAN_02', 2.0, -62, 2),
        'lens': 40, 'ratio': 16 / 10, 'mood': 'froid',
    },
    # Le compresseur, à l'intérieur du groupe.
    'compressor': {
        'models': ['tfc-refrigeration-unit.glb'],
        'unit_at': (0, 0, 0),
        'focus': ('TFC_REFRIGERATION_UNIT', 1.05, -58, 12),
        'lens': 62, 'ratio': 4 / 5, 'mood': 'atelier',
    },
}

if SHOT not in SHOTS:
    log('WARNING', f'--shot doit valoir : {", ".join(SHOTS)}')
    sys.exit(1)
if not OUT:
    log('WARNING', '--out manquant.')
    sys.exit(1)

S = SHOTS[SHOT]


# --------------------------------------------------------------------------

def fresh_scene():
    bpy.ops.wm.read_factory_settings(use_empty=True)


def load(name, at=None):
    path = os.path.join(MODELS, name)
    if not os.path.exists(path):
        log('WARNING', f'Modèle introuvable : {path}')
        sys.exit(2)

    before = set(bpy.data.objects)
    bpy.ops.import_scene.gltf(filepath=path)
    added = [o for o in bpy.data.objects if o not in before]

    if at:
        for o in added:
            if not o.parent:
                o.location = Vector(o.location) + Vector(at)

    return added


def requalify_materials():
    """
    Requalifie les matériaux hérités de SketchUp.

    Ils sortent en diffus plat, sans rugosité ni réflexion : rendus tels
    quels, ils donnent exactement l'aspect « capture d'écran SketchUp » que
    le site doit éviter. On conserve la couleur d'origine et on ne corrige
    que le comportement de surface.
    """
    for mat in bpy.data.materials:
        if not mat.use_nodes:
            mat.use_nodes = True
        bsdf = mat.node_tree.nodes.get('Principled BSDF')
        if not bsdf:
            continue

        base = bsdf.inputs['Base Color'].default_value

        # Désaturation des teintes criardes.
        #
        # Deux matériaux de la chambre — « Helen_Skin » et « Material » —
        # sortent en orange très saturé. Ce ne sont pas des couleurs choisies
        # par l'entreprise : ce sont des valeurs par défaut de la bibliothèque
        # SketchUp, et ce sont les seules taches chaudes de l'image. On garde
        # la teinte, on coupe le chroma : les cartons redeviennent du carton.
        hi, lo = max(base[0], base[1], base[2]), min(base[0], base[1], base[2])
        saturation = (hi - lo) / hi if hi > 0.001 else 0
        if saturation > 0.40:
            mid = (base[0] + base[1] + base[2]) / 3
            k = 0.30   # part de couleur conservée
            bsdf.inputs['Base Color'].default_value = (
                mid + (base[0] - mid) * k,
                mid + (base[1] - mid) * k,
                mid + (base[2] - mid) * k,
                1,
            )
            base = bsdf.inputs['Base Color'].default_value
        luminance = 0.2126 * base[0] + 0.7152 * base[1] + 0.0722 * base[2]

        if luminance > 0.62:
            # Tôle laquée blanche : les panneaux de chambre froide.
            bsdf.inputs['Roughness'].default_value = 0.34
            if 'Metallic' in bsdf.inputs:
                bsdf.inputs['Metallic'].default_value = 0.08
        elif luminance > 0.3:
            # Aluminium, acier galvanisé.
            bsdf.inputs['Roughness'].default_value = 0.28
            if 'Metallic' in bsdf.inputs:
                bsdf.inputs['Metallic'].default_value = 0.72
        else:
            # Caoutchouc, plastique noir, joints.
            bsdf.inputs['Roughness'].default_value = 0.55
            if 'Metallic' in bsdf.inputs:
                bsdf.inputs['Metallic'].default_value = 0.0


def ground(mood):
    """Sol béton. Sans sol, tout flotte et rien ne reçoit d'ombre."""
    bpy.ops.mesh.primitive_plane_add(size=120, location=(0, 0, 0))
    plane = bpy.context.active_object
    plane.name = 'TFC_GROUND'
    mat = bpy.data.materials.new('TFC_Sol')
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes['Principled BSDF']
    tone = 0.055 if mood == 'atelier' else 0.14
    bsdf.inputs['Base Color'].default_value = (tone, tone * 1.05, tone * 1.12, 1)
    bsdf.inputs['Roughness'].default_value = 0.62
    plane.data.materials.append(mat)


def sky(mood):
    """
    Ciel. C'est lui qui donne le ton général.

    « atelier » : ambiance sombre, industrielle, le matériel se détache.
    « froid » : plus clair et bleuté, comme sous éclairage LED de chambre.
    """
    world = bpy.data.worlds.new('TFC_World')
    bpy.context.scene.world = world
    world.use_nodes = True
    bg = world.node_tree.nodes['Background']
    if mood == 'atelier':
        bg.inputs['Color'].default_value = (0.035, 0.041, 0.05, 1)
        bg.inputs['Strength'].default_value = 1.0
    else:
        bg.inputs['Color'].default_value = (0.10, 0.13, 0.16, 1)
        bg.inputs['Strength'].default_value = 1.4


def lights(mood):
    """
    Éclairage en trois points, façon prise de vue produit.

    Une clé large et haute pour modeler, un contre-jour froid pour détacher
    la silhouette du fond, un remplissage faible pour que les ombres ne
    bouchent pas. C'est ce dispositif, et pas la densité de maillage, qui
    fait qu'un rendu cesse d'avoir l'air d'un export CAO.
    """
    def area(name, loc, rot, size, energy, color):
        light = bpy.data.lights.new(name, type='AREA')
        light.size = size
        light.energy = energy
        light.color = color
        obj = bpy.data.objects.new(name, light)
        obj.location = loc
        obj.rotation_euler = rot
        bpy.context.collection.objects.link(obj)

    if mood == 'atelier':
        area('KEY', (5.5, -6.0, 7.5), (math.radians(48), 0, math.radians(42)),
             9, 4200, (1.0, 0.97, 0.92))
        area('RIM', (-6.5, 4.5, 4.2), (math.radians(65), 0, math.radians(-135)),
             7, 2600, (0.62, 0.76, 1.0))
        area('FILL', (-3.0, -6.0, 2.6), (math.radians(75), 0, math.radians(-20)),
             6, 700, (0.85, 0.9, 1.0))
    else:
        # Intérieur : la lumière vient du plafond de la chambre.
        area('LED', (0, 0.2, 3.05), (0, 0, 0), 3.4, 900, (0.88, 0.94, 1.0))
        area('KEY', (1.6, -1.2, 2.4), (math.radians(70), 0, math.radians(35)),
             3, 420, (1.0, 0.98, 0.95))
        area('RIM', (-1.2, 2.6, 2.5), (math.radians(80), 0, math.radians(180)),
             3, 380, (0.6, 0.78, 1.0))


def scene_bounds():
    """Boîte englobante de tout ce qui est visible, hors sol."""
    pts = []
    for o in bpy.context.view_layer.objects:
        if o.type != 'MESH' or o.name.startswith('TFC_GROUND'):
            continue
        pts += [o.matrix_world @ Vector(c) for c in o.bound_box]
    if not pts:
        return Vector((0, 0, 0)), Vector((1, 1, 1))
    mn = Vector((min(p.x for p in pts), min(p.y for p in pts), min(p.z for p in pts)))
    mx = Vector((max(p.x for p in pts), max(p.y for p in pts), max(p.z for p in pts)))
    return mn, mx


def focus_camera(node_name, distance, azimuth, elevation, fallback_all=True):
    """
    Cadre sur un objet nommé du GLB plutôt que sur des coordonnées écrites
    à la main.

    Les positions fixes des cadrages serrés étaient devenues fausses dès que
    le pipeline a recentré les modèles : la caméra se retrouvait dans un mur.
    Les noms de nœuds, eux, survivent à tout déplacement — `TFC_FAN_02` reste
    le ventilateur central quelle que soit la position du modèle.
    """
    target = None
    for o in bpy.context.view_layer.objects:
        if o.name.startswith(node_name):
            target = o
            break

    if target is None:
        log('WARNING', f'Nœud « {node_name} » introuvable.')
        if not fallback_all:
            sys.exit(3)
        mn, mx = scene_bounds()
        center = (mn + mx) / 2
    else:
        center = target.matrix_world.translation.copy()
        log('FOUND', f'Cadrage sur {target.name} — '
                     f'({center.x:.2f}, {center.y:.2f}, {center.z:.2f}).')

    az, el = math.radians(azimuth), math.radians(elevation)
    offset = Vector((
        math.cos(el) * math.cos(az),
        math.cos(el) * math.sin(az),
        math.sin(el),
    )) * distance
    return center + offset, center


def framed_camera(azimuth, elevation, lens, ratio, width, margin=1.12, bias=0.0):
    """
    Place la caméra par calcul plutôt qu'à la main.

    On donne un angle horizontal, une hauteur de vue et une focale ; la
    distance est déduite de la boîte englobante pour que le sujet tienne
    dans le cadre. Les positions écrites à la main devenaient fausses dès
    qu'un objet changeait de taille — et elles ont effectivement dû être
    reprises trois fois avant d'adopter ce calcul.

    `bias` abaisse le point visé : à 0 on vise le centre géométrique, ce qui
    fait souvent plonger le regard dans un volume ouvert par le haut.
    """
    mn, mx = scene_bounds()
    center = (mn + mx) / 2
    center.z -= (mx.z - mn.z) * bias

    az, el = math.radians(azimuth), math.radians(elevation)
    direction = Vector((
        math.cos(el) * math.cos(az),
        math.cos(el) * math.sin(az),
        math.sin(el),
    ))

    # Repère caméra : elle regarde vers -direction.
    right = direction.cross(Vector((0, 0, 1)))
    right = right.normalized() if right.length > 1e-6 else Vector((1, 0, 0))
    up = right.cross(direction).normalized()

    fov_h = 2 * math.atan(18.0 / lens)            # capteur 36 mm
    fov_v = 2 * math.atan(math.tan(fov_h / 2) / ratio)
    th, tv = math.tan(fov_h / 2), math.tan(fov_v / 2)

    # Distance exacte : on projette les huit coins de la boîte et on retient
    # la contrainte la plus forte. La version précédente utilisait le rayon de
    # la sphère englobante, ce qui sur-marge énormément dès que le sujet est
    # allongé — la chambre et son groupe tenaient dans un quart de l'image.
    corners = [Vector((x, y, z)) for x in (mn.x, mx.x)
               for y in (mn.y, mx.y) for z in (mn.z, mx.z)]
    distance = 0.0
    for c in corners:
        v = c - center
        depth = v.dot(direction)
        distance = max(
            distance,
            abs(v.dot(right)) / th + depth,
            abs(v.dot(up)) / tv + depth,
        )

    return center + direction * distance * margin, center


def camera(pos, look, lens, ratio, width):
    cam_data = bpy.data.cameras.new('TFC_Cam')
    cam_data.lens = lens
    cam = bpy.data.objects.new('TFC_Cam', cam_data)
    cam.location = pos
    bpy.context.collection.objects.link(cam)

    direction = Vector(look) - Vector(pos)
    cam.rotation_euler = direction.to_track_quat('-Z', 'Y').to_euler()
    bpy.context.scene.camera = cam

    scene = bpy.context.scene
    scene.render.resolution_x = width
    scene.render.resolution_y = int(round(width / ratio))


def configure_render(samples):
    scene = bpy.context.scene
    scene.render.engine = 'CYCLES'
    scene.cycles.device = 'CPU'
    scene.cycles.samples = samples
    scene.cycles.use_denoising = True
    scene.render.film_transparent = False
    scene.render.image_settings.file_format = 'JPEG'
    scene.render.image_settings.quality = 88
    # Filmique : sans cela les blancs des panneaux brûlent immédiatement.
    try:
        scene.view_settings.view_transform = 'AgX'
    except TypeError:
        scene.view_settings.view_transform = 'Filmic'
    scene.view_settings.look = 'None'


def main():
    fresh_scene()

    for name in S['models']:
        at = S['unit_at'] if 'unit' in name else None
        load(name, at)

    requalify_materials()
    ground(S['mood'])
    sky(S['mood'])
    lights(S['mood'])
    if 'focus' in S:
        node, dist, az, el = S['focus']
        pos, look = focus_camera(node, dist, az, el)
    elif 'fixed' in S:
        pos, look = S['fixed']
    else:
        pos, look = framed_camera(S['azimuth'], S['elevation'], S['lens'],
                                  S['ratio'], WIDTH, S['margin'], S['bias'])
    camera(pos, look, S['lens'], S['ratio'], WIDTH)
    configure_render(SAMPLES)

    out = os.path.abspath(OUT)
    os.makedirs(os.path.dirname(out), exist_ok=True)
    bpy.context.scene.render.filepath = out

    log('FOUND', f'Rendu {SHOT} — {bpy.context.scene.render.resolution_x}'
                 f'×{bpy.context.scene.render.resolution_y}, {SAMPLES} échantillons.')
    bpy.ops.render.render(write_still=True)

    if os.path.exists(out):
        log('FOUND', f'Écrit : {out} ({os.path.getsize(out) / 1024:.0f} Ko)')
    else:
        log('WARNING', 'Aucun fichier écrit.')


main()
