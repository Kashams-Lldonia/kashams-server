const Shamosa = require("../Database/modules/Shamosa.js");
const User = require("../Database/modules/User");
const { getPosts } = require("../contollers/helpers");

const _addLike = async (req, res) => {
  try {
    var user = await User.findOne({ _id: req.body.userID }).exec();
    var shamosa = await Shamosa.findOne({ _id: req.body._id }).exec();

    shamosa.like.push(user);
    user.posts.push(shamosa);

    shamosa.save();
    user.save();

    res.send({ status: true });
  } catch (err) {
    res.send({ error: err });
  }
};

// dislike
const _deleteLike = async (req, res) => {
  try {
    var user = await User.findOne({ _id: req.body.userID }).exec();
    var shamosa = await Shamosa.findOne({ _id: req.body._id }).exec();

    shamosa.like.pull({ _id: req.body.userID });
    user.posts.pull({ _id: req.body._id });

    shamosa.save();
    user.save();

    res.send({ status: true });
  } catch (err) {
    res.send({ error: err });
  }
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
    _addLike(req, res);
  },
  disLike: (req, res) => {
    _deleteLike(req, res);
  }
};
