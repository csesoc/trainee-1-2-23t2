import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { MongoClient } from 'mongodb';

import { InputError } from './error.js';

import dotenv from 'dotenv';
dotenv.config();

const URI = process.env.MONGO_URI || '';
const JWT_SECRET = process.env.JWT_SECRET || '';

/* -------------------------------------------------------------------------- */
/*                                MongoDB                                     */
/* -------------------------------------------------------------------------- */

const mongoClient = new MongoClient(URI);
mongoClient.connect();
const usersDb = mongoClient.db('db').collection('users');

/* -------------------------------------------------------------------------- */
/*                               Auth Functions                               */
/* -------------------------------------------------------------------------- */

// TODO: Error checking
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

export { authLogin, authRegister };
