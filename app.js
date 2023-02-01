const express = require('express')
const app = express()
app.set('view engine', 'ejs')
// Middleware
app.use('/assets', express.static('assets'))
app.use(express.urlencoded({extended: true}));
// Home route
app.get('/', (req, res)=>{
    res.render('index')
})
// Add Blogs
app.get('/addBlogs', (req, res) => {
    res.render('addBlogs', { username: 'Johnpaul'})
})
// success
app.post('/success', (req, res) => {
    console.log(req.body)
    res.render('success')
})

// Classwork
// Handle login and register get routes


// listener
const port = 3000

app.listen(port, ()=>{
    console.log(`App started on port ${port}`);
})