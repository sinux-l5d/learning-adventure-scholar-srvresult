import { ResultState } from './ResultState';

// TODO: doctrings
export type Tentative = {
  id: string;
  resultState: ResultState;
  erreurs: Array<string>;
  dateSoumission: Date;
  code: string;
};
