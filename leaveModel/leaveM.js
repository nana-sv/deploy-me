const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const leaveSchema = new Schema({
  reasons: {
    type: String
  },
   
  staff: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  
 leaveStatus: {
   type: String,
   enum: ["pending", "approve", "reject"],
   defaul: "pending"
 },
  whenCreated: {
    type: Date,
    date: Date.now()
  }
});

const leaveModel = mongoose.model("leave", leaveSchema, "leave");

module.exports = leaveModel;