// Custom handlebars helper functions
module.exports = {
  is_equal :(a,b) =>{
      if(a ===b){
          console.log(a,b)
          return true;
      }else{
          return false;
      }

  }
};
