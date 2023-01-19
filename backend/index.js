const express = require("express");
const db = require("./db.json");
const fs = require("fs");
const bodyParser = require("body-parser");
const async = require("async");
const userModel = require("./userModel");
const maths = require("./maths");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const MongoDB = require("./mongo");
const { mongo } = require("mongoose");
const notemodel = require("./notemodel");
const cors = require("cors");
const { response } = require("express");
const { stringify } = require("querystring");

const port = process.env.BACKEND_PORT; //Backend Port Running on 5000
const secretKey = process.env.JWT_SECRET

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

MongoDB.start(); //db has been started

app.get("/notes", (req, res) => {
  let notes = res.json({
    results: db.notes,
  });
});

//auto , series and parallel async functions

app.get("/newnotes", (req, res) => {
  async.auto(
    {
      notes: function (cb) {
        notemodel.find().exec(function (err, notes) {
          if (err) {
            return cb("Unable to fetch notes.");
          }
          console.log(notes);
          return cb(null, notes);
        });
      },
    },
    function (err, results) {
      if (err) {
        return res.status(403).json({ error: err });
      }
      return res.json({ results: results.notes });
    }
  );
});

app.post("/addnewnote", (req, res) => {
  let Existingnotes = db.notes;
  let note = req.body.note;

  Existingnotes.push(note);
  fs.writeFile("db.json", JSON.stringify({ notes: Existingnotes }), () => {});

  res.send("Note Created");
});

//Post Request MongoDB
app.post("/newnotes", async (req, res) => {
  const data = new notemodel({
    description: req.body.description,
    title: req.body.title,
  });

  const val = await data.save();

  res.send("Note Sucessfully Created");
});

//fetch and add the notes and Users from the DB

app.get("/concat", (req, res) => {
  async.auto(
    {
      notes: function (cb) {
        notemodel.find().exec(function (err, notes) {
          if (err) {
            return cb("Unable to fetch notes.");
          }
          console.log(notes);
          return cb(null, notes);
        });
      },
      users: function (cb) {
        userModel.find().exec(function (err, users) {
          if (err) {
            return cb("Unable to fetch Users");
          }
          console.log(users);
          return cb(null, users);
        });
      },
    },

    function (err, results) {
      if (err) {
        return res.status(403).json({ error: err });
      }
      console.log(results);
      return res.send(results.notes.concat(results.users));
    }
  );
});

/*
app.delete('/delete',()=>{
    
})

*/

//GET request to get users
app.get("/getUsers", (req, res) => {
  async.auto(
    {
      users: function (cb) {
        userModel.find().exec(function (err, users) {
          if (err) {
            return cb("Unable to fetch users");
          }

          return cb(null, users);
        });
      },
    },
    function (err, results) {
      if (err) {
        return res.status(403).json({ error: err });
      }
      return res.json({ results: results.users });
    }
  );
});

//Post API to Add new User
app.post("/signup", (req, res) => {
  async.auto(
    {
      users: function (cb) {
        var userData = { email: req.body.email, password: req.body.password }
        var authToken = jwt.sign(userData,secretKey)
        userData.authToken = jwt.sign(userData,secretKey)
        userModel.create({ userData }, (err, user) => {
          if (err) {
            return cb("Unable to Add!");
          }
          console.log(user);
          return cb(null, user);
        });
      },
    },
    function (err, results) {
      if (err) {
        return res.status(403).json({ error: err });
      }
      return res.send(results.users);
    }
  );
});

//POST Request For Login
app.post("/login", (req, res) => {
  async.auto(
    {
      users: function (cb) {
        userModel.findOne(
          { email: req.body.email, password: req.body.password },
          (err, user) => {
            if (err) {
              return cb("Unable to Login!");
            }
            console.log(user);
            
            if (user) {
              return cb(null, true);
            }
            return cb(null, false);
          }
        );
      },
    },
    function (err, results) {
      if (err) {
        return res.status(403).json({ error: err });
      }
      if (results.user == true) {
        return res.json({ results: "Succesfully Created" });
      }
      return res.json({ results: "Login Failed" });
    }
  );
});

/**
 area of square
area of circle
area of square
area of circle
add two numbers
subtract two numbers
gcd of two numbers
square of two numbers
square toot of a number
 */

app.post("/submission", (req, res) => {
  var key = req.body.key;
  var first = parseInt(req.body.firstNumber);
  var second = parseInt(req.body.secondNumber);
  async.auto(
    {
      sum: function (cb) {
        if (key !== "add") return cb(null, false);

        var sum = Number(first + second);
        return cb(null, sum);
      },
      sub: function (cb) {
        if (key !== "sub") return cb(null, false);

        var sub = Number(first - second);
        return cb(null, sub);
      },

      areaCircle: function (cb) {
        if (key !== "areaCircle") return cb(null, false);

        var circle = Number(3.14 * first * first);
        return cb(null, circle);
      },
      sqrt: function (cb) {
        if (key !== "sqrt") return cb(null, false);

        var sqrt = Math.sqrt(first);
        return cb(null, sqrt);
      },
    },
    function (err, results) {
      if (err) {
        return res.send.status(403).json({ error: err });
      }
      return res.json({ results: results });
    }
  );
});

app.listen(port, () => {
  console.log("App has been started on Port : 5000");
});
