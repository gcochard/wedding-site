module.exports = function(req,res,next){
  console.log('got request');
  next();
};
