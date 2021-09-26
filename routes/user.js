const express = require("express");
const {handleReg,  handleLogin, handlManagerList, handleLogout} = require("../controller/auth");
const leaveMessage = require("../rejectOrApproveLeave/leaveControl");
const passport = require("passport");
//const local = require("../passport/local");
const {registerValidator,
       loginValidator,
       validationErrorsHandler} = require("../middleware/validator");

module.exports = function(app){
  
  app.route("/").get(function(req, res){
    res.render(__dirname + "/../views/index.pug");
  });
  
  app.route("/register").get( function(req, res){
    res.render(__dirname + "/../views/regForm.pug");
  });
  
  //ensure login helper function
  function ensureAuthentication(req, res){
    let isAuth = req.isAuthenticated();
    if(!isAuth) throw " Error authenticating login";
  };
  
  app.route("/login").get( function(req, res){
    res.render(__dirname + "/../views/login.pug");
  });
  
  app.route("/profile").get(ensureAuthentication, function(req, res){
    res.render(__dirname + "/../views/profile.pug");
  })
  
  app.route("/register").post([...registerValidator,  validationErrorsHandler], handleReg);
   
  app.route("/login").post( passport.authenticate('local', {session: false}), handleLogin);
  
  //WORKING ON SELECT AN MESSAGE
  app.route("/leave-req").post(leaveMessage);
   
  app.route('/logout').get(handleLogout);
  //THIS IS THE ENDOFLINE 
  
  app.route("/about").get( function(req, res){
    res.render(__dirname + "/../views/about.pug");
  })
  
}