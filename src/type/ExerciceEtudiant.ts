import { Tentative } from './Tentative';

// TODO: doctrings
export type ExerciceEtudiant = {
  id: string;
  idExo: string;
  nomExo: string;
  idEtu: string;
  idSession: string;
  nomSession: string;
  idSeance: string;
  estFini: boolean;
  langage: string;
  themes: Array<string>;
  difficulte: number;
  tempsMoyen?: number;
  tempsMaximum?: number;
  debut: Date;
  tentatives: Array<Tentative>;
};
