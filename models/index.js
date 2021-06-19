const Enrollment = require('./Enrollment');
const Professor = require('./Professor');
const Student = require('./Student');
const Subject = require('./Subject');

Student.belongsToMany(Subject, {    
    through: {
      model: Enrollment,
      unique: false
    },
    as: 'student_subjects'
  });

Subject.belongsToMany(Student, {    
    through: {
      model: Enrollment,
      unique: false
    },
    as: 'subjects_students'
});
Professor.belongsToMany(Enrollment, {    
    through: {
      model: Subject,
      unique: false
    },
    as: 'proffesor_enrollment'
});
  
  
Enrollment.belongsToMany(Professor, {
    through: {
      model: Subject,
      unique: false
    },
    as: 'enrollment_professor'
  });

module.exports = { Enrollment, Professor,Student,Subject};
