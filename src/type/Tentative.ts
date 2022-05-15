/**
 * Un Tentative représente une soumission de solution par un étudiant, envoyé par le service évaluation.
 *
 * @property id L'identifiant de la tentative.
 * @property validationExercice Si la solution est valide ou non.
 * @property logErreurs Journal des erreurs de la tentative.
 * @property dateSoumission La date à laquelle l'étudiant a soumis la réponse.
 * @property reponseEtudiant La réponse donnée par l'élève.
 * @property idSeance L'identifiant de la séance dans laquelle l'étudiant a soumis sa réponse.
 */
export type Tentative = {
  id: string;
  validationExercice: boolean;
  logErreurs: string;
  dateSoumission: Date;
  reponseEtudiant: string;
  idSeance: string;
};
