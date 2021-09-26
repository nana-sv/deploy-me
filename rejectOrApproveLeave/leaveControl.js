const User = require("../usermodel/model");
const LeaveModel  = require("../leaveModel/leaveM");
const password = process.env.password;
const authEMAIL = process.env.authEMAIL;
const nodemailer = require("nodemailer");
const ObjectId = require("objectid");
//space for testing

module.exports = async (req, res, next) => {
    const {staff, message, manager} = req.body;
    
      try{
   if(ObjectId.isValid(staff)) next
      let staffId = await User.findById({"_id": new ObjectId(staff)}); //second test
      if(!staffId) res.status(400).json({mssge: "staffId couldn't be found"});
     
        let newLeaveModel = new LeaveModel({
        staff: staffId,
        reasons: message
     });
      /** nodemailer will be needed to send an receive mailes from the staff and manager. 
     notify staff manager on leave request **/
          
    var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: manager,
    pass: password
  }
});

var mailOptions = {
  from:manager,
  to: manager,
  subject: 'LEAVE REQUEST FROM: ' + staffId.username,
  text: "message content: " + message + "\n\t" + staffId
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
//delivary message
  res.render(__dirname + "/../views/profile.pug", {email: "Request Sent"});
   
      }catch(e){
       return next(e);
     }
  
  };