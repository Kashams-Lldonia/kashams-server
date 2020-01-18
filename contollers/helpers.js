const slicePosts = (array, end, amount, flag) => {
  if (flag) {
    end = array.length;
  }
  var start = end - amount;
  return array.slice(start, end);
};
const getPosts = (req, res, db) => {
  db.find((err, docs) => {
    if (err) res.send(err);
    else {
      var result = slicePosts(
        docs,
        req.body.end,
        req.body.amount,
        req.body.flag
      );
      res.send(result);
    }
  });
};

module.exports = {
  slicePosts,
  getPosts
};
