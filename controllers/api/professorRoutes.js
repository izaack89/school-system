const router = require('express').Router();
const { Professor } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const professorData = await Professor.create(req.body);

    req.session.save(() => {
      req.session.professor_id = professorData.id;
      req.session.logged_in = true;

      res.status(200).json(professorData);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const professorData = await Professor.findOne({ where: { email: req.body.email } });

    if (!professorData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await professorData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.professor_id = professorData.id;
      req.session.logged_in = true;

      res.json({ professor: professorData, message: 'You are now logged in!' });
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