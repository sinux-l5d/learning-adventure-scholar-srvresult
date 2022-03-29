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
export const addNewExercice = async (
  exoEtu: Omit<TExerciceEtudiant, 'id'>,
): Promise<TExerciceEtudiant> => {
  const exoAAjouter = new ExerciceEtudiant(exoEtu);
  // La Promise renvoie true si l'exercice à bien été ajouté et false si il y a eu un problème
  try {
    return await exoAAjouter.save();
  } catch (err) {
    console.error(err);
    throw new Error("addNewExercice : Erreur lors de l'ajout du nouvel exercice");
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
  idExo: TentativeDepuisEval['idExo'],
  idEtu: TentativeDepuisEval['idEtu'],
  idSes: TentativeDepuisEval['idSession'],
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
export const addNewTentative = async (
  tentativeForDB: Omit<Tentative, 'id'>,
  idExoDBResult: TExerciceEtudiant['id'],
): Promise<TentativeDepuisEval & { id: Tentative['id'] }> => {
  const exoEtu = await ExerciceEtudiant.findByIdAndUpdate(
    { _id: idExoDBResult },
    { $push: { tentatives: tentativeForDB } },
    { new: true },
  ).exec();

  if (exoEtu) {
    const tentatives_list = exoEtu.tentatives;
    const last_tentative = tentatives_list[tentatives_list.length - 1];
    // Si la tentative est validé alors l'exercice est fini
    if (last_tentative.validationExercice == true) {
      await ExerciceEtudiant.findByIdAndUpdate({ _id: idExoDBResult }, { estFini: true }).exec();
    }

    return {
      id: last_tentative.id,
      idEtu: exoEtu.idEtu,
      idExo: exoEtu.idExo,
      idSession: exoEtu.idSession,
      reponseEtudiant: last_tentative.reponseEtudiant,
      logErreurs: last_tentative.logErreurs,
      validationExercice: last_tentative.validationExercice,
      dateSoumission: last_tentative.dateSoumission,
    };
  }
  // Si exoEtu est null retourne une erreur
  throw new Error("addNewTentative : Erreur lors de l'ajout de la tentative dans la bdd");
};

/**
 * Recupere tous les resultats des etudiants
 * @returns {Promise<ExerciceEtudiant[]>} - Une promesse qui renvoie un tableau de resultats d'étudiants.
 * @Todo : Creer le AppError pour ce repo
 */
export const getExerciceEtudiants = async (): Promise<TExerciceEtudiant[]> => {
  const exo = await ExerciceEtudiant.find().exec();
  if (exo) return exo;
  throw new Error('Exercice not found');
};
