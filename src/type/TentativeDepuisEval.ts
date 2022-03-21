// TODO: doctrings
export type TentativeDepuisEval = {
  userId: string;
  exoId: string;
  sessionId?: string; //TODO: Il en faut un ?
  reponseEtudiant: string;
  logErreurs: string;
  validationExercice: boolean;
  dateSoumission: Date;
};
