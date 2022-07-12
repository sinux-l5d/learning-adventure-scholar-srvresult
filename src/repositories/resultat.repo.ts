import { ExerciceEtudiant } from '@db/exercice.db';
import { envDependent } from '@helpers/env.helper';
import { ExerciceEtudiant as TExerciceEtudiant } from '@type/ExerciceEtudiant';
import { Tentative } from '@type/Tentative';
import { TentativeDepuisEval } from '@type/TentativeDepuisEval';
import { AppError } from '@helpers/AppError.helper';
import { Aide } from '@type/Aide';
import { AideARenvoyer } from '@type/AideARenvoyer';

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
  idExo: string,
  idEtu: string,
  idSes: string,
): Promise<TExerciceEtudiant['id']> => {
  const filtre = { idExo: idExo, idEtu: idEtu, idSession: idSes };
  const id = await ExerciceEtudiant.findOne(filtre).exec();

  if (id) {
    return id['id'];
  }

  throw new AppError(
    envDependent('', 'getIdExoFromExoUsrSes: ') +
      "L'exercice " +
      idExo +
      " n'existe pas pour l'étudiant: " +
      idEtu +
      ' et la session ' +
      idSes,
    404,
  );
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
      await ExerciceEtudiant.findOneAndUpdate(
        { _id: idExoDBResult },
        {
          $set: {
            estFini: true,
            'aides.$[].resolue': true,
          },
        },
      ).exec();
    }

    return {
      id: last_tentative.id,
      idEtu: exoEtu.idEtu,
      idExo: exoEtu.idExo,
      idSession: exoEtu.idSession,
      idSeance: exoEtu.idSeance,
      reponseEtudiant: last_tentative.reponseEtudiant,
      logErreurs: last_tentative.logErreurs,
      validationExercice: last_tentative.validationExercice,
      dateSoumission: last_tentative.dateSoumission,
    };
  }
  // Si exoEtu est null retourne une erreur
  throw new AppError("addNewTentative : Erreur lors de l'ajout de la tentative dans la bdd", 500);
};

/**
 * Ajoute la demande d'aide dans la bdd résultat
 *
 * @param aideForDB La tentative à ajouter dans la bdd
 * @param idExoDBResult L'id de l'exercice dans lequel on ajoute la tentative
 * @returns Aide La demande d'aide dans le bon format pour la bdd
 * @throws Error si erreur lors de la conversion
 */
export const addNewAide = async (
  aideForDB: Omit<Aide, 'id'>,
  idExoDBResult: TExerciceEtudiant['id'],
): Promise<AideARenvoyer> => {
  const exoEtu = await ExerciceEtudiant.findByIdAndUpdate(
    { _id: idExoDBResult },
    { $push: { aides: aideForDB } },
    { new: true },
  ).exec();

  if (exoEtu) {
    const last_aide = exoEtu.aides[exoEtu.aides.length - 1];
    return {
      id: last_aide.id,
      idEtu: exoEtu.idEtu,
      idExo: exoEtu.idExo,
      idSession: exoEtu.idSession,
      idSeance: exoEtu.idSeance,
      idExoEtu: idExoDBResult,
      resolue: last_aide.resolue,
      date: last_aide.date,
    };
  }
  // Si exoEtu est null retourne une erreur
  throw new AppError("addNewAide : Erreur lors de l'ajout de la demande d'aide dans la bdd", 500);
};

export const resolveAides = async (
  idExoDBResult: TExerciceEtudiant['id'],
): Promise<AideARenvoyer[]> => {
  const exoEtuAvant = await ExerciceEtudiant.findById(idExoDBResult).exec();
  const exoEtuApres = await ExerciceEtudiant.findByIdAndUpdate(
    { _id: idExoDBResult },
    { $set: { 'aides.$[].resolue': true } },
  ).exec();

  if (exoEtuAvant && exoEtuApres) {
    const aidesResolues: AideARenvoyer[] = [];
    exoEtuAvant.aides.forEach((aide) => {
      if (!aide.resolue) {
        aidesResolues.push({
          id: aide.id,
          idEtu: exoEtuAvant.idEtu,
          idExo: exoEtuAvant.idExo,
          idSession: exoEtuAvant.idSession,
          idSeance: exoEtuAvant.idSeance,
          idExoEtu: idExoDBResult,
          resolue: true,
          date: aide.date,
        });
      }
    });
    return aidesResolues;
  }
  // Si exoEtu est null retourne une erreur
  throw new AppError("addNewAide : Erreur lors de l'ajout de la demande d'aide dans la bdd", 500);
};

/**
 * Recupere tous les resultats des etudiants
 * @returns {Promise<ExerciceEtudiant[]>} - Une promesse qui renvoie un tableau de resultats d'étudiants.
 * @Todo : Creer le AppError pour ce repo
 */
export const getExerciceEtudiants = async (): Promise<TExerciceEtudiant[]> => {
  const exo = await ExerciceEtudiant.find().exec();
  if (exo) return exo;
  throw new AppError(envDependent('', 'getExericeEtudiants: ') + 'Exercice non trouvé', 404);
};

/**
 * Obtient un ExerciceEtudiant par son identifiant
 * @param id ObjectId de l'ExerciceEtudiant
 * @returns Une promesse qui se résout en un tableau d'ExerciceEtudiant
 * @throws AppError si l'exercice n'est pas trouvé
 */
export const getExerciceEtudiantById = async (
  id: TExerciceEtudiant['id'],
): Promise<TExerciceEtudiant> => {
  const exo = await ExerciceEtudiant.findById(id).exec();
  if (exo) return exo;
  throw new AppError(envDependent('', 'getExericeEtudiantById: ') + 'Exercice non trouvé', 404);
};
