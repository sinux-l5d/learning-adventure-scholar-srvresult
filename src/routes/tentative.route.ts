import { Router, RequestHandler } from 'express';
import { ExerciceService } from '@services/exercice.service';
import { TentativeDepuisEval } from '@type/TentativeDepuisEval';
import { ExerciceEtudiant } from '@type/ExerciceEtudiant';

const tentativeRouter = Router();

/**
 * Recupère la tentative reçus depuis le srveval et l'ajoute a la bdd
 *
 * @param req Objet Request d'Express
 * @param res Object Response d'Express
 */
const ajouteNouvelleTentative: RequestHandler = async (req, res, next) => {
  const tentative: TentativeDepuisEval = req.body;
  const idExo = tentative['idExo'];
  const idEtu = tentative['idEtu'];
  const idSes = tentative['idSession'];

  // On récupère l'id de l'exercice ou il faudra ajouter la tentative dans la bdd résultat
  const idExoDBResult: ExerciceEtudiant['id'] = await ExerciceService.getIdExoFromExoUsrSes(
    idExo,
    idEtu,
    idSes,
  );

  // On convertit la tentative reçu du srveval pour un format compatible avec la bdd résultat
  const tentativeForDB = ExerciceService.convertAttemptForDB(tentative);

  // On ajoute la tentative la bdd résultat
  ExerciceService.addAttemptToDB(tentativeForDB, idExoDBResult)
    .then((tentativeAdded) => {
      // La tentative a bien été ajouté a la bdd
      res.status(200).json({ tentative: tentativeAdded });
    })
    .catch(next);
};

tentativeRouter.post('/', ajouteNouvelleTentative);

export default tentativeRouter;
