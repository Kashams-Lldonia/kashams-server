const express = require("express");
const router = express.Router();
const { checkSession } = require("../contollers/middlewares");
const halqaCtrl = require("../contollers/halqa");

router
  .post("/add", checkSession, halqaCtrl.add)
  .post("/get", checkSession, halqaCtrl.get);

module.exports = router;
