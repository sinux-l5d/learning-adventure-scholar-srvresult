import { ResultatDepuisExercice } from '@type/ResultatDepuisExercice';
import { ExerciceEtudiant } from '@type/ExerciceEtudiant';
import * as repo from '@repositories/resultat.repo';

/**
 * Service de resultat
 */

export class ResultatService {
  /**
   * Ajoute l'exercice commencé par l'étudiant a la bdd
   *
   * @param exoEtu L'exercice à insérer en bdd de type ExerciceEtudiant
   * @returns true si tout c'est bien passé lors de l'ajout.
   * @throws Error si erreur lors de l'insertion
   */
  public static async addNewExerciceToDB(exoEtu: ExerciceEtudiant): Promise<boolean> {
    return repo.addNewExerciceToDB(exoEtu).then(() => {
      return true;
    });
  }

  // J'ai séparé le traitement, est ce pertinent ?

  /**
   *
   * @param exo sous la forme ExercicePourResultat.
   * @returns exo sous la forme ExerciceEtudiant
   * @throws Error si l'exercice n'a pas été trouvé
   */
  public static async getExoDepuisResultat(
    resDepuisExercice: ResultatDepuisExercice,
  ): Promise<ExerciceEtudiant | null> {
    return this.construireResultatDepuisExercice(resDepuisExercice);
  }

  /**
   *
   *
   * @param exo sous la forme ExercicePourResultat.
   * @returns exo sous la forme ExerciceEtudiant
   * @throws Error si l'exercice n'a pas été trouvé
   */
  public static construireResultatDepuisExercice(
    resDepuisExercice: ResultatDepuisExercice,
  ): ExerciceEtudiant {
    // prend en paramètre l'exercice recu depuis le service exercice
    // renvoie un exercice sous forme valide à mettre en bdd
    const date = new Date();
    const resJSON: ExerciceEtudiant = {
      id: '1', // je ne comprend pas pourquoi il faut un id, celui ci sera mis par mongo non ?
      idExo: resDepuisExercice['idExo'],
      nomExo: resDepuisExercice['nomExo'],
      idEtu: resDepuisExercice['idEtu'],
      idSession: resDepuisExercice['idSession'],
      nomSession: 'pas_de_session', // pas implémenté dans le service exercice
      estFini: false,
      langage: resDepuisExercice['langage'],
      themes: resDepuisExercice['theme'],
      difficulte: resDepuisExercice['difficulte'],
      tempsMoyen: resDepuisExercice['tempsMoyen'],
      tempsMaximum: resDepuisExercice['tempsMaximum'],
      debut: date,
      tentatives: [],
    };
    return resJSON;
  }
}
