const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  user_name: { type: String, required: true, max: 100 },
  password: { type: String, required: true },
  email: { type: String, required: true },
  mobile_number: { type: Number, required: true },
});

module.exports = mongoose.model('Users', UserSchema);
