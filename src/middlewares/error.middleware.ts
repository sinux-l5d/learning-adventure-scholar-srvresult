import { AppError } from '@helpers/AppError.helper';
import { ErrorRequestHandler } from 'express';
import { envDependent } from '@helpers/env.helper';

/**
 * Middleware renvoie une erreur au client en fonction du code erreur contenu dans AppError.
 * Ce middleware doit être appelé par un autre (généralement par des routes) via la fonction next(AppError).
 *
 * Il renvoie au client Internal Server Error si err.status >= 500 et NODE_ENV == production
 * Renvoie le message d'erreur si err.status >= 500 et NODE_ENV != production
 * Autrement, renvoie le message d'erreur
 *
 */
export const handleMiddlewareErrors: ErrorRequestHandler = (err: AppError, _req, res, _next) => {
  console.error(envDependent(err, err.stack ?? 'Pas de stack'));
  res.status(err.status);
  if (err.status >= 500) {
    res.json({ error: envDependent('Internal Server Error', err.message?.toString()) });
  } else {
    res.json({ error: err.message?.toString() });
  }
};
