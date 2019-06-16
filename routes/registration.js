const express = require("express");
const router = express.Router();
const { checkSession } = require("../contollers/middlewares");
const registration = require("../contollers/registration");

router
  .post("/login", registration.login)
  .post("/signup", registration.signup)
  .post("/logout", checkSession, registration.logout)
  .post("/tokenValidation", registration.validateToken);

module.exports = router;
