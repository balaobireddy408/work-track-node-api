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

//  Defined update route
taskRoutes.route('/update/:id').post(function (req, res, next) {
  let id = req.params.id;
  Task.findById(id, function (err, task) {
    if (!task) {
      err = new Error('Could not load Document');
      err.status = 404;
      return next(err);
    } else {
      task.name = req.body.name;
      task.description = req.body.description;
      task.dueDate = req.body.dueDate;
      task.status = req.body.status;
      task
        .save()
        .then((task) => {
          res.json({ task: 'Task updated successfully' });
        })
        .catch((err) => {
          res.status(400).send('unable to update the database');
        });
    }
  });
});

// Defined delete | remove | destroy route
taskRoutes.route('/delete/:id').get(function (req, res) {
  Task.findByIdAndRemove({ _id: req.params.id }, function (err, task) {
    if (err) res.json(err);
    else res.json({ task: 'Task deleted successfully' });
  });
});

module.exports = taskRoutes;
