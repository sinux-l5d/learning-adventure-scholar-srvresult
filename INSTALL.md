# Mise en place du service resultat

## Installation avec docker (docker-compose).

### 1 - lancement des conteneurs

`docker-compose -f docker-compose.yml up`

### 2 - suppression des conteneurs

`docker-compose -f docker-compose.yml down`

## Installation sans docker

Pour l'installation sans docker, Il est nécessaire d'avoir installé une base de données mongoDB.

### 1 - Build du service resultat

`npm install && npm run build && npm install --production && npm start`
