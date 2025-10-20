import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World from Express + TypeScript!');
});

app.post('/user', (req, res) => {
  const requestBody = req.body;
  console.log(`Received request to create user. Request body: ${JSON.stringify(requestBody)}`);
  res.send('User created successfully');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
