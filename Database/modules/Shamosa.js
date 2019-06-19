var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ShamosaSchema = new Schema({
  text: String,
  image: String,
  time: { type: Date, default: Date.now },
  username: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  like: Number
});

module.exports = mongoose.model("Shamosa", ShamosaSchema);
