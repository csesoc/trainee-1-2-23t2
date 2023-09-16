import express from 'express';
import cors from 'cors';
import { InputError, AccessError } from './error.js';
import { authRegister, authLogin } from './service.js';

const PORT = 6969;

const app = express();
app.use(cors());
app.use(express.json());

const errorHandler = (fn) => async (req, res) => {
  try {
    await fn(req, res);
  } catch (err) {
    if (err instanceof InputError) {
      res.status(400).send({ error: err.message });
    } else if (err instanceof AccessError) {
      res.status(403).send({ error: err.message });
    } else {
      console.log(err);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  }
};

app.get('/', (req, res) => {
  res.send('algorizzisms!');
});

app.post(
  '/auth/register',
  errorHandler(async (req, res) => {
    const { email, password, name } = req.body;
    const token = await authRegister(email, password, name);
    res.json({ token });
  }),
);

app.post(
  '/auth/login',
  errorHandler(async (req, res) => {
    const { email, password } = req.body;
    const token = await authLogin(email, password);
    res.cookie('token', token);
    res.json({ token });
  }),
);

app.post(
  '/auth/logout',
  errorHandler(async (req, res) => {
    res.clearCookie('token');
    res.status(200).send({ message: 'Logged out' });
  }),
);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
