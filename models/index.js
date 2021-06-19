const Enrollment = require('./Enrollment');
const Professor = require('./Professor');
const Student = require('./Student');
const Subject = require('./Subject');


Student.hasMany(Enrollment, {
    foreignKey: 'student_id',
    onDelete: 'CASCADE'
  });
  
  Enrollment.belongsTo(Student, {
    foreignKey: 'student_id'
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
