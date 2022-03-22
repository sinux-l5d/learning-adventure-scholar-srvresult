import { ExerciceEtudiant } from './ExerciceEtudiant';

// TODO: doctrings
export type ExerciceEtudiantPartiel = Omit<ExerciceEtudiant, 'tentatives'>;
