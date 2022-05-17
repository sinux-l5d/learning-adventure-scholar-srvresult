import { Router } from 'express';
import exerciceRouter from './exercice.route';
import tentativeRouter from './tentative.route';
import aideRouter from './aide.route';

/**
 * Routeur global de l'application. Utilise les routeurs des ressources.
 */
const globalRouter = Router();

globalRouter.use('/exercices', exerciceRouter);
globalRouter.use('/tentatives', tentativeRouter);
globalRouter.use('/aides', aideRouter);

export default globalRouter;
