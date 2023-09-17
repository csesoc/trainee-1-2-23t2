import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { MongoClient } from 'mongodb';

import { InputError } from './error.js';
import { ObjectId } from 'mongodb';

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
const toiletsDb = mongoClient.db('db').collection('toilets');

/* -------------------------------------------------------------------------- */
/*                               Auth Functions                               */
/* -------------------------------------------------------------------------- */

// TODO: Error checking
const authRegister = async (email, password, name) => {
  if (email === '') {
    throw new InputError('Invalid email');
  }

  if (password.length < 5) {
    throw new InputError('Password must be at least 5 characters long');
  }

  if (name.length < 3 || name.length > 20) {
    throw new InputError('Name must between 3 to 20 characters long');
  }

  const emailCheck = await usersDb.findOne({ email });
  if (emailCheck) {
    throw InputError('This email is already in use');
  }

  const nameCheck = await usersDb.findOne({ name });
  if (nameCheck) {
    throw InputError('This username is already in use');
  }

  console.log(password);
  const passwordHash = bcrypt.hashSync(password, 10);
  const user = { email, password: passwordHash, name, favourites: [], biography: '' };
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

const getUserDetails = async(token) => {
  let user;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const email = decoded.email;
    user = await usersDb.findOne({ email });
  } catch (err) {
    console.error("JWT decoding error:", err);
  }

  if (!user) {
    throw new InputError('You dont exist somehow');
  }

  return user;
}

const getToiletList = async() => {
  const toiletList = await toiletsDb.find().toArray();
  return toiletList;
}

const postReview = async(token, title, enjoyment, usefulness, manageability, review, toiletId) => {
  let username = 'Anonymous';
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const email = decoded.email;
    const user = await usersDb.findOne({ email });
    if (user) {
      username = user.name;
    }
  } catch (err) {
    console.error("JWT decoding error:", err);
  }

  console.log(title);
 
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  const reviewBlock = {
    reviewName: title,
    user: username,
    TermTaken: '23T3',
    Date: `${day}/${month}/${year}`,
    reviewWords: review,
    Enjoyment: enjoyment,
    Usefulness: usefulness,
    Manageability: manageability
  }

  console.log(toiletId);

  try {
    await toiletsDb.updateOne(
      {toiletId: toiletId },
      {
        $push: {
          reviews: reviewBlock
        }
      }
    );
    console.log("review added successfully");
  } catch (error) {
    console.log("review not added successfully" + error);
  }

  return 'nice';
}

export { authLogin, authRegister, getUserDetails, getToiletList, postReview };
