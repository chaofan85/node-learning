const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost/mongo-exercises')
  .then(() => console.log('Connected to mongoDB'))
  .catch(err => console.error('Could not connect to mongoDB', err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: Date,
  isPublished: Boolean,
  price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
  return await Course.find({ isPublished: true, tags: 'backend' })
    .sort({ name: 1 })
    .select({ name: 1, author: 1 });
}

async function getCourses2() {
  return await Course.find({
    isPublished: true,
    tags: { $in: ['frontend', 'backend'] }
  })
    .sort('-price')
    .select('name author price');
}

async function getCourses3() {
  return await Course.find({
    isPublished: true
  }).or([{ price: { $gte: 15 } }, { name: /.*by*./i }]);
}

async function run() {
  const courses = await getCourses3();
  console.log(courses);
}

run();
