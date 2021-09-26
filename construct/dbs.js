const mongoose = require("mongoose");

module.exports = async function dbInitiation() {
  console.log("connecting to mongodb Atlas");
  try {
    await mongoose.connect(process.env.MONG0DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    console.log("server connect mongodb to: ", process.env.MONG0DB_URI);
  } catch (e) {
    throw e;
    return e;
  }
};
