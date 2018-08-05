const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
  const course = new Course({
    name: 'Node.js Course',
    author: 'Chao',
    tags: ['node.js', 'frontend'],
    isPublished: true
  });

  try {
    await course.validate();
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    console.log(ex.message);
  }
}

async function getCourses() {
  const courses = await Course.find({ author: 'Mosh', isPublished: true })
    // .or([{ author: 'Mosh' }, { isPublished: true }])
    // .find({ author: /^Mosh/ }) //Starts with Mosh
    // .find({ author: /Chao$/i }) //Ends with Chao
    // .find({ author: /.*Mosh.*/i }) //Contains Mosh
    .select({ name: 1, tags: 1 })
    .count();
  console.log(courses);
}

async function updateCourse(id) {
  const course = await Course.findById(id);
  if (!course) {
    return;
  }

  course.isPublished = true;
  course.author = 'Another Author';
  // Same as below
  // course.set({
  //   isPublished: true,
  //   author: 'Another Author'
  // });

  const result = await course.save();
  console.log(result);
}

async function updateCourse2(id) {
  const result = await Course.update(
    { _id: id },
    {
      $set: {
        author: 'Mosh',
        isPublished: false
      }
    }
  );

  console.log(result);
}

async function removeCourse(id) {
  const result = await Course.deleteOne({ _id: id });
  console.log(result);
}

removeCourse('5b611b3310a28813b2c15d49');
