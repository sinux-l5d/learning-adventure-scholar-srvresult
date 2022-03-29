import { ExerciceEtudiant } from '@type/ExerciceEtudiant';
import { Tentative } from '@type/Tentative';
import { TentativeDepuisEval } from '@type/TentativeDepuisEval';
import { SocketService } from './socket.service';
import * as repo from '@repositories/resultat.repo';

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
    // On convertit la tentative reçu du srveval pour un format compatible avec la bdd résultat
    const tentativeForDB = this.convertTentativeForDB(tentative);
    const tentativeDB = await repo.addNewTentative(tentativeForDB, idExoDBResult);
    SocketService.getInstance().emitTentative(tentativeDB);
    return tentativeDB;
  }
}
