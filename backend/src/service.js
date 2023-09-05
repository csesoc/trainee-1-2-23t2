const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const { InputError } = require('./error');

const URI = process.env.MONGO_URI || '';
const JWT_SECRET = 'Iliketrainsandplanes';

/* -------------------------------------------------------------------------- */
/*                                MongoDB                                     */
/* -------------------------------------------------------------------------- */

const mongoClient = new MongoClient(URI);
mongoClient.connect();
const usersDb = mongoClient.db('db').collection('users');

/* -------------------------------------------------------------------------- */
/*                               Auth Functions                               */
/* -------------------------------------------------------------------------- */

// TODO: Error checking lol
const authRegister = async (email, password, name) => {
  const passwordHash = bcrypt.hashSync(password, 10);
  const user = { email, password: passwordHash, name };
  await usersDb.insertOne(user);
  const token = jwt.sign({ email }, JWT_SECRET, { algorithm: 'HS256' });
  return token;
};

const authLogin = async (email, password) => {
  const user = await usersDb.findOne({ email });
  if (user) {
    const passwordsMatch = bcrypt.compareSync(password, user.password);
    if (!passwordsMatch) {
      throw new InputError('Passwords do not match');
    } else {
      const token = jwt.sign({ email }, JWT_SECRET, { algorithm: 'HS256' });
      return token;
    }
  } else {
    throw new InputError('Invalid email');
  }
};

/* -------------------------------------------------------------------------- */
/*                               User Functions                               */
/* -------------------------------------------------------------------------- */

const getUserDetails = async () => {
  return;
};

module.exports = { authRegister, authLogin };
