const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
// Const User = require('../models/user.js')

//new user
// router.get('/new', (req, res)=>{
//     res.send('this is the new user route')
// })

// index
router.get('/', async (req, res) => {
    try {
        const foundComment = await Comment.find();
        res.status(200).json(foundComment)
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
})

//create Post
// localhost:8000/posts/new
router.post('/new', async (req, res)=>{
    try {
        const newComment = await Comment.create(req.body);

        res.status(200).json(newComment)
    } catch(err) {
        res.status(400).json({
            error: err.message
        })
    }
})

//show
router.get('/:id', async (req, res) => {
    try {
        const foundComment = await Comment.findById(req.params.id);
    
        res.status(200).json(foundComment)
    } catch(err) {
        res.status(400).json({
            error: err.message
        })
    }
})

//delete route
router.delete('/:id', async (req, res)=> {
    try {
        const deletedComment = await Comment.findByIdAndRemove(req.param.id);
        res.status(200).json(deletedComment)
    } catch(err) {
        res.status(400).json({error: err.message})
    }
})

//update route 
router.put('/:id', async (req, res) => {
    try {
        const updatedComment = await Comment.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).json(updatedComment)
    } catch(err) {
        res.status(400).json({error: err.message})
    }
})

module.exports = router