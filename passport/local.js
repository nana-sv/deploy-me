const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const ObjectID = require("mongodb").ObjectID;
const User = require("../usermodel/model");
const bcrypt = require("bcryptjs");

/**function to keep session of the user login. This is to retrieve user id and login the user without going through the process of whole auth process. **/
passport.serializeUser(function(user, done){
  console.log("serialiseUser" + user._id);
  done(null, user._id);
});

//deserializeUser
passport.deserializeUser(function(_id, done){
  console.log("deserializeUser" + _id);
  User.findById(ObjectID(_id), function(err, done){
    if(err) done(null, err);
    return done(null, _id);
  });
});

//function for passport login  strategy
module.exports = function () {
  //Local Strategy
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallBack: false,
      },
      async function (username, password, done) {
        try {
          console.log('User ' + username + ' attempted to log in.')
          let user = await User.findOne({ email: username })
          if (!user) {
            console.log('User non registered')
            return done(null, false, { message: 'E-mail not registered' }) //req.flash let's you send a custom message
          }
          let passwordIsValid = bcrypt.compareSync(password, user.password)
          if (!passwordIsValid) {
            console.log("i hate hackers God demn it ")
            return done(null, false, { message: 'i hate hackers' })
          } 
          
            console.log("User found:", user)
          return done(null, user, { message: 'Login Successful' })
        } catch (error) {
          console.log(error)
          done(null, false, { message: error })
        }
      },
    ),
  )
}
