# Frontend de l'application Statutis

Dépôt de la partie frontend de l'application Statutis. Développé par Simon HEBAN & Ludwig SILVAIN.

## Les packages utilisés

- `fontsource` : Permet d'ajouter des polices d'écritures de chez Google sans les traceurs
- `nivo` : Permet de générer des graphiques de qualité
- `redux` : Gérer des états dans l'application
- `axios` : Permet de gérer des requêtes HTTP
- `Formik` : Gestion des formulaires
 
## Technologies utilisées

Pour le côté design nous avons opté pour la solution `SASS` permettant une intégration de meilleur qualité et plus rapide. Un linter est aussi présent pour pouvoir développer et maintenir un code de qualité.
Pour nous assurer de la compatibilité de notre application, nous avons installé `PostCSS` permettant la compatibilité du CSS sur une multitude de navigateur.
Du côté du Javascript nous avons opté pour l'utilisation de TypeScript qui permet une harmonisation de notre code et supprime les ambiguïtés du langage.
Toutes ces technologies s'articulent autour d'un module bundler : `Vite.JS` 

## Fichier `.env`

Dans le fichier `.env` vous pourrez retrouver plusieurs variables nécessaires au bon fonctionnement de l'application.

- `APP_URL` : Permet de connaître le lien pour les redirections HTTP
- `APP_API_URL` : Permet de connaître l'adresse de l'API utilisée pour `Statutis`


## Mise en place de l'environnement de développement

Pour monter l'environnement de développement, rien de plus simple : 

- `yarn` (Permet de récupérer tous les packages nécessaires au fonctionnement)
- `yarn run dev` (Lance l'application en mode développement)
