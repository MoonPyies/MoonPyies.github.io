# Home, Sweet Home ! — version SALON (12 défis)

Jeu point-and-click pédagogique pour **FACE Alsace**, en **HTML / CSS / JavaScript**. L'interface conserve son style scrapbook indépendant, les couleurs de la charte FACE (bleu `#003B75`, orange `#FD5000`) et des animations au survol **très discrètes**.

## 1 — Lancer le jeu

1. Décompresse `Home_Sweet_Home_Salon_FACE_Alsace.zip`.
2. Ouvre `home-sweet-home/index.html` dans Chrome, Edge ou Firefox.
3. Clique sur **Jouer maintenant**.

Tu peux aussi essayer `demo-autonome-salon.html` : un seul fichier autonome pour prévisualiser, sans dossier d'images séparé. **Pour changer les dessins, utilise le dossier du jeu**, pas cette démo intégrée.

Si le navigateur bloque certains accès en ouvrant directement des fichiers locaux, lance un serveur statique à l'intérieur du dossier du jeu :

```bash
python -m http.server 8000
```

Puis ouvre `http://localhost:8000`.

## 2 — Les fichiers à modifier (important !)

```text
home-sweet-home/
├── index.html                   Interface du site
├── css/style.css                Style, palette, survol, tailles
├── js/
│   ├── config.js                ★ Tous tes assets, coordonnées et 12 défis ★
│   └── game.js                  Mécaniques du jeu (à laisser tranquille)
└── assets/
    ├── scene/
    │   └── salon-fond.svg       ★ Le salon complet / image de fond ★
    ├── objets/
    │   ├── fenetre.svg
    │   ├── rideaux.svg
    │   ├── ampoule.svg
    │   ├── porte.svg
    │   ├── plante.svg
    │   ├── radiateur.svg
    │   ├── television.svg
    │   ├── box.svg
    │   ├── canape.svg
    │   ├── multiprise.svg
    │   ├── chargeur.svg
    │   └── tri.svg               ★ Les 12 images indépendantes et cliquables ★
    ├── illustrations/
    │   ├── accueil-placeholder.svg
    │   └── mascotte-placeholder.svg
    └── logo/
        ├── face-placeholder.svg
        └── favicon-placeholder.svg
```

**Tous les dessins fournis sont des placeholders** : tu peux les remplacer, ce ne sont pas des illustrations officielles.

## 3 — Remplacer le salon et ses objets

### Le salon complet

Le format du décor est **1200 × 760 pixels (30:19)**. Dessine ton salon avec porte, canapé, TV, box, plante, lampe, etc. : `assets/scene/salon-fond.svg` est juste une esquisse temporaire.

- Tu peux **garder exactement le même nom** et remplacer le SVG par un autre SVG.
- Pour utiliser plutôt un **PNG ou WebP**, mets ton fichier dans `assets/scene/`, puis change **une seule ligne** dans `js/config.js` :

```js
scene: 'assets/scene/mon-salon.png'
```

### Les objets interactifs

Chaque objet a son propre dessin, séparé du fond. Pour modifier un objet sans toucher aux autres, remplace par exemple `assets/objets/television.svg` par ton SVG. Le dessin apparaîtra aussi dans la fiche explicative.

Pour un PNG transparent : enregistre `assets/objets/television.png`, puis, **dans `js/config.js`**, trouve l'objet d'identifiant `television` et remplace sa valeur `image` :

```js
image: 'assets/objets/television.png'
```

Conseil : exporte les dessins en **PNG transparent** (au moins 160 × 160 px) pour que les objets s'intègrent bien dans le salon. Les illustrations factices actuelles ont volontairement un fond coloré et une étiquette pour faciliter la maquette.

### Déplacer ou redimensionner les zones interactives

Tout se fait dans le même fichier **`js/config.js`**, à l'intérieur de l'objet concerné :

```js
{
  id: 'television',
  name: 'La télévision',
  x: 43,         // distance en % depuis la GAUCHE du salon
  y: 31,         // distance en % depuis le HAUT du salon
  w: 16,         // largeur de la zone, en % de la largeur du salon
  h: 25,         // hauteur de la zone, en % de la hauteur du salon
  presentation: 'sticker', // ou 'illustration' pour cacher le cadre et les étiquettes
  image: 'assets/objets/television.png',
  // ... textes / réponses / badge
}
```

Les pourcentages conservent la position relative même quand la page s'adapte à l'écran. Les **12 zones** restent cliquables même si tu modifies les dessins. Sur téléphone, le salon se défile horizontalement pour éviter de trop rapetisser les zones ; le carnet permet également de choisir directement un objet.

**Pour garder seulement ton dessin, sans le cadre pointillé :** passe `presentation` de `'sticker'` à `'illustration'` dans l'entrée de cet objet. Le contour et l'étiquette n'apparaîtront qu'au survol ou au focus clavier. Tu conserves la zone interactive. Si tu dessines l'objet directement dans le fond de scène, garde un PNG transparent et son bouton cliquable au même endroit.

### Logo, mascotte et illustration d'accueil

Leurs chemins sont également rassemblés en haut de `js/config.js` :

```js
assets: {
  scene: 'assets/scene/salon-fond.svg',
  accueil: 'assets/illustrations/accueil-placeholder.svg',
  mascotte: 'assets/illustrations/mascotte-placeholder.svg',
  logo: 'assets/logo/face-placeholder.svg',
  favicon: 'assets/logo/favicon-placeholder.svg'
}
```

Remplace le logo placeholder avec le **logo officiel fourni par FACE**, sans en modifier le dessin, les proportions ni les couleurs.

## 4 — Les 12 interactions

| Objet | Exemple de geste pédagogique |
|---|---|
| Fenêtre | Aérer puis refermer en hiver |
| Rideaux | Profiter du soleil et de la lumière naturelle |
| Lampe | Remplacer l'halogène par une LED adaptée |
| Porte | Fermer entre pièces de températures différentes |
| Plante | Arroser selon les besoins |
| Radiateur | Éviter la surchauffe |
| Télévision | Éteindre complètement lors d'une longue inutilisation |
| Box Internet | L'éteindre en cas de longue absence si aucun service n'en dépend |
| Canapé | Prendre un plaid ou un pull avant de surchauffer |
| Multiprise | Couper les veilles non nécessaires |
| Chargeur | Débrancher lorsqu'il ne sert pas |
| Corbeille | Trier le papier selon les consignes locales |

Tu peux modifier le contenu des questions dans `js/config.js` : `intro`, `question`, `choices` (avec `correct: true` sur une seule réponse), `good`, `bad`, `memo`, `badge` et `emoji`.

**Tu peux même ajouter ou supprimer un défi** en ajoutant ou supprimant une entrée dans `objects` ; les compteurs, succès, score et bilan s'ajustent automatiquement. Chaque `id` doit être unique.

## 5 — Fonctionnement et commandes

- Début de partie, exploration du salon, fiches pédagogiques, deux réponses, feedback détaillé.
- 100 points par réponse correcte ; objets grisés après réponse ; album de succès.
- Progression, écran de résultats, rejouer, pause et reprise.
- Souris, clavier (Tab, Entrée/Espace), tactile et défilement horizontal du salon sur mobile.
- Sons simples facultatifs ; bouton pour les désactiver.
- Sauvegarde locale de la partie avec `localStorage` quand disponible ; aucune connexion requise.

*Remarque :* la sauvegarde de cette version salon est indépendante de l'ancienne version chambre, pour éviter de mélanger les séries de défis.

## 6 — Couleurs et hover

`css/style.css` conserve le bleu officiel `#003B75` et l'orange `#FD5000`, plus une palette pastel pour les collages et stickers. Les survols **ne font plus bondir ou grossir les boutons** : ils changent simplement la couleur de fond ou la bordure.

## 7 — Avant publication

Ce livrable est un prototype **non hébergé**. Les formulations pédagogiques devront être revues par l'équipe FACE Alsace, et les consignes liées aux déchets adaptées localement. Il convient ensuite de tester sur plusieurs navigateurs et téléphones réels et de l'intégrer au site de l'entreprise.

---

**Étape conseillée :** dessine d'abord le salon au format 1200 × 760, puis place tes 12 objets un à un avec `x`, `y`, `w` et `h` dans `js/config.js`.
