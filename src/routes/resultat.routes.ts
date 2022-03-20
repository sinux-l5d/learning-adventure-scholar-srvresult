import { Router, RequestHandler } from 'express';
import { ResultatService } from '@services/resultat.service';
import { ResultatDepuisExercice } from '@type/ResultatDepuisExercice';

const resultatRouter = Router();

/**
 * Convertit l'exercice reçus depuis le srvexo et l'ajoute dans la bdd
 *
 * @param req Objet Request d'Express
 * @param res Object Response d'Express
 */
const exoDepuisResultat: RequestHandler = async (req, res, next) => {
  const exo: ResultatDepuisExercice = req.body;
  ResultatService.getExoDepuisResultat(exo)
    .then((resultatPourBdd) => {
      if (resultatPourBdd) {
        return resultatPourBdd;
      } else {
        throw new Error(
          'ResultatService.getExoDepuisResultat : Erreur lors de la conversion de Exercice de srvexo -> Exercice pour bdd result',
        );
      }
    })
    .then((resultatPourBdd) => {
      ResultatService.addNewExerciceToDB(resultatPourBdd).then(() => {
        // L'exercice a bien été ajouté a la bdd
        res.sendStatus(200);
      });
    })
    .catch(next);
};

resultatRouter.post('/exercices', exoDepuisResultat);

export default resultatRouter;
