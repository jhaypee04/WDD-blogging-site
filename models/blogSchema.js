const mongoose = require("mongoose");
const mongodb = process.env.MONGODB;
mongoose.connect(mongodb);

const blogSchema = new mongoose.Schema({
  title: String,
  body: String,
  category: String,
});

module.exports = mongoose.model("post", blogSchema);
