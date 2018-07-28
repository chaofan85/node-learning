const express = require('express');
const helmet = require('helmet');
const logger = require('./middleware/logger');
const config = require('config');
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const home = require('./routes/home');
const courses = require('./routes/courses');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

// using middlewares
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public'));
app.use(helmet());
app.use(logger);
app.use('api/courses', courses);
app.use('/', home);

// Configuration
console.log(`Application Name: ${config.get('name')}`);
console.log(`Mail Server: ${config.get('mail.host')}`);
console.log(`Mail Password: ${config.get('mail.password')}`);

// check environment
if (app.get('env') === 'development') {
  // app.use(middleware());
  startupDebugger('development environment');
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
