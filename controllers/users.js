const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

//new user
// router.get('/new', (req, res)=>{
//     res.send('this is the new user route')
// })

//index
router.get('/', async (req, res) => {
    try {
        const foundUsers = await User.find();
        res.status(200).json(foundUsers)
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
})

//create User
router.post('/register', async (req, res)=>{
    try {
        const newUser = await User.create(req.body);

        res.status(200).json(newUser)
    } catch(err) {
        res.status(400).json({
            error: err.message
        })
    }
})

//show
router.get('/:id', async (req, res) => {
    try {
        const foundUser = await User.findById(req.params.id);
    
        res.status(200).json(foundUser)
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
})


//delete route
router.delete('/:id', async (req, res)=> {
    try {
        const deletedUser = await User.findByIdAndRemove(req.param.id);
        res.status(200).json(deletedUser)
    } catch(err) {
        res.status(400).json({error: err.message})
    }
})

//update route 
router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).json(updatedUser)
    } catch(err) {
        res.status(400).json({error: err.message})
    }
})

module.exports = router