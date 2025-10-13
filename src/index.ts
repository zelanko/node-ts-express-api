import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World from Express + TypeScript!');
});

app.post('/user', (req, res) => {
  console.log(`body: ${JSON.stringify(req.body)}`);
  res.json({ message: 'User created successfully' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
