const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const PORT = 3000;

const uri = process.env.MONGO_URI;
const mongoClient = new MongoClient(uri);

const usersDb = mongoClient.db('db').collection('users');

app.get('/', (req, res) => {
  res.send('sus');
});

app.post('/testdb', async (req, res) => {
  await usersDb.insertOne({
    name: 'sussy guy',
    email: 'sus@susmail.com',
    password: 'notsus',
  });
  res.status(200).send('user added successfully');
});

app.listen(PORT, async () => {
  await mongoClient.connect();
  console.log(`Server listening on port ${PORT}`);
});
