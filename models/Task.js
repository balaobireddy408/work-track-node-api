const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TaskSchema = new Schema({
  name: { type: String, max: 100 },
  description: { type: String, max: 500 },
  createdDate: { type: Date },
  dueDate: { type: Date },
  status: { type: String },
  email: { type: String },
});

module.exports = mongoose.model('tasks', TaskSchema, 'Task');

module.exports = mongoose.model('Task', TaskSchema);
