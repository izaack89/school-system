const { Student } = require('../models');

const studentdata = [
  {
    id: '1',
    first_name: 'Yazmin',
    last_name: 'Tinoco',
    email: 'yaz@hotmail.com',
    password: '12345678',
  },
  {
    id: '2',
    first_name: 'German',
    last_name: 'Ramirez',
    email: 'german@yahoo.com',
    password: '12345678',
  },
  {
    id: '3',
    first_name: 'Nicolas',
    last_name: 'Rivera',
    email: 'nico@aol.com',
    password: '123456789',
  },
  {
    id: '4',
    first_name: 'Rigel',
    last_name: 'Trujillo',
    email: 'rigel@amazon.com',
    password: 'dietcoke',
  },
  {
    id: '5',
    first_name: 'Tyler',
    last_name: 'Wright',
    email: 'tyler@xxx.com',
    password: 'administrator',
  },
  {
    id: '7',
    first_name: 'Seed',
    last_name: 'Test',
    email: 'test@op.com',
    password: 'administrator',
  },
];

const seedStudent = () => Student.bulkCreate(studentdata);

module.exports = seedStudent;