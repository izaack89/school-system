// Added the Middleware that will help us to redirect if the user is not logged on the system and one to access protected views
const studentWithAuth = (req, res, next) => {  
    if (!req.session.logged_in && req.session.logged_type==="student") {
      res.redirect('/studentLogin');
    } else if (req.session.logged_in && req.session.logged_type==="student"){
      next();
    }else{
      res.redirect('/');
    }
  };
  
  module.exports = studentWithAuth;