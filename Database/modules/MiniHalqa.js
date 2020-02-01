var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var MiniHalqaSchema = new Schema({
  name: String,
  teacher: String,
  students: [String],
  time: String,
  place: String,
  image: String
});

module.exports = mongoose.model("MiniHalqa", MiniHalqaSchema);
