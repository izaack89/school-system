const router = require('express').Router();
const { Subject, Student, Professor,Enrollment } = require('../../models');
const withAuth = require('../../utils/studentAuth');

// GET all subject
router.get('/', withAuth, async (req, res) => {
  try {
    const subjectData = await Subject.findAll();
    res.status(200).json(subjectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single location
router.get('/:id', withAuth,async (req, res) => {
  try {
    const subjectData = await Subject.findByPk(req.params.id, {
      // JOIN with Students and Professors, using the Enrollment through table
      include: [
          { model: Student, through: Enrollment, as: 'location_travellers' },
          { model: Professor, through: Enrollment, as: 'location_travellers' }]
    });

    if (!subjectData) {
      res.status(404).json({ message: 'No subject found with this id!' });
      return;
    }

    res.status(200).json(subjectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a subject
router.post('/', withAuth, async (req, res) => {
  try {
    const subjectData = await Subject.create({
        ...req.body,
        student_id: req.session.student_id,
    }
       );
    res.status(200).json(subjectData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a subject
router.delete('/:id', async (req, res) => {
  try {
    const subjectData = await Subject.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      }
    });

    if (!subjectData) {
      res.status(404).json({ message: 'No location found with this id!' });
      return;
    }

    res.status(200).json(subjectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;