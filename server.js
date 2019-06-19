var express = require("express");
var app = express();
const session = require("express-session");
var MongoStore = require("connect-mongo")(session);
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var multer = require("multer");

// Routers
const registrationRoutes = require("./routes/registration");
const amiraRouter = require("./routes/amira");
const halqaRouter = require("./routes/halqa");
const miniHalqaRouter = require("./routes/miniHalqa");
const shamosaRouter = require("./routes/shamosa");
const newsRouter = require("./routes/news");

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(
  session({
    key: "session",
    secret: "SUPER SECRET SECRET",
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: true,
    saveUninitialized: true
  })
);

mongoose.connect(
  "mongodb+srv://admin:hskak_admin@kashamslldoina-fzb9m.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true },
  () => {
    console.log("Database is connected.");
  }
);

var db = mongoose.connection;

//Upload Image
var storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, "./public/uploads");
  },
  filename: function(req, file, callback) {
    callback(null, file.fieldname + "-" + Date.now());
  }
});
var upload = multer({ storage: storage }).single("photo");

//#region Routes
// Get
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/TemplatesHTML/welcome.html");
});

app.use("/user", registrationRoutes);
app.use("/amira", amiraRouter);
app.use("/halqa", halqaRouter);
app.use("/halqa/mini", miniHalqaRouter);
app.use("/shamosa", shamosaRouter);
app.use("/news", newsRouter);

//The 404 Route (ALWAYS KEEP this as the last route)
app.get("*", function(req, res) {
  res.sendFile(__dirname + "/TemplatesHTML/pagenotfound.html");
});
//#endregion

const PORT = process.env.PORT || 3005;
app.listen(PORT, function() {
  console.log("app listening on port " + PORT);
});
