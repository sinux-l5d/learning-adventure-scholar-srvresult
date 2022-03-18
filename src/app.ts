import express from 'express';
import globalRouter from './routes';
import config from '@config';
const app = express();

app.use(express.json());

// Désactive le header indiquant que c'est une application express
app.disable('x-powered-by');

app.use(function (_req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
});

app.use(config.APP_ROOT ?? '/', globalRouter);

export default app;
