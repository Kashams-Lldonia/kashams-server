const Halqa = require("../Database/modules/Halqa.js");
const { getPosts } = require("../contollers/helpers");

module.exports = {
  add: (req, res) => {
    var newHalqa = {
      name: req.body.name,
      teacher: req.body.teacher,
      time: req.body.time,
      place: req.body.place
    };
    Halqa.create(newHalqa, function(err, doc) {
      if (err) return err;
      else {
        res.send(doc);
      }
    });
  },
  get: (req, res) => {
    getPosts(req, res, Halqa);
  },
  addStudent: (req, res) => {
    Halqa.updateOne(
      { _id: req.body._id },
      { $push: { students: req.body.studentId } },
      (err, halqa) => {
        if (err) res.send(err);
        else {
          res.send({ status: true });
        }
      }
    );
  }
};
