import { ExerciceEtudiant } from './ExerciceEtudiant';
import { Tentative } from './Tentative';

export type TentativePourSocket = Tentative & {
  idEtu: ExerciceEtudiant['idEtu'];
  idExo: ExerciceEtudiant['idExo'];
  idSession: ExerciceEtudiant['idSession'];
  idExoEtu: ExerciceEtudiant['id'];
};
