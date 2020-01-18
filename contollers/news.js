const News = require("../Database/modules/News.js");
const { getPosts } = require("../contollers/helpers");

module.exports = {
  add: (req, res) => {
    var newNews = {
      text: req.body.text,
      image: req.body.image
    };
    News.create(newNews, function(err, doc) {
      if (doc) {
        res.send({ status: true });
      } else {
        res.send(err);
      }
    });
  },
  get: (req, res) => {
    getPosts(req, res, News);
  },
  delete: (req, res) => {
    News.findOneAndDelete({ _id: req.body._id }, (err, doc) => {
      if (err) res.send(err);
      else res.send({ status: true });
    });
  }
};
