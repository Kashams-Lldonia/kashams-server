const Shamosa = require("../Database/modules/Shamosa.js");
const { getPosts } = require("../contollers/helpers");

const _updateLike = (req, res, value) => {
  Shamosa.updateOne({ _id: req.body._id }, { $inc: { like: value } }, function(
    err,
    doc
  ) {
    if (err) res.send({ error: err });
    else {
      res.send(doc);
    }
  });
};

module.exports = {
  add: (req, res) => {
    var newShamosa = {
      text: req.body.text,
      image: req.body.image,
      username: req.body.username
    };
    Shamosa.create(newShamosa, function(err, doc) {
      if (doc) {
        res.send(doc);
      } else {
        res.send(err);
      }
    });
  },
  get: (req, res) => {
    getPosts(req, res, Shamosa);
  },
  like: (req, res) => {
    _updateLike(req, res, 1);
  },
  disLike: (req, res) => {
    _updateLike(req, res, -1);
  }
};
