import { ResultatDepuisExercice } from '@type/ResultatDepuisExercice';
import { TentativeDepuisEval } from '@type/TentativeDepuisEval';
import { ExerciceEtudiant } from '@type/ExerciceEtudiant';
import * as repo from '@repositories/resultat.repo';
import { SocketService } from './socket.service';
import { AppError } from '@helpers/AppError.helper';

/**
 * Service de resultat
 */

export class ExerciceService {
  /**
   * Ajoute l'exercice commencé par l'étudiant a la bdd
   *
   * @param exoEtu L'exercice à insérer en bdd de type ExerciceEtudiant
   * @returns true si tout c'est bien passé lors de l'ajout.
   * @throws AppError si l'exercice existe déjà
   */
  public static async addNewExercice(exoEtu: ResultatDepuisExercice): Promise<ExerciceEtudiant> {
    // On convertit l'exercice reçu du srvexo pour un format compatible avec la bdd résultat
    const exoForDb = this.construireResultatDepuisExercice(exoEtu);

    let exist: boolean;
    try {
      await this.getIdExoFromExoUsrSes(exoForDb.idExo, exoForDb.idEtu, exoForDb.idSession);
      // Si ne lève pas d'erreur, c'est que l'exercice existe déjà
      exist = true;
    } catch {
      // L'exercice n'existe pas
      exist = false;
    }

    if (exist)
      throw new AppError(
        `L'exercice est déjà dans la BDD (idEtu=${exoForDb.idEtu}, idExo=${exoForDb.idExo}, idSession=${exoForDb.idSession})`,
        400,
      );

    const exoDB = await repo.addNewExercice(exoForDb);
    SocketService.getInstance().emitExercice(exoDB);
    return exoDB;
  }

  /**
   * Transforme les informations envoyées par le service exercices en un format compatible avec la bdd résultat.
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
      nomSession: resDepuisExercice['nomSession'],
      idSeance: resDepuisExercice['idSeance'],
      estFini: false,
      langage: resDepuisExercice['langage'],
      themes: resDepuisExercice['themes'],
      difficulte: resDepuisExercice['difficulte'],
      tempsMoyen: resDepuisExercice['tempsMoyen'],
      tempsMaximum: resDepuisExercice['tempsMaximum'],
      debut: new Date(),
      tentatives: [],
      aides: [],
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
    idExo: string,
    idEtu: string,
    idSes: string,
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

  /**
   * Retourne un exercice d'un étudiant selon son id
   * @param id ObjectId de l'exercice
   * @returns L'exercice de l'étudiant
   * @throws AppError si l'exercice n'a pas été trouvé
   */
  public static async getExerciceEtudiantById(
    id: ExerciceEtudiant['id'],
  ): Promise<ExerciceEtudiant> {
    return await repo.getExerciceEtudiantById(id);
  }
}
