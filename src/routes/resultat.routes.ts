import { Router, RequestHandler } from 'express';
import { ResultatService } from '@services/resultat.service';
import { ResultatDepuisExercice } from '@type/ResultatDepuisExercice';
import { Tentative } from '@type/Tentative';
import { TentativeDepuisEval } from '@type/TentativeDepuisEval';
import { ExerciceEtudiant } from '@type/ExerciceEtudiant';

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
  const exoForDb = ResultatService.construireResultatDepuisExercice(exo);

  // On ajoute l'exercice a la bdd résultat
  //TODO: Gerer cas ou plusieurs fois même exo/session ?
  ResultatService.addNewExerciceToDB(exoForDb)
    .then(() => {
      // L'exercice a bien été ajouté a la bdd
      res.sendStatus(200);
    })
    .catch(next);
};

/**
 * Recupère la tentative reçus depuis le srveval et l'ajoute a la bdd
 *
 * @param req Objet Request d'Express
 * @param res Object Response d'Express
 */
const ajouteNouvelleTentative: RequestHandler = async (req, res, next) => {
  const tentative: TentativeDepuisEval = req.body;
  const idExo = tentative['exoId'];
  const idEtu = tentative['userId'];
  const idSes = tentative['sessionId'];

  // On récupère l'id de l'exercice ou il faudra ajouter la tentative dans la bdd résultat
  const idExoDBResult: ExerciceEtudiant['id'] = await ResultatService.getIdExoFromExoUsrSes(
    idExo,
    idEtu,
    idSes,
  );

  // On convertit la tentative reçu du srveval pour un format compatible avec la bdd résultat
  const tentativeForDB = ResultatService.convertAttemptForDB(tentative);

  // On ajoute la tentative la bdd résultat
  ResultatService.addAttemptToDB(tentativeForDB, idExoDBResult)
    .then(() => {
      // La tentative a bien été ajouté a la bdd
      res.sendStatus(200);
    })
    .catch(next);
};

// Route POST /exercices
resultatRouter.post('/exercices', exoDepuisResultat);

// Route POST /tentatives => Recupère la tentative reçus depuis le srveval et l'ajoute a la bdd
resultatRouter.post('/tentatives', ajouteNouvelleTentative);

export default resultatRouter;
