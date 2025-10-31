import express from 'express';
import type { User } from './types/User.js';
import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello World from Express + TypeScript!');
});

const apiSpec = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
};
const connection = `mongodb://ts-express-api-root:ts-express-api-root-password@localhost:27017`;
const dbName = 'ts-express-api-db';
const client = new MongoClient(connection,  apiSpec);

app.get('/user/:id', async (req: express.Request, res: express.Response) => {
  const id = req.params.id;

  await client.connect();

  const user = await client.db(dbName)
    .collection<User>('User')
    .findOne({ _id: new ObjectId(id) });
  
  res.json(user);
});

app.post('/user', async (req: express.Request, res: express.Response) => {
  const newUser: User = req.body;

  newUser.createdAt = new Date();
  newUser._id = new ObjectId();

  await client.connect();

  const insertResult = await client.db(dbName)
    .collection('User')
    .insertOne(newUser);

  let result: string;
  if (insertResult.insertedId) {
    result = `User created with id: ${insertResult.insertedId}`;
    console.log(result);
  }
  else {
    result = 'Error creating user';
  }
  res.send(result);
});

app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));
