# Mise en place du service résultat

## Version des logiciels nécessaires

[**Docker**](https://www.docker.com/products/docker-desktop) : v20.10.14, build a224086349

[**Docker Compose**](https://docs.docker.com/compose/install/) : v2.4.1

[**NodeJs**](https://nodejs.org/en/download/) : v16.13.2

[**npm**](https://www.npmjs.com/get-npm) : v8.1.2

[**nvm**](https://github.com/nvm-sh/nvm) : v0.39.1

## Installation avec docker (docker-compose).

**Attention** : bien remplir les champs obligatoires dans le .env.

1. Copier env.example.prod en .env et le remplir si besoin (normalement pas besoin) avec docker

2. Lancement les conteneurs (peut prendre jusqu'à 30 secondes)

```bash
docker-compose up
# éventuellement avec l'option --build pour être sûr que les conteneurs sont bien à leur dernière version
```

Il y a un warning pour les variables d'environnement `MONGO_INITDB_USER` et `MONGO_INITDB_PASSWORD` : il faut les ignorées, elles sont rempli après coup par docker-compose.

3. Éteindre et supprimer les conteneurs (ajouter -v pour supprimer les volumes de données)

```bash
docker-compose down
```

### Troubleshooting

#### Si le conteneur de DB n'est pas healthy

Nous avons parfois eu des problèmes avec le conteneur de DB. Supprimez toute les images concernant Mongo, puis relancer le service avec docker-compose.

## Installation sans docker

Pour l'installation sans docker, Il est nécessaire d'avoir installé une base de données mongoDB.

### Build du service résultat

**Attention** : vérifier que la version de node (v16.13.2) est installée sur votre système.
Utiliser nvm pour installer la version de node souhaitée si besoin (`nvm install && nvm use`).

1. Executer la commande suivante pour installer et/ou mettre a jour les dépendances :
   `npm install`

2. Build le projet :
   `npm run build`

3. Éventuellement, supprimer les dépendances de developpement :
   `rm -r node_modules && npm install --production`

4. Lancer le service :
   `npm run start`
