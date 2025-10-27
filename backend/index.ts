require('./models'); 

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

const routes = require('./routes');

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());
app.use(routes);

app.get('/', (_req, res) => {
  res.send('API running...');
});

app.use( '/uploads', express.static('public/uploads'))

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}❤`);
});
