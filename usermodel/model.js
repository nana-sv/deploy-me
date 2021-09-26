const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username:{
    type: String
  },
  manager: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  role:{
    type: String,
    enum: ["manager", "staff"],
    default: "staff"
  },
  deleted: {
    type: Boolean,
    default: false
  },
  whenCreated:{
    type: Date,
    default: Date.now()
  }
});

const modelUserSchema = mongoose.model("user", userSchema, "Users");

module.exports = modelUserSchema;