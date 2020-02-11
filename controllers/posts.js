const express = require('express');
const router = express.Router();
const Post = require('../models/post.js');
// Const User = require('../models/user.js')

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
router.post('/new', async (req, res)=>{
    try {
        const newPost = await Post.create(req.body);

        res.status(200).json(newPost)
    } catch(err) {
        res.status(400).json({
            error: err.message
        })
    }
})

//show
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
router.delete('/:id', async (req, res)=> {
    try {
        const deletedPost = await Post.findByIdAndRemove(req.param.id);
        res.status(200).json(deletedPost)
    } catch(err) {
        res.status(400).json({error: err.message})
    }
})

//update route 
router.put('/:id', async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).json(updatedPost)
    } catch(err) {
        res.status(400).json({error: err.message})
    }
})

module.exports = router