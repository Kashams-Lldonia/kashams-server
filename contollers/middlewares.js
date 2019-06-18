module.exports = {
  checkSession: (req, res, next) => {
    console.log("Session has been paused.");
    return;
    if (!req.session.userId) {
      res.send({ message: "Access Denied!" });
    } else {
      next();
    }
  }
};
