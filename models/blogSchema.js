const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/blog')

const blogSchema = new mongoose.Schema({
    username: String,
    title: String,
    body: String
})

module.exports = mongoose.model('post', blogSchema)