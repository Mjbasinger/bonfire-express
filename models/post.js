const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: String,
    body: String, 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Post = mongoose.model('Post', postSchema);
module.exports = Post;