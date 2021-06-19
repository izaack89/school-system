const { Enrollment } = require('../models');

const enrollmentdata = [
  {
    id: '1',
    course_id: '1',
    student_id: '1',
    grade: '80.0',
  },
  {
    id: '2',
    course_id: '2',
    student_id: '1',
    grade: '100.0',
  },
  {
    id: '3',
    course_id: '1',
    student_id: '2',
    grade: '85.0',
  },
  {
    id: '4',
    course_id: '3',
    student_id: '3',
    grade: '80.0',
  },
  {
    id: '5',
    course_id: '4',
    student_id: '4',
    grade: '70.0',
  },
];

const seedEnrollment = () => Enrollment.bulkCreate(enrollmentdata);

module.exports = seedEnrollment;