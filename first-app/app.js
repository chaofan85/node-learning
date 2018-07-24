const path = require('path');
const os = require('os');
const fs = require('fs');

// import module
const log = require('./logger');
log('message');

// path module
const pathObj = path.parse(__filename);
console.log(pathObj);

// os module
const totalMemory = os.totalmem();
const freeMemory = os.freemem();

console.log('Total Memory: ' + totalMemory);
console.log(`Free Memory: ${freeMemory}`);

// file system module

fs.readdir('./', function(err, files) {
  if (err) {
    console.log('Error ', err);
  } else {
    console.log('Result', files);
  }
});
