import config from '@config';
import axios from 'axios';

export class UserProfileService {
  private static instanceURL = config.APP_USERPROFILE_URL;
  private static api = axios.create({
    baseURL: UserProfileService.instanceURL,
  });

  public static async isTokenValid(token: string): Promise<boolean> {
    try {
      const authorized = await this.api.get(`/oauth/authenticate`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return authorized.status === 200;
    } catch (error) {
      return false;
    }
  }
}
