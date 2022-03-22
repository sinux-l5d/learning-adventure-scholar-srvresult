import { ExerciceEtudiantModel } from '@db/exercice.db';
import { ExerciceEtudiant } from '@type/ExerciceEtudiant';

/**
 * Recupere tous les resultats des etudiants
 * @returns {Promise<ExerciceEtudiant[]>} - Une promesse qui renvoie un tableau de resultats d'étudiants.
 * @Todo : Creer le AppError pour ce repo
 */
export const getResultatsEtudiants = async (): Promise<ExerciceEtudiant[]> => {
  const exo = await ExerciceEtudiantModel.find().exec();
  if (exo) {
    return exo;
  }
  throw new Error('Exercice not found');
};
