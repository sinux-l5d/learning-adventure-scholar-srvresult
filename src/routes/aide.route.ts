import { Router, RequestHandler } from 'express';
import { AideService } from '@services/aide.service';
import { Aide } from '@type/Aide';
import { AideDepuisEtudiant } from '@type/AideDepuisEtudiant';
import { ExerciceEtudiant } from '@type/ExerciceEtudiant';
import { ExerciceService } from '@services/exercice.service';

const aideRouter = Router();

const resolveAide: RequestHandler = async (req, res, next) => {
  console.log(req.params.idExoEtu);
  const idExoDBResult = req.params.idExoEtu;

  console.log(idExoDBResult);

  AideService.resoudAide(idExoDBResult)
    .then((aideResolues: Aide[]) => {
      // L'aide a bien été modifié a la bdd
      res.status(200).json({ aides: aideResolues });
    })
    .catch(next);
};

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

aideRouter.put('/:idExoEtu/aides', resolveAide);
aideRouter.post('/aides', ajouteNouvelleAide);

export default aideRouter;
