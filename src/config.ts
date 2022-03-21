/**
 * Ce fichier sert à récupérer l'enrivonement (process.env) en étant sûr qu'il soit initialiser avec `.env`, contrairement à une utilisation direct.
 *
 * @module
 */
import { config as dotenv } from 'dotenv';

dotenv({ path: '.env', debug: process.env.NODE_ENV !== 'production' });

// import config from '@config' quand vous utilisez
export default process.env;
