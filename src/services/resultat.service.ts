import { ExerciceEtudiant } from '@type/ExerciceEtudiant';
import * as repo from '@repositories/resultat.repo';

/**
 * Service de resultat
 */

/**
 * Get the resultats of all the etudiants.
 * @returns {Promise<ExerciceEtudiant[]>} - A promise that resolves to an array of ExerciceEtudiant objects.
 */
export class ResultatService {
  // J'ai séparé le traitement, est ce pertinent ?
  public static async getResultatsEtudiants(): Promise<ExerciceEtudiant[]> {
    return await repo.getResultatsEtudiants();
  }
}
