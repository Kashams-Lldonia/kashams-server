var express = require("express");
var app = express();
const session = require("express-session");

var MongoStore = require("connect-mongo")(session);
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var User = require("./Database/modules/User.js");
var News = require("./Database/modules/News.js");
var Halaqa = require("./Database/modules/Halqa.js");
var Shamosa = require("./Database/modules/Shamosa.js");

var multer = require("multer");

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

// Get
app.get("/", (req, res) => {
  console.log("helllo");

  res.sendFile(__dirname + "/TemplatesHTML/welcome.html");
});
// newsImage

app.post("/news/image", upload, function(req, res) {
  console.log("Start uploading Post");
  console.log(req.file);
  // var newNews = {
  //   text: req.body._parts[1][1],
  //   image: req.body._parts[0][1]
  // };

  // News.create(newNews, function(err, doc) {
  //   if (err) return err;
  //   else {
  //     res.send(doc);
  //   }
  // });
});

//SignUp
app.post("/user/signup", (req, res) => {
  var newUser = {
    gender: req.body.gender,
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    major: req.body.major,
    currentAmiraId: req.body.currentAmiraId,
    userType: req.body.userType,
    phone: req.body.phone
  };
  User.findOne({ username: newUser.username }, (err, user) => {
    if (!user) {
      User.create(newUser, (err, doc) => {
        if (err) {
          res.send({ message: err });
        }
        console.log(user);
        res.send(true);
      });
    } else {
      res.send({ message: "Username is already exist." });
    }
  });
});
var token = "k3658Xs";
app.post("/user/tokenValidation", (req, res, next) => {
  if (req.body.token === token) {
    res.send({ status: true });
  } else {
    console.log("Checking Validation Token");
    res.send({ status: false });
    next();
  }
});

//Login
app.post("/user/login", (req, res) => {
  console.log("loging in...", req.body);
  User.findOne({ username: req.body.username }, (err, user) => {
    if (user) {
      if (req.body.password === user.password) {
        req.session.userId = user._id;
        res.send({ status: true, user: user, token: "k3658Xs" });
      } else {
        res.send({ message: "Wrong password!" });
      }
    } else {
      res.send({ message: "Username '" + req.body.username + "' Not Found." });
    }
  });
});

app.get("/user/logout", checkSession, (req, res) => {
  req.session.destroy(err => {
    if (err) res.negotiate(err);
  });

  res.send(true);
});

// Check session
function checkSession(req, res, next) {
  console.log("Checking Session...");

  if (!req.session.userId) {
    res.send({ message: "Access Denied!" });
  } else {
    next();
  }
}
//addNews
app.post("/news/add", checkSession, (req, res) => {
  var newNews = {
    text: req.body.text,
    image: req.body.image
  };
  News.create(newNews, function(err, doc) {
    if (doc) {
      res.send(doc);
    } else {
      res.send(err);
    }
  });
});

//addNShamosa
app.post("/shamosa/add", checkSession, (req, res) => {
  var newShamosa = {
    text: req.body.text,
    image: req.body.image,
    like: req.body.like
  };
  Shamosa.create(newShamosa, function(err, doc) {
    if (doc) {
      res.send(doc);
    } else {
      res.send(err);
    }
  });
});
// get shamosa
app.post("/get/shamosa/posts", checkSession, (req, res) => {
  console.log("Getting Shamosa Posts");

  Shamosa.find((err, docs) => {
    if (err) return err;

    var result = slicePosts(docs, req.body.end, req.body.amount, req.body.flag);
    res.send(result);
  });
});
function slicePosts(array, end, amount, flag) {
  if (flag) {
    end = array.length;
  }
  var start = end - amount;
  return array.slice(start, end);
}
// Likes
app.post("/shamosa/like", checkSession, (req, res) => {
  Shamosa.updateOne({ _id: req.body._id }, { $inc: { like: 1 } }, function(
    err,
    doc
  ) {
    if (err) res.send({ error: err });
    else {
      res.send(doc);
    }
  });
});

// Availabe amiras

app.get("/get/available/amiras", checkSession, (req, res) => {
  var finalUsers = [];
  User.find({ isAmira: true }, (err, users) => {
    for (var i = 0; i < users.length; i++) {
      if (users[i].people.length < 6) finalUsers.push(users[i]);
    }
    res.send(finalUsers);
  });
});

//Delete news
app.delete("/news/delete/:id", checkSession, (req, res) => {
  var id = req.params.id;
  News.findOneAndRemove({ _id: id }, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(500).send();
    }
    return res.status(300).send();
  });
});

//Update news
app.post("/news/update", checkSession, (req, res) => {
  News.findOne({ _id: req.body._id }, (err, news) => {
    var newNews = {
      text: req.body.text,
      image: req.body.image
    };
    news.update(newNews, function(err, doc) {
      if (err) return err;
      else {
        res.send(doc);
      }
    });
  });
});
//add amira to user
//need to check the length

app.post("/add/amiraforuser", checkSession, (req, res) => {
  User.update(
    { _id: req.body.userId },
    { currentAmiraId: req.body.amiraId },
    (err, user) => {
      if (err) return err;
      console.log("current amira added");

      User.update(
        { _id: req.body.amiraId },
        { $push: { people: req.body.userId } },
        (err, user) => {
          if (err) return err;
          console.log("people");
          res.send("Done");
        }
      );
    }
  );
});

//create HalaqaSchema
app.post("/create/halqa", checkSession, (req, res) => {
  var newHalaqa = {
    name: req.body.name,
    teacher: req.body.teacher,
    time: req.body.time,
    place: req.body.place
  };
  Halaqa.create(newHalaqa, function(err, doc) {
    if (err) return err;
    else {
      res.send(doc);
    }
  });
});
// insert students to halaqa
app.post("/add/student/halqa", checkSession, (req, res) => {
  Halaqa.update(
    { _id: req.body._id },
    { $push: { students: req.body.studentId } },
    (err, user) => {
      if (err) return err;
      console.log("student is added into halaqa");
      res.send("Done");
    }
  );
});

//The 404 Route (ALWAYS KEEP this as the last route)
app.get("*", function(req, res) {
  res.sendFile(__dirname + "/TemplatesHTML/pagenotfound.html");
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, function() {
  console.log("app listening on port " + PORT);
});
