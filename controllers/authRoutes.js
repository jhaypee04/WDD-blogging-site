const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userSchema = require('../models/userSchema')

const secretKey = process.env.SECRETKEY
const router = express.Router()

// Login get
router.get('/login', (req, res)=>{
    res.render('pages/auth/login')
})

// Login post
router.post('/login', (req, res)=>{
    console.log(req.body)
    userSchema.findOne({email: req.body.email})
    .then((user)=>{
        console.log(user)
        bcrypt.compare(req.body.password, user.password, (err, data)=>{
            if(err){
                console.log(err)
            }
            if(data){
                console.log(data)
                const payload = {
                    user: {
                        email: user.email
                    }
                }
                const token = jwt.sign(payload, secretKey, {
                    expiresIn: '3600s'
                })
                res.cookie('token', token, {
                    httpOnly: false
                })
                res.redirect('/addBlogs')
            }
            else {
                console.log('Wrong password')
            }
        })
    })
    .catch((err)=>{
        console.log(err)
    })
})

// Register get
router.get('/register', (req, res) => {
    res.render('pages/auth/register')
})

// Register post
router.post('/register', async (req, res) => {
    console.log(req.body)
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    registerUser()
    async function registerUser(){
        const user = new userSchema({
            username: req.body.username,
            email:  req.body.email,
            password: hashedPassword
        })
        await user.save()
        res.render('pages/auth/login')
    }
})

module.exports = router