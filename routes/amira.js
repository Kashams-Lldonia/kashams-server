const express = require("express");
const router = express.Router();
const amiraCtrl = require("../contollers/amira");
const { checkSession } = require("../contollers/middlewares");

router
  .post("/add/amira-for-user", checkSession, amiraCtrl.addAmiraForUser)
  .get("/get/available/amiras", checkSession, amiraCtrl.getAvailableAmiras);

module.exports = router;
