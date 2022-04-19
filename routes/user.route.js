const express = require("express");
const app = express();
const userRoutes = express.Router();

// Require Business model in our routes module
let User = require("../models/User");

// Defined store route
userRoutes.route("/add").post(function(req, res) {
  let user = new User(req.body);
  user
    .save()
    .then(user => {
      res.status(200).json({ user: "added successfully" });
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

// Defined get data(index or listing) route
userRoutes.route("/").get(function(req, res) {
  User.find(function(err, user) {
    if (err) {
      console.log(err);
    } else {
      res.json(user);
    }
  });
});

// Defined edit route
userRoutes.route("/edit/:id").get(function(req, res) {
  let id = req.params.id;
  User.findById(id, function(err, user) {
    res.json(user);
  });
});

//  Defined update route
userRoutes.route("/update/:id").post(function(req, res, next) {
  let id = req.params.id;
  User.findById(id, function(err, user) {
    if (!user) {
      err = new Error("Could not load Document");
      err.status = 404;
      return next(err);
    } else {
      user.userName = req.body.userName;
      user.password = req.body.password;
      user.emailId = req.body.emailId;
      user.mobileNumber = req.body.mobileNumber;
      user
        .save()
        .then(user => {
          res.json("Update complete");
        })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

// Defined delete | remove | destroy route
userRoutes.route("/delete/:id").get(function(req, res) {
  User.findByIdAndRemove({ _id: req.params.id }, function(err, user) {
    if (err) res.json(err);
    else res.json("Successfully removed");
  });
});

module.exports = userRoutes;
