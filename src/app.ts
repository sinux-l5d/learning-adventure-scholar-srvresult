import express from 'express';
import config from '@config';
import resultatRouter from './routes/resultat.routes';

const app = express();

// Disable header mentioning Express
app.disable('x-powered-by');

// Permet d'utiliser req.body pour les requêtes POST
app.use(express.json());

// Utilisation du resultRouter
app.use(config.APP_ROOT ?? '/', resultatRouter);

// Handle API's root
app.get('/', (req, res) => {
  // Return JSON with status 200
  res.status(200).send({ message: 'Hello World !' });
});

export default app;
