import { ResultatDepuisExercice } from '@type/ResultatDepuisExercice';
import { Tentative } from '@type/Tentative';
import { TentativeDepuisEval } from '@type/TentativeDepuisEval';
import { ExerciceEtudiant } from '@type/ExerciceEtudiant';
import * as repo from '@repositories/resultat.repo';
import { SocketService } from './socket.service';

/**
 * Service de resultat
 */

export class ExerciceService {
  /**
   * Ajoute l'exercice commencé par l'étudiant a la bdd
   *
   * @param exoEtu L'exercice à insérer en bdd de type ExerciceEtudiant
   * @returns true si tout c'est bien passé lors de l'ajout.
   * @throws Error si erreur lors de l'insertion
   */
  public static async addNewExercice(exoEtu: ResultatDepuisExercice): Promise<ExerciceEtudiant> {
    // On convertit l'exercice reçu du srvexo pour un format compatible avec la bdd résultat
    const exoForDb = this.construireResultatDepuisExercice(exoEtu);
    const exoDB = await repo.addNewExercice(exoForDb);
    SocketService.getInstance().emitExercice(exoDB);
    return exoDB;
  }

  /**
   *
   *
   * @param exo sous la forme ExercicePourResultat.
   * @returns exo sous la forme ExerciceEtudiant
   * @throws Error si l'exercice n'a pas été trouvé
   */
  private static construireResultatDepuisExercice(
    resDepuisExercice: ResultatDepuisExercice,
  ): Omit<ExerciceEtudiant, 'id'> {
    // prend en paramètre l'exercice recu depuis le service exercice
    // renvoie un exercice sous forme valide à mettre en bdd
    return {
      idExo: resDepuisExercice['idExo'],
      nomExo: resDepuisExercice['nomExo'],
      idEtu: resDepuisExercice['idEtu'],
      idSession: resDepuisExercice['idSession'],
      nomSession: 'pas_de_session', // pas implémenté dans le service exercice
      estFini: false,
      langage: resDepuisExercice['langage'],
      themes: resDepuisExercice['themes'],
      difficulte: resDepuisExercice['difficulte'],
      tempsMoyen: resDepuisExercice['tempsMoyen'],
      tempsMaximum: resDepuisExercice['tempsMaximum'],
      debut: new Date(),
      tentatives: [],
    };
  }

  /**
   * Récupère l'id de l'exercice selon l'id de l'exercice, etudiant et session en entrée
   *
   * @param idExo Id de l'exercice commencé par l'étudiant
   * @param idEtu Id de l'étudiant
   * @param idSes Id de la session ou se trouve l'exerice
   * @returns l'id de l'exercice de la bdd résultat correspondant aux ids
   * @throws Error si erreur lors de la récuperation
   */
  public static async getIdExoFromExoUsrSes(
    idExo: TentativeDepuisEval['idExo'],
    idEtu: TentativeDepuisEval['idEtu'],
    idSes: TentativeDepuisEval['idSession'],
  ): Promise<ExerciceEtudiant['id']> {
    return await repo.getIdExoFromExoUsrSes(idExo, idEtu, idSes);
  }

  /**
   * Get the resultats of all the etudiants.
   * @returns A promise that resolves to an array of ExerciceEtudiant objects.
   */
  public static async getExerciceEtudiants(): Promise<ExerciceEtudiant[]> {
    return await repo.getExerciceEtudiants();
  }
}
