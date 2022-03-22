import { Router } from 'express';
import exerciceRouter from './exercice.route';
import tentativeRouter from './tentative.route';

/**
 * Routeur global de l'application. Utilise les routeurs des ressources.
 */
const globalRouter = Router();

globalRouter.use('/exercices', exerciceRouter);
globalRouter.use('/tentatives', tentativeRouter);

export default globalRouter;
