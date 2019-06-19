const MiniHalqa = require("../Database/modules/MiniHalqa.js");
const Halqa = require("../Database/modules/Halqa");
const { getPosts } = require("../contollers/helpers");

module.exports = {
  add: (req, res) => {
    var newMiniHalqa = {
      halqaId: req.body.halqaId,
      name: req.body.name,
      teacher: req.body.teacher,
      time: req.body.time,
      place: req.body.place,
      image: req.body.image
    };
    MiniHalqa.create(newMiniHalqa, function(err, miniHalqa) {
      if (err) res.send(err);
      else {
        Halqa.findOneAndUpdate(
          { _id: newMiniHalqa.halqaId },
          { $push: { miniHalqat: miniHalqa } },
          (err, doc) => {
            if (err) res.send(err);
            else res.send({ status: true });
          }
        );
      }
    });
  },
  get: (req, res) => {
    console.log("Getting MiniHalqat...");
    getPosts(req, res, MiniHalqa);
  },
  addStudent: (req, res) => {
    MiniHalqa.updateOne(
      { _id: req.body._id },
      { $push: { students: req.body.studentID } },
      (err, halqa) => {
        if (err) res.send(err);
        else {
          res.send({ status: true });
        }
      }
    );
  }
};
