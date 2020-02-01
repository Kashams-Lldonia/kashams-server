const slicePosts = (array, end, amount, flag) => {
  if (flag) {
    end = array.length;
  }
  var start = end - amount;
  return array.slice(start, end);
};
const getPosts = (req, res, db) => {
  db.find()
    .populate("miniHalqat") // need to make it general
    .exec((err, docs) => {
      if (err) res.send(err);
      else {
        var result = slicePosts(
          docs,
          req.body.end,
          req.body.amount,
          req.body.flag
        );

        res.send({ status: true, data: result });
      }
    });
};

const getHalqat = (req, res, db) => {
  db.find().exec((err, docs) => {
    if (err) res.send(err);
    else {
      var result = slicePosts(
        docs,
        req.body.end,
        req.body.amount,
        req.body.flag
      );

      res.send({ status: true, data: result });
    }
  });
};

module.exports = {
  slicePosts,
  getPosts,
  getHalqat
};
