import { ExerciceEtudiant } from '@type/ExerciceEtudiant';
import { Tentative } from '@type/Tentative';
import { TentativeDepuisEval } from '@type/TentativeDepuisEval';
import { SocketService } from './socket.service';
import * as repo from '@repositories/resultat.repo';
import { ExerciceService } from './exercice.service';
import { AppError } from '@helpers/AppError.helper';
import { envDependent } from '@helpers/env.helper';

export class TentativeService {
  /**
   * Convertit la tentative reçu depuis le srveval dans le bon format pour la bdd
   *
   * @param tentativeFromEval La tentative dans le format envoyé par le srveval
   * @returns Tentative La tentative dans le bon format pour la bdd
   * @throws Error si erreur lors de la conversion
   */
  private static convertTentativeForDB(
    tentativeFromEval: TentativeDepuisEval,
  ): Omit<Tentative, 'id'> {
    return {
      validationExercice: tentativeFromEval['validationExercice'],
      logErreurs: tentativeFromEval['logErreurs'],
      dateSoumission: tentativeFromEval['dateSoumission'],
      reponseEtudiant: tentativeFromEval['reponseEtudiant'],
      idSeance: tentativeFromEval['idSeance'],
    };
  }

  /**
   * Ajoute la tentative dans la bdd résultat
   *
   * @param tentativeForDB La tentative à ajouter dans la bdd
   * @param idExoDBResult L'id de l'exercice dans lequel on ajoute la tentative
   * @returns Tentative La tentative dans le bon format pour la bdd
   * @throws Error si erreur lors de la conversion
   */
  public static async addNewTentative(
    tentative: TentativeDepuisEval,
    idExoDBResult: ExerciceEtudiant['id'],
  ): Promise<TentativeDepuisEval & { id: Tentative['id'] }> {
    let exercice: ExerciceEtudiant;

    try {
      exercice = await ExerciceService.getExerciceEtudiantById(idExoDBResult);
    } catch {
      // La tentative n'existe pas
      throw new AppError(
        envDependent('', 'addNewTentative: ') +
          "L'exercice auquel vous voulez ajouté une tentative n'existe pas",
        404,
      );
    }

    // Oui, les dates en JS c'est de la me***
    // Ne tiens pas compte des milisecondes, votre étudiant n'est pas Lucky Luck
    const getAFckComparableDate = (date: any): number => {
      return Math.floor(Date.parse(date + '') / 1000);
    };

    const tentativesDupliques = exercice.tentatives.filter(
      (t) =>
        t.validationExercice === tentative.validationExercice &&
        t.reponseEtudiant === tentative.reponseEtudiant &&
        getAFckComparableDate(t.dateSoumission) === getAFckComparableDate(tentative.dateSoumission),
    );

    if (tentativesDupliques.length > 0)
      throw new AppError(envDependent('', 'addNewTentative: ') + 'La tentative existe déjà', 400);

    // On convertit la tentative reçu du srveval pour un format compatible avec la bdd résultat
    const tentativeForDB = this.convertTentativeForDB(tentative);

    const tentativeDB = await repo.addNewTentative(tentativeForDB, idExoDBResult);
    SocketService.getInstance().emitTentative({ ...tentativeDB, idExoEtu: idExoDBResult });
    return tentativeDB;
  }
}
