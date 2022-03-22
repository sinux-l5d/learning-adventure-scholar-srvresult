import { Tentative } from './Tentative';

// TODO: doctrings
export type ExerciceEtudiant = {
  id: string;
  idExo: string;
  nomExo: string;
  idEtu: string;
  /**
   * Pas utilsé pour l'instant
   */
  idSession: string;
  nomSession: string;
  estFini: boolean;
  langage: string;
  themes: Array<string>;
  difficulte: number;
  tempsMoyen?: number;
  tempsMaximum?: number;
  debut: Date;
  tentatives: Array<Tentative>;
};
