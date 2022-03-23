# LA Web | Service d'exercices

## Avant de développer

Avant de commencer à coder sur une nouvelle machine, il y a quelques étapes :

1. Installer node en version `16.13.2` et npm. Vous pouvez installer la version de node avec la commande `nvm use` de Node Version Manager. Il installera la version écrite dans `.nvmrc`.
2. Installer les dépendances : `npm install`.
3. Si pas déjà fait par l'étape précédente, préparez Husky pour le script de pre-commit : `npm run prepare`.

Husky permet de lancer des scripts (voir plus bas) pour lancer les tests unitaires, formatter automatiquement le code et indiquer les erreurs de _lint_.

## Commencer à developper

1. Copier env.example.dev dans un fichier `.env`
2. Démarrer la base de données en mode developpement : `docker-compose -f docker-compose.dev.yaml up`
3. Démarrer l'application en mode developpement : `npm run start:dev`
4. Démarrer les tests unitaires en mode developpement : `npm run test:dev`

:warning: il faut supprimer le volume pour recommencer une instance de developpement au propre ! `docker-compose -f docker-compose.dev.yml down -v`

## Scripts

### `npm run start:dev`

Permet de lancer l'application en mode développement : l'application est relancé à chanque modification de code.

Il utilise `nodemon` et `ts-node`.

### `npm run start`

Permet de lancer l'application en mode production : build le projet avec `npm run build` puis démarre l'application.

:information_source: généralement utilisé par docker. Vous n'avez normalement pas besoin de ce script.

### `npm run build`

Permet de transformer le projet TypeScript (ts-node) en JavaScript. Le résultat est disponible dans le dossier `build`.

:information_source: généralement utilisé par docker. Vous n'avez normalement pas besoin de ce script.

### `npm run test`

Permet de lancer les tests unitaires une fois. Les tests unitaires sont défini dans le dossier `spec` et ce dossier à la même architecture que `src`.

Les tests unitaires utilises Jest.

### `npm run test:dev`

Permet comme `npm run test` de lancer les tests unitaires, mais il seront relancé à chaque à chaque modification d'un fichier de test unitaire.

### `npm run prettier-format`

Permet de formatter le code automatiquement en suivant les standards par défaut surchargés par le fichier `.prettierrc`.

### `npm run prettier-watch`

Permet comme `npm run prettier-format` de formatter le code, mais à chaque changement de fichier TypeScript.

## Ajout d'alias

Un alias permet d'avoir des chemins plus propres lors d'imports, et de se passer de l'écriture relative à base de "../../".

Les alias comme `@app` ou `@services/` doivent être écrit pour TypeScript dans `tsconfig.json` et pour JavaScript dans `package.json` (\_moduleAliases).
