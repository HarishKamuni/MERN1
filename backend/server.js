const express = require('express');
const dotenv = require('dotenv');
const notes = require('./data/notes');
const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('App is running....');
});

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.get('/api/notes/:id', (req, res) => {
  const note = notes.find((n) => n._id === req.params.id);
  res.send(note);
  console.log(req.params.id);
});

app.listen(5000, () => {
  console.log(`server is running at port ${PORT}`);
});
