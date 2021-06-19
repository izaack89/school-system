const sequelize = require('../config/connection');
const seedStudent = require('./seedStudent');
const seedProfessor = require('./seedProfessor');
const seedEnrollment = require('./seedEnrollment');
const seedSubject = require('./seedSubject');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedStudent();
  await seedProfessor();
  await seedSubject();
  await seedEnrollment();

  process.exit(0);
};

seedAll();
