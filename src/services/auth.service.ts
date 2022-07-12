import config from '@config';
import { AppError } from '@helpers/AppError.helper';
import axios from 'axios';
import ClientOAuth2 from 'client-oauth2';

export class AuthService {
  private static _instance: AuthService;
  private client: ClientOAuth2;

  /**
   * Initialise le service avec les informations du serveur OAuth2.
   */
  private constructor() {
    this.client = new ClientOAuth2({
      clientId: config.OAUTH2_CLIENT_ID,
      clientSecret: config.OAUTH2_CLIENT_SECRET,
      accessTokenUri: config.OAUTH2_ACCESS_TOKEN_URI,
      authorizationUri: config.OAUTH2_AUTHORIZATION_URI,
      redirectUri: config.OAUTH2_REDIRECT_URI,
      scopes: config.OAUTH2_SCOPES?.split(','),
      state: Math.floor(Math.random() * Math.pow(2, 32)).toString(),
    });
  }

  public static get instance() {
    if (!AuthService._instance) AuthService._instance = new AuthService();
    return AuthService._instance;
  }

  public getConnectUrl() {
    return this.client.code.getUri();
  }

  public async getToken(url: string) {
    return await this.client.code.getToken(url);
  }

  /**
   * Vérifie que le token est valide en utilisant l'API OAuth2.
   * @param token Le token d'accès à vérifier
   * @returns boolean true si le token est valide, false sinon.
   * @throws {AppError} Si le serveur OAuth2 est innaccessible ou que la config est incorrecte.
   */
  public async isTokenValid(token: string) {
    if (!token) return false;

    if (!config.OAUTH2_AUTHENTICATION_URI) {
      throw new AppError('OAUTH2_AUTHENTICATION_URI is not defined', 500);
    }

    try {
      const authorized = await axios.get(config.OAUTH2_AUTHENTICATION_URI, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return authorized.status === 200;
    } catch (error) {
      throw new AppError(error + '', 500);
    }
  }
}
