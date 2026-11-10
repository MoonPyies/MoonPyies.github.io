/**
 * HOME, SWEET HOME ! — TON FICHIER DE PERSONNALISATION ✎
 * Change ici les images, les 12 défis et les positions sans toucher à game.js.
 * assets.scene = illustration du salon (1200 × 760 conseillé).
 * Chaque objet: image = son dessin PNG/WebP/SVG ; x/y = position en %
 * depuis le coin haut gauche ; w/h = largeur/hauteur de la zone en %.
 * Les illustrations sont distinctes du décor pour pouvoir les déplacer.
 * presentation = "sticker" (cadre visible) ou "illustration" (art sans fond).
 * ATTENTION : un id doit être unique et rester stable pour la sauvegarde.
 */
window.HSH_CONFIG = {
  "assets": {
    "scene": "assets/scene/salon-fond.png",
    "accueil": "assets/illustrations/accueil-placeholder.gif",
    "mascotte": "assets/illustrations/mascotte-placeholder.jpg",
    "logo": "assets/logo/face-placeholder.png",
    "favicon": "assets/logo/favicon-placeholder.svg"
  },
  "objects": [
    {
      "id": "fenetre",
      "name": "La fenêtre",
      "short": "Fenêtre",
      "sticker": "AIR FRAIS",
      "x": 6.9,
      "y": 11.3,
      "w": 17.2,
      "h": 26.4,
      "presentation": "illustration",
      "image": "assets/objets/fenetre.png",
      "badge": "Gardien·ne de la chaleur",
      "emoji": "OwO",
      "intro": "La fenêtre du salon est restée ouverte alors que le chauffage fonctionne et qu’il fait froid dehors.",
      "question": "Quel geste est le plus malin ?",
      "choices": [
        {
          "label": "Je referme après avoir aéré quelques minutes.",
          "correct": true
        },
        {
          "label": "Je la laisse ouverte toute l’après-midi.",
          "correct": false
        }
      ],
      "good": "Exact ! Une aération brève renouvelle l’air. Refermer ensuite limite les pertes de chaleur en hiver.",
      "bad": "Oups ! Aérer est utile, mais laisser ouvert trop longtemps alors qu’on chauffe gaspille de l’énergie.",
      "memo": "Aérer brièvement, puis refermer."
    },
    {
      "id": "rideaux",
      "name": "Les rideaux",
      "short": "Rideaux",
      "sticker": "SOLEIL",
      "x": 25.2,
      "y": 11.7,
      "w": 12.6,
      "h": 20.7,
      "presentation": "illustration",
      "image": "assets/objets/rideaux.png",
      "badge": "Ami·e de la lumière",
      "emoji": "☼",
      "intro": "C’est une journée ensoleillée d’hiver, mais les rideaux du salon bloquent toute la lumière naturelle.",
      "question": "Que fais-tu ?",
      "choices": [
        {
          "label": "Je garde les rideaux fermés toute la journée.",
          "correct": false
        },
        {
          "label": "Je les ouvre pour profiter du soleil.",
          "correct": true
        }
      ],
      "good": "Oui ! En journée, laisser entrer la lumière et les apports solaires peut rendre le salon plus agréable.",
      "bad": "Pas vraiment ! Quand le soleil donne, ouvrir les rideaux peut aider à éclairer et réchauffer naturellement.",
      "memo": "Ouvrir les rideaux au soleil, les fermer la nuit pour limiter les déperditions."
    },
    {
      "id": "ampoule",
      "name": "La lampe",
      "short": "Lampe",
      "sticker": "BONNE IDÉE",
      "x": 46.2,
      "y": 2.7,
      "w": 12.6,
      "h": 20.7,
      "presentation": "illustration",
      "image": "assets/objets/ampoule.png",
      "badge": "Petit rayon malin",
      "emoji": "OwO",
      "intro": "La lampe du salon est équipée d’une vieille ampoule halogène très gourmande en électricité.",
      "question": "Quelle ampoule choisir ?",
      "choices": [
        {
          "label": "Une LED adaptée au luminaire.",
          "correct": true
        },
        {
          "label": "Une halogène identique, juste par habitude.",
          "correct": false
        }
      ],
      "good": "Bravo ! Une LED adaptée fournit généralement un éclairage comparable pour moins d’électricité.",
      "bad": "À revoir ! Les halogènes consomment davantage d’électricité que les LED pour un éclairage comparable.",
      "memo": "Choisir une ampoule LED adaptée."
    },
    {
      "id": "porte",
      "name": "La porte",
      "short": "Porte",
      "sticker": "ÇA COURT !",
      "x": 82.0,
      "y": 8.3,
      "w": 16.1,
      "h": 26.4,
      "presentation": "illustration",
      "image": "assets/objets/porte.png",
      "badge": "Gardien·ne des portes",
      "emoji": "♧",
      "intro": "La porte entre le salon chauffé et le couloir plus frais reste ouverte.",
      "question": "Tu fais quoi ?",
      "choices": [
        {
          "label": "Je la referme pour conserver la chaleur dans la pièce.",
          "correct": true
        },
        {
          "label": "Je la laisse ouverte en permanence.",
          "correct": false
        }
      ],
      "good": "Bien vu ! Fermer une porte entre deux pièces à températures différentes aide à conserver la chaleur là où on en a besoin.",
      "bad": "Pas idéal ! Une porte ouverte entre une pièce chaude et une pièce fraîche favorise les échanges de chaleur.",
      "memo": "Fermer les portes entre espaces chauffés et plus frais."
    },
    {
      "id": "plante",
      "name": "La plante",
      "short": "Plante",
      "sticker": "MAIN VERTE",
      "x": 4.0,
      "y": 50.5,
      "w": 14.9,
      "h": 23.0,
      "presentation": "illustration",
      "image": "assets/objets/plante.png",
      "badge": "Main verte réfléchie",
      "emoji": "OwO",
      "intro": "Cette plante a reçu beaucoup d’eau alors que sa terre est encore bien humide.",
      "question": "Comment l’arroser ?",
      "choices": [
        {
          "label": "Je verse encore un grand arrosoir.",
          "correct": false
        },
        {
          "label": "Je vérifie la terre et j’arrose selon ses besoins.",
          "correct": true
        }
      ],
      "good": "Tout juste ! Vérifier les besoins de la plante évite le gaspillage d’eau et les excès d’arrosage.",
      "bad": "Oups ! Trop arroser peut gaspiller de l’eau et abîmer les racines. On vérifie d’abord la terre.",
      "memo": "Adapter l’arrosage aux besoins de la plante."
    },
    {
      "id": "radiateur",
      "name": "Le radiateur",
      "short": "Radiateur",
      "sticker": "TOUT CHAUD",
      "x": 23.1,
      "y": 50.5,
      "w": 14.9,
      "h": 23.0,
      "presentation": "illustration",
      "image": "assets/objets/radiateur.png",
      "badge": "As du thermostat",
      "emoji": "OwO",
      "intro": "Le radiateur affiche 24 °C et le salon est déjà très chaud.",
      "question": "Quelle action est la plus raisonnable ?",
      "choices": [
        {
          "label": "J’augmente encore le thermostat.",
          "correct": false
        },
        {
          "label": "Je baisse le chauffage selon le confort nécessaire.",
          "correct": true
        }
      ],
      "good": "Exact ! Éviter la surchauffe réduit la consommation. Autour de 19 °C est un repère courant dans une pièce de vie occupée.",
      "bad": "Pas tout à fait ! Une température trop élevée augmente inutilement la consommation de chauffage.",
      "memo": "Éviter de surchauffer le salon."
    },
    {
      "id": "television",
      "name": "La télévision",
      "short": "Télévision",
      "sticker": "VEILLE !",
      "x": 41.8,
      "y": 29.1,
      "w": 18.4,
      "h": 28.7,
      "presentation": "illustration",
      "image": "assets/objets/television.png",
      "badge": "Champion·ne du bouton OFF",
      "emoji": "OwO",
      "intro": "La télévision reste en veille alors que personne ne va la regarder pendant plusieurs jours.",
      "question": "Quel est le bon réflexe ?",
      "choices": [
        {
          "label": "Je la laisse en veille tout ce temps.",
          "correct": false
        },
        {
          "label": "Je l’éteins complètement si je ne l’utilise pas longtemps.",
          "correct": true
        }
      ],
      "good": "Oui ! Éteindre complètement un appareil lors d’une longue inutilisation peut éviter sa consommation de veille.",
      "bad": "À revoir ! La veille peut encore consommer de l’électricité, même si c’est bien moins qu’un appareil allumé.",
      "memo": "Éteindre complètement la télévision lors d’une longue absence."
    },
    {
      "id": "box",
      "name": "La box Internet",
      "short": "Box",
      "sticker": "EN LIGNE",
      "x": 63.1,
      "y": 33.6,
      "w": 13.8,
      "h": 21.8,
      "presentation": "illustration",
      "image": "assets/objets/box.png",
      "badge": "Pilote du Wi-Fi",
      "emoji": "OwO",
      "intro": "La maison sera vide plusieurs jours. La box Internet restera allumée alors qu’aucun service connecté n’en dépend.",
      "question": "Quelle décision prendre ?",
      "choices": [
        {
          "label": "Je peux l’éteindre pendant cette absence.",
          "correct": true
        },
        {
          "label": "Je la laisse forcément allumée, même sans usage.",
          "correct": false
        }
      ],
      "good": "Bien joué ! Quand aucun service important n’en dépend, éteindre la box pendant une longue absence peut économiser de l’électricité.",
      "bad": "Pas nécessairement ! Si aucun équipement utile ne dépend de la connexion, une longue absence peut être l’occasion de l’éteindre.",
      "memo": "Éteindre la box lors d’une longue absence, seulement si aucun service essentiel n’en dépend."
    },
    {
      "id": "canape",
      "name": "Le canapé",
      "short": "Canapé",
      "sticker": "COCOONING",
      "x": 43.0,
      "y": 68.5,
      "w": 14.9,
      "h": 24.1,
      "presentation": "illustration",
      "image": "assets/objets/canape.png",
      "badge": "Pro du plaid",
      "emoji": "OwO",
      "intro": "Tu as un peu froid en regardant un film, mais le salon est déjà correctement chauffé.",
      "question": "Tu essaies quoi en premier ?",
      "choices": [
        {
          "label": "Je monte le chauffage au maximum.",
          "correct": false
        },
        {
          "label": "Je mets un pull ou prends un plaid confortable.",
          "correct": true
        }
      ],
      "good": "Bonne idée ! Ajouter une couche confortable peut suffire à se sentir mieux sans augmenter le chauffage.",
      "bad": "Oups ! Avant d’augmenter beaucoup le thermostat, essaie une couche de vêtement ou un plaid si la pièce est déjà correctement chauffée.",
      "memo": "Essayer un plaid ou un pull avant de surchauffer."
    },
    {
      "id": "multiprise",
      "name": "La multiprise",
      "short": "Multiprise",
      "sticker": "UN CLIC",
      "x": 59.2,
      "y": 74.7,
      "w": 12.6,
      "h": 20.7,
      "presentation": "illustration",
      "image": "assets/objets/multiprise.png",
      "badge": "Maître·sse des veilles",
      "emoji": "OwO",
      "intro": "Une multiprise avec interrupteur alimente plusieurs appareils inutilisés depuis longtemps.",
      "question": "Quel geste peut aider ?",
      "choices": [
        {
          "label": "Je coupe la multiprise si les appareils le permettent.",
          "correct": true
        },
        {
          "label": "Je laisse toujours les appareils en veille.",
          "correct": false
        }
      ],
      "good": "Bravo ! Couper les veilles via une multiprise adaptée peut diminuer la consommation des appareils inutilisés.",
      "bad": "Pas le meilleur réflexe ! La veille peut consommer. Attention toutefois à ne pas couper un appareil qui doit rester alimenté.",
      "memo": "Couper les veilles non nécessaires avec une multiprise adaptée."
    },
    {
      "id": "chargeur",
      "name": "Le chargeur",
      "short": "Chargeur",
      "sticker": "DÉBRANCHE",
      "x": 72.2,
      "y": 71.7,
      "w": 12.6,
      "h": 20.7,
      "presentation": "illustration",
      "image": "assets/objets/chargeur.png",
      "badge": "Débranche-tout",
      "emoji": "OwO",
      "intro": "Un chargeur de téléphone reste branché, mais aucun appareil ne se recharge.",
      "question": "Tu préfères quoi ?",
      "choices": [
        {
          "label": "Je le débranche lorsqu’il ne sert plus.",
          "correct": true
        },
        {
          "label": "Je le laisse branché indéfiniment.",
          "correct": false
        }
      ],
      "good": "Super ! Débrancher un chargeur inutilisé évite ses éventuelles petites consommations résiduelles.",
      "bad": "Presque ! Certains chargeurs consomment un peu même à vide. Les débrancher est un geste simple.",
      "memo": "Débrancher le chargeur inutilisé."
    },
    {
      "id": "tri",
      "name": "La corbeille",
      "short": "Corbeille",
      "sticker": "LE TRI",
      "x": 85.2,
      "y": 74.7,
      "w": 12.6,
      "h": 20.7,
      "presentation": "illustration",
      "image": "assets/objets/tri.png",
      "badge": "Pro du bon bac",
      "emoji": "OwO",
      "intro": "Dans la corbeille du salon, une feuille de papier propre attend d’être jetée.",
      "question": "Où la mettre ?",
      "choices": [
        {
          "label": "Dans le tri des papiers selon les consignes locales.",
          "correct": true
        },
        {
          "label": "Avec les ordures ménagères sans vérifier.",
          "correct": false
        }
      ],
      "good": "Exactement ! Trier le papier adapté permet sa collecte en vue du recyclage, selon les consignes de ta commune.",
      "bad": "Pas forcément ! Une feuille de papier propre peut généralement être triée. Pense à vérifier les consignes locales.",
      "memo": "Trier le papier selon les consignes locales."
    }
  ]
};
