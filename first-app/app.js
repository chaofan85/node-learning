// import module
const path = require('path');
const os = require('os');
const fs = require('fs');
const EventEmitter = require('events');
const Logger = require('./logger');
const http = require('http');

// path module
const pathObj = path.parse(__filename);
console.log(pathObj);

// os module
const totalMemory = os.totalmem();
const freeMemory = os.freemem();

console.log('Total Memory: ' + totalMemory);
console.log(`Free Memory: ${freeMemory}`);

// file system module
fs.readdir('./', (err, files) => {
  if (err) {
    console.log('Error ', err);
  } else {
    console.log('Result', files);
  }
});

const logger = new Logger();

// Register a listener
logger.on('messageLogged', arg => {
  console.log('Listener called', arg);
});

logger.log('message');

// http module

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.write('Hello World');
    res.end();
  }

  if (req.url === '/api/courses') {
    res.write(JSON.stringify([1, 2, 3]));
    res.end();
  }
});

server.on('connection', socket => {
  console.log('New connection...');
});
server.listen(3000);

console.log('Listening on port 3000...');
