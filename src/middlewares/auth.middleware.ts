import config from '@config';
import { AppError } from '@helpers/AppError.helper';
import { UserProfileService } from '@services/userprofile.service';
import { RequestHandler } from 'express';

export const authMiddleware: RequestHandler = async (req, res, next) => {
  if (config.APP_USERPROFILE_ENABLED === 'true') {
    console.log('UserProfileService.isTokenValid()');
    const bearer = req.headers.authorization;

    if (typeof bearer !== 'string' || !bearer.startsWith('Bearer ')) {
      return next(new AppError('Unauthorized', 401));
    }

    const token = bearer.split(' ')[1];
    const ok = await UserProfileService.isTokenValid(token);

    if (!ok) {
      return next(new AppError('Unauthorized', 401));
    }
  }

  next();
};
