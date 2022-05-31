/**
 * Une Aide représente une soumission de demande d'aide par un étudiant.
 *
 * @property id L'identifiant de l'aide.
 * @property date, date à la uelle la demande a été formulée.
 * @property resolue Dis si l'aide a été résolue
 */
export type Aide = {
  id: string;
  date: Date;
  resolue: boolean;
};
