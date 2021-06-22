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
      include: [ { model: Subject, through: Enrollment, as: 'students_subjects' , include: [ { model: Professor, through: Enrollment , as: 'subject_professor'}]}],
    });

    const student = studentData.get({ plain: true });
    console.log(student.students_subjects[0])
    res.render('studentsubject', {
      ...student,
      logged_in: true
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
}); 


 router.get('/professorsubject', professorWithAuth, async (req, res) => {
  try {
    // Find the logged in professor based on the session ID
    const professorData = await Professor.findByPk(req.session.professor_id, {
      attributes: { exclude: ['password'] },
      include: [ { model: Subject, through: Enrollment, as: 'professors_subjects' , include: [ { model: Student, through: Enrollment , as: 'subject_students'}]} ],
    });

    const professor = professorData.get({ plain: true });
    console.log(professor.professors_subjects[0])

    res.render('professorsubject', {
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
    res.redirect('/professorsubject');
    return;
  }

  res.render('professorlogin');
});
 



module.exports = router;

/*
SELECT `student`.`id`, `student`.`first_name`, `student`.`last_name`, `student`.`email`, `students_subjects`.`id` AS `students_subjects.id`, `students_subjects`.`title` AS `students_subjects.title`, `students_subjects->enrollment`.`id` AS `students_subjects.enrollment.id`, `students_subjects->enrollment`.`grade` AS `students_subjects.enrollment.grade`, `students_subjects->enrollment`.`subject_id` AS `students_subjects.enrollment.subject_id`, `students_subjects->enrollment`.`professor_id` AS `students_subjects.enrollment.professor_id`, `students_subjects->enrollment`.`student_id` AS `students_subjects.enrollment.student_id`, `students_subjects->enrollment`.`student_id` AS `students_subjects.enrollment.studentId`, `students_subjects->enrollment`.`professor_id` AS `students_subjects.enrollment.professorId`, `students_subjects->enrollment`.`subject_id` AS `students_subjects.enrollment.subjectId`, `students_subjects->subject_professor`.`id` AS `students_subjects.subject_professor.id`, `students_subjects->subject_professor`.`first_name` AS `students_subjects.subject_professor.first_name`, `students_subjects->subject_professor`.`last_name` AS `students_subjects.subject_professor.last_name`, `students_subjects->subject_professor`.`email` AS `students_subjects.subject_professor.email`, `students_subjects->subject_professor`.`password` AS `students_subjects.subject_professor.password`, `students_subjects->subject_professor->enrollment`.`id` AS `students_subjects.subject_professor.enrollment.id`, `students_subjects->subject_professor->enrollment`.`grade` AS `students_subjects.subject_professor.enrollment.grade`, `students_subjects->subject_professor->enrollment`.`subject_id` AS `students_subjects.subject_professor.enrollment.subject_id`, `students_subjects->subject_professor->enrollment`.`professor_id` AS `students_subjects.subject_professor.enrollment.professor_id`, `students_subjects->subject_professor->enrollment`.`student_id` AS `students_subjects.subject_professor.enrollment.student_id`, `students_subjects->subject_professor->enrollment`.`student_id` AS `students_subjects.subject_professor.enrollment.studentId`, `students_subjects->subject_professor->enrollment`.`professor_id` AS `students_subjects.subject_professor.enrollment.professorId`, `students_subjects->subject_professor->enrollment`.`subject_id` AS `students_subjects.subject_professor.enrollment.subjectId` FROM `student` AS `student` LEFT OUTER JOIN ( `enrollment` AS `students_subjects->enrollment` INNER JOIN `subject` AS `students_subjects` ON `students_subjects`.`id` = `students_subjects->enrollment`.`subject_id`) ON `student`.`id` = `students_subjects->enrollment`.`student_id` LEFT OUTER JOIN ( `enrollment` AS `students_subjects->subject_professor->enrollment` INNER 

*/ 