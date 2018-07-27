const express = require('express');
const Joi = require('joi');

const app = express();

const genres = [
  { id: 1, genre: 'action' },
  { id: 2, genre: 'comedy' },
  { id: 3, genre: 'crime' },
  { id: 4, genre: 'drama' },
  { id: 5, genre: 'horror' },
  { id: 6, genre: 'musical' },
  { id: 7, genre: 'war' }
];

app.get('/', (req, res) => {
  res.send('Welcome to Vidly!');
});

app.get('/api/genres', (req, res) => {
  res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
  res.send(genres[parseInt(req.params.id) - 1]);
});

app.post('/api/genres', (req, res) => {
  const newGenre = {
    id: genres.length + 1,
    genre: req.body.genre
  };

  genres.push(newGenre);
  res.send(newGenre);
});

app.put('/api/genres/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre) {
    return res.status(404).send('The genre with the given ID is not found');
  }

  genre.genre = req.body.genre;
  res.send(genre);
});

app.delete('/api/genres/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre) {
    return res.status(404).send('The genre with the given ID is not found');
  }

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genre);
});

const port = process.env.PORT || 3000;
app.listen(port);
