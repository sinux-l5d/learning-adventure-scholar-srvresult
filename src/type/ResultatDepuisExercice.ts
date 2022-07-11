import { ExerciceEtudiant } from './ExerciceEtudiant';

/**
 * Forme d'un exercice que résultat recoit du service exercice
 */
export type ResultatDepuisExercice = Omit<
  ExerciceEtudiant,
  'id' | 'debut' | 'estFini' | 'tentatives' | 'aides'
>;
