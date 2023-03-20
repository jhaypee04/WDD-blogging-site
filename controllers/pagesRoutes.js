const express = require("express");
const jwt = require("jsonwebtoken");
const blogSchema = require("../models/blogSchema");
const userSchema = require("../models/userSchema");

const secretKey = process.env.SECRETKEY;
const router = express.Router();
var userlogged;

// Home route
router.get("/", (req, res) => {
  res.render("index");
});
// welcome
router.get("/welcome", (req, res) => {
  res.render("pages/welcome");
});
// overview
router.get("/overview", async (req, res) => {
  const posts = await blogSchema.find();
  console.log(userlogged, posts);

  res.render("pages/overview", { posts, userlogged });
});
// galery
router.get("/galery", async (req, res) => {
  const posts = await blogSchema.find();
  console.log(userlogged, posts);

  res.render("pages/galery", { posts, userlogged });
});
// AddBlogs get
router.get("/addBlogs", protectRoute, async (req, res) => {
  const users = await userSchema.find();
  var rigthUser;
  users.forEach((user) => {
    if (user.username == userlogged.user.username) {
      rigthUser = user;
    }
  });
  console.log(userlogged, rigthUser);
  res.render("pages/protected/addBlogs", { userlogged, rigthUser });
});
// AddBlogs post
router.post("/addBlogs", async (req, res) => {
  console.log(req.body);
  run();
  async function run() {
    const blogs = new blogSchema({
      title: req.body.title,
      body: req.body.body,
      category: req.body.category,
      category: req.body.category,
      username: req.body.username,
      fullname: req.body.fullname,
    });
    await blogs.save();
  }
  const users = await userSchema.find();
  var rigthUser;
  users.forEach((user) => {
    if (user.username == userlogged.user.username) {
      rigthUser = user;
    }
  });
  console.log(userlogged, rigthUser);
  res.render("pages/protected/addBlogs", { userlogged, rigthUser });
});

// custom built middleware
function protectRoute(req, res, next) {
  const token = req.cookies.token;
  console.log(token);
  try {
    const user = jwt.verify(token, secretKey);
    // req.user = user;
    userlogged = user;
    next();
  } catch (err) {
    res.clearCookie("token");
    console.log(err);
    return res.redirect("/");
  }
}

module.exports = router;
