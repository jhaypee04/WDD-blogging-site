const mongoose = require("mongoose");
const mongodb = process.env.MONGODB;
mongoose.connect(mongodb);

const blogSchema = new mongoose.Schema({
  title: String,
  body: String,
  category: String,
  username: String,
  fullname: String,
});

module.exports = mongoose.model("post", blogSchema);
