const express = require('express')
const jwt = require('jsonwebtoken')
const blogSchema = require('../models/blogSchema')

const secretKey = process.env.SECRETKEY
const router = express.Router()

// Home route
router.get('/', (req, res)=>{
    res.render('index')
})
// AddBlogs get
router.get('/addBlogs', protectRoute, (req, res) => {
    res.render('pages/protected/addBlogs', { username: 'Johnpaul'})
})
// AddBlogs post
router.post('/addBlogs', (req, res) => {
    console.log(req.body)
    run()
    async function run(){
        const blogs = new blogSchema({
            username: req.body.username,
            title: req.body.title,
            body: req.body.body
        })
        await blogs.save()
    }
    res.render('pages/protected/addBlogs', { username: 'Johnpaul'})
})

// custom built middleware
function protectRoute(req, res, next){
    const token = req.cookies.token
    console.log(token)
    try{
        const user = jwt.verify(token, secretKey)
        req.user = user
        // console.log(req.user)
        next()
    }
    catch(err){
        res.clearCookie('token')
        console.log(err)
        return res.redirect('/')
    }
}

// wdd-projects
router.get('/wdd-projects', (req, res)=>{
    res.render('pages/wdd-projects/wddproject.ejs')
})
module.exports = router