module.exports = {
  checkSession: (req, res, next) => {
    console.log("Session has been paused.");
    next();
    // if (!req.session.userId) {
    //   res.send({ message: "Access Denied!" });
    // } else {
    //   next();
    // }
  }
};
