import { Router, RequestHandler } from 'express';
import { AideService } from '@services/aide.service';
import { Aide } from '@type/Aide';
import { AideDepuisEtudiant } from '@type/AideDepuisEtudiant';
import { ExerciceEtudiant } from '@type/ExerciceEtudiant';
import { ExerciceService } from '@services/exercice.service';

const aideRouter = Router();

const resolveAide: RequestHandler = async (req, res, next) => {
  const aide: AideDepuisEtudiant = req.body;
  const idExo = aide['idExo'];
  const idEtu = aide['idEtu'];
  const idSes = aide['idSession'];
  const idExoDBResult: ExerciceEtudiant['id'] = await ExerciceService.getIdExoFromExoUsrSes(
    idExo,
    idEtu,
    idSes,
  );

  AideService.resoudAide(idExoDBResult)
    .then((aideResolues: Aide[]) => {
      // L'aide a bien été modifié a la bdd
      res.status(200).json({ aides: aideResolues });
    })
    .catch(next);
};

aideRouter.post('/resolve', resolveAide);

/**
 * Recupère l'ID de exercice commencé par l'étudiant
 *
 * @param req Objet Request d'Express
 * @param res Object Response d'Express
 */
const ajouteNouvelleAide: RequestHandler = async (req, res, next) => {
  // le parametre donné sera l'id de l'exercice
  const aide: AideDepuisEtudiant = req.body;
  const idExo = aide['idExo'];
  const idEtu = aide['idEtu'];
  const idSes = aide['idSession'];
  const date = Date.now();
  // TODO : utiliser la séance
  const idSeance = aide['idSeance'];

  const idExoDBResult: ExerciceEtudiant['id'] = await ExerciceService.getIdExoFromExoUsrSes(
    idExo,
    idEtu,
    idSes,
  );

  AideService.addNewAide(idExoDBResult)
    .then((aideAdded) => {
      // L'aide a bien été ajouté a la bdd
      res.status(200).json({ aide: aideAdded });
    })
    .catch(next);
};

aideRouter.post('/', ajouteNouvelleAide);

export default aideRouter;
