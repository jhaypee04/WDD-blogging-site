require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')

const authRoutes = require('./controllers/authRoutes')
const pagesRoutes = require('./controllers/pagesRoutes')

//Environment variables
const port = process.env.PORT
const mongodb = process.env.MONGODB
// Connect to mongoDB
mongoose.connect(mongodb)
.then(()=>{
    console.log('database connected')
})
.catch((err)=>{
    console.log(err, 'Database connection failed')
})
const app = express()

app.set('view engine', 'ejs')
// Middleware
app.use('/assets', express.static('assets'))
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())

app.use('/', authRoutes)
app.use('/', pagesRoutes)

app.listen(port, ()=>{
        console.log(`App started on port ${port}`);
})