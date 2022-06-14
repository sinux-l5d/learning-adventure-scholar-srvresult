/**
 * Ce fichier sert à récupérer l'enrivonement (process.env) en étant sûr qu'il soit initialiser avec `.env`, contrairement à une utilisation direct.
 *
 * @module
 */
import { config as dotenv } from 'dotenv';
import { expand } from 'dotenv-expand';

// Ecrit dans process.env les variables d'environnement définies dans le fichier .env
const config = dotenv({
  path: '.env',
  debug: process.env.NODE_ENV !== 'production',
});

// Ecrit dans process.env les variables d'environnements étendu (qui utilise d'autre variables)
expand(config);

// import config from '@config' quand vous utilisez
if (process.env.NODE_ENV !== 'production') {
  console.log(process.env);
}
export default process.env;
