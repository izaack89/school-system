
const router = require('express').Router();
const { Student } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const studentData = await Student.create(req.body);

    req.session.save(() => {
      req.session.student_id = studentData.id;
      req.session.logged_in = true;
      req.session.logged_type = "student";
      res.status(200).json(studentData);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const studentData = await Student.findOne({ where: { email: req.body.email } });

    if (!studentData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await studentData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.student_id = studentData.id;
      req.session.logged_in = true;
      req.session.logged_type = "student";
      res.json({ student: studentData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

  module.exports = router;  