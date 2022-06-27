import config from '@config';
import { AuthService } from '@services/auth.service';
import { RequestHandler, Router } from 'express';

const authRouter = Router();

const redirectToLogin: RequestHandler = (req, res, next) => {
  const url = AuthService.instance.getConnectUrl();
  res.status(200).json({ url });
};

const handleAuthorizationCallback: RequestHandler = (req, res, next) => {
  AuthService.instance
    .getToken(req.originalUrl)
    .then((resp) => {
      res
        .status(302)
        .location(
          config.FRONT_OAUTH_CALLBACK +
            '?access_token=' +
            resp.accessToken +
            '&refresh_token=' +
            resp.refreshToken,
        )
        .json({
          accessToken: resp.accessToken,
          refreshToken: resp.refreshToken,
        });
    })
    .catch(next);
};

authRouter.get('/', redirectToLogin);
authRouter.get('/userprofile', handleAuthorizationCallback);

export default authRouter;
