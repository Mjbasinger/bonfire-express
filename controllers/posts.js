const express = require('express');
const router = express.Router();
const Post = require('../models/post.js');
const User = require('../models/user.js')

//new user
// router.get('/new', (req, res)=>{
//     res.send('this is the new user route')
// })

//index
router.get('/', async (req, res) => {
    try {
        const foundPosts = await Post.find();
        res.status(200).json(foundPosts)
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
})

//create Post
// localhost:8000/posts/new
router.post('/new', async (req, res)=>{
    try {
        const newPost = await Post.create(req.body);
        const foundUser = await User.findOne({username: req.session.username})
        req.body.user = foundUser._id;
        await Post.create(req.body);
        res.status(200).json(newPost)
    } catch(err) {
        res.status(400).json({
            error: err.message
        })
    }
})

//show
// localhost:8000/posts/:id
router.get('/:id', async (req, res) => {
    try {
        const foundPost = await Post.findById(req.params.id);
    
        res.status(200).json(foundPost)
    } catch(err) {
        res.status(400).json({
            error: err.message
        })
    }
})

//delete route
// localhost:8000/posts/:id
router.delete('/:id', async (req, res)=> {
    try {
        const deletedPost = await Post.findByIdAndRemove(req.params.id);
        res.json(deletedPost)
    } catch(err) {
        res.status(400).json({error: err.message})
    }
})

//update route 
// localhost:8000/posts/:id
router.put('/:id', async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).json(updatedPost)
    } catch(err) {
        res.status(400).json({error: err.message})
    }
})

module.exports = router