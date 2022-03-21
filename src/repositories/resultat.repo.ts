import { ExerciceEtudiant } from '@db/exercice.db';
import { ExerciceEtudiant as TExerciceEtudiant } from '@type/ExerciceEtudiant';
import { Tentative } from '@type/Tentative';
import { TentativeDepuisEval } from '@type/TentativeDepuisEval';

/**
 * Ajoute un nouvelle exercice à la bdd résultat
 *
 * @param exoEtu L'exercice commencé par l'étudiant (reçus depuis le srvexo)
 * @throws Error si l'ajout n'a pas fonctionné
 * @return true si l'ajout c'est bien passé
 */
export const addNewExerciceToDB = async (
  exoEtu: Omit<TExerciceEtudiant, 'id'>,
): Promise<TExerciceEtudiant> => {
  const exoAAjouter = new ExerciceEtudiant(exoEtu);
  // La Promise renvoie true si l'exercice à bien été ajouté et false si il y a eu un problème
  try {
    return await exoAAjouter.save();
  } catch {
    throw new Error("addNewExerciceToDB : Erreur lors de l'ajout du nouvel exercice");
  }
};

/**
 * Récupère l'id de l'exercice selon l'id de l'exercice, etudiant et session en entrée
 *
 * @param idExo Id de l'exercice commencé par l'étudiant
 * @param idEtu Id de l'étudiant
 * @param idSes Id de la session ou se trouve l'exerice
 * @returns l'id de l'exercice de la bdd résultat correspondant aux ids
 * @throws Error si erreur lors de la récuperation
 */
export const getIdExoFromExoUsrSes = async (
  idExo: TentativeDepuisEval['exoId'],
  idEtu: TentativeDepuisEval['userId'],
  idSes: TentativeDepuisEval['sessionId'],
): Promise<TExerciceEtudiant['id']> => {
  const filtre = { idExo: idExo, idEtu: idEtu, idSession: idSes };
  const id = await ExerciceEtudiant.findOne(filtre).exec();

  if (id) {
    return id['id'];
  }

  throw new Error('getIdExoFromExoUsrSes : Could not find the id');
};

/**
 * Ajoute la tentative dans la bdd résultat
 *
 * @param tentativeForDB La tentative à ajouter dans la bdd
 * @param idExoDBResult L'id de l'exercice dans lequel on ajoute la tentative
 * @returns Tentative La tentative dans le bon format pour la bdd
 * @throws Error si erreur lors de la conversion
 */
export const addAttemptToDB = async (
  tentativeForDB: Omit<Tentative, 'id'>,
  idExoDBResult: TExerciceEtudiant['id'],
): Promise<TExerciceEtudiant> => {
  const exoEtu = await ExerciceEtudiant.findByIdAndUpdate(
    { _id: idExoDBResult },
    { $push: { tentatives: tentativeForDB } },
  ).exec();

  if (exoEtu) {
    return exoEtu;
  }
  // Si exoEtu est null retourne une erreur
  throw new Error("addAttemptToDB : Erreur lors de l'ajout de la tentative dans la bdd");
};
