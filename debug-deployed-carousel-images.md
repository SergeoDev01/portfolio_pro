[CLOSED] Debug Session: deployed-carousel-images

## Symptomes
- En local, les images et vignettes s'affichent correctement.
- En production, certains carrousels comme `Parle G` et `Skin Care Shooting` ont des images absentes, noires ou qui semblent ne pas se charger.
- Le comportement varie entre local et site en ligne apres push.

## Hypotheses
1. Certains chemins d'images references dans les donnees ne correspondent pas exactement aux fichiers publies en production. (VRAI: différence de casse de l'index Git vs code)
2. Le build ou le deploiement n'embarque pas certains assets a cause d'un probleme de casse, de nommage ou d'extension. (VRAI)
3. Une logique de preload ou de rendu differenciee entre local et production provoque des requetes prematurees ou vers de mauvaises URLs.
4. La generation des donnees image pendant le build modifie ou ecrase une partie des references utilisees par les carrousels.
5. Le site de production retourne des 404 ou autres erreurs reseau pour une partie des images des projets concernes. (VRAI)

## Plan
- Verifier les references d'images dans les donnees pour les projets concernes.
- Comparer les fichiers reels presents dans `public` avec les chemins references.
- Inspecter la logique de build/generation qui touche aux assets image.
- Reproduire ou sonder la prod pour confirmer si les URLs repondent correctement.

## Evidence
- Découverte que les fichiers sur le disque local de l'utilisateur étaient tous en minuscules, mais indexés dans Git avec des majuscules (ex: `Gemini_Generated_Image_` au lieu de `gemini_generated_image_`).
- Utilisation de `git mv -f` pour ré-enregistrer les fichiers en minuscules dans l'index de Git afin d'éviter les erreurs 404 sur les serveurs de production (sensibles à la casse).
- Build local testé avec succès. Session fermée.
