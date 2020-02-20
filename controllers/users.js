const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

const bcrypt = require('bcrypt')

//new user
// router.get('/new', (req, res)=>{
//     res.send('this is the new user route')
// })

//index
router.get('/', async (req, res) => {
    try {
        const foundUsers = await User.find();
        res.status(200).json(foundUsers)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})



//login route
router.post('/login', async (req, res) => {
    try {
        const foundUser = await User.findOne({ username: req.body.username });

        if (foundUser) {
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.message = 'Logged In';
                req.session.username = foundUser.username;
                req.session.logged = true;
                //delete user password
                res.json({username: req.session.username});
            } else {
                req.session.message = 'Username or password is incorrect';
                res.json({body: "test message", data:"2nd message"});
            }
        } else {
            req.session.message = 'Username or password is incorrect';
            // res.redirect('/');
        }
    } catch (err) {
        res.send(err)
    }
})

//create User
router.post('/sign-up', async (req, res) => {

    const passwordHash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

    const userDbEntry = {
        username: req.body.username,
        password: passwordHash,
        email: req.body.email
    }
    try {
        const newUser = await User.create(userDbEntry);
        req.sesson.username = newUser.username;
        req.session.logged = true;
        res.json(newUser);
        // res.redirect('/');

    } catch (err) {
        res.send('this didnt work')
        console.log(err)
    }
})

//logout
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.send(err);
        } else {
            res.redirect('/');
        }
    })
})

//show
router.get('/:id', async (req, res) => {
    try {
        const foundUser = await User.findById(req.params.id);

        res.render('users/')
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})


//delete route
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndRemove(req.param.id);
        res.status(200).json(deletedUser)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

//update route 
router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(updatedUser)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

module.exports = router