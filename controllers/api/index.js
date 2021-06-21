const router = require('express').Router();
const studentRoutes = require('./studentRoutes');
const professorRoutes = require('./professorRoutes');

router.use('/students', studentRoutes);
router.use('/professors', professorRoutes);

module.exports = router;
