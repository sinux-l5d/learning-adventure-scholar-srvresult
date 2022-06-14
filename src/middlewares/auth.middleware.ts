import config from '@config';
import { AppError } from '@helpers/AppError.helper';
import { AuthService } from '@services/auth.service';
import { RequestHandler } from 'express';

export const authMiddleware: RequestHandler = async (req, res, next) => {
  if (config.OAUTH2_ENABLED === 'true') {
    const bearer = req.headers.authorization;

    if (typeof bearer !== 'string' || !bearer.startsWith('Bearer ')) {
      return next(new AppError('Unauthorized', 401));
    }

    const token = bearer.split(' ')[1];
    const ok = await AuthService.instance.isTokenValid(token);

    if (!ok) {
      return next(new AppError('Unauthorized', 401));
    }
  }

  next();
};
