import express from 'express';
import cors from 'cors';
import { InputError, AccessError } from './error.js';
import { authRegister, authLogin, getToiletList, postReview } from './service.js';
import cookieParser from 'cookie-parser';
import { ObjectId } from 'mongodb';

const PORT = 6969;

const app = express();
app.use(cors({
  origin: (origin, callback) => {
    callback(null, true);
  },
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

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
    res.cookie('token', token);
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

app.get(
  '/toilets/list',
  errorHandler(async (req, res) => {
    const toiletList = await getToiletList();
    console.log('sent');
    res.json(toiletList)
  }),
)

app.post(
  '/toilets/review/:id',
  errorHandler(async (req, res) => {
    let token;
    try {
      token = req.cookies.token;
    } catch(error) {
      console.log('no cookie');
    }

    const toiletId = req.params.id;
    const { reviewTitle, stringEnjoyment, stringUsefulness, stringManageability, reviewText } = req.body;
    const response = await postReview(token, reviewTitle, stringEnjoyment, stringUsefulness, stringManageability, reviewText, toiletId);
    res.json(response);
  }),
);


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
