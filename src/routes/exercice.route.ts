import { Router, RequestHandler } from 'express';
import { ExerciceService } from '@services/exercice.service';
import { ResultatDepuisExercice } from '@type/ResultatDepuisExercice';

const resultatRouter = Router();

/**
 * Recupère l'ecercice commencé par l'étudiant reçus depuis le srvexo et l'ajoute a la bdd
 *
 * @param req Objet Request d'Express
 * @param res Object Response d'Express
 */
const exoDepuisResultat: RequestHandler = async (req, res, next) => {
  const exo: ResultatDepuisExercice = req.body;

  // On convertit l'exercice reçu du srvexo pour un format compatible avec la bdd résultat
  const exoForDb = ExerciceService.construireResultatDepuisExercice(exo);

  // On ajoute l'exercice a la bdd résultat
  //TODO: Gerer cas ou plusieurs fois même exo/session ?
  ExerciceService.addNewExerciceToDB(exoForDb)
    .then((exoAdded) => {
      // L'exercice a bien été ajouté a la bdd
      res.status(200).json({ exercice: exoAdded });
    })
    .catch(next);
};

// Route POST /exercices
resultatRouter.post('/', exoDepuisResultat);

// Route POST /tentatives => Recupère la tentative reçus depuis le srveval et l'ajoute a la bdd

/**
 * Returns the resultats of all the students.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next function.
 * @returns None
 * @todo fonction next
 */
const exercicesDesEtudiants: RequestHandler = async (_req, res, next) => {
  ExerciceService.getExerciceEtudiants()
    .then((exo) => {
      res.status(200).json({ exercices: exo });
    })
    .catch(next);
};
resultatRouter.get('/', exercicesDesEtudiants);

export default resultatRouter;
