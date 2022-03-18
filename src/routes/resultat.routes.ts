import { Router, RequestHandler } from 'express';
import { ResultatService } from '@services/resultat.service';
import { ResultatDepuisExercice } from '@type/ResultatDepuisExercice';

const resultatRouter = Router();

/**
 * Renvoie L'ex a inscrire en bdd resultat suivant de l'exo présent dans le chemin
 *
 * @param req Objet Request d'Express
 * @param res Object Response d'Express
 */
const exoDepuisResultat: RequestHandler = async (req, res, next) => {
  const exo: ResultatDepuisExercice = req.body;
  ResultatService.getExoDepuisResultat(exo)
    .then((resultatPourBdd) => {
      console.log(resultatPourBdd);
      //TODO: Faut-il envoyer un json ? (pas précisé dans la doc)
      res.sendStatus(200);
    })
    .catch(next);
};

resultatRouter.post('/exercices', exoDepuisResultat);

export default resultatRouter;
