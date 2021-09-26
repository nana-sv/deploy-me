const User = require("../usermodel/model");
const bcrypt = require("bcryptjs");
const jwt =  require("jsonwebtoken");
const handleReg = async function(req, res, next){
  const {username,email,password} = req.body;
  try{
    let user = await User.findOne({email: email})
    if( user){
      console.log("the user: " + username + " attempted to register again")
      res.status(400).json({mssge: "email :" + email + " already in use"})
    };
    
     user = new User({
      username,
      email,
      password
    });
    
    let salt = await bcrypt.genSalt(10); 
    user.password = await bcrypt.hash(password, salt);
    console.log(user.password);
    if(!user.password) throw "could not hash password: " + user.password;
    let saveUser = await user.save();
    if(!saveUser) throw saveUser.errors;
    // redirect
      const payload ={
    copyYourIdFast:{
      id: user.id
    }
  };
    console.log("payload you seek", payload)
    var payloadStgfy = JSON.stringify(payload);
    
    res.status(200).render(__dirname + "/../views/profile.pug", {register: "Welcome " + username + "COPY ID IN LESS THAN 30SEC. " + payloadStgfy});
    console.log(username + "  registration successful");
    
  }catch(error){
    console.error("register catch errors: " + error);
   return next(error);
  }
};

const handleLogin = function(req, res){
   console.log(" Attempted to login")
  //delivary message;
  res.render(__dirname + "/../views/profile.pug", {login: "WOw my PROfile PAge"});
};

const handleLogout = function(req, res){
    req.logout();    
    res.render(__dirname + "/../views/index.pug", {logout: "Your Logout"});
 };


const handlManagerList =  async function(req, res, next){
   console.log("manager registger form");
   const {username, email, password} = req.body;
    try{
       let manager = await User.findOne({email: email})
    if( manager){
      console.log("the manager: " + username + " attempted to register again")
      res.status(400).json({mssge: "email :" + email + " already in use"})
    };
      
      manager = new User({
        username, 
        email,
        password
      });
      
      let salt = await bcrypt.genSalt(10);
      manager.password = bcrypt.hash(password, salt);
      console.log(manager.password);
      if(!manager.password) res.send("password not hash");
      res.status(200).json(username + " registration successful")
      manager.save();
      if(!manager.save()) throw "error manager not save";
    }catch(e){
      return next(e);
    }
}

module.exports = {handleReg,  handleLogin, handlManagerList, handleLogout};