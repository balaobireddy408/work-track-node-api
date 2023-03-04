const express = require('express');
const app = express();
const taskRoutes = express.Router();

// Require Business model in our routes module
let Task = require('../models/Task');

// Defined store route
taskRoutes.route('/add').post(function (req, res) {
  let task = new Task(req.body);
  task
    .save()
    .then((task) => {
      res.status(200).json({ task: 'Task added successfully' });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// Defined get data(index or listing) route
taskRoutes.route('/').get(function (req, res) {
  Task.find(function (err, task) {
    if (err) {
      console.log(err);
    } else {
      res.json(task);
    }
  });
});

taskRoutes.route('/task-list').post(function (req, res) {
  Task.find({ email: req.body.email }).then(function (doc) {
    if (!doc) {
      res.json({ message: 'no record found', is_success: false });
    } else {
      res.json(doc);
    }
  });
});

module.exports = taskRoutes;
