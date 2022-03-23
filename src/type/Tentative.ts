import { ResultState } from './ResultState';

// TODO: doctrings
export type Tentative = {
  id: string;
  validationExercice: boolean;
  logErreurs: string;
  dateSoumission: Date;
  reponseEtudiant: string;
};
