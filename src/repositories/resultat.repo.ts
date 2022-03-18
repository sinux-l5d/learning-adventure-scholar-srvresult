import { ExerciceEtudiantModel } from '@db/exercice.db';
import { ExerciceEtudiant } from '@type/ExerciceEtudiant';

/**
 * Get all the results of the students for the given exercise.
 * @returns {Promise<ExerciceEtudiant[]>} - A promise that resolves to an array of the results of the students for the given exercise.
 * @Todo : Creer le AppError pour ce repo
 */
export const getResultatsEtudiants = async (): Promise<ExerciceEtudiant[]> => {
  const exo = await ExerciceEtudiantModel.find().exec();
  if (exo) {
    return exo;
  }
  throw new Error('Exercice not found');
};
