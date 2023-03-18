const mongoose = require("mongoose");
const mongodb = process.env.MONGODB;
mongoose.connect(mongodb);

const blogSchema = new mongoose.Schema({
  username: String,
  title: String,
  body: String,
});

module.exports = mongoose.model("post", blogSchema);
