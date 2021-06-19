const sequelize = require('../config/connection');
const seedStudent = require('./seedStudent');
const seedProfessor = require('./seedProfessor');
const seedEnrollment = require('./seedSubject');
const seedSubject = require('./seedSubject');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedStudent();
  await seedProfessor();
  await seedEnrollment();
  await seedSubject();

  process.exit(0);
};

seedAll();
