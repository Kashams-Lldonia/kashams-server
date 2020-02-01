var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var HalqaSchema = new Schema({
  name: String,
  description: String,
  image: String,
  miniHalqat: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MiniHalqa"
    }
  ]
});

module.exports = mongoose.model("Halqa", HalqaSchema);
