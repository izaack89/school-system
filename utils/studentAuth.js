// Added the Middleware that will help us to redirect if the user is not logged on the system and one to access protected views
const studentWithAuth = (req, res, next) => {  
    if (!req.session.logged_in) {
      res.redirect('/studentLogin');
    } else {
      next();
    }
  };
  
  module.exports = studentWithAuth;