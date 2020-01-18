const express = require("express");
const router = express.Router();
const { checkSession } = require("../contollers/middlewares");
const halqaCtrl = require("../contollers/halqa");

router
  .post("/add", checkSession, halqaCtrl.add)
  .post("/get", checkSession, halqaCtrl.get)
  .post("/add-student", checkSession, halqaCtrl.addStudent);

module.exports = router;
