/**
 * Erreur générique d'application. Contient code HTTP à renvoyer.
 */
export class AppError extends Error {
  public status: number;
  /**
   *
   * @param message Le message d'erreur à renvoyer au client (si non intercepté par les couches supérieurs de l'application)
   * @param status Code de statut HTTP à renvoyer au client
   */
  constructor(message: string, status = 500) {
    super(message);
    this.status = status;

    // https://github.com/Microsoft/TypeScript-wiki/blob/main/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
