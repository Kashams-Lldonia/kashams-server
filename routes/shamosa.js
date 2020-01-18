const express = require("express");
const router = express.Router();
const { checkSession } = require("../contollers/middlewares");
const shamosaCtrl = require("../contollers/shamosa");

router
  .post("/add", checkSession, shamosaCtrl.add)
  .post("/get", checkSession, shamosaCtrl.get)
  .post("/like", checkSession, shamosaCtrl.like)
  .post("/dis-like", checkSession, shamosaCtrl.disLike);

module.exports = router;
