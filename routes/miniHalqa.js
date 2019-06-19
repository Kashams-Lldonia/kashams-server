const express = require("express");
const router = express.Router();
const { checkSession } = require("../contollers/middlewares");
const miniHalqaCtrl = require("../contollers/miniHalqa");

router
  .post("/add", checkSession, miniHalqaCtrl.add)
  .post("/get", checkSession, miniHalqaCtrl.get)
  .post("/add-student", checkSession, miniHalqaCtrl.addStudent);

module.exports = router;
