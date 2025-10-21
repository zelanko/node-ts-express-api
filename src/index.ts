import express from 'express';
import type { User } from './types/User.js';
import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World from Express + TypeScript!');
});

const client = new MongoClient(`mongodb://localhost:27017`,  {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  }
);

app.post('/user', async (req, res) => {
  const newUser: User = req.body;

  newUser.createdAt = new Date();
  newUser._id = new ObjectId();

  await client.connect();

  const insertResult = await client.db('ts-express-api-db')
    .collection('Users')
    .insertOne(newUser);

  let result = 'User created successfully';
  if (insertResult.insertedId) {
    console.log(`New user created with id: ${insertResult.insertedId}`);
  }
  else {
    result = 'Error creating user';
  }
  res.send(result);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
