import express from 'express';

const app = express();

// Disable header mentioning Express
app.disable('x-powered-by');

// Handle API's root
app.get('/', (req, res) => {
  // Return JSON with status 200
  res.status(200).send({ message: 'Hello World !' });
});

export default app;
