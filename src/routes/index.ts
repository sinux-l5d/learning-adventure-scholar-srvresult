import { Router } from 'express';
import resultatRouter from './resultat.routes';

/**
 * Routeur global de l'application. Utilise les routeurs des ressources.
 */
const globalRouter = Router();

globalRouter.use('/resultats/', resultatRouter);

export default globalRouter;
