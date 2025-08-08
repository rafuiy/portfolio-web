require('./models'); 

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

const routes = require('./routes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'https://rafiportfolio.vercel.app', // domain frontend kamu
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Tambahan ini supaya preflight request (OPTIONS) tidak diblok
app.options('*', cors({
  origin: 'https://rafiportfolio.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());
app.use(routes);

app.get('/', (_req, res) => {
  res.send('API running...');
});

app.use('/uploads', express.static('public/uploads'))

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}❤`);
});
