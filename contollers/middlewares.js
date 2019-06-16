module.exports = {
  checkSession: (req, res, next) => {
    console.log("Checking Session...");

    if (!req.session.userId) {
      res.send({ message: "Access Denied!" });
    } else {
      next();
    }
  }
};
