const mongoose = require('mongoose');

const id = new mongoose.Types.ObjectId();

console.log(id);
console.log(id.getTimestamp());

const isValide = mongoose.Types.ObjectId.isValid('1234');
console.log(isValide);
