const { Subject } = require('../models');

const subjectdata = [
  {
    id: '1',
    title: 'Chemistry',
    icon: 'fas fa-atom'
  },
  {
    id: '2',
    title: 'Biology',
    icon: 'fas fa-hippo'
  },
  {
    id: '3',
    title: 'Mathematics',
    icon: 'fas fa-square-root-alt'
  },
  {
    id: '4',
    title: 'Spanish',
    icon: 'fas fa-book'
  },
  {
    id: '5',
    title: 'French',
    icon: 'fas fa-book'
  },
];

const seedSubject = () => Subject.bulkCreate(subjectdata);

module.exports = seedSubject;