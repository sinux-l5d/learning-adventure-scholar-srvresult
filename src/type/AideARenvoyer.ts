import { Aide } from './Aide';

/**
 * Format de l'Aide permetant de remonter jusqu'à la BDD
 *
 * @property idExo identifiant de l'exercice
 * @property idEtu identifiant de l'étudiant
 * @property idSession identifiant de l'étudiant
 * @property idSeance : identifiant de la séance
 */
export type AideARenvoyer = Aide & {
  idExo: string;
  idEtu: string;
  idSession: string;
  idSeance: string;
  idExoEtu: string;
};
