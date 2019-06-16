var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  gender: String,
  username: String,
  firstname: String,
  lastname: String,
  major: String,
  password: String,
  phone: Number,
  userType: String,
  dob: Date,
  people: [String],
  currentAmiraId: String
});

module.exports = mongoose.model("User", UserSchema);
