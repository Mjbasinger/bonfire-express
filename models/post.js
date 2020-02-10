const mongoose = require('mongoose');

const Poschema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    name: String,
    email: {type: String, required: true},
    password: { type: String, required: true},
    needs: [String]
})

const User = mongoose.model('User', userSchema);

module.exports = User;