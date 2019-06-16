const User = require("../Database/modules/User.js");

module.exports = {
  addAmiraForUser: (req, res) => {
    //need to check the length
    console.log(req.body.amiraId);

    User.updateOne(
      { _id: req.body._id },
      { amiraId: req.body.amiraId },
      (err, doc) => {
        if (err) res.send(err);
        else {
          User.updateOne(
            { _id: req.body.amiraId },
            { $push: { people: req.body._id } },
            (err, doc) => {
              if (err) res.send(err);
              else res.send({ status: true });
            }
          );
        }
      }
    );
  },
  getAvailableAmiras: (req, res) => {
    var finalUsers = [];
    User.find({ userType: "amira" }, (err, users) => {
      if (err) res.send(err);
      else {
        for (var i = 0; i < users.length; i++) {
          if (users[i].people.length < 6) finalUsers.push(users[i]);
        }
        res.send(finalUsers);
      }
    });
  }
};
