import { Router, RequestHandler } from 'express';
import { ExerciceEtudiant } from '@type/ExerciceEtudiant';
import { ResultatService } from '@services/resultat.service';
const resultatRouter = Router();

/**
 * Returns the resultats of all the students.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function.
 * @returns None
 * @todo fonction next
 */
const resultatDesEtudiants: RequestHandler = async (req, res, next) => {
  ResultatService.getResultatsEtudiants()
    .then((exo) => {
      res.status(200).json({ exercices: exo });
    })
    .catch(next);
};
resultatRouter.get('/', resultatDesEtudiants);
export default resultatRouter;
