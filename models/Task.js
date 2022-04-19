const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let TaskSchema = new Schema({
  name: { type: String,  max: 100 },
  description: { type: String, max:500 }
});

module.exports = mongoose.model(
  'task', TaskSchema, 'Task');

//module.exports = mongoose.model("Task", TaskSchema);
