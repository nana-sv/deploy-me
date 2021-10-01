const mongoose = require("mongoose");
var database =  'mongodb+srv://passreqformapp:ruthtersoor090@cluster0.fs4s4.mongodb.net/personalportfolio?retryWrites=true&w=majority';
module.exports = async () => {
  console.log("connecting to mongodb Atlas");
  try {
    await mongoose.connect(database, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    console.log("server connect mongodb to: ", process.env.MONG0DB_URI);
  }catch(error){
    throw error;
  }
};
