// Added the Middleware that will help us to redirect if the user is not logged on the system and one to access protected views
const professorWithAuth = (req, res, next) => {  
    if (!req.session.logged_in && req.session.logged_type==="professor") {
      res.redirect('/professorLogin');
    } else if (req.session.logged_in && req.session.logged_type==="professor") {
      next();
    }else{
      res.redirect('/');
    }
  };
  
  module.exports = professorWithAuth;