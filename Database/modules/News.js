var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var NewsSchema = new Schema({
  text: String,
  image: String,
  time: { type: Date, default: Date.now }
});

module.exports = mongoose.model("News", NewsSchema);
