import { ExerciceEtu } from '@db/exercice.db';
import { ExerciceEtudiant } from '@type/ExerciceEtudiant';

/**
 * Ajoute un nouvelle exercice à la bdd résultat
 *
 * @param exoEtu L'exercice commencé par l'étudiant (reçus depuis le srvexo)
 * @throws Error si l'ajout n'a pas fonctionné
 * @return true si l'ajout c'est bien passé
 */
export const addNewExerciceToDB = async (exoEtu: ExerciceEtudiant): Promise<boolean> => {
  const exoAAjouter = new ExerciceEtu(exoEtu);
  // La Promise renvoie true si l'exercice à bien été ajouté et false si il y a eu un problème
  return exoAAjouter
    .save()
    .then(() => {
      return true;
    })
    .catch((err) => {
      console.error(err);
      throw new Error("addNewExerciceToDB : Problème lors de l'ajout du nouvelle exercice");
    });
};
