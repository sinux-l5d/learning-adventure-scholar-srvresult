import { Router, RequestHandler } from 'express';
import { TentativeDepuisEval } from '@type/TentativeDepuisEval';
import { ExerciceEtudiant } from '@type/ExerciceEtudiant';
import { TentativeService } from '@services/tentative.service';
import { ExerciceService } from '@services/exercice.service';

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

  // On ajoute la tentative la bdd résultat
  TentativeService.addNewTentative(tentative, idExoDBResult)
    .then((tentativeAdded) => {
      // La tentative a bien été ajouté a la bdd
      res.status(200).json({ tentative: tentativeAdded });
    })
    .catch(next);
};

tentativeRouter.post('/', ajouteNouvelleTentative);

export default tentativeRouter;
