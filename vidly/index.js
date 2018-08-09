const express = require('express');
const mongoose = require('mongoose');
const app = express();
const genres = require('./routes/genres');

mongoose
  .connect('mongodb://localhost/vidly')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/genres', genres);

app.get('/', (req, res) => {
  res.send('Welcome to Vidly!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
