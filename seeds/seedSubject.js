const { Subject } = require('../models');

const subjectdata = [
  {
    id: '1',
    title: 'Chemistry',
  },
  {
    id: '2',
    title: 'Biology',
  },
  {
    id: '3',
    title: 'Mathematics',
  },
  {
    id: '4',
    title: 'Spanish',
  },
  {
    id: '5',
    title: 'French',
  },
];

const seedSubject = () => Subject.bulkCreate(subjectdata);

module.exports = seedSubject;