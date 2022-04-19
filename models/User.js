const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  userName: { type: String, required: true, max: 100 },
  password: { type: String, required: true },
  emailId: { type: String, required: true },
  mobileNumber: { type: Number, required: true }
});

module.exports = mongoose.model("User", UserSchema);
