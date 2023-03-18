const mongoose = require("mongoose");
const mongodb = process.env.MONGODB;
mongoose.connect(mongodb);

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

module.exports = mongoose.model("user", userSchema);
