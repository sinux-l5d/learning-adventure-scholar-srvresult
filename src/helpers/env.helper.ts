import config from '@config';

/**
 * Permet de retourner un objet en fonction de l'environnement
 * Par défaut si l'environnement est inconnu (càd != production | developpement | testing), retournera production.
 *
 * @typeParam P Type non nul utilisé en producion.
 * @typeParam D Type non nul utilisé en developpement.
 * @typeParam T Type nullable utilisé pendant les tests unitaires.
 * @param production Objet quelconque devant être retournée en production.
 * @param development Objet quelconque devant être retournée en développement.
 * @param testing Objet optionnel si on est en testing (tests unitaires). Si non spécifié et en environnement testing, retourneras development.
 * @returns L'un des trois objet production developpement ou testing, jamais undefined.
 */
export function envDependent<P, D, T = undefined>(
  production: NonNullable<P>,
  development: NonNullable<D>,
  testing?: T,
): P | D | (T extends undefined | null ? D : T) {
  switch (config.NODE_ENV) {
    case 'production':
      return production;

    case 'development':
      return development;

    case 'testing':
      return testing ?? development;

    // Si on ne connait pas l'environnement, parton du principe que nous sommes en production
    default:
      return production;
  }
}
