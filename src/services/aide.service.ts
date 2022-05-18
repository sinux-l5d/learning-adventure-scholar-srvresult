import { ExerciceEtudiant } from '@type/ExerciceEtudiant';
import { Aide } from '@type/Aide';
import { TentativeDepuisEval } from '@type/TentativeDepuisEval';
import { SocketService } from './socket.service';
import * as repo from '@repositories/resultat.repo';
import { ExerciceService } from './exercice.service';
import { AppError } from '@helpers/AppError.helper';
import { envDependent } from '@helpers/env.helper';
import { AideARenvoyer } from '@type/AideARenvoyer';

export class AideService {
  /**
   * Convertit la demande d'aide reçue dans le bon format pour la bdd
   *
   * @param tentativeFromEval La tentative dans le format envoyé par le srveval
   * @returns Tentative La tentative dans le bon format pour la bdd
   * @throws Error si erreur lors de la conversion
   */
  private static createAideForDB(): Omit<Aide, 'id'> {
    return {
      date: new Date(),
      resolue: false,
    };
  }

  /**
   * Ajoute la demande d'aide dans la bdd résultat
   *
   * @param aideForDB L'aide à ajouter dans la bdd
   * @param idExoDBResult L'id de l'exercice dans lequel on ajoute la demande d'aide
   * @returns Aide La demande d'aide dans le bon format pour la bdd
   * @throws Error si erreur lors de la conversion
   */
  public static async addNewAide(idExoDBResult: ExerciceEtudiant['id']): Promise<AideARenvoyer> {
    let exercice: ExerciceEtudiant;

    try {
      exercice = await ExerciceService.getExerciceEtudiantById(idExoDBResult);
    } catch {
      // La demande d'aide n'existe pas
      throw new AppError(
        envDependent('', 'addNewAide: ') +
          "L'exercice auquel vous voulez ajouter une demande d'aide n'existe pas",
        404,
      );
    }

    const getAFckComparableDate = (date: Date): number => {
      return Math.floor(Date.parse(date + '') / 1000);
    };

    const aideDupliques = exercice.aides.filter(
      (a: Aide) => getAFckComparableDate(a.date) === getAFckComparableDate(new Date()),
    );

    if (aideDupliques.length > 0)
      throw new AppError(envDependent('', 'addNewTentative: ') + 'La tentative existe déjà', 400);

    // On crée la demande d'aide dans un format compatible avec la bdd résultat
    const aideForDB = this.createAideForDB();

    const aideDB = await repo.addNewAide(aideForDB, idExoDBResult);
    SocketService.getInstance().emitAide(aideDB);
    return aideDB;
  }

  public static async resoudAide(idExoDBResult: ExerciceEtudiant['id']): Promise<AideARenvoyer[]> {
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
    // On résoud les demandes d'aides
    const aidesDB = await repo.resolveAides(idExoDBResult);
    for (const a of aidesDB) {
      SocketService.getInstance().emitAide(a);
    }
    return aidesDB;
  }
}
