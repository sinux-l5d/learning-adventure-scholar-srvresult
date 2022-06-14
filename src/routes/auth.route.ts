import { AuthService } from '@services/auth.service';
import { RequestHandler, Router } from 'express';

const authRouter = Router();

const redirectToLogin: RequestHandler = (req, res, next) => {
  const url = AuthService.instance.getConnectUrl();
  res.status(302).location(url).json({ url });
};

const handleAuthorizationCallback: RequestHandler = (req, res, next) => {
  AuthService.instance
    .getToken(req.originalUrl)
    .then((resp) => {
      res.status(200).json({
        accessToken: resp.accessToken,
        refreshToken: resp.refreshToken,
      });
    })
    .catch(next);
};

authRouter.get('/', redirectToLogin);
authRouter.get('/userprofile', handleAuthorizationCallback);

export default authRouter;
