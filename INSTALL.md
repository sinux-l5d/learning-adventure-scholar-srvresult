# Mise en place du service resultat

---

## Version des logiciels nécessaires

[**Docker**](https://www.docker.com/products/docker-desktop) : v20.10.14, build a224086349

[**Docker Compose**](https://docs.docker.com/compose/install/) : v2.4.1

[**NodeJs**](https://nodejs.org/en/download/) : v16.13.2

[**npm**](https://www.npmjs.com/get-npm) : v8.1.2

[**nvm**](https://github.com/nvm-sh/nvm) : v0.39.1

---

## Installation avec docker (docker-compose).

**Attention** : bien remplir les champs obligatoires dans le .env.

### 1 - lancement des conteneurs

`docker-compose -f docker-compose.yml up`

### 2 - suppression des conteneurs

`docker-compose -f docker-compose.yml down`

---

## Installation sans docker

Pour l'installation sans docker, Il est nécessaire d'avoir installé une base de données mongoDB.

### 1 - Build du service resultat

**Attention** : vérifier que la version de node (v16.13.2) est installée sur votre système.
Utiliser nvm pour installer la version de node souhaitée.

1. executer la commande suivante pour installer et/ou mettre a jour les dépendances :
   `npm install`

2. build le projet :
   `npm run build`

3. installer et/ou mettre a jour les dépendances de production
   `npm install --production`

4. lancer le service :
   `npm start`
