const express = require('express');
var cors = require('cors');
const app = express();
const methodOverride = require('method-override');
const session = require('express-session');
//port variable 
const port = 8000;

// require('dotenv').config();

//db requirements
require('./db/db.js');

//middleware
app.use(express.json())
app.use(cors())

app.use(session({
    secret: 'ChosenUndead',
    resave: false,
    saveUninitialized: false
}));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));





//controllers for users and posts
const usersController = require('./controllers/users.js')
app.use('/users', usersController)

const postsController = require('./controllers/posts.js')
app.use('/posts', postsController)

const commentsController = require('./controllers/comments.js')
app.use('/comments', commentsController)

app.listen(port, ()=> {
    console.log(`Listening on port ${port}`);
});