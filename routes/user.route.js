const express = require('express');
const app = express();
const userRoutes = express.Router();

// Require Business model in our routes module

let User = require('../models/Users');

// Defined store route

userRoutes.route('/add').post(function (req, res) {
  let user = new User(req.body);

  User.findOne({ email: user.email }).then(function (doc) {
    if (!doc) {
      user
        .save()
        .then((user) => {
          res
            .status(200)
            .json({ message: 'registered successfully', is_success: true });
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    } else {
      res.json({
        message: 'email id already exists',
        is_success: false,
      });
    }
  });
});

// Defined get data(index or listing) route
/**
 * @swagger
 * /api/user:
 *   get:
 *     description: Get all users
 *     responses:
 *       200:
 *         description: Success
 *
 */
userRoutes.route('/').get(function (req, res) {
  User.find(function (err, user) {
    if (err) {
      console.log(err);
    } else {
      res.json(user);
    }
  });
});

// Defined edit route
/**
 * @swagger
 * /api/user/edit/:id:
 *   get:
 *     description: edit user based on id
 *     responses:
 *       200:
 *         description: Success
 *
 */
userRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  User.findById(id, function (err, user) {
    res.json(user);
  });
});

//  Defined update route
userRoutes.route('/update/:id').post(function (req, res, next) {
  let id = req.params.id;
  User.findById(id, function (err, user) {
    if (!user) {
      err = new Error('Could not load Document');
      err.status = 404;
      return next(err);
    } else {
      user.user_name = req.body.user_name;
      user.password = req.body.password;
      user.email = req.body.email;
      user.mobile_number = req.body.mobile_number;
      user
        .save()
        .then((user) => {
          res.json({ message: 'Update complete' });
        })
        .catch((err) => {
          res.status(400).send('unable to update the database');
        });
    }
  });
});

// Defined delete | remove | destroy route
userRoutes.route('/delete/:id').get(function (req, res) {
  console.log('req', req);
  User.findByIdAndRemove({ _id: req.params.id }, function (err, user) {
    if (err) res.json(err);
    else res.json({ message: 'Successfully removed' });
  });
});

// authentication
/**
 * @swagger
 * /api/user/auth:
 *   post:
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: Success
 *
 */
userRoutes.route('/auth').post(function (req, res) {
  let user = new User(req.body);
  User.findOne({ user_name: user.user_name, password: user.password }).then(
    function (doc) {
      if (!doc) {
        res.json({ message: 'no record found', is_success: false });
      } else {
        res.json({
          message: 'login successfully',
          is_success: true,
          email: doc.email,
          user_name: doc.user_name,
        });
      }
    }
  );
});

module.exports = userRoutes;
