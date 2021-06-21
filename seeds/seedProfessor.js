const { Professor } = require('../models');

const professordata = [
  {
    id: '1',
    first_name: 'Aaron',
    last_name: 'Goldberg',
    email: 'aaron@bootcamp.com',
    password: 'goldman1',
  },
  {
    id: '2',
    first_name: 'Peter',
    last_name: 'Pan',
    email: 'piter@yahoo.com',
    password: 'administrator',
  },
  {
    id: '3',
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@aol.com',
    password: 'begender',
  },
  {
    id: '4',
    first_name: 'Alex',
    last_name: 'Green',
    email: 'aleks1@me.com',
    password: 'supersonic',
  },
  {
    id: '5',
    first_name: 'Brittany',
    last_name: 'Whooper',
    email: 'britt_12@yahoo.com',
    password: 'superstar',
  },
  
];

const seedProfessor = () => Professor.bulkCreate(professordata);

module.exports = seedProfessor;