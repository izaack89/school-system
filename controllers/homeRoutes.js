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


/***********  Student Section  ************/

// Use withAuth middleware to prevent access to route
 router.get('/studentSubject', studentWithAuth, async (req, res) => {
  try {
    // Find the logged in student based on the session ID
    const studentData = await Student.findByPk(req.session.student_id, {
      attributes: { exclude: ['password'] },
      include: [ { model: Subject, through: Enrollment, as: 'students_subjects' , include: [ { model: Professor, through: Enrollment , as: 'subject_professor'}]}],
    });

    const student = studentData.get({ plain: true });
    res.render('students/studentSubject', {
      ...student,
      routeBack:"student",
      logged_in: true
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}); 

 router.get('/studentLogin', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/studentSubject');
    return;
  }
  res.render('students/studentLogin');
}); 

router.get('/studentSignup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/studentSubject');
    return;
  }
  res.render('students/studentSignup');
}); 

/***********  Subject Section  ************/

router.get('/subject/:id/:professorId/:routeB', async (req, res) => {
  try {
    // Find the logged in professor based on the session ID
    const subjectData = await Subject.findByPk(req.params.id, {
      attributes: { exclude: ['password'] },
      include: [ { model: Student, through: Enrollment, as: 'subject_students' , include: [ { model: Professor, through: Enrollment , as: 'student_professor'}]} ],
    });
    const subjects = subjectData.get({ plain: true });
    let routeback= "professorSubject";
    if(req.params.routeB == "student"){
      routeback="studentSubject";
    }
    const professorData = await Professor.findByPk(req.params.professorId, {
      attributes: { exclude: ['password'] },
    });
    
    const professor = professorData.get({ plain: true });
    res.render('subjects/subjectsView', {
      ...subjects,
      professor,
      routeback:routeback,
      professorId:req.params.professorId,
      logged_in: true
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

/***********  Professor Section  ************/

router.get('/professorSubject', professorWithAuth, async (req, res) => {

  try {
    // Find the logged in professor based on the session ID
    const professorData = await Professor.findByPk(req.session.professor_id, {
      attributes: { exclude: ['password'] },
      include: [ { model: Subject, through: Enrollment, as: 'professors_subjects' , include: [ { model: Student, through: Enrollment , as: 'subject_students'}]} ],
    });

    const professor = professorData.get({ plain: true });
    const profId= professor.id
    const newP = professor.professors_subjects.filter(element => {
      let newEle =element.subject_students.filter(ele => {
        if(ele.enrollment.professorId === profId){
          return ele;
        }
      });
      element.subject_students=newEle;
    });
    res.render('professor/professorSubject', {
      ...professor,
      routeBack:"professor",
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/professorLogin', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/professorSubject');
    return;
  }
  res.render('professor/professorLogin');
});

router.get('/professorSignup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/professorSubject');
    return;
  }

  res.render('professor/professorSignup');
});
 
module.exports = router;