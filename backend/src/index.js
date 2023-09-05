const express = require('express');

const { InputError, AccessError } = require('./error');
const { authRegister, authLogin } = require('./service');

const PORT = 3000;

const app = express();
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
  res.send('sus');
});

app.post(
  '/auth/register',
  errorHandler(async (req, res) => {
    const { email, password, name } = req.body;
    const token = await authRegister(email, password, name);
    res.json({ token });
  })
);

app.post(
  '/auth/login',
  errorHandler(async (req, res) => {
    const { email, password } = req.body;
    const token = await authLogin(email, password);
    res.json({ token });
  })
);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
