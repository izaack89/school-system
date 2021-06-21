const router = require('express').Router();
const { Enrollment, Professor, Student,Subject } = require('../models');
const studentWithAuth = require('../utils/studentAuth');
const professorWithAuth = require('../utils/professorAuth');
//Access to homepage
router.get('/', (req, res) => {
  res.render('homepage',{
    logged_in: req.session.logged_in 
  });
});


// Use withAuth middleware to prevent access to route
 router.get('/studentsubject', studentWithAuth, async (req, res) => {
  try {
    // Find the logged in student based on the session ID
    const studentData = await Student.findByPk(req.session.student_id, {
      attributes: { exclude: ['password'] },
      include: [ { model: Subject, through: Enrollment, as: 'students_subjects',include: [ { model: Professor, through: Enrollment, as: 'subject_professor'}]}],
    });

    const student = studentData.get({ plain: true });
    console.log(student[0].students_subjects)
    res.render('studentsubject', {
      ...student,
      logged_in: true
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
}); 


 router.get('/professorprofile', professorWithAuth, async (req, res) => {
  try {
    // Find the logged in professor based on the session ID
    const professorData = await Professor.findByPk(req.session.professor_id, {
      attributes: { exclude: ['password'] },
      include: [ { model: Subject, through: Enrollment, as: 'professors_subjects' } ],
    });

    const professor = professorData.get({ plain: true });

    res.render('professorprofile', {
      ...professor,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

 router.get('/studentlogin', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/studentsubject');
    return;
  }

  res.render('studentlogin');
}); 



router.get('/professorlogin', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/professorprofile');
    return;
  }

  res.render('professorlogin');
});
 



module.exports = router;