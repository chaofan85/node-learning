const path = require('path');
const os = require('os');

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
