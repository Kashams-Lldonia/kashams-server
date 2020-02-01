var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  gender: String,
  username: String,
  firstname: String,
  lastname: String,
  avatar: String,
  major: String,
  password: String,
  phone: Number,
  userType: String,
  dob: Date,
  amiraId: String,
  people: [String],
  posts: [
    {
      ref: "Shamosa",
      type: mongoose.Schema.Types.ObjectId
    }
  ]
});

module.exports = mongoose.model("Users", UserSchema);
