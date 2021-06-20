const Enrollment = require('./Enrollment');
const Professor = require('./Professor');
const Student = require('./Student');
const Subject = require('./Subject');

// Relations between Students and Professor
Student.belongsToMany(Professor, {    
  through: {
    model: Enrollment,
    unique: false
  },
  as: 'student_professor'
});


Professor.belongsToMany(Student, {
  through: {
    model: Enrollment,
    unique: false
  },
  as: 'professors_student'
});

// Relations between Subject and Professor
Subject.belongsToMany(Professor, {    
  through: {
    model: Enrollment,
    unique: false
  },
  as: 'subject_professor'
});


Professor.belongsToMany(Subject, {
  through: {
    model: Enrollment,
    unique: false
  },
  as: 'professors_subjects'
});

// Relations between Subject and Student
Subject.belongsToMany(Student, {    
    through: {
      model: Enrollment,
      unique: false
    },
    as: 'subject_students'
});
  
  
Student.belongsToMany(Subject, {
    through: {
      model: Enrollment,
      unique: false
    },
    as: 'students_subjects'
  });

module.exports = { Enrollment, Professor,Student,Subject};
