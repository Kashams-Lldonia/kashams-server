const express = require("express");
const router = express.Router();
const { checkSession } = require("../contollers/middlewares");
const newsCtrl = require("../contollers/news");

router
  .post("/add", checkSession, newsCtrl.add)
  .post("/get", checkSession, newsCtrl.get)
  .delete("/delete", checkSession, newsCtrl.delete);

module.exports = router;
