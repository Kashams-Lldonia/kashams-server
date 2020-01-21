const User = require("../Database/modules/User.js");
const token = "k3658Xs";

module.exports = {
  login: (req, res) => {
    console.log("loging in...", req.body);
    User.findOne({ username: req.body.username }, (err, user) => {
      console.log(user);

      if (user) {
        if (req.body.password === user.password) {
          req.session.userId = user._id;
          res.send({ status: true, user: user, token: "k3658Xs" });
        } else {
          res.send({ message: "Wrong password!" });
        }
      } else {
        res.send({
          message: "Username '" + req.body.username + "' Not Found."
        });
      }
    });
  },
  signup: (req, res) => {
    var newUser = {
      gender: req.body.gender,
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      major: req.body.major,
      amiraId: req.body.amiraId,
      userType: req.body.userType,
      phone: req.body.phone
    };
    User.findOne({ username: newUser.username }, (err, user) => {
      if (!user) {
        User.create(newUser, (err, doc) => {
          if (err) {
            res.send({ message: err });
          }

          res.send({ message: true });
        });
      } else {
        res.send({ message: "Username is already exist." });
      }
    });
  },
  logout: (req, res) => {
    req.session.destroy(err => {
      if (err) res.negotiate(err);
    });

    res.send(true);
  },
  validateToken: (req, res, next) => {
    if (req.body.token === token) {
      res.send({ status: true });
    } else {
      console.log("Checking Validation Token");
      res.send({ status: false });
      next();
    }
  }
};
