/**
 * Forme d'un exercice que résultat recoit du service exercice
 */
export type ResultatDepuisExercice = {
  /**
   * ID d'un exercice au format ObjectID (Mongo)
   *
   */
  idExo: string;

  /**
   * Id étudiant
   */
  idEtu: string;

  /**
   * Id session
   */
  idSession: string;

  /**
   * Nom de l'exercice
   */
  nomExo: string;

  /**
   * Nom de l'exercice
   */
  nomSession: string;

  idSeance: string;

  /**
   * Difficulté de l'exercice
   *
   * La difficulté est comprise entre 1 et 10 inclus
   *
   */
  difficulte: number;

  /**
   * Thèmes possible de l'exercice
   *
   * @example
   * boucles, recursif
   */
  themes: Array<string>;

  /**
   * Langage de l'exercice
   */
  langage: string;

  /**
   * Temps moyen de la résolution de l'exercice
   */
  tempsMoyen?: number;

  /**
   * Temps maximum pour résoudre l'exercice
   */
  tempsMaximum?: number;

  /**
   * Auteurs de l'exercice
   */
  auteurs: Array<string>;
};
