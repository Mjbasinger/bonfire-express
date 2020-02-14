const express = require('express');
var cors = require('cors');
const app = express();
//port variable 
const port = 8000;

// require('dotenv').config();

//db requirements
require('./db/db.js');

//middleware
app.use(express.json())
app.use(cors())







//controllers for users and posts
const usersController = require('./controllers/users.js')
app.use('/users', usersController)

const postsController = require('./controllers/posts.js')
app.use('/posts', postsController)

app.listen(port, ()=> {
    console.log(`Listening on port ${port}`);
});